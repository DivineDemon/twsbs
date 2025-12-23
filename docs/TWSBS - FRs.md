# Converted content from TWSBS - FRs.pdf

Functional Requirements
Authentication & User Management
User is able to register a new account with email and password
User is able to login with email and password
User is able to logout from their account
User is able to view their profile information
User is able to update their profile information including name, phone, date of birth, and location
User is able to upload and update their profile picture
User is able to set their preferred contact methods (email, SMS, WhatsApp)
User is able to view their account creation date
User is able to delete their account (if permitted by role)
Admin is able to view all users in the system
Admin is able to search for users by name, email, or phone
Admin is able to view detailed user information
Admin is able to update user roles (User, Admin, Super Admin)
Admin is able to update user levels (New Believer, Sharer, Trainer, Ambassador, Overseer,
Shepherd)
Admin is able to delete user accounts
Super Admin is able to perform all admin functions with additional privileges
User Modes & Roles
User is able to select their primary mode (Movement, New Believer, Evangelist, Neighborhoods,
Crusade)
User is able to switch between different modes
User is able to set a default mode that persists across sessions
User in Crusade mode is able to select a sub-mode (Organizer, Volunteer, Church, New Believer
Event)
User is able to view their current mode and sub-mode
User is able to change their mode and sub-mode in settings
System is able to persist user mode selection in local storage
System is able to display different navigation items based on user mode
Discipleship Journey System

---
User is able to view their discipleship journey progress
User is able to see all journey steps with their current status (locked, current, completed)
User is able to view objectives for each journey step
User is able to mark objectives as completed
User is able to see which objectives are required for level progression
User is able to view their current level (New Believer, Sharer, Trainer, Ambassador, Overseer,
Shepherd)
User is able to see progress toward the next level
User is able to view level requirements (gospel shares and decisions targets)
System is able to automatically update user level when requirements are met
System is able to track journey progress per user
System is able to display journey steps with visual indicators (outlined, colored, locked)
User is able to see achievement status for each level (both, partial, none)
E-Course System
User is able to view available courses
User is able to see course descriptions and requirements
User is able to start a course
User is able to view course content organized by units
User is able to navigate between lessons within a course
User is able to view lesson content (HTML, video, or document)
User is able to mark lessons as complete
User is able to see their progress through a course
User is able to take quizzes within lessons
User is able to view quiz results and scores
User is able to retake quizzes
User is able to see which lessons they have completed
User is able to resume a course from where they left off
User is able to view course recommendations based on their level
System is able to track course progress per user
System is able to store quiz scores per lesson
System is able to display course completion status
Admin is able to manage course content
Admin is able to add, edit, and delete courses
Admin is able to add, edit, and delete lessons within courses
Network Management
User is able to view their network tree visualization

---
User is able to see their upline (mentor) information
User is able to see their downline (disciples) network
User is able to view network statistics (network size, trainers count, deepest generation)
User is able to invite new users to join their network
User is able to send invitations via email, SMS, or WhatsApp
User is able to view pending network join requests
User is able to approve network join requests
User is able to deny network join requests
User is able to view details of users requesting to join
User is able to request to join another user's network
User is able to view their generational pipeline
User is able to see network depth and breadth metrics
System is able to automatically assign upline relationships
System is able to maintain upline path hierarchy
System is able to calculate network statistics in real-time
System is able to prevent circular network relationships
Evangelism Tools
User is able to access evangelism tools (Two Hearts, Romans Road, Three Circles)
User is able to use the Two Hearts gospel presentation tool
User is able to use the Romans Road gospel presentation tool
User is able to use the Three Circles gospel presentation tool
User is able to draw on interactive canvases in evangelism tools
User is able to share evangelism tools via link or image
User is able to log gospel sharing activity
User is able to record decisions made during gospel presentations
User is able to add new disciples after gospel presentations
User is able to record prayer requests
User is able to view evangelism statistics (gospel shares, decisions, disciples)
User is able to view their personal evangelism stats
User is able to view network-wide evangelism stats
User is able to view movement-wide evangelism stats
System is able to track gospel shares per user
System is able to track decisions per user
System is able to automatically calculate decisions as 10% of gospel shares
System is able to update user statistics when activity is logged
Event Management (Crusade Mode)

---
Organizer is able to create new events
Organizer is able to edit event details (name, description, dates, location, capacity)
Organizer is able to delete events
Organizer is able to view all events (upcoming, ongoing, completed)
Organizer is able to close/complete events with final statistics
Organizer is able to view event analytics (attendance, decisions, onboarded, connected)
Organizer is able to manage volunteers for events
Organizer is able to add volunteers to events
Organizer is able to update volunteer information
Organizer is able to remove volunteers from events
Organizer is able to track volunteer onboarding status (expertise, training, check)
Organizer is able to manage partner churches for events
Organizer is able to add partner churches to events
Organizer is able to update church information
Organizer is able to remove churches from events
Organizer is able to manage new believers from events
Organizer is able to register new believers who attended events
Organizer is able to track new believer connection status
Organizer is able to track new believer course progress
Organizer is able to update new believer information
Organizer is able to remove new believers from events
Volunteer is able to view events they are volunteering for
Volunteer is able to update their volunteer profile
Volunteer is able to view their onboarding status
Church is able to view events they are partnering with
Church is able to update their church information
New Believer (Event) is able to view events they attended
New Believer (Event) is able to view their course progress
System is able to track event attendance
System is able to track decisions made at events
System is able to track new believers onboarded from events
System is able to track new believers connected to mentors
System is able to provide event analytics by time period (daily, weekly, monthly, yearly)
Neighborhood Evangelism
User is able to log door-to-door evangelism interactions
User is able to record interaction details (name, address, contact information)
User is able to record interaction log (knocked, answered, prayed, gospel shared, follow-up)
User is able to record decisions made (Received Jesus, Already Christian, Not Ready)
User is able to add notes to interactions

---
User is able to add status tags to interactions (INTERESTED, PRAYED, SHARED_GOSPEL,
DISCIPLING, etc.)
User is able to view all their neighborhood interactions
User is able to view interactions on a map
User is able to filter interactions by status
User is able to search interactions
User is able to update interaction information
User is able to delete interactions
User is able to view neighborhood statistics
System is able to store geographic coordinates for interactions
System is able to display interactions on a map interface
System is able to track neighborhood evangelism metrics
Messaging System
User is able to send messages to users in their network
User is able to send messages to their upline
User is able to send messages to their downline
User is able to send messages to admin users
User is able to view conversation history
User is able to see unread message counts
User is able to mark messages as read
User is able to view list of conversations
User is able to start new conversations
User is able to see when messages were sent
System is able to create conversations between users
System is able to track unread message counts per user
System is able to store message timestamps
System is able to organize messages by conversation
Dashboard & Analytics
User is able to view a personalized dashboard based on their mode and role
User is able to see key metrics on their dashboard
User is able to view their evangelism statistics
User is able to view their network statistics
User is able to view their journey progress
User is able to view their course progress
User is able to view harvest tracker with time-based analytics
User is able to filter harvest tracker by time period (daily, weekly, monthly, yearly)

---
User is able to view mission objectives
User is able to see mission objective completion status
Admin is able to view movement-wide statistics
Admin is able to view user analytics
Admin is able to view location-based statistics
Admin is able to view event analytics
System is able to aggregate statistics across the network
System is able to calculate generational pipeline metrics
System is able to provide real-time dashboard updates
Language & Internationalization
User is able to select their preferred language
User is able to switch languages at any time
User is able to view content in their selected language
System is able to support multiple languages
System is able to store language preferences
Admin is able to manage supported languages
Admin is able to add new languages
Admin is able to remove languages
Admin is able to view all supported languages with flags
Admin Features
Admin is able to access admin panel
Admin is able to manage users (view, edit, delete)
Admin is able to manage events
Admin is able to manage courses and content
Admin is able to manage languages
Admin is able to view SMS inbox
Admin is able to reply to SMS messages
Admin is able to seed database with test data
Admin is able to clear test data
Admin is able to update Firestore security rules
Admin is able to view system analytics
Admin is able to manage other admin accounts
Admin is able to invite new admin users
Super Admin is able to perform all admin functions
Super Admin is able to access all data regardless of network relationships

---
SMS & WhatsApp Integration
System is able to send SMS messages via Twilio
System is able to send WhatsApp messages via Twilio
System is able to receive incoming SMS messages
System is able to receive incoming WhatsApp messages
System is able to process SMS/WhatsApp commands (STOP, START, HELP, etc.)
System is able to store incoming messages
Admin is able to view incoming SMS/WhatsApp messages
Admin is able to reply to SMS/WhatsApp messages
System is able to identify WhatsApp messages vs SMS messages
System is able to handle message subscriptions/unsubscriptions
Email Integration
System is able to send email invitations
System is able to send email notifications
System is able to send test emails
System is able to use customizable email templates
System is able to send HTML formatted emails
Statistics & Reporting
System is able to track daily statistics
System is able to track location-based statistics
System is able to aggregate statistics by time period
System is able to calculate network-wide statistics
System is able to calculate movement-wide statistics
System is able to generate analytics reports
System is able to track gospel shares, decisions, and disciples counts
System is able to track new user registrations
System is able to track active users
System is able to track neighborhoods visited
System is able to track events held
Data Persistence
System is able to persist user profile data
System is able to persist user mode selection

---
System is able to persist journey progress
System is able to persist course progress
System is able to persist quiz scores
System is able to persist network relationships
System is able to persist event data
System is able to persist neighborhood interactions
System is able to persist messages and conversations
System is able to persist statistics
System is able to persist language preferences
Security & Access Control
System is able to authenticate users
System is able to authorize user actions based on roles
System is able to enforce network-based access control
System is able to prevent unauthorized data access
System is able to validate user inputs
System is able to sanitize user data
System is able to protect admin functions
System is able to enforce hierarchical data access (uplines can access downline data)
