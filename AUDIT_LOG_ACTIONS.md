# Sentro - Audit Loggable Actions (Admin/Command Center)

Complete list of all actions that should be audit logged on the admin/command center end, focusing on CRUD operations and pre/post incident management.

---

## 1. Auth, Account Management & RBAC

### Citizen Account Management
- **`citizen_account_verified`**
  - Citizen ID, verified by admin ID
  - Verification method (ID submission/in-person)
  - Before: unverified, After: verified

- **`citizen_account_unverified`**
  - Citizen ID, unverified by admin ID
  - Reason for unverification

- **`citizen_account_updated`**
  - Citizen ID, updated by admin ID
  - Fields changed (name, display name, etc.)
  - Before/after values

### Command Center Account Management
- **`command_center_account_created`**
  - New account email, created by admin ID
  - Initial role/permissions assigned

- **`command_center_account_updated`**
  - Account ID, updated by admin ID
  - Fields changed (email, name, status)
  - Before/after values

- **`command_center_account_deleted`**
  - Account ID, deleted by admin ID
  - Reason for deletion

- **`command_center_account_activated`**
  - Account ID, activated by admin ID

- **`command_center_account_deactivated`**
  - Account ID, deactivated by admin ID
  - Reason for deactivation

### Responder Account Management
- **`responder_account_created`**
  - New account email, created by admin ID
  - Account type (personal/service device)
  - Initial role/permissions assigned

- **`responder_account_updated`**
  - Account ID, updated by admin ID
  - Fields changed (email, name, status, device type)
  - Before/after values

- **`responder_account_deleted`**
  - Account ID, deleted by admin ID
  - Reason for deletion

- **`responder_account_activated`**
  - Account ID, activated by admin ID

- **`responder_account_deactivated`**
  - Account ID, deactivated by admin ID
  - Reason for deactivation

### Role & Permission Management
- **`role_created`**
  - Role name, created by admin ID
  - Permissions assigned

- **`role_updated`**
  - Role ID, updated by admin ID
  - Permissions added/removed
  - Before/after permission sets

- **`role_deleted`**
  - Role ID, deleted by admin ID
  - Users affected by deletion

- **`user_role_assigned`**
  - User ID, role ID, assigned by admin ID
  - Previous role (if any)

- **`user_role_removed`**
  - User ID, role ID, removed by admin ID
  - Reason for removal

- **`permission_granted`**
  - User ID, permission name, granted by admin ID

- **`permission_revoked`**
  - User ID, permission name, revoked by admin ID
  - Reason for revocation

---

## 2. Resource Management Module

### Stations
- **`station_created`**
  - Station name, code, type, location
  - Created by admin ID

- **`station_updated`**
  - Station ID, updated by admin ID
  - Fields changed (name, code, type, location, status)
  - Before/after values

- **`station_deleted`**
  - Station ID, deleted by admin ID
  - Reason for deletion
  - Related vehicles/teams affected

- **`station_activated`**
  - Station ID, activated by admin ID

- **`station_deactivated`**
  - Station ID, deactivated by admin ID
  - Reason for deactivation

### Barangays
- **`barangay_created`**
  - Barangay name, code, location, assigned station
  - Created by admin ID

- **`barangay_updated`**
  - Barangay ID, updated by admin ID
  - Fields changed (name, code, location, station assignment)
  - Before/after values

- **`barangay_deleted`**
  - Barangay ID, deleted by admin ID
  - Reason for deletion

- **`barangay_station_assigned`**
  - Barangay ID, station ID, assigned by admin ID
  - Previous station (if any)

- **`barangay_station_unassigned`**
  - Barangay ID, station ID, unassigned by admin ID

### Vehicles
- **`vehicle_created`**
  - Vehicle name, code, type, assigned station
  - Created by admin ID

- **`vehicle_updated`**
  - Vehicle ID, updated by admin ID
  - Fields changed (name, code, type, station, status)
  - Before/after values

- **`vehicle_deleted`**
  - Vehicle ID, deleted by admin ID
  - Reason for deletion

- **`vehicle_status_changed`**
  - Vehicle ID, old status, new status
  - Changed by admin ID
  - Reason for status change

- **`vehicle_station_assigned`**
  - Vehicle ID, station ID, assigned by admin ID
  - Previous station (if any)

- **`vehicle_station_unassigned`**
  - Vehicle ID, station ID, unassigned by admin ID

### Teams
- **`team_created`**
  - Team name, code, type, assigned station
  - Created by admin ID

- **`team_updated`**
  - Team ID, updated by admin ID
  - Fields changed (name, code, type, station, status)
  - Before/after values

- **`team_deleted`**
  - Team ID, deleted by admin ID
  - Reason for deletion

- **`team_member_added`**
  - Team ID, responder ID, added by admin ID

- **`team_member_removed`**
  - Team ID, responder ID, removed by admin ID
  - Reason for removal

- **`team_status_changed`**
  - Team ID, old status, new status
  - Changed by admin ID
  - Reason for status change

- **`team_station_assigned`**
  - Team ID, station ID, assigned by admin ID
  - Previous station (if any)

- **`team_station_unassigned`**
  - Team ID, station ID, unassigned by admin ID

### Responders (Personnel)
- **`responder_created`**
  - Responder name, email, role, assigned station/team
  - Created by admin ID

- **`responder_updated`**
  - Responder ID, updated by admin ID
  - Fields changed (name, email, role, station, team, status)
  - Before/after values

- **`responder_deleted`**
  - Responder ID, deleted by admin ID
  - Reason for deletion

- **`responder_status_changed`**
  - Responder ID, old status, new status
  - Changed by admin ID
  - Reason for status change

- **`responder_station_assigned`**
  - Responder ID, station ID, assigned by admin ID
  - Previous station (if any)

- **`responder_station_unassigned`**
  - Responder ID, station ID, unassigned by admin ID

- **`responder_team_assigned`**
  - Responder ID, team ID, assigned by admin ID
  - Previous team (if any)

- **`responder_team_unassigned`**
  - Responder ID, team ID, unassigned by admin ID

### Schedules
- **`schedule_created`**
  - Schedule ID, responder ID, shift details (start/end time, date)
  - Created by admin ID

- **`schedule_updated`**
  - Schedule ID, updated by admin ID
  - Fields changed (shift time, date, responder)
  - Before/after values

- **`schedule_deleted`**
  - Schedule ID, deleted by admin ID
  - Reason for deletion

- **`schedule_approved`**
  - Schedule ID, approved by admin ID

- **`schedule_rejected`**
  - Schedule ID, rejected by admin ID
  - Reason for rejection

- **`schedule_bulk_created`**
  - Multiple schedule IDs, created by admin ID
  - Number of schedules created

- **`schedule_bulk_updated`**
  - Multiple schedule IDs, updated by admin ID
  - Number of schedules updated

### Responder Requests
- **`responder_request_approved`**
  - Request ID, approved by admin ID
  - Request type (profile update, schedule change, etc.)
  - Changes applied

- **`responder_request_rejected`**
  - Request ID, rejected by admin ID
  - Request type
  - Reason for rejection

- **`responder_request_updated`**
  - Request ID, updated by admin ID
  - Fields changed
  - Before/after values

---

## 3. Incident Flow Management (Form Builder)

### Incident Types
- **`incident_type_created`**
  - Incident type name, category
  - Created by admin ID

- **`incident_type_updated`**
  - Incident type ID, updated by admin ID
  - Fields changed (name, category, description)
  - Before/after values

- **`incident_type_deleted`**
  - Incident type ID, deleted by admin ID
  - Reason for deletion
  - Affected incidents count

- **`incident_type_reordered`**
  - Incident type IDs, new order
  - Reordered by admin ID
  - Previous order

- **`incident_type_activated`**
  - Incident type ID, activated by admin ID

- **`incident_type_deactivated`**
  - Incident type ID, deactivated by admin ID
  - Reason for deactivation

### Incident Form Questions
- **`incident_question_created`**
  - Question ID, incident type ID, question text, question type
  - Created by admin ID
  - Position/order in form

- **`incident_question_updated`**
  - Question ID, updated by admin ID
  - Fields changed (text, type, required status, options)
  - Before/after values

- **`incident_question_deleted`**
  - Question ID, deleted by admin ID
  - Reason for deletion
  - Incident type affected

- **`incident_question_reordered`**
  - Question IDs, new order
  - Reordered by admin ID
  - Incident type ID
  - Previous order

- **`incident_question_required_toggled`**
  - Question ID, required status (true/false)
  - Toggled by admin ID

### Onsite Checklist Items
- **`checklist_item_created`**
  - Checklist item ID, incident type ID, item text
  - Created by admin ID
  - Position/order in checklist

- **`checklist_item_updated`**
  - Checklist item ID, updated by admin ID
  - Fields changed (text, required status)
  - Before/after values

- **`checklist_item_deleted`**
  - Checklist item ID, deleted by admin ID
  - Reason for deletion
  - Incident type affected

- **`checklist_item_reordered`**
  - Checklist item IDs, new order
  - Reordered by admin ID
  - Incident type ID
  - Previous order

- **`checklist_item_required_toggled`**
  - Checklist item ID, required status (true/false)
  - Toggled by admin ID

---

## 4. Incident Reporting (Pre/Post Incident Management)

### Incident Creation (Manual)
- **`incident_created_manually`**
  - Incident ID, created by admin ID
  - Incident type, location, priority
  - Source (phone/chat/manual)

### Incident Updates
- **`incident_updated`**
  - Incident ID, updated by admin ID
  - Fields changed (type, location, priority, description)
  - Before/after values

- **`incident_priority_changed`**
  - Incident ID, old priority, new priority
  - Changed by admin ID
  - Reason for priority change

- **`incident_type_changed`**
  - Incident ID, old type, new type
  - Changed by admin ID
  - Reason for type change

- **`incident_location_updated`**
  - Incident ID, old location, new location
  - Updated by admin ID

- **`incident_description_updated`**
  - Incident ID, updated by admin ID
  - Previous description, new description

### Incident Assignment
- **`incident_assigned`**
  - Incident ID, unit ID(s), assigned by admin ID
  - Assignment method (manual/AI-assisted)
  - Priority level

- **`incident_reassigned`**
  - Incident ID, old unit ID(s), new unit ID(s)
  - Reassigned by admin ID
  - Reason for reassignment

- **`incident_unassigned`**
  - Incident ID, unit ID(s), unassigned by admin ID
  - Reason for unassignment

### Incident Resolution
- **`incident_closed`**
  - Incident ID, closed by admin ID
  - Resolution type, resolution notes
  - Total resolution time

- **`incident_reopened`**
  - Incident ID, reopened by admin ID
  - Reason for reopening

- **`incident_escalated`**
  - Incident ID, escalated by admin ID
  - Escalation level, reason

- **`incident_deescalated`**
  - Incident ID, deescalated by admin ID
  - Previous escalation level, reason

### Incident Status Changes
- **`incident_status_changed`**
  - Incident ID, old status, new status
  - Changed by admin ID
  - Reason for status change

---

## 5. System Configuration & Settings

### General Settings
- **`system_setting_updated`**
  - Setting key, old value, new value
  - Updated by admin ID
  - Setting category (notifications, response times, etc.)

### Response Time Thresholds
- **`response_time_threshold_updated`**
  - Priority level, old threshold, new threshold
  - Updated by admin ID

### SLA Configuration
- **`sla_target_updated`**
  - Priority level, old target, new target
  - Updated by admin ID

### Notification Settings
- **`notification_setting_updated`**
  - Setting key, old value, new value
  - Updated by admin ID
  - Notification type (email, SMS, push)

### Alert Configuration
- **`alert_threshold_updated`**
  - Alert type, old threshold, new threshold
  - Updated by admin ID

### Response Zone Configuration
- **`response_zone_created`**
  - Zone ID, zone boundaries, created by admin ID

- **`response_zone_updated`**
  - Zone ID, updated by admin ID
  - Fields changed (boundaries, name, priority)
  - Before/after values

- **`response_zone_deleted`**
  - Zone ID, deleted by admin ID
  - Reason for deletion

---

## 6. Analytics & Reporting Configuration

### Report Configuration
- **`report_config_created`**
  - Report config ID, report type, created by admin ID

- **`report_config_updated`**
  - Report config ID, updated by admin ID
  - Fields changed (filters, date ranges, metrics)
  - Before/after values

- **`report_config_deleted`**
  - Report config ID, deleted by admin ID

### Dashboard Configuration
- **`dashboard_widget_added`**
  - Widget type, dashboard section, added by admin ID

- **`dashboard_widget_removed`**
  - Widget type, dashboard section, removed by admin ID

- **`dashboard_widget_reordered`**
  - Widget IDs, new order, reordered by admin ID

---

## 7. Data Export & Backup

### Data Export
- **`data_exported`**
  - Export type (incidents, users, reports), date range
  - Exported by admin ID
  - Export format (CSV, PDF, JSON)

### Data Import
- **`data_imported`**
  - Import type, file name, records imported
  - Imported by admin ID
  - Import result (success/failure, errors)

### Backup Operations
- **`backup_created`**
  - Backup ID, backup type, created by admin ID

- **`backup_restored`**
  - Backup ID, restored by admin ID
  - Reason for restoration

---

## 8. Audit Log Access

### Audit Log Viewing
- **`audit_log_viewed`**
  - Filters applied, date range, viewed by admin ID
  - Number of entries viewed

### Audit Log Export
- **`audit_log_exported`**
  - Filters applied, date range, exported by admin ID
  - Export format (CSV, PDF, JSON)

---

## Summary by Category

### High Priority (Must Audit)
- All account creation/deletion
- All role/permission changes
- All resource CRUD operations (stations, vehicles, teams, responders)
- All incident type/form builder changes
- All incident priority/status changes
- All system configuration changes

### Medium Priority (Should Audit)
- Account updates
- Resource status changes
- Schedule operations
- Responder request approvals/rejections
- Incident updates (non-critical fields)
- Dashboard configuration changes

### Low Priority (Nice to Have)
- Audit log viewing/exporting
- Data export operations
- Report configuration changes

---

## Common Audit Log Fields

Every audit log entry should include:
- **`id`** - Unique audit log entry ID
- **`timestamp`** - ISO 8601 timestamp
- **`actor_id`** - Admin/Command Center user who performed the action
- **`actor_name`** - Name of the actor
- **`actor_role`** - Role of the actor
- **`action`** - Action type (from list above)
- **`target_type`** - Type of entity affected (user, station, incident, etc.)
- **`target_id`** - ID of the affected entity
- **`target_name`** - Name/identifier of the affected entity
- **`details`** - Human-readable description
- **`metadata`** - JSON object with:
  - Before/after values (for updates)
  - Reason (for deletions/deactivations)
  - Related entities
  - IP address
  - User agent
  - Session ID
- **`severity`** - low/medium/high/critical
- **`result`** - success/failure/partial

---

*Last updated: Based on Sentro v1 specification and codebase analysis*
