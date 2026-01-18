# Audit Logs Interface Design

A comprehensive UI/UX design document for the admin-side audit logs feature in Sentro.

## Overview

The audit logs interface provides administrators and dispatch operators with a complete view of all system activities, user actions, and configuration changes. This document outlines the recommended features, layout, and interactions for an effective audit logging interface.

---

## 1. Header & Summary Stats

### Quick Stats Cards
Display at the top of the page to provide immediate insights:

- **Total Events Today** - Count of all audit log entries for the current day
- **Critical Events (24h)** - Number of high-severity events in the last 24 hours
- **Active Users** - Count of unique users who performed actions in the selected time range
- **Most Active Actor** - User or system component with the most actions

### Header Actions
- **Export Button** - Export filtered results to CSV/PDF
- **Auto-refresh Toggle** - Enable/disable real-time updates
- **Refresh Button** - Manual refresh of audit logs

---

## 2. Advanced Filtering Panel

A collapsible panel with comprehensive filtering options:

### Date Range Picker
- **Presets**: Today, Last 7 days, Last 30 days, Last 90 days, Custom range
- **Custom Range**: Start date and end date picker
- **Quick Select**: "Last hour", "Last 24 hours", "This week", "This month"

### Actor Filter
- **Multi-select dropdown** with search
- Options: Admin, Dispatch Operator, System, Specific users
- **User search** to find specific actors
- **Role-based filtering** (Admin, Dispatch, Responder, Monitoring, Citizen)

### Action Type Filter
- **Multi-select** with checkboxes
- Common actions: Created, Updated, Assigned, Deleted, Schedule Changed, Configuration Updated, Permission Updated, etc.
- **Search within actions** for quick filtering

### Category Filter
- **Category tags**: Incident, Assignment, Configuration, Authentication, Alert, Communication, System
- **Multi-select** capability
- Visual category indicators

### Severity Filter
- **Radio buttons or checkboxes**: Critical, High, Medium, Low
- **Color-coded** severity indicators

### Target Type Filter
- Filter by what was affected: Incident, Unit, User, System Settings, Schedule, etc.
- **Multi-select** with search

### Result Filter
- **Success/Failure/Partial** status filter
- Useful for troubleshooting failed operations

### Search Bar
- **Global search** across all fields:
  - Actor name
  - Action type
  - Target name/ID
  - Details/description
- **Highlight matching text** in results
- **Search suggestions** as you type

### Filter Management
- **Clear all filters** button
- **Active filter count** badge
- **Save filter combination** for quick access later

---

## 3. View Options

### View Mode Toggle
Switch between different visualization modes:

#### Timeline View (Default)
- **Chronological display** with visual timeline
- **Grouped by date/time** (Today, Yesterday, This Week, etc.)
- **Visual connectors** showing event flow
- Best for understanding sequence of events

#### Table View
- **Sortable columns**: Timestamp, Actor, Action, Target, Category, Severity
- **Column visibility toggle** to show/hide columns
- **Sticky header** for easy reference while scrolling
- Best for detailed analysis and comparison

#### Grouped View
- **Group by**: Actor, Action, Category, Date
- **Collapsible groups** with counts
- **Expand/collapse all** button
- Best for pattern analysis

### Display Density
- **Compact** - More entries visible, less detail
- **Normal** - Balanced view (default)
- **Comfortable** - More spacing, easier to read

### Time Format Toggle
- **Relative** - "2 min ago", "1 hour ago" (default)
- **Absolute** - "2024-01-15 14:30:25"
- **Both** - Show relative with absolute on hover

---

## 4. Enhanced Log Entry Display

Each audit log entry should display:

### Entry Header
- **Actor Badge**
  - Avatar/icon
  - Name (clickable to filter by this actor)
  - Role badge (Admin, Dispatch, System, etc.)
  
- **Action Badge**
  - Color-coded action type
  - Icon representing the action
  - Hover tooltip with full action description

- **Target Link**
  - Clickable link to the affected entity
  - Shows target type and name/ID
  - Opens detail modal or navigates to entity

- **Timestamp**
  - Relative time (e.g., "2 min ago")
  - Absolute time on hover
  - Timezone indicator

### Entry Body
- **Details Text** - Human-readable description of what happened
- **Expandable Section** - Click to see more details
  - Before/After values (for updates)
  - Metadata (IP address, device, session ID for security events)
  - Related entries link
  - Raw JSON data (for technical users)

### Entry Footer
- **Category Tag** - Visual category indicator
- **Severity Badge** - Color-coded severity level
- **Result Indicator** - Success/Failure icon
- **Quick Actions**:
  - View details
  - Filter by this actor
  - Filter by this action
  - Export this entry

### Visual Indicators
- **Color coding** by action type:
  - Created: Green
  - Updated: Blue
  - Assigned: Amber
  - Deleted: Red
  - Configuration: Indigo
  - Permission: Pink
  - Schedule: Purple
  - System: Gray

- **Severity indicators**:
  - Critical: Red border/background
  - High: Orange
  - Medium: Yellow
  - Low: Gray

---

## 5. Bulk Actions & Pagination

### Selection
- **Select all** checkbox in header
- **Select individual** entries
- **Select range** (Shift+Click)
- **Selected count** indicator

### Bulk Actions
- **Export selected** to CSV/PDF
- **Filter to selected** (show only selected entries)
- **Clear selection**

### Pagination
- **Page size options**: 25, 50, 100, All
- **Page navigation**: First, Previous, Next, Last
- **Page number input** for direct navigation
- **Total entries** and **current range** display (e.g., "Showing 1-25 of 1,234 entries")

### Alternative: Infinite Scroll
- **Toggle option** for infinite scroll vs pagination
- **Load more** button at bottom
- **Scroll to top** button

---

## 6. Quick Filters (Pills/Chips)

Common filter combinations as clickable chips:

- **Failed Actions** - Show only failed operations
- **Permission Changes** - All permission-related events
- **Configuration Changes** - System configuration updates
- **Critical Events** - High-severity events only
- **My Actions** - Actions performed by current user
- **Recent Hour** - Last 60 minutes
- **Incident Related** - All incident-related activities
- **Unit Assignments** - All unit assignment events

### Behavior
- **Click to apply** filter
- **Active filter** highlighted
- **Multiple filters** can be active simultaneously
- **Remove filter** by clicking X or clicking chip again
- **Custom quick filter** creation (save current filter combination)

---

## 7. Detail Modal/Sidebar

When clicking on an audit log entry:

### Detail View
- **Full Event Details**
  - Complete actor information
  - Full action description
  - Target entity details
  - Timestamp (absolute)
  - All metadata

- **Before/After Comparison** (for update actions)
  - Side-by-side comparison
  - Highlighted differences
  - Diff view option

- **Related Events Timeline**
  - Show events related to the same target
  - Show events by the same actor
  - Chronological context

- **Actor Profile Link**
  - Quick link to actor's profile/page
  - View all actions by this actor

- **Target Entity Link**
  - Navigate to the affected entity
  - View entity details

- **Export Single Entry**
  - Export this specific entry
  - Copy to clipboard

### Modal Features
- **Close button** (X or Escape key)
- **Previous/Next** navigation between entries
- **Full-screen** option for detailed view
- **Print** option

---

## 8. Visualizations

Optional charts and graphs for data analysis:

### Activity Heatmap
- **Time-based heatmap** showing activity by hour/day
- **Color intensity** indicates volume
- **Hover for exact counts**
- **Click to filter** to that time period

### Action Type Distribution
- **Pie or bar chart** showing distribution of action types
- **Interactive** - click to filter by action type
- **Percentage breakdown**

### Actor Activity Chart
- **Bar chart** showing most active users
- **Top N actors** (configurable)
- **Click to filter** by actor

### Timeline Visualization
- **Gantt-style timeline** showing event flow
- **Grouped by actor** or **category**
- **Zoom in/out** for different time scales
- **Filter interactions** on timeline

### Access Pattern Analysis
- **Line chart** showing activity trends over time
- **Multiple series** for different action types
- **Comparison** between time periods

---

## 9. Real-Time Updates

### Live Feed
- **Toggle switch** to enable/disable real-time updates
- **WebSocket connection** for live data
- **Connection status** indicator

### New Events Indicator
- **Badge** showing count of new events since page load
- **"Show new"** button to scroll to new entries
- **Auto-scroll** option when new events arrive

### Notifications
- **Sound notification** option (for critical events)
- **Browser notification** permission request
- **Notification settings**:
  - Only critical events
  - All events
  - Custom rules

### Refresh Options
- **Manual refresh** button
- **Auto-refresh interval** (30s, 1min, 5min, disabled)
- **Last updated** timestamp

---

## 10. Saved Views

### Save Filter Combinations
- **Save current filters** as a named view
- **Quick access** to saved views from dropdown
- **Edit/Delete** saved views
- **Share filter links** (URL parameters)

### Default Views
- **Today's Activity** - Default view on page load
- **Critical Events** - Pre-configured critical events filter
- **My Activity** - Current user's actions
- **System Changes** - Configuration and system events

### View Management
- **Create new view** from current filters
- **Rename views**
- **Set as default**
- **Delete views**
- **Import/Export** view configurations

---

## 11. Export & Reporting

### Export Options
- **Format**: CSV, PDF, JSON
- **Scope**: Current view, Selected entries, All filtered results
- **Columns**: Select which columns to include
- **Date range**: Include in export

### Export Features
- **Progress indicator** for large exports
- **Download link** or email delivery
- **Scheduled exports** (future feature)
- **Export templates** for common reports

### Report Generation
- **Summary report** - High-level statistics
- **Detailed report** - Full audit trail
- **Custom report** - User-defined format
- **Report preview** before export

---

## 12. Performance & UX Considerations

### Loading States
- **Skeleton loaders** while fetching data
- **Progressive loading** for large datasets
- **Loading indicators** for filters/actions

### Performance Optimizations
- **Virtual scrolling** for large lists
- **Lazy loading** of entry details
- **Debounced search** input
- **Cached filter results**

### Accessibility
- **Keyboard navigation** support
- **Screen reader** friendly
- **High contrast** mode option
- **Focus indicators** for interactive elements

### Mobile Responsiveness
- **Responsive layout** for mobile devices
- **Touch-friendly** controls
- **Swipe gestures** for navigation
- **Collapsible filters** on mobile

---

## 13. Security & Compliance Features

### Access Control
- **Role-based access** to audit logs
- **Permission levels**:
  - View only
  - View + Export
  - Full access (including delete/export)
- **Audit log access** itself should be logged

### Data Protection
- **Sensitive data masking** (passwords, tokens, etc.)
- **PII redaction** options
- **Compliance filters** (GDPR, etc.)

### Retention Policies
- **Display retention period** information
- **Archive indicator** for old entries
- **Purge warnings** before deletion

---

## 14. Implementation Priorities

### Phase 1: Core Features (MVP)
1. Basic list view with search
2. Date range filter
3. Actor and action filters
4. Export to CSV
5. Entry detail modal

### Phase 2: Enhanced Filtering
1. Advanced filter panel
2. Quick filter chips
3. Saved views
4. Multiple view modes (table/timeline)

### Phase 3: Advanced Features
1. Visualizations and charts
2. Real-time updates
3. Bulk actions
4. Before/after comparisons

### Phase 4: Polish & Optimization
1. Performance optimizations
2. Mobile responsiveness
3. Accessibility improvements
4. Advanced reporting

---

## 15. Example Layout

```
┌─────────────────────────────────────────────────────────────┐
│  Audit Logs                    [Export] [Auto-refresh: ON]  │
├─────────────────────────────────────────────────────────────┤
│  [Total: 1,234] [Critical: 12] [Active Users: 8]            │
├─────────────────────────────────────────────────────────────┤
│  [Quick Filters] [Failed] [Critical] [My Actions] [Today]  │
├─────────────────────────────────────────────────────────────┤
│  [🔍 Search...] [Filters ▼] [Timeline ▼] [Export ▼]        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │ [Avatar] Admin Maria Santos • Created • Incident   │    │
│  │ P-2210                                             │    │
│  │ Created new incident: Multi-vehicle collision... │    │
│  │ 2 min ago                    [View Details] [→]     │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │ [Avatar] Dispatch Operator • Assigned • Unit 14   │    │
│  │ Assigned Unit 14 to incident P-2210               │    │
│  │ 5 min ago                    [View Details] [→]     │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  [< Previous] [1] [2] [3] ... [50] [Next >]                │
│  Showing 1-25 of 1,234 entries                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 16. Technical Considerations

### Data Structure
```typescript
interface AuditLogEntry {
  id: string;
  timestamp: Date;
  actor: {
    id: string;
    name: string;
    role: string;
    avatar?: string;
  };
  action: string;
  category: string;
  target: {
    type: string;
    id: string;
    name: string;
  };
  details: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  result: 'success' | 'failure' | 'partial';
  metadata?: {
    ipAddress?: string;
    device?: string;
    sessionId?: string;
    before?: any;
    after?: any;
  };
}
```

### API Considerations
- **Pagination** support
- **Filtering** via query parameters
- **Sorting** options
- **Field selection** (only return needed fields)
- **Rate limiting** for real-time updates

---

*Last updated: Based on audit logging best practices and Sentro platform requirements*
