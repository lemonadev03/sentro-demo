# Sentro - Feature Documentation

A comprehensive incident response demo platform for citizens, dispatchers, responders, and monitoring personnel.

## Table of Contents
- [Citizen Features](#citizen-features)
- [Dispatch Features](#dispatch-features)
- [Responder Features](#responder-features)
- [Monitoring Features](#monitoring-features)
- [Shared Features](#shared-features)
- [Technical Stack](#technical-stack)

---

## Citizen Features

### Home Dashboard
- **Personalized greeting** with user name display
- **Welcome section** with city branding
- **Flood alert system**:
  - Critical evacuation notices with affected barangays
  - Warning alerts for rising water levels
  - Evacuation center locations and contact information
  - Weather and flood monitoring status card
- **Quick actions**:
  - File a report button
  - Emergency services call button
- **My reports** section showing recent incident submissions
- **Report tracking** quick link

### Incident Reporting
- **Guided report flow** with step-by-step process
- **Incident type selection**
- **Location sharing** with GPS accuracy display
- **Photo capture** and upload capability
- **Incident details** form with description field

### Incident Tracking
- **Real-time status updates** with timeline stepper:
  - Report received
  - Responder assigned
  - Responder en route
  - Resolved
- **Interactive map view**:
  - Incident location marker
  - Responder route visualization when assigned
  - Current responder position tracking
  - ETA display
- **Assigned responder information**:
  - Unit name and lead officer
  - Role and specialization
  - ETA and distance
  - Vehicle and contact information
- **Communication features**:
  - Message dispatch (floating chat panel)
  - Call history log
  - Activity log with timestamps
- **Post-incident feedback** form for resolved incidents

### Incident Details
- **Full incident information** display
- **Status badge** with current state
- **Location details** with address
- **Photo gallery** from incident

### Post-Resolution
- **Feedback form** for citizen satisfaction
- **Resolution confirmation** page

---

## Dispatch Features

### Home Dashboard
- **Today's overview**:
  - Active incidents count
  - Units en route count
  - Average ETA display
- **Pending stack** with prioritized incident queue:
  - Incident titles and types
  - Location labels
  - Priority badges (critical, high, medium)
  - Time since report
- **City map** with live incident telemetry
- **Unit status board**:
  - Real-time availability tracking
  - Unit locations
  - Status indicators (Available, En route, On scene, Out of service)
- **Command line** for dispatch macros and quick actions
- **Phone console**:
  - ANI/ALI verification
  - Queue depth monitoring
  - Answer/Hold/Transfer controls
- **Radio console**:
  - Primary talkgroups display
  - Talkgroup selection (Ops 1, Ops 2, EMS, Fire, Transit, Citywide)
  - Patch management
- **New incident alert** floating notification

### Incident Management
- **Dual view tabs**:
  - Incident details tab
  - Live dispatch monitoring tab
- **AI Assist toggle** for triage support and recommendations
- **Incident details**:
  - Full incident information
  - Caller verification badge
  - Reporter rating display
  - Callback status
  - Location accuracy (GPS lock radius)
  - Priority classification
  - Injury and traffic status
  - Recent updates timeline
- **Photo gallery**:
  - Multiple photo support
  - Photo labels
  - Full-screen photo viewer
- **CCTV verification**:
  - Nearby camera feeds
  - Camera location labels
  - Multiple camera views
- **Incident editor**:
  - Location editing
  - Call type code assignment
  - Priority adjustment
  - Initial report editing
- **Map view** with incident location and nearest landmarks
- **AI recommendations**:
  - Incident summary
  - Risk flags identification
  - Next actions suggestions
  - Suggested roles (Traffic control, EMS triage, Fire support, Tow coordination)
- **Response checklist**:
  - Category-based unit assignment (Police, EMS, Traffic Control)
  - Unit selection interface
  - Assignment tracking with counts
  - Multi-unit assignment support
- **Nearby units** display:
  - Filtered by category
  - ETA and distance for each unit
  - Assignment status indicators
  - Unit details (name, lead, role)
- **Dispatch actions**:
  - Send more responders
  - Request EMS
  - Request Fire
  - Request Traffic Control
  - Request Backup
  - Escalate Priority
  - Broadcast Alert
  - Request Hazmat
  - Close Incident
- **Live dispatch monitoring**:
  - Real-time route tracking
  - Unit position on map
  - Incident status display
  - Assigned responder card
- **Communication panels**:
  - Caller chat interface
  - Call management with dialpad
  - Incident comments system
- **Floating action buttons** for quick access to communication tools

### Analytics Dashboard
- **Time range selection** (24h, 7d, 30d, 90d, YTD)
- **KPI cards** with sparklines:
  - Total incidents with trend comparison
  - Active incidents (real-time)
  - Units deployed with utilization percentage
  - Average response time with trend
  - Resolution rate with trend
  - Queue depth
- **Incident volume chart**:
  - Time-series visualization
  - Current, peak, and average metrics
  - Interactive data points with drilldown
- **Status breakdown**:
  - Distribution by status (Pending, En route, On scene, Resolved)
  - Percentage calculations
  - Active incidents summary
  - Drilldown details (median dwell, operational focus, next escalation)
- **Incidents by type**:
  - Pie chart visualization
  - Type distribution (Traffic Collision, Medical Emergency, Fire, Infrastructure, Other)
  - Percentage breakdown
  - Drilldown details (top corridor, avg response, peak window)
- **Response time performance**:
  - Target vs actual by priority level
  - Progress bars for SLA compliance
  - Drilldown details (95th percentile, SLA compliance)
- **Fleet overview**:
  - Availability by role (Traffic, Medical/EMS, Fire, Hazmat, Support)
  - Available vs busy units
  - Utilization percentages
  - Drilldown details
- **Resource utilization trends**:
  - Time-series charts per resource type
  - Utilization percentage tracking
  - Visual indicators (green/amber/red)
- **Utilization by resource type**:
  - Capacity vs demand visualization
  - Percentage displays
- **Recommendations**:
  - High utilization alerts
  - Resource capacity suggestions
  - Optimal capacity status
- **Recent incidents** table:
  - ID, type, location, status, time
  - Status badges
- **Reports section**:
  - Incident report link
  - Placeholder for responder and area reports

### Monitoring Dashboard
- **Live incident monitoring** view
- **Real-time unit tracking**

### Audit Logs
- **System activity tracking**
- **Action history**

---

## Responder Features

### Home Dashboard
- **Availability toggle** (On duty / Off duty)
- **New assignment alert** floating notification
- **Today's responses**:
  - Most recent assignment display
  - Incident details
  - Status badge
  - Quick access to assignment
- **No active calls** placeholder

### Assignment Details
- **Full incident information**:
  - Title and description
  - Location and address
  - Status badge
- **Route overview**:
  - Interactive map with route visualization
  - ETA and distance display
  - Current position tracking
- **Photo gallery** from reporter
- **Action buttons**:
  - Start navigation
  - Mark en route
- **Communication panels**:
  - Incident comments
  - Group messages (Dispatch, Unit 14, Unit 22)
  - Call management with dialpad
- **Floating action bar** for quick access

### Navigation
- **Full-screen map view** with route overlay
- **Turn-by-turn directions**:
  - Next turn display
  - Street names
  - Distance to next turn
  - Direction icons
- **Directions list** (collapsible):
  - Complete route steps
  - Current step highlighting
  - Distance for each step
- **Real-time tracking**:
  - ETA display
  - Remaining distance
  - Current speed
- **Controls**:
  - Mute/unmute audio
  - Toggle map/navigation view
  - Back navigation
- **Arrival button** to mark on scene

### On-Scene Management
- **Incident information** display
- **On-site checklist**:
  - Pre-defined checklist items
  - Custom item addition
  - Checkbox tracking
  - Items include:
    - Scene safety verification
    - Injury check
    - Traffic flow coordination
    - Evidence collection
    - Dispatch updates
- **Photo capture**:
  - Evidence documentation
  - Multiple photo support
- **Activity log** panel:
  - Recent updates
  - Timestamps
  - Author attribution
- **Comments system**:
  - Responder observations
  - Update documentation
  - Add new comments
- **Messages panel**:
  - Dispatch coordination
  - Unit-to-unit communication
  - Message history
- **Calls panel**:
  - Quick call buttons (Dispatch, EMS)
  - Radio access
  - Call history log
- **Complete report** button
- **Bottom action bar** for quick panel access

### Report Completion
- **Incident report form**
- **Final documentation**

### Alert Viewing
- **Alert details** display

---

## Monitoring Features

### Flood Monitoring Dashboard
- **Stats bar**:
  - Weather condition
  - 24h rainfall
  - Active sensors count
  - Alert level indicator (normal/warning/critical)
- **Alert banner** (when critical):
  - Sensor ID and location
  - Water level display
  - Rate of change
  - Affected barangay count
  - Dismissible
- **Sensor list**:
  - Individual sensor cards
  - Water level readings
  - Status indicators (normal/warning/critical)
  - Rate of change per sensor
  - Sensor names and locations
- **Monitoring map**:
  - Zone status visualization
  - Sensor markers with status colors
  - Barangay boundaries
  - Real-time updates
- **Water level slider** (demo control):
  - Adjustable water level
  - Real-time sensor updates
  - Alert triggering
- **Floating alerts**:
  - Warning alerts (water level > 2.0m)
  - Critical alerts (water level > 2.5m)
  - Affected barangay list
  - Resident count
  - Send alerts button
  - Dismissible

### Alert Composition
- **Recipient selection**:
  - Barangay list with checkboxes
  - Resident count per barangay
  - Total residents calculation
- **Alert message preview**:
  - Auto-generated message based on alert type
  - Barangay names included
  - Evacuation center information
  - Contact numbers
  - Different messages for warning vs critical
- **Channel selection**:
  - Push notification (Sentro app)
  - SMS (registered numbers)
  - Email
  - Multi-channel support
- **Send confirmation** with total recipients

### Alert Sent Confirmation
- **Success indicator**
- **Summary card**:
  - Total residents notified
  - Barangays affected
  - Channels used
  - Timestamp
- **Confirmation checklist**:
  - MDRRMO notification
  - Rescue units alerted
  - Evacuation centers activated
- **Return to monitoring** button

---

## Shared Features

### Maps
- **Leaflet integration** for interactive maps
- **Incident location markers**
- **Route visualization** with path drawing
- **Current position tracking**
- **Multiple map types**:
  - City overview
  - Incident-specific
  - Route navigation
  - Monitoring zones

### Communication
- **Real-time messaging**:
  - Citizen-to-dispatch
  - Dispatch-to-responder
  - Responder-to-dispatch
  - Multi-unit coordination
- **Call management**:
  - Phone dialpad
  - Call history
  - Quick contact buttons
- **Activity logs**:
  - Timestamped entries
  - Author attribution
  - Update tracking

### Status Management
- **Status badges**:
  - Pending
  - Assigned
  - En route
  - On scene
  - Resolved
  - Major
- **Priority indicators**:
  - Critical
  - High
  - Medium
  - Low
- **Color-coded status** system

### Photo Management
- **Photo upload** and capture
- **Photo gallery** display
- **Full-screen photo viewer**
- **Photo labeling**

### User Interface
- **Responsive design** for mobile and desktop
- **Floating action bars** for quick access
- **Modal panels** for detailed views
- **Status indicators** throughout
- **Loading states** for async operations
- **Error handling** and user feedback

---

## Technical Stack

### Frontend
- **Next.js 16.1.2** (React 19.2.3)
- **TypeScript**
- **Tailwind CSS 4** with custom animations
- **Leaflet** and **React Leaflet** for maps
- **Lucide React** for icons
- **Class Variance Authority** for component variants

### Key Libraries
- `class-variance-authority`: Component styling variants
- `clsx` & `tailwind-merge`: Conditional class management
- `tailwindcss-animate`: Animation utilities

### Architecture
- **App Router** (Next.js App Directory)
- **Client Components** for interactivity
- **Dynamic imports** for code splitting (maps)
- **Context API** for state management (monitoring)
- **Session storage** for temporary data

### Data Management
- **Mock data** system for demo purposes
- **Context providers** for shared state
- **Session storage** for user flows

---

## User Roles

1. **Citizen**: Report incidents, track responses, provide feedback
2. **Dispatch**: Manage incidents, assign units, monitor operations, analytics
3. **Responder**: Receive assignments, navigate to scenes, manage on-scene operations
4. **Monitoring**: Track flood sensors, send emergency alerts, monitor weather

---

## Key Workflows

### Incident Reporting Flow
1. Citizen files report → 2. Dispatch reviews → 3. Unit assigned → 4. Responder navigates → 5. On-scene management → 6. Resolution → 7. Citizen feedback

### Flood Alert Flow
1. Sensor detects threshold → 2. Alert triggered → 3. Monitoring composes alert → 4. Recipients selected → 5. Channels chosen → 6. Alert sent → 7. Confirmation displayed

### Dispatch Workflow
1. Incident received → 2. AI recommendations → 3. Unit assignment → 4. Live monitoring → 5. Resolution tracking → 6. Analytics review

---

*Last updated: Based on current codebase analysis*
