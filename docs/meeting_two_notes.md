Required Changes to Requirements
Discipleship Journey
- Add ability to both mark AND unmark objectives as completed
- Remove "gospel shares and decision targets" from level requirements (not part of requirements)
- Add requirement for users to see their current objective/sub-objective on the dashboard
Network Management
- Add specification that users can view downline network up to the fourth generation
- Add requirement for users to be able to message people outside their tree (for neighborhood mode)
- Clarify that any user can view all events (not just ones they're volunteering for)
- Add that churches should be able to view all events (not just partnering ones)
Event Management
- Add requirement to capture event date with start/stop times
- Add support for three phases of events: setup (bump-in), event days, and tear down (bump-out)
- Add ability to create sessions within events (morning, afternoon, evening)
- Add functionality to assign volunteers to specific sessions based on expertise
- Add ability for volunteers to indicate which sessions they're available for
- Add requirement for organizers to view volunteer needs per session
- Add ability for churches to track new believers' journey through the New Believers course
- Add ability for new believers to see churches in their location based on event participation
Neighborhood Mode
- Add ability to drop a PIN on map through touch interaction
- Add address autocomplete functionality when filling out addresses
- Add ability to search interactions (e.g., search by name)
- Add ability to filter interactions by status
Messaging System
- Add ability to see if messages were delivered
- Add ability to see when messages were read
- Add ability to attach files/photos to messages
- Add ability to delete messages/conversations
Dashboard and Analytics
- Add ability to change time period for harvest tracker
- Add ability to make dates and times clickable in harvest tracker
- Add ability to select/deselect specific metrics (shares, decisions, disciples, sharers, trainers)
- Add global heat map for geographical analytics
- Clarify that any user who participated in an event should be able to view past data about the event
- Add time-centric and geographically-centric analytics for personal, network, and movement levels
Language and Localization
- Add synchronization between default display language and eCourse language
- Add toggle to view course content in default language if desired
Notifications
- Add in-app, SMS, and email notifications for onboarding
- Add reminders for course completions after period of inactivity
- Add reminders for discipleship journey progress after 30 days of inactivity
- Add ability to send new believers an SMS with pre-filled data for easier onboarding
Quick recap
The team discussed various technical issues including vehicle concerns and reviewed the Saved World App Requirements document, focusing on database changes and UI/UX improvements. They explored system functionalities related to user levels, courses, and network management features, while also discussing the development of an event management and volunteer coordination system. The team reviewed admin features and functionality, confirmed requirements for a network management application, and scheduled the next meeting for the following Tuesday.
Next steps
- Mushood: Begin adapting the application to the new relational database model and fix UI bugs, aiming to complete within 1-1.5 weeks.
- Mushood: Fix the UI bug where "Shepard" is spelled with a lowercase 'S' on the front page.
- Mushood: Add requirements for address autocomplete and ability to drop a PIN on the map for neighborhood interactions, and ensure geocoding functionality is working.
- Mushood: Update the requirements/use cases based on the detailed discussion in the meeting, especially for event management, volunteer/session management, and neighborhood mode.
- Mushood: Share Shane's and Desmond's phone numbers (for testing SMS/WhatsApp functionality) with Desmond, who will forward them to Shane for testing.
- Shane: Test SMS/WhatsApp functionality using provided numbers after the meeting.
- Mushood: Add/track new requirements for in-app, SMS, and email notifications for onboarding, course completion reminders, and discipleship journey progress reminders.
- Mushood: Share the new base structure of the Next.js application and continue designing the database.
- Shane: Share the meeting transcript/notes (from both this and the previous meeting) with Mushood and Desmond, and upload to Trello.
- Desmond: Set up a "My Message" chat in Trello for team-wide communications.
- Desmond: Send both his and Mushood's email addresses to Shane for scheduling and sharing meeting notes.
- Shane: Add Desmond and Mushood to the recurring meeting invite/calendar for future meetings.
- All: Move regular weekly meeting to Tuesday at the same time.
- Mushood: Redo the use case list based on the updated requirements discussed in the meeting.
- Mushood: Ensure that the default language selection in the app propagates to the eCourse content, with a toggle to view in default language if desired.
- Mushood: Review and clarify the "process SMS WhatsApp commands (start, stop, help)" requirement and update as needed.
- Mushood: Update the requirements to include the global heat map and geographical/time-centric analytics as discussed.
- Mushood: Update admin and user analytics requirements to reflect ability to view event analytics and location-based statistics for users who participated in events.
Summary
Vehicle Mirror and Charger Issues
Shane discussed issues with a vehicle's rear vision mirror and license, expressing concerns about driving with a defective mirror and the potential loss of a license. He also mentioned a shortage of chargers and wrote something down, though the details were unclear. Shane inquired about the location of a remote for an Econ Aid, indicating a need to turn it on.
Global Christianity Trends Discussion
Desmond and Shane discussed their weekend activities and personal lives, including Desmond's work and church involvement in Cape Town. Shane shared insights on the global resurgence of Christianity, particularly noting increases in church attendance and spiritual interest in the UK, US, and Australia. They also touched on the rebranding of Shane's organization to "Jesus Lovers globally" and its mission to help churches and facilitate evangelism training.
Saved World App Requirements Review
The team discussed the Saved World App Requirements document, focusing on database changes and UI/UX improvements. Mushood emphasized the need to finalize the database by removing NoSQL elements and adapting the codebase to a relational model, which he estimated would take about a week and a half. They reviewed user workflows for the discipleship journey and e-course features, confirming requirements such as viewing journey progress, marking objectives as completed, and seeing required objectives for level progression. Shane and Mushood agreed to take notes separately during the review to ensure accuracy and easy access for the team.
System Functionality and UI Review
The team reviewed system functionality related to user levels, courses, and network management features. Shane confirmed that users can view level requirements, course content, and network trees, while Mushood noted that the UI needs significant rework. They identified an issue with Shepard having a lowercase S in the documentation and agreed to make two edits to the front page before fixing the database. The team also discussed testing SMS notifications through Twilio, with Mushood requesting Shane to test with his Australian number.
Application Systems and Functionality Review
Shane and Mushood discussed the objectives and functionalities of various systems within their application, including network management, eCourse, discipleship journey tracking, and evangelism tools. They clarified the purpose of each system, such as tracking progress, authenticating authority, and onboarding new believers. Shane highlighted the need for expandability and orientation features, as well as the ability to share tools and log activities. They also discussed the automatic calculation of decisions based on gospel shares and the need for clear event management functionalities. Mushood emphasized the importance of thoroughly testing the application before further development to address potential bugs.
Event Management System Development Review
Shane and Mushood discussed the development of an event management and volunteer coordination system. They reviewed various features including event statistics, volunteer management, church partnerships, and new believer tracking. Shane outlined specific requirements for the system, such as the ability to assign volunteers to sessions based on their expertise and availability. They also discussed the need to track new believers' progress through a New Believers course. The system needs to be able to capture different phases of events, including setup, the event itself, and teardown. Shane emphasized that while most features are nearly complete, some areas, particularly volunteer session management and new believer tracking, require further development.
User Role Management System Discussion
Shane and Mushood discussed the need to improve the application's user role management system. Mushood proposed associating user roles with user data to automatically adapt the application interface based on the user's role, but Shane preferred maintaining flexibility, allowing users to explore different features regardless of their role. They agreed on the importance of certain features, such as the ability to log door-to-door evangelism interactions, record details, and view neighborhood statistics, while Mushood noted that some functionalities like geocoding and autocomplete were not yet working.
Messaging System and Analytics Review
Shane and Mushood discussed the functionality of a messaging system and analytics dashboard. They reviewed basic messaging features like marking messages as read, viewing conversation history, and sending attachments. They also covered analytics capabilities, including personalized dashboards, harvest trackers, and event statistics. Mushood suggested a new approach for handling language preferences in the application, proposing to control language through a top-level toggle that would affect both the application interface and course content.
Admin Features and Design System
The team discussed admin features and functionality, confirming that admins can manage users, events, courses, content, languages, and SMS, while super admins can perform all admin functions and access all data. Mushood shared a design system website (ui.shadcn.com) that offers pre-built, responsive, accessible components to speed up development and improve UI consistency across devices. The team plans to use this design system to automate workflow and implement features in their new Next.js application, with Mushood already setting up the basic structure and database design for completion within two weeks.
Dashboard Development and Meeting Schedule
Shane discussed the development of a dashboard with multiple UI widths for different devices, noting that it was designed with evangelism mode in mind and is now ready for testing. The team agreed to move their weekly meetings from Monday to Tuesday at 6:30. They reviewed the system's capabilities, including sending SMS and WhatsApp messages, storing user data, and tracking various statistics. Shane outlined several use cases for the system, including authentication, onboarding, profile management, and course completion tracking.
Network Management App Requirements Review
The team reviewed and confirmed requirements for a network management application, including features for network visualization, user management, and evangelism tools. They discussed the implementation of various actions such as viewing network statistics, sending invitations, and managing messages. Shane agreed to share the meeting transcript and notes with Mushood and Desmond, who will provide their email addresses to be added to future meetings. The team scheduled the next meeting for the following Tuesday at the same time.