# Sentro - User Flows & Functional Requirements

This document describes the functionality and user flows for each application within the Sentro platform, written in the style of Non-Functional Requirements (NFRs) using "User can do xyz" format.

---

## Table of Contents

1. [Citizen Application](#citizen-application)
2. [Dispatch Application](#dispatch-application)
3. [Responder Application](#responder-application)
4. [Monitoring Application](#monitoring-application)
5. [Authentication & Access](#authentication--access)

---

## Citizen Application

### Home Dashboard

**User can view a personalized greeting** with their name displayed prominently at the top of the home screen.

**User can see a welcome section** that displays city branding and messaging about emergency services and community safety.

**User can view real-time flood alert information** including:
- Critical evacuation notices when water levels exceed 2.5m threshold
- Warning alerts when water levels are between 2.0m and 2.5m
- Normal status indicators when water levels are below 2.0m
- Affected barangay names and evacuation center locations
- Emergency contact numbers (911 or 8888) displayed prominently

**User can see weather and flood monitoring status** including:
- Current water level readings
- Weather conditions
- 24-hour rainfall data
- System status indicators (normal/warning/critical)

**User can access quick action buttons** to:
- File a new incident report
- Call emergency services directly

**User can view their recent incident reports** including:
- Incident ID
- Incident title/description
- Location label
- Current status badge (pending, assigned, en route, resolved)
- Time since report was submitted
- Quick link to view detailed status

**User can navigate to the report tracking page** via a persistent "Track report" button in the header.

### Incident Reporting Flow

**User can select an incident type** from a grid of predefined categories:
- Traffic accident
- Medical emergency
- Fire or smoke
- Suspicious activity
- Infrastructure damage
- Other

**User can confirm or edit their location** on an interactive map that:
- Shows their current GPS location
- Displays the location address
- Allows manual editing of the location
- Shows GPS accuracy radius (e.g., 14m radius)

**User can add photos** to their incident report by:
- Tapping a photo capture button
- Selecting multiple photos from their device
- Viewing uploaded photos in a grid layout
- Seeing photo labels/descriptions

**User can provide a detailed description** of the incident in a text area that:
- Accepts free-form text input
- Includes placeholder text suggesting what to include
- Allows editing before submission

**User can submit their report** which:
- Creates a new incident record
- Generates a unique incident ID
- Redirects to the tracking page with pending status
- Stores the report for future reference

### Incident Tracking

**User can view the current status of their incident** through a timeline stepper showing:
- Report received (pending)
- Responder assigned (assigned)
- Responder en route (en route)
- Resolved (resolved)

**User can see a visual map representation** that:
- Shows the incident location marker
- Displays the responder's route when assigned
- Shows the responder's current position when en route
- Updates in real-time as the responder moves
- Displays ETA and distance information

**User can view assigned responder information** when a unit is assigned, including:
- Unit name (e.g., "Unit 14")
- Lead officer name
- Role and specialization
- Current status (en route, on scene)
- Estimated time of arrival (ETA)
- Distance to incident
- Vehicle information
- Contact information

**User can communicate with dispatch** through:
- A floating message panel accessible via action buttons
- Real-time chat interface showing message history
- Ability to send new messages
- Message timestamps and sender identification

**User can view call history** including:
- Past calls made to dispatch
- Call timestamps
- Call details and outcomes
- Quick button to call dispatch again

**User can view activity log** showing:
- System updates and status changes
- Dispatch communications
- Timestamped entries
- Author attribution for each update

**User can access floating action buttons** for quick access to:
- Activity log panel
- Group chat/messages panel
- Call panel

**User can see resolution confirmation** when an incident is resolved, including:
- Thank you message
- Link to provide feedback
- Confirmation that responders have completed their work

### Post-Resolution Feedback

**User can provide feedback** on resolved incidents including:
- Satisfaction ratings
- Comments about the response
- Suggestions for improvement

**User can view confirmation** that their feedback has been submitted.

### Incident Details View

**User can view full incident information** including:
- Complete incident description
- All uploaded photos
- Location details with address
- Status badge showing current state
- Incident ID for reference

---

## Dispatch Application

### Home Dashboard

**User can view today's operational overview** including:
- Active incidents count (real-time)
- Units en route count
- Average ETA across all active incidents

**User can see the pending stack** showing prioritized incident queue with:
- Incident titles and types
- Location labels
- Priority badges (critical, high, medium)
- Time since report was submitted
- Incident IDs
- Quick access to view full incident details

**User can view the city map** displaying:
- Live incident telemetry
- All active incidents as markers
- Real-time updates
- Geographic context for incident locations

**User can monitor unit status board** showing:
- All available units with their current status
- Unit locations
- Status indicators (Available, En route, On scene, Out of service)
- Color-coded status for quick visual reference

**User can use command line interface** for:
- Typing dispatch macros and quick actions
- Executing commands like "/assign Unit 14 to P-2210"
- Viewing last executed command
- Sending commands to the system

**User can access phone console** showing:
- ANI/ALI (Automatic Number Identification/Automatic Location Identification) verification
- Caller phone number and address
- Queue depth (number of callers waiting)
- Answer, Hold, and Transfer controls
- Call management functions

**User can access radio console** displaying:
- Primary talkgroups (Ops 1, Ops 2, EMS, Fire, Transit, Citywide)
- Talkgroup selection buttons
- Patch management controls
- Radio communication interface

**User can receive new incident alerts** via:
- Floating notification card that appears when new incidents are reported
- Prominent visual indicator with incident details
- Quick access button to view the incident
- Dismissible alert that can be closed

**User can navigate to audit logs** via header link to view system activity history.

### Incident Management

**User can toggle between two view modes**:
- Incident details tab (comprehensive information view)
- Live dispatch monitoring tab (real-time tracking view)

**User can enable/disable AI Assist** which provides:
- Triage support and recommendations
- Incident analysis and risk assessment
- Suggested actions and unit assignments
- Visual indicator showing AI Assist status (ON/OFF)

**User can view comprehensive incident details** including:
- Full incident title and description
- Incident type and location label
- Status badge (pending, assigned, en route, on scene, resolved, major)
- Caller information with verification badge (Verified/Unverified)
- Reporter rating display (star rating)
- Callback status and confirmation details
- Reported timestamp
- Full address
- Location accuracy (GPS lock radius)
- Priority classification (Critical, Major, Moderate, Low)
- Injury status (number of possible injuries)
- Traffic impact assessment
- Recent updates timeline with timestamps and authors

**User can view photo gallery** showing:
- All photos captured by caller or nearby units
- Photo labels/descriptions
- Full-screen photo viewer on click
- Multiple photo support
- Photo metadata

**User can view CCTV verification** including:
- Nearby camera feeds
- Camera location labels
- Multiple camera views simultaneously
- Real-time camera footage integration

**User can edit incident information** through the incident editor:
- Update location address
- Modify call type code
- Adjust priority level (Critical, Major, Moderate, Low)
- Edit initial report text
- Save changes

**User can view map of incident location** showing:
- Incident marker
- Nearest landmarks
- Geographic context
- Distance to landmarks

**User can view AI recommendations** when AI Assist is enabled, including:
- Incident summary
- Risk flags identification
- Next actions suggestions
- Suggested roles (Traffic control, EMS triage, Fire support, Tow coordination)
- Auto-selected roles based on incident needs

**User can assign units to incidents** through the response checklist:
- Select category (Police, EMS, Traffic Control)
- View available units filtered by category
- See unit details (name, lead officer, role, ETA, distance)
- Assign multiple units to different categories
- See assignment count badges
- View already assigned units
- See if units are assigned to other categories

**User can view nearby units** showing:
- Filtered list based on selected checklist category
- Unit availability status
- ETA and distance for each unit
- Assignment status indicators
- Unit details (name, lead, role)
- Visual indicators for assigned units

**User can perform dispatch actions** including:
- Send more responders
- Request EMS support
- Request Fire support
- Request Traffic Control
- Request Backup
- Escalate Priority
- Broadcast Alert
- Request Hazmat support
- Close Incident

**User can monitor live dispatch** showing:
- Real-time route tracking for assigned units
- Unit position on map
- Incident status display
- Assigned responder card with details
- Route visualization
- Current route information

**User can communicate with callers** through:
- Caller chat interface
- Message history display
- Ability to send messages
- Real-time messaging

**User can manage calls** using:
- Phone dialpad interface
- Quick contact buttons (Caller, On-scene unit, Traffic control)
- Call history log
- Place call functionality

**User can add incident comments** including:
- View existing comments with timestamps
- Add new comments
- Post comments to incident log
- See author attribution

**User can access floating action buttons** for quick access to:
- Chat panel
- Call panel
- Comments panel

### Analytics Dashboard

**User can select time range** for analytics viewing:
- 24 hours
- 7 days
- 30 days
- 90 days
- Year to date (YTD)

**User can view KPI cards** with sparklines showing:
- Total incidents with trend comparison
- Active incidents (real-time count)
- Units deployed with utilization percentage
- Average response time with trend
- Resolution rate with trend
- Queue depth (pending incidents)

**User can view incident volume chart** displaying:
- Time-series visualization
- Current, peak, and average metrics
- Interactive data points
- Drilldown capability on data points
- Volume trends over selected time period

**User can view status breakdown** showing:
- Distribution by status (Pending, En route, On scene, Resolved)
- Percentage calculations
- Active incidents summary
- Drilldown details (median dwell, operational focus, next escalation)
- Visual progress bars

**User can view incidents by type** including:
- Pie chart visualization
- Type distribution (Traffic Collision, Medical Emergency, Fire, Infrastructure, Other)
- Percentage breakdown
- Drilldown details (top corridor, avg response, peak window)
- Total incident count

**User can view response time performance** showing:
- Target vs actual by priority level (Critical, Major, Moderate, Low)
- Progress bars for SLA compliance
- On target/Over target indicators
- Drilldown details (95th percentile, SLA compliance)
- Visual performance indicators

**User can view fleet overview** displaying:
- Availability by role (Traffic, Medical/EMS, Fire, Hazmat, Support)
- Available vs busy units
- Utilization percentages
- Total fleet summary
- Drilldown details per role

**User can view resource utilization trends** showing:
- Time-series charts per resource type
- Utilization percentage tracking
- Visual indicators (green/amber/red based on utilization)
- Historical trends

**User can view utilization by resource type** displaying:
- Capacity vs demand visualization
- Percentage displays per role
- Visual progress bars
- Current utilization status

**User can view recommendations** including:
- High utilization alerts
- Resource capacity suggestions
- Optimal capacity status messages
- Actionable insights

**User can view recent incidents table** showing:
- Incident ID
- Type
- Location
- Status
- Time since report
- Status badges
- Quick reference

**User can access reports section** with links to:
- Incident report (detailed metrics)
- Responder report (coming soon)
- Area report (coming soon)

**User can drill down into analytics** by clicking on:
- Chart data points
- Status breakdown items
- Incident type segments
- Response time rows
- Fleet status items
- Volume chart points

**User can view drilldown modals** showing:
- Detailed metrics for selected item
- Additional context and insights
- Comparison data
- Close button to return to main view

### Monitoring Dashboard

**User can view live incident monitoring** showing:
- Real-time unit tracking
- Active incident locations
- Unit positions

### Audit Logs

**User can view system activity tracking** including:
- Action history
- User activities
- System events
- Timestamps

---

## Responder Application

### Home Dashboard

**User can toggle availability status** between:
- On duty (available for dispatch)
- Off duty (not available)

**User can receive new assignment alerts** via:
- Floating notification card when new assignments arrive
- Prominent visual indicator with incident details
- Incident title and location
- ETA information
- Quick access buttons to view assignment or dismiss
- Dismissible alert

**User can view today's responses** showing:
- Most recent assignment display
- Incident details (ID, title, location)
- Status badge
- Quick access link to assignment details

**User can see "No active calls" placeholder** when there are no active assignments, with message indicating that new assignments will appear here.

**User can navigate to alert view** via header link.

### Assignment Details

**User can view full assignment information** including:
- Incident title and description
- Location and full address
- Status badge (assigned, en route, on scene)
- Incident ID

**User can view route overview** showing:
- Interactive map with route visualization
- Start and end points
- Route path
- Current position tracking
- ETA and distance display

**User can view photos from reporter** in a grid layout showing:
- All photos submitted with the incident report
- Photo thumbnails
- Full photo viewing capability

**User can start navigation** via button that:
- Opens full-screen navigation view
- Provides turn-by-turn directions
- Shows real-time route tracking

**User can mark en route** via button that:
- Updates status to "en route"
- Notifies dispatch
- Begins tracking

**User can view incident comments** including:
- Comments from dispatch
- System updates
- Timestamped entries
- Ability to add new comments
- Post comments functionality

**User can access group messages** showing:
- Messages from dispatch
- Messages from other units
- Group chat interface
- Message history
- Ability to send messages

**User can make calls** using:
- Quick contact buttons (Caller, Dispatch, Backup unit)
- Phone dialpad interface
- Call history log
- Place call functionality

**User can access floating action bar** for quick access to:
- Comments panel
- Group chat panel
- Call panel

### Navigation

**User can view full-screen map** with:
- Route overlay showing path to incident
- Current position marker
- Destination marker
- Real-time position updates

**User can see turn-by-turn directions** displaying:
- Next turn instruction
- Street names
- Distance to next turn
- Direction icons (arrows, destination marker)
- Large, readable format

**User can view directions list** (collapsible) showing:
- Complete route steps
- Current step highlighting
- Distance for each step
- Street names
- Minimize/maximize controls

**User can see real-time tracking information** including:
- ETA display
- Remaining distance
- Current speed
- Destination name

**User can control navigation** via:
- Mute/unmute audio button
- Toggle between map view and navigation view
- Back navigation button
- Return to assignment view

**User can mark arrival** via "Arrived on scene" button that:
- Updates status to "on scene"
- Redirects to on-scene management page
- Notifies dispatch

### On-Scene Management

**User can view incident information** display showing:
- Incident title and description
- Location details
- Incident ID
- Caller name
- Reported timestamp
- Status badge

**User can use on-site checklist** to track critical steps:
- Pre-defined checklist items (scene safety, injury check, traffic flow, evidence collection, dispatch updates)
- Checkbox tracking for each item
- Custom item addition capability
- Add new checklist items
- Mark items as complete

**User can capture photos** for evidence documentation:
- Photo capture interface
- Multiple photo support
- Photo gallery display
- Evidence documentation

**User can view activity log** panel showing:
- Recent updates with timestamps
- Author attribution
- System updates
- Dispatch communications
- Unit updates

**User can add comments** including:
- Responder observations
- Update documentation
- Add new comments
- View comment history
- Post comments

**User can access messages panel** showing:
- Dispatch coordination messages
- Unit-to-unit communication
- Message history
- Send message functionality

**User can access calls panel** including:
- Quick call buttons (Dispatch, EMS)
- Radio access button
- Call history log
- Place call functionality

**User can complete report** via button that:
- Opens report completion form
- Allows final documentation
- Submits report

**User can access bottom action bar** for quick panel access:
- Activity log button
- Comments button
- Messages button
- Calls button
- Visual indicators for active panels

### Report Completion

**User can complete incident report** including:
- Final documentation form
- Report submission
- Confirmation of completion

### Alert Viewing

**User can view alert details** when alerts are received, showing:
- Alert information
- Alert type and severity
- Relevant details

---

## Monitoring Application

### Flood Monitoring Dashboard

**User can view stats bar** displaying:
- Weather condition
- 24-hour rainfall data
- Active sensors count
- Alert level indicator (normal/warning/critical)
- Color-coded status

**User can view alert banner** (when critical) showing:
- Sensor ID and location
- Water level display
- Rate of change
- Affected barangay count
- Dismissible banner with close button

**User can view sensor list** displaying:
- Individual sensor cards
- Water level readings per sensor
- Status indicators (normal/warning/critical)
- Rate of change per sensor
- Sensor names and locations
- Color-coded status

**User can view monitoring map** showing:
- Zone status visualization
- Sensor markers with status colors
- Barangay boundaries
- Real-time updates
- Geographic context

**User can adjust water level** (demo control) via slider that:
- Allows manual adjustment for demonstration
- Triggers real-time sensor updates
- Shows alert states at different thresholds
- Demonstrates alert system functionality

**User can receive floating alerts** including:
- Warning alerts (when water level > 2.0m but ≤ 2.5m)
- Critical alerts (when water level > 2.5m)
- Affected barangay list with names
- Resident count per barangay
- Send alerts button
- Dismissible alerts

**User can send alerts** via floating alert interface that:
- Opens alert composition page
- Pre-selects affected barangays
- Sets alert type (warning or critical)
- Allows customization before sending

### Alert Composition

**User can select recipients** by:
- Viewing list of all barangays
- Checking/unchecking barangays to include
- Seeing resident count per barangay
- Viewing total residents calculation
- Selecting multiple barangays

**User can preview alert message** showing:
- Auto-generated message based on alert type
- Barangay names included in message
- Evacuation center information
- Contact numbers (911 or 8888)
- Different message templates for warning vs critical
- Formatted message display

**User can select communication channels** including:
- Push notification (Sentro app) - checkbox
- SMS (registered numbers) - checkbox
- Email - checkbox
- Multi-channel support
- Visual channel indicators

**User can send alert** via button that:
- Validates at least one barangay is selected
- Shows total residents count in button
- Sends alert through selected channels
- Redirects to confirmation page
- Stores alert data for confirmation

### Alert Sent Confirmation

**User can view success indicator** showing:
- Large checkmark icon
- Success message
- Confirmation that alerts were sent

**User can view summary card** displaying:
- Total residents notified
- Barangays affected (list of names)
- Channels used (Push, SMS, Email)
- Timestamp of when alert was sent

**User can see confirmation checklist** showing:
- MDRRMO notification confirmed
- Rescue units alerted confirmed
- Evacuation centers activated confirmed
- Visual checkmarks for each confirmation

**User can return to monitoring** via button that:
- Clears sent alert data
- Returns to monitoring dashboard
- Allows sending additional alerts

---

## Authentication & Access

### Login

**User can access login page** that:
- Displays Sentro branding
- Shows "Please sign in to continue" message
- Provides username and password fields
- Includes form validation

**User can enter credentials** including:
- Username field with placeholder
- Password field (masked)
- Required field validation
- Auto-complete support

**User can submit login** which:
- Validates credentials
- Shows loading state during authentication
- Redirects authenticated users to home
- Shows error message for invalid credentials
- Prevents access if already authenticated

**User can be redirected** if already authenticated:
- Automatic redirect to home page
- Prevents showing login page to authenticated users

### Role-Based Access

**User can access role-specific applications** based on their authentication:
- Citizen role: Access to citizen application
- Dispatch role: Access to dispatch application
- Responder role: Access to responder application
- Monitoring role: Access to monitoring application

**User can see role indicator** in application headers showing:
- Current role badge
- Role-specific styling
- Visual identification

---

## Cross-Application Features

### Maps

**User can view interactive maps** across all applications using:
- Leaflet integration
- Incident location markers
- Route visualization with path drawing
- Current position tracking
- Multiple map types (city overview, incident-specific, route navigation, monitoring zones)
- Zoom controls
- Geographic context

### Communication

**User can communicate in real-time** through:
- Messaging interfaces (citizen-to-dispatch, dispatch-to-responder, responder-to-dispatch, multi-unit coordination)
- Call management (phone dialpad, call history, quick contact buttons)
- Activity logs (timestamped entries, author attribution, update tracking)
- Group chat functionality
- Radio console access

### Status Management

**User can see status indicators** throughout applications:
- Status badges (Pending, Assigned, En route, On scene, Resolved, Major)
- Priority indicators (Critical, High, Medium, Low)
- Color-coded status system
- Real-time status updates

### Photo Management

**User can manage photos** including:
- Photo upload and capture
- Photo gallery display
- Full-screen photo viewer
- Photo labeling
- Multiple photo support
- Evidence documentation

### User Interface

**User can use responsive design** that:
- Works on mobile and desktop devices
- Provides floating action bars for quick access
- Uses modal panels for detailed views
- Shows status indicators throughout
- Displays loading states for async operations
- Provides error handling and user feedback
- Includes accessibility features

---

## System Integration Points

### Real-Time Updates

**User can receive real-time updates** for:
- Incident status changes
- Responder positions
- Water level readings
- Sensor status changes
- Unit availability
- Alert triggers

### Data Synchronization

**User can see synchronized data** across:
- Incident information shared between citizen, dispatch, and responder apps
- Status updates propagated in real-time
- Location data shared across applications
- Communication logs synchronized

### Notification System

**User can receive notifications** for:
- New incident assignments (responders)
- New incident reports (dispatch)
- Alert triggers (monitoring)
- Status changes (citizens)
- Critical alerts (all users)

---

*Last updated: Based on comprehensive codebase analysis*
