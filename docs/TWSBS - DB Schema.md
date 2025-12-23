# Converted content from TWSBS - DB Schema.pdf

Database Schema Definition
Overview
This document defines the normalized PostgreSQL schema for "The World Shall Be Saved" application.
The schema is designed to support all features including user management, network hierarchies,
discipleship journeys, courses, events, evangelism tools, messaging, and analytics.
Entity Definitions
Core Entities
users
Stores user account information and profile data.
Attributes:
id  (UUID, PRIMARY KEY): Unique user identifier
email  (VARCHAR(255), UNIQUE, NOT NULL): User email address
name  (VARCHAR(255), NOT NULL): User's full name
phone  (VARCHAR(20)): User's phone number in E.164 format
profile_picture  (TEXT): URL to user's profile picture
date_of_birth  (DATE): User's date of birth
level  (VARCHAR(50), NOT NULL, DEFAULT 'Sharer'): Current discipleship level (New Believer,
Sharer, Trainer, Ambassador, Overseer, Shepherd)
role  (VARCHAR(50), NOT NULL, DEFAULT 'User'): System role (User, Admin, Super Admin)
location_country  (VARCHAR(2)): ISO country code
location_state  (VARCHAR(10)): State/province code
location_town_suburb  (VARCHAR(255)): Town or suburb name
location_metro  (VARCHAR(255)): Metropolitan area name
location_street_address  (TEXT): Street address
location_latitude  (DECIMAL(10, 8)): Geographic latitude
location_longitude  (DECIMAL(11, 8)): Geographic longitude
join_date  (DATE, NOT NULL, DEFAULT CURRENT_DATE): Account creation date

---
upline_id  (UUID, FOREIGN KEY REFERENCES users(id)): Direct mentor's user ID (null for Super
Admin)
default_mode  (VARCHAR(50)): Default user mode (movement, new_believer, evangelist,
neighborhoods, crusade)
default_sub_mode  (VARCHAR(50)): Default sub-mode for crusade mode (organizer, volunteer,
church, new_believer_event)
preferred_contact  (TEXT[]): Array of preferred contact methods (email, sms, whatsapp)
wants_bible  (BOOLEAN, DEFAULT FALSE): Whether user wants a Bible
day_streak  (INTEGER, DEFAULT 0): Current day streak
mentor_email_not_found  (VARCHAR(255)): Email of mentor that was not found during
registration
created_at  (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP): Record creation
timestamp
updated_at  (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP): Record last update
timestamp
Indexes:
idx_users_email  on email
idx_users_upline_id  on upline_id
idx_users_level  on level
idx_users_role  on role
idx_users_location_country  on location_country
Constraints:
email  must be unique
level  must be one of: 'New Believer', 'Sharer', 'Trainer', 'Ambassador', 'Overseer', 'Shepherd'
role  must be one of: 'User', 'Admin', 'Super Admin'
default_mode  must be one of: 'movement', 'new_believer', 'evangelist', 'neighborhoods',
'crusade'
user_stats
Stores user statistics for gospel sharing, decisions, and disciples.
Attributes:
user_id  (UUID, PRIMARY KEY, FOREIGN KEY REFERENCES users(id) ON DELETE CASCADE):
User identifier
gospel_shares  (INTEGER, NOT NULL, DEFAULT 0): Total number of gospel presentations
decisions  (INTEGER, NOT NULL, DEFAULT 0): Total number of decisions for Christ

---
disciples  (INTEGER, NOT NULL, DEFAULT 0): Total number of disciples added
network_size  (INTEGER, NOT NULL, DEFAULT 0): Total size of user's network (calculated)
trainers_count  (INTEGER, NOT NULL, DEFAULT 0): Number of trainers in network
(calculated)
deepest_gen  (INTEGER, NOT NULL, DEFAULT 0): Deepest generation in network (calculated)
updated_at  (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP): Last update
timestamp
Indexes:
idx_user_stats_user_id  on user_id
user_upline_path
Stores the hierarchical path from user to root (for efficient network queries).
Attributes:
user_id  (UUID, NOT NULL, FOREIGN KEY REFERENCES users(id) ON DELETE CASCADE): User
identifier
upline_id  (UUID, NOT NULL, FOREIGN KEY REFERENCES users(id) ON DELETE CASCADE):
Upline in the path
path_order  (INTEGER, NOT NULL): Order in the path (0 = direct upline, 1 = upline's upline, etc.)
created_at  (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP): Record creation
timestamp
Indexes:
idx_user_upline_path_user_id  on user_id
idx_user_upline_path_upline_id  on upline_id
idx_user_upline_path_composite  on (user_id, path_order)
Constraints:
Primary key on (user_id, upline_id, path_order)
Journey & Course System
journey_steps
Stores journey step definitions.
Attributes:

---
id  (UUID, PRIMARY KEY): Unique journey step identifier
order  (INTEGER, NOT NULL, UNIQUE): Display order
title  (VARCHAR(255), NOT NULL): Step title
description  (TEXT): Step description
mission  (TEXT): Mission statement for the step
icon_name  (VARCHAR(100)): Icon identifier for UI
for_new_believers_only  (BOOLEAN, DEFAULT FALSE): Whether step is only for new
believers
created_at  (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP): Record creation
timestamp
updated_at  (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP): Record last update
timestamp
Indexes:
idx_journey_steps_order  on order
journey_step_objectives
Stores objectives for each journey step.
Attributes:
id  (UUID, PRIMARY KEY): Unique objective identifier
journey_step_id  (UUID, NOT NULL, FOREIGN KEY REFERENCES journey_steps(id) ON
DELETE CASCADE): Parent journey step
objective_id  (VARCHAR(50), NOT NULL): Objective identifier (e.g., 'obj1', 'obj2')
text  (TEXT, NOT NULL): Objective description
created_at  (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP): Record creation
timestamp
Indexes:
idx_journey_step_objectives_step_id  on journey_step_id
idx_journey_step_objectives_composite  on (journey_step_id, 
objective_id)
Constraints:
Unique constraint on (journey_step_id, objective_id)
user_journey_progress

---
Tracks user progress through journey steps and objectives.
Attributes:
user_id  (UUID, NOT NULL, FOREIGN KEY REFERENCES users(id) ON DELETE CASCADE): User
identifier
journey_step_id  (UUID, NOT NULL, FOREIGN KEY REFERENCES journey_steps(id) ON
DELETE CASCADE): Journey step identifier
objective_id  (VARCHAR(50), NOT NULL): Objective identifier
completed  (BOOLEAN, NOT NULL, DEFAULT FALSE): Whether objective is completed
completed_at  (TIMESTAMP): When objective was completed
created_at  (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP): Record creation
timestamp
updated_at  (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP): Record last update
timestamp
Indexes:
idx_user_journey_progress_user_id  on user_id
idx_user_journey_progress_step_id  on journey_step_id
idx_user_journey_progress_composite  on (user_id, journey_step_id, 
objective_id)
Constraints:
Primary key on (user_id, journey_step_id, objective_id)
courses
Stores course definitions.
Attributes:
id  (UUID, PRIMARY KEY): Unique course identifier
title  (VARCHAR(255), NOT NULL): Course title
description  (TEXT): Course description
level  (VARCHAR(100)): Course level (e.g., 'New Believer Level', 'Sharer Level')
icon_name  (VARCHAR(100)): Icon identifier for UI
icon_bg_color  (VARCHAR(50)): Background color for icon
course_type  (VARCHAR(50), DEFAULT 'normal'): Course type (normal, html)
created_at  (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP): Record creation
timestamp

---
updated_at  (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP): Record last update
timestamp
Indexes:
idx_courses_level  on level
course_units
Stores course units (groupings of lessons).
Attributes:
id  (UUID, PRIMARY KEY): Unique unit identifier
course_id  (UUID, NOT NULL, FOREIGN KEY REFERENCES courses(id) ON DELETE CASCADE):
Parent course
title  (VARCHAR(255), NOT NULL): Unit title
order  (INTEGER, NOT NULL): Display order within course
created_at  (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP): Record creation
timestamp
updated_at  (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP): Record last update
timestamp
Indexes:
idx_course_units_course_id  on course_id
idx_course_units_order  on (course_id, order)
course_lessons
Stores lesson definitions.
Attributes:
id  (UUID, PRIMARY KEY): Unique lesson identifier
course_id  (UUID, NOT NULL, FOREIGN KEY REFERENCES courses(id) ON DELETE CASCADE):
Parent course
unit_id  (UUID, FOREIGN KEY REFERENCES course_units(id) ON DELETE CASCADE): Parent
unit (nullable for courses without units)
title  (VARCHAR(255), NOT NULL): Lesson title
description  (TEXT): Lesson description
type  (VARCHAR(50), NOT NULL): Lesson type (video, document, html)
video_url  (TEXT): URL to video (if type is video)

---
document_path  (TEXT): Path to document (if type is document)
html_content  (TEXT): HTML content (if type is html or document)
component  (VARCHAR(100)): Custom React component name (if type is html)
order  (INTEGER, NOT NULL): Display order within course/unit
created_at  (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP): Record creation
timestamp
updated_at  (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP): Record last update
timestamp
Indexes:
idx_course_lessons_course_id  on course_id
idx_course_lessons_unit_id  on unit_id
idx_course_lessons_order  on (course_id, order)
Constraints:
type  must be one of: 'video', 'document', 'html'
user_course_progress
Tracks user progress through courses and lessons.
Attributes:
user_id  (UUID, NOT NULL, FOREIGN KEY REFERENCES users(id) ON DELETE CASCADE): User
identifier
course_id  (UUID, NOT NULL, FOREIGN KEY REFERENCES courses(id) ON DELETE CASCADE):
Course identifier
lesson_id  (UUID, NOT NULL, FOREIGN KEY REFERENCES course_lessons(id) ON DELETE
CASCADE): Lesson identifier
completed  (BOOLEAN, NOT NULL, DEFAULT FALSE): Whether lesson is completed
completed_at  (TIMESTAMP): When lesson was completed
created_at  (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP): Record creation
timestamp
updated_at  (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP): Record last update
timestamp
Indexes:
idx_user_course_progress_user_id  on user_id
idx_user_course_progress_course_id  on course_id

---
idx_user_course_progress_lesson_id  on lesson_id
idx_user_course_progress_composite  on (user_id, course_id, lesson_id)
Constraints:
Primary key on (user_id, course_id, lesson_id)
user_quiz_scores
Stores quiz scores for users.
Attributes:
id  (UUID, PRIMARY KEY): Unique score identifier
user_id  (UUID, NOT NULL, FOREIGN KEY REFERENCES users(id) ON DELETE CASCADE): User
identifier
course_id  (UUID, FOREIGN KEY REFERENCES courses(id) ON DELETE CASCADE): Course
identifier (nullable if quiz is for lesson)
lesson_id  (UUID, FOREIGN KEY REFERENCES course_lessons(id) ON DELETE CASCADE):
Lesson identifier (nullable if quiz is for course)
score  (INTEGER, NOT NULL): Score achieved
total  (INTEGER, NOT NULL): Total possible score
taken_at  (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP): When quiz was taken
created_at  (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP): Record creation
timestamp
Indexes:
idx_user_quiz_scores_user_id  on user_id
idx_user_quiz_scores_course_id  on course_id
idx_user_quiz_scores_lesson_id  on lesson_id
Constraints:
Either course_id  or lesson_id  must be provided (not both null)
Network Management
network_requests
Stores requests to join a user's network.
Attributes:

---
id  (UUID, PRIMARY KEY): Unique request identifier
requesting_user_id  (UUID, NOT NULL, FOREIGN KEY REFERENCES users(id) ON DELETE
CASCADE): User requesting to join
requesting_upline_id  (UUID, NOT NULL, FOREIGN KEY REFERENCES users(id) ON DELETE
CASCADE): User they want to join under
status  (VARCHAR(50), NOT NULL, DEFAULT 'pending'): Request status (pending, approved,
denied)
created_at  (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP): Request creation
timestamp
updated_at  (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP): Request last update
timestamp
Indexes:
idx_network_requests_requesting_user_id  on requesting_user_id
idx_network_requests_requesting_upline_id  on requesting_upline_id
idx_network_requests_status  on status
Constraints:
status  must be one of: 'pending', 'approved', 'denied'
Unique constraint on (requesting_user_id, requesting_upline_id)  where status is
'pending'
user_notes
Stores notes that uplines can add about their downline.
Attributes:
id  (UUID, PRIMARY KEY): Unique note identifier
user_id  (UUID, NOT NULL, FOREIGN KEY REFERENCES users(id) ON DELETE CASCADE): User
the note is about
upline_id  (UUID, NOT NULL, FOREIGN KEY REFERENCES users(id) ON DELETE CASCADE):
User who created the note
content  (TEXT, NOT NULL): Note content
created_at  (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP): Note creation
timestamp
updated_at  (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP): Note last update
timestamp
Indexes:

---
idx_user_notes_user_id  on user_id
idx_user_notes_upline_id  on upline_id
Event Management
crusade_events
Stores event/crusade information.
Attributes:
id  (UUID, PRIMARY KEY): Unique event identifier
name  (VARCHAR(255), NOT NULL): Event name
description  (TEXT): Event description
start_date  (TIMESTAMP, NOT NULL): Event start date and time
end_date  (TIMESTAMP, NOT NULL): Event end date and time
location  (VARCHAR(255)): Event location description
max_capacity  (INTEGER): Maximum attendance capacity
current_attendance  (INTEGER, DEFAULT 0): Current number of attendees
status  (VARCHAR(50), NOT NULL, DEFAULT 'upcoming'): Event status (upcoming, ongoing,
completed, cancelled)
organizer_id  (UUID, NOT NULL, FOREIGN KEY REFERENCES users(id)): Event organizer user
ID
organizer_name  (VARCHAR(255)): Organizer name (denormalized for performance)
decisions  (INTEGER, DEFAULT 0): Total decisions recorded
onboarded  (INTEGER, DEFAULT 0): Total new believers onboarded
connected  (INTEGER, DEFAULT 0): Total new believers connected to mentors
attendance  (INTEGER, DEFAULT 0): Total attendance
unregistered_decisions  (INTEGER, DEFAULT 0): Decisions not yet registered
notes  (TEXT): Event notes
course_completions  (INTEGER, DEFAULT 0): Course completions from event
created_at  (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP): Event creation
timestamp
updated_at  (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP): Event last update
timestamp
Indexes:
idx_crusade_events_organizer_id  on organizer_id
idx_crusade_events_status  on status

---
idx_crusade_events_start_date  on start_date
Constraints:
status  must be one of: 'upcoming', 'ongoing', 'completed', 'cancelled'
end_date  must be after start_date
event_volunteers
Stores volunteer assignments for events.
Attributes:
id  (UUID, PRIMARY KEY): Unique volunteer assignment identifier
event_id  (UUID, NOT NULL, FOREIGN KEY REFERENCES crusade_events(id) ON DELETE
CASCADE): Event identifier
user_id  (UUID, NOT NULL, FOREIGN KEY REFERENCES users(id) ON DELETE CASCADE):
Volunteer user identifier
role  (VARCHAR(100), NOT NULL, DEFAULT 'Volunteer'): Volunteer role
onboarding_expertise  (BOOLEAN, DEFAULT FALSE): Expertise onboarding completed
onboarding_training  (BOOLEAN, DEFAULT FALSE): Training onboarding completed
onboarding_check  (BOOLEAN, DEFAULT FALSE): Final check completed
expertise  (TEXT[]): Array of expertise areas
sessions  (TEXT[]): Array of session assignments
training_quiz_score  (INTEGER): Training quiz score
training_completed_at  (TIMESTAMP): When training was completed
created_at  (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP): Assignment creation
timestamp
updated_at  (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP): Assignment last
update timestamp
Indexes:
idx_event_volunteers_event_id  on event_id
idx_event_volunteers_user_id  on user_id
idx_event_volunteers_composite  on (event_id, user_id)
Constraints:
Unique constraint on (event_id, user_id)
event_partner_churches

---
Stores partner church information for events.
Attributes:
id  (UUID, PRIMARY KEY): Unique church identifier
event_id  (UUID, NOT NULL, FOREIGN KEY REFERENCES crusade_events(id) ON DELETE
CASCADE): Event identifier
user_id  (UUID, FOREIGN KEY REFERENCES users(id) ON DELETE SET NULL): User
representing the church
name  (VARCHAR(255), NOT NULL): Church name
contact  (VARCHAR(255)): Contact person name
email  (VARCHAR(255)): Church email
phone  (VARCHAR(20)): Church phone number
address  (TEXT): Church address
denomination  (VARCHAR(255)): Church denomination
website_url  (TEXT): Church website URL
created_at  (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP): Record creation
timestamp
updated_at  (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP): Record last update
timestamp
Indexes:
idx_event_partner_churches_event_id  on event_id
idx_event_partner_churches_user_id  on user_id
event_new_believers
Stores new believers who attended events.
Attributes:
id  (UUID, PRIMARY KEY): Unique new believer identifier
event_id  (UUID, NOT NULL, FOREIGN KEY REFERENCES crusade_events(id) ON DELETE
CASCADE): Event identifier
user_id  (UUID, FOREIGN KEY REFERENCES users(id) ON DELETE SET NULL): User account if
registered (nullable)
name  (VARCHAR(255), NOT NULL): New believer name
connection_status  (VARCHAR(50), NOT NULL, DEFAULT 'Pending'): Connection status
(Connected, Pending, Failed to Connect)
church  (VARCHAR(255)): Associated church name

---
created_at  (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP): Record creation
timestamp
updated_at  (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP): Record last update
timestamp
Indexes:
idx_event_new_believers_event_id  on event_id
idx_event_new_believers_user_id  on user_id
idx_event_new_believers_connection_status  on connection_status
Constraints:
connection_status  must be one of: 'Connected', 'Pending', 'Failed to Connect'
event_new_believer_course_progress
Tracks course progress for new believers from events.
Attributes:
new_believer_id  (UUID, NOT NULL, FOREIGN KEY REFERENCES event_new_believers(id) ON
DELETE CASCADE): New believer identifier
course_id  (UUID, NOT NULL, FOREIGN KEY REFERENCES courses(id) ON DELETE CASCADE):
Course identifier
lesson_id  (UUID, NOT NULL, FOREIGN KEY REFERENCES course_lessons(id) ON DELETE
CASCADE): Lesson identifier
completed  (BOOLEAN, NOT NULL, DEFAULT FALSE): Whether lesson is completed
completed_at  (TIMESTAMP): When lesson was completed
created_at  (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP): Record creation
timestamp
updated_at  (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP): Record last update
timestamp
Indexes:
idx_event_new_believer_course_progress_new_believer_id  on 
new_believer_id
idx_event_new_believer_course_progress_composite  on (new_believer_id, 
course_id, lesson_id)
Constraints:

---
Primary key on (new_believer_id, course_id, lesson_id)
Neighborhood Evangelism
neighborhood_interactions
Stores door-to-door evangelism interactions.
Attributes:
id  (UUID, PRIMARY KEY): Unique interaction identifier
user_id  (UUID, NOT NULL, FOREIGN KEY REFERENCES users(id) ON DELETE CASCADE): User
who logged the interaction
name  (VARCHAR(255)): Name of person contacted
address  (TEXT, NOT NULL): Street address
location_latitude  (DECIMAL(10, 8)): Geographic latitude
location_longitude  (DECIMAL(11, 8)): Geographic longitude
contact_email  (VARCHAR(255)): Contact email
contact_phone  (VARCHAR(20)): Contact phone
log_knocked  (VARCHAR(10)): Whether door was knocked (Yes/No)
log_answered  (VARCHAR(10)): Whether door was answered (Yes/No)
log_prayed  (VARCHAR(10)): Whether prayer was offered (Yes/No)
log_gospel  (VARCHAR(10)): Whether gospel was shared (Yes/No)
log_followup  (VARCHAR(10)): Whether follow-up is needed (Yes/No)
decision  (VARCHAR(50)): Decision made (Received Jesus, Already Christian, Not Ready, null)
created_at  (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP): Interaction creation
timestamp
updated_at  (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP): Interaction last
update timestamp
Indexes:
idx_neighborhood_interactions_user_id  on user_id
idx_neighborhood_interactions_decision  on decision
idx_neighborhood_interactions_location  on (location_latitude, 
location_longitude)
Constraints:
decision  must be one of: 'Received Jesus', 'Already Christian', 'Not Ready', or NULL

---
neighborhood_interaction_notes
Stores notes for neighborhood interactions.
Attributes:
id  (UUID, PRIMARY KEY): Unique note identifier
interaction_id  (UUID, NOT NULL, FOREIGN KEY REFERENCES
neighborhood_interactions(id) ON DELETE CASCADE): Interaction identifier
content  (TEXT, NOT NULL): Note content
created_at  (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP): Note creation
timestamp
Indexes:
idx_neighborhood_interaction_notes_interaction_id  on interaction_id
neighborhood_interaction_statuses
Stores status tags for interactions.
Attributes:
interaction_id  (UUID, NOT NULL, FOREIGN KEY REFERENCES
neighborhood_interactions(id) ON DELETE CASCADE): Interaction identifier
status  (VARCHAR(50), NOT NULL): Status tag (INTERESTED, PRAYED, SHARED_GOSPEL,
DISCIPLING, etc.)
created_at  (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP): Status creation
timestamp
Indexes:
idx_neighborhood_interaction_statuses_interaction_id  on interaction_id
idx_neighborhood_interaction_statuses_status  on status
idx_neighborhood_interaction_statuses_composite  on (interaction_id, 
status)
Constraints:
Primary key on (interaction_id, status)
Messaging System
conversations

---
Stores conversation metadata.
Attributes:
id  (UUID, PRIMARY KEY): Unique conversation identifier (generated from sorted participant IDs)
participants  (UUID[], NOT NULL): Array of user IDs in the conversation
last_message  (TEXT): Preview of last message
last_updated  (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP): Last message
timestamp
created_at  (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP): Conversation creation
timestamp
updated_at  (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP): Conversation last
update timestamp
Indexes:
idx_conversations_participants  on participants  (GIN index for array queries)
idx_conversations_last_updated  on last_updated
Constraints:
participants  array must contain exactly 2 user IDs
conversation_messages
Stores individual messages within conversations.
Attributes:
id  (UUID, PRIMARY KEY): Unique message identifier
conversation_id  (UUID, NOT NULL, FOREIGN KEY REFERENCES conversations(id) ON
DELETE CASCADE): Conversation identifier
sender_id  (UUID, NOT NULL, FOREIGN KEY REFERENCES users(id) ON DELETE CASCADE):
Message sender user ID
text  (TEXT, NOT NULL): Message content
timestamp  (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP): Message timestamp
created_at  (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP): Record creation
timestamp
Indexes:
idx_conversation_messages_conversation_id  on conversation_id
idx_conversation_messages_sender_id  on sender_id

---
idx_conversation_messages_timestamp  on (conversation_id, timestamp)
conversation_unread_counts
Stores unread message counts per user per conversation.
Attributes:
conversation_id  (UUID, NOT NULL, FOREIGN KEY REFERENCES conversations(id) ON
DELETE CASCADE): Conversation identifier
user_id  (UUID, NOT NULL, FOREIGN KEY REFERENCES users(id) ON DELETE CASCADE): User
identifier
unread_count  (INTEGER, NOT NULL, DEFAULT 0): Number of unread messages
updated_at  (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP): Last update
timestamp
Indexes:
idx_conversation_unread_counts_conversation_id  on conversation_id
idx_conversation_unread_counts_user_id  on user_id
idx_conversation_unread_counts_composite  on (conversation_id, user_id)
Constraints:
Primary key on (conversation_id, user_id)
Statistics & Analytics
daily_stats
Stores daily aggregated statistics.
Attributes:
date  (DATE, PRIMARY KEY): Date in YYYY-MM-DD format
total_gospel_shares  (INTEGER, DEFAULT 0): Total gospel shares for the day
total_decisions  (INTEGER, DEFAULT 0): Total decisions for the day
total_disciples  (INTEGER, DEFAULT 0): Total disciples added for the day
new_users  (INTEGER, DEFAULT 0): New user registrations
active_users  (INTEGER, DEFAULT 0): Active users for the day
neighborhoods_visited  (INTEGER, DEFAULT 0): Neighborhood interactions logged
events_held  (INTEGER, DEFAULT 0): Events held on this day

---
created_at  (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP): Record creation
timestamp
updated_at  (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP): Record last update
timestamp
Indexes:
idx_daily_stats_date  on date
location_stats
Stores location-based aggregated statistics.
Attributes:
id  (UUID, PRIMARY KEY): Unique location stat identifier
country  (VARCHAR(2), NOT NULL): ISO country code
state  (VARCHAR(10)): State/province code
town_suburb  (VARCHAR(255)): Town or suburb name
metro  (VARCHAR(255)): Metropolitan area name
total_gospel_shares  (INTEGER, DEFAULT 0): Total gospel shares for this location
total_decisions  (INTEGER, DEFAULT 0): Total decisions for this location
total_disciples  (INTEGER, DEFAULT 0): Total disciples for this location
total_users  (INTEGER, DEFAULT 0): Total users in this location
updated_at  (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP): Last update
timestamp
Indexes:
idx_location_stats_country  on country
idx_location_stats_state  on state
idx_location_stats_composite  on (country, state, town_suburb, metro)
Constraints:
Unique constraint on (country, state, town_suburb, metro)
Language Management
languages
Stores supported languages.

---
Attributes:
id  (UUID, PRIMARY KEY): Unique language identifier
code  (VARCHAR(10), NOT NULL, UNIQUE): Language code (ISO 639-1 or custom)
name  (VARCHAR(255), NOT NULL): Language name
flag  (VARCHAR(10)): Flag emoji or identifier
created_at  (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP): Record creation
timestamp
updated_at  (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP): Record last update
timestamp
Indexes:
idx_languages_code  on code
SMS & WhatsApp Integration
incoming_messages
Stores incoming SMS and WhatsApp messages.
Attributes:
id  (UUID, PRIMARY KEY): Unique message identifier
from  (VARCHAR(255), NOT NULL): Sender phone number (may include 'whatsapp:' prefix)
to  (VARCHAR(255), NOT NULL): Recipient phone number (Twilio number)
body  (TEXT, NOT NULL): Message content
message_sid  (VARCHAR(255), UNIQUE): Twilio message SID
is_whatsapp  (BOOLEAN, NOT NULL, DEFAULT FALSE): Whether message is from WhatsApp
received_at  (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP): When message was
received
created_at  (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP): Record creation
timestamp
Indexes:
idx_incoming_messages_from  on from
idx_incoming_messages_received_at  on received_at
idx_incoming_messages_message_sid  on message_sid
Activity Logging

---
evangelism_activities
Stores logged evangelism activities.
Attributes:
id  (UUID, PRIMARY KEY): Unique activity identifier
user_id  (UUID, NOT NULL, FOREIGN KEY REFERENCES users(id) ON DELETE CASCADE): User
who logged the activity
activity_type  (VARCHAR(50), NOT NULL): Type of activity (gospel_share, decision,
disciple_added)
count  (INTEGER, NOT NULL, DEFAULT 1): Number of activities
tool_used  (VARCHAR(50)): Tool used (two_hearts, romans_road, three_circles)
notes  (TEXT): Additional notes
created_at  (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP): Activity timestamp
Indexes:
idx_evangelism_activities_user_id  on user_id
idx_evangelism_activities_activity_type  on activity_type
idx_evangelism_activities_created_at  on created_at
Constraints:
activity_type  must be one of: 'gospel_share', 'decision', 'disciple_added'
prayer_requests
Stores prayer requests from evangelism activities.
Attributes:
id  (UUID, PRIMARY KEY): Unique prayer request identifier
user_id  (UUID, NOT NULL, FOREIGN KEY REFERENCES users(id) ON DELETE CASCADE): User
who created the request
activity_id  (UUID, FOREIGN KEY REFERENCES evangelism_activities(id) ON DELETE SET
NULL): Associated activity (nullable)
request  (TEXT, NOT NULL): Prayer request content
created_at  (TIMESTAMP, NOT NULL, DEFAULT CURRENT_TIMESTAMP): Request creation
timestamp
Indexes:
idx_prayer_requests_user_id  on user_id

---
idx_prayer_requests_activity_id  on activity_id
Relationships Summary
User Relationships
users.upline_id → users.id (Self-referential: mentor relationship)
user_upline_path maintains full hierarchical path
network_requests manages join requests between users
Journey & Course Relationships
journey_step_objectives → journey_steps (Many-to-One)
user_journey_progress → users and journey_steps (Many-to-Many)
course_units → courses (Many-to-One)
course_lessons → courses and course_units (Many-to-One)
user_course_progress → users, courses, and course_lessons (Many-to-Many)
user_quiz_scores → users, courses, and course_lessons
Event Relationships
crusade_events → users (organizer)
event_volunteers → crusade_events and users (Many-to-Many)
event_partner_churches → crusade_events and users
event_new_believers → crusade_events and users
event_new_believer_course_progress → event_new_believers, courses, and course_lessons
Neighborhood Relationships
neighborhood_interactions → users
neighborhood_interaction_notes → neighborhood_interactions (One-to-Many)
neighborhood_interaction_statuses → neighborhood_interactions (Many-to-Many)
Messaging Relationships
conversations contains array of users.id (participants)
conversation_messages → conversations and users (sender)
conversation_unread_counts → conversations and users (Many-to-Many)

---
Activity Relationships
evangelism_activities → users
prayer_requests → users and evangelism_activities
Indexes Summary
All foreign keys are indexed for performance. Additional indexes are created for:
Frequently queried fields (email, status, dates)
Composite queries (user + course + lesson)
Array fields (participants in conversations)
Geographic queries (latitude/longitude)
Full-text search fields (where applicable)
Constraints Summary
Unique Constraints: Email, conversation participants, composite keys for progress tracking
Check Constraints: Enum values for status fields, date validations
Foreign Key Constraints: All relationships with appropriate CASCADE/SET NULL behaviors
NOT NULL Constraints: Required fields for data integrity
Triggers & Functions
Automatic Timestamps
updated_at  fields should be automatically updated on row modification using triggers
Calculated Fields
user_stats.network_size , trainers_count , and deepest_gen  should be calculated
via triggers or application logic when network changes occur
Statistics Aggregation
daily_stats  and location_stats  should be updated via triggers or scheduled jobs when
underlying data changes

---
Migration Notes
When migrating from Firestore:
1. Generate UUIDs for all records
2. Flatten nested objects (location, contact, log) into separate columns
3. Convert Firestore Timestamps to PostgreSQL TIMESTAMP
4. Convert arrays to PostgreSQL arrays or junction tables as appropriate
5. Create upline_path entries from Firestore uplinePath arrays
6. Generate conversation IDs from sorted participant arrays
7. Migrate subcollections (volunteers, churches, attendees) to separate tables with foreign keys
