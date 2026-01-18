# Sentro - Analytics Requirements & Tracking Plan

This document outlines the crucial analytics events and metrics that should be tracked across the Sentro incident response platform.

## Overview

Currently, the platform has an **analytics dashboard** displaying operational metrics, but there's **no actual event tracking implementation**. This document identifies what should be tracked to power those analytics and provide actionable insights.

---

## 1. Core Incident Lifecycle Events

### Citizen Actions
- **`incident_reported`**
  - Incident ID, type, location (lat/lng), priority, reporter ID
  - Timestamp, GPS accuracy, photo count
  - Device type, app version

- **`incident_tracked_viewed`**
  - Incident ID, viewer ID, time spent on page
  - Which sections viewed (map, timeline, messages)

- **`incident_feedback_submitted`**
  - Incident ID, rating (1-5), feedback text
  - Response time satisfaction, resolution quality

### Dispatch Actions
- **`incident_created`** (manual creation by dispatch)
  - Incident ID, creator ID, source (phone/chat/manual)
  - Initial priority, type, location

- **`incident_assigned`**
  - Incident ID, unit ID(s), assigner ID
  - Assignment method (manual/AI-assisted), time to assign
  - Priority level, incident age at assignment

- **`incident_priority_changed`**
  - Incident ID, old priority, new priority, changer ID
  - Reason for change

- **`incident_updated`**
  - Incident ID, field changed, updater ID
  - Before/after values

- **`incident_closed`**
  - Incident ID, closer ID, resolution time
  - Final status, resolution type

### Responder Actions
- **`responder_assignment_received`**
  - Incident ID, responder ID, unit ID
  - Assignment time, notification method

- **`responder_en_route`**
  - Incident ID, responder ID, timestamp
  - Time since assignment, distance to incident

- **`responder_arrived_on_scene`**
  - Incident ID, responder ID, timestamp
  - Travel time, actual vs estimated ETA

- **`responder_status_changed`**
  - Responder ID, old status, new status
  - Unit ID, location (if available)

- **`responder_checklist_completed`**
  - Incident ID, responder ID, checklist items
  - Completion time, custom items added

- **`responder_report_completed`**
  - Incident ID, responder ID, report duration
  - Photos captured, comments added

---

## 2. Response Time Metrics

### Critical Time Measurements
- **Time to Assignment** (Report → Assignment)
  - By priority level, incident type, time of day
  - Average, median, 95th percentile

- **Time to En Route** (Assignment → En Route)
  - By unit type, responder, geographic area

- **Travel Time** (En Route → On Scene)
  - By route, traffic conditions, distance
  - Actual vs estimated ETA accuracy

- **On-Scene Duration** (On Scene → Resolution)
  - By incident type, complexity, unit count

- **Total Resolution Time** (Report → Resolution)
  - End-to-end metric, SLA compliance

---

## 3. Resource Utilization Metrics

### Unit/Fleet Analytics
- **`unit_availability_changed`**
  - Unit ID, old status, new status, reason
  - Duration in previous status

- **`unit_assigned`**
  - Unit ID, incident ID, assignment time
  - Unit type, role, current workload

- **`unit_unassigned`**
  - Unit ID, incident ID, unassignment time
  - Total time assigned, reason

- **`unit_location_updated`**
  - Unit ID, location (lat/lng), timestamp
  - Speed, heading (if available)

### Fleet Performance
- **Unit Utilization Rate**
  - Hours deployed vs available
  - By unit type, shift, day of week

- **Average Units per Incident**
  - By incident type, priority
  - Multi-unit coordination frequency

- **Unit Response Efficiency**
  - Incidents handled per unit per shift
  - Average resolution time per unit

---

## 4. Communication & Engagement Metrics

### Messaging Analytics
- **`message_sent`**
  - Sender ID, receiver ID, incident ID
  - Message type (text/voice/image), channel
  - Response time (if reply)

- **`call_initiated`**
  - Caller ID, receiver ID, incident ID
  - Call duration, outcome (answered/missed)

- **`notification_sent`**
  - Recipient ID, notification type, channel
  - Delivery status, read status, action taken

### Citizen Engagement
- **Report Submission Rate**
  - Reports per user, per time period
  - Repeat reporter identification

- **Tracking Engagement**
  - Page views, time on tracking page
  - Feature usage (map, messages, calls)

- **Feedback Rate**
  - % of resolved incidents with feedback
  - Average rating, sentiment analysis

---

## 5. Geographic & Location Analytics

### Location-Based Metrics
- **`location_updated`**
  - Entity ID (incident/unit), location (lat/lng)
  - Accuracy, source (GPS/manual)

- **Hotspot Analysis**
  - Incidents by geographic area (barangay/zone)
  - Time-based patterns, incident density

- **Response Zone Performance**
  - Average response time by zone
  - Coverage gaps, underserved areas

- **Route Efficiency**
  - Distance traveled vs straight-line distance
  - Traffic impact on response times

---

## 6. AI & Automation Metrics

### AI Assist Analytics
- **`ai_recommendation_shown`**
  - Incident ID, recommendation type
  - User ID, recommendation accepted/rejected

- **`ai_assignment_suggested`**
  - Incident ID, suggested units, confidence score
  - Accepted/rejected, actual assignment

- **AI Performance**
  - Recommendation acceptance rate
  - Accuracy of priority predictions
  - Unit assignment optimization impact

---

## 7. System & Performance Metrics

### Application Performance
- **Page Load Times**
  - By page, user role, device type
  - Time to interactive, first contentful paint

- **API Response Times**
  - By endpoint, error rates
  - Timeout frequency

- **Real-Time Update Latency**
  - WebSocket message delivery time
  - Location update frequency

### Error & Reliability
- **`error_occurred`**
  - Error type, severity, user ID
  - Page/component, error message
  - User action that triggered it

- **`feature_usage`**
  - Feature name, user ID, usage count
  - Success/failure, time spent

---

## 8. User Behavior Analytics

### User Journey Tracking
- **`page_viewed`**
  - Page path, user ID, role
  - Referrer, session ID, timestamp

- **`user_action`**
  - Action name, user ID, context
  - Success/failure, duration

- **`session_started`**
  - User ID, role, device, location
  - Session duration, pages visited

- **`session_ended`**
  - User ID, session duration
  - Last action, exit page

### Feature Adoption
- **Feature Usage Rates**
  - By role, feature, time period
  - New vs returning users

- **User Proficiency**
  - Time to complete common tasks
  - Error rates, help requests

---

## 9. Alert & Monitoring Metrics

### Flood Monitoring
- **`sensor_reading_recorded`**
  - Sensor ID, water level, location
  - Alert level, rate of change

- **`alert_triggered`**
  - Alert type, severity, affected areas
  - Barangays affected, resident count

- **`alert_sent`**
  - Alert ID, channels used, recipients
  - Delivery status, read rate

### Alert Performance
- **Alert Response Time**
  - Time from trigger to send
  - Channel delivery times

- **Alert Effectiveness**
  - Evacuation rates, citizen response
  - False positive rate

---

## 10. Operational Efficiency Metrics

### Dispatch Performance
- **Queue Depth Over Time**
  - Pending incidents, average wait time
  - Peak hours, backlog trends

- **Assignment Efficiency**
  - Time to assign, assignment accuracy
  - Re-assignment frequency

- **Multi-Incident Handling**
  - Concurrent incidents per dispatcher
  - Workload distribution

### Resource Optimization
- **Overtime Usage**
  - Hours by unit, responder, reason
  - Cost implications

- **Shift Coverage**
  - Units available by shift
  - Coverage gaps, demand vs supply

---

## 11. Critical KPIs to Track

### Real-Time KPIs
1. **Active Incidents** - Current count, by status
2. **Units Deployed** - Available vs busy
3. **Queue Depth** - Pending assignments
4. **Average Response Time** - Rolling average
5. **Current Alert Level** - Flood/monitoring status

### Daily KPIs
1. **Total Incidents** - By type, priority
2. **Resolution Rate** - % resolved within SLA
3. **Average Resolution Time** - End-to-end
4. **Unit Utilization** - % of fleet deployed
5. **Citizen Satisfaction** - Average rating

### Weekly/Monthly KPIs
1. **Incident Volume Trends** - Growth/decline
2. **Response Time Trends** - Improving/degrading
3. **Resource Utilization Trends** - Capacity planning
4. **Geographic Hotspots** - Area analysis
5. **Feature Adoption** - New feature usage

---

## 12. Analytics Implementation Recommendations

### Event Tracking Library
Consider implementing:
- **PostHog** - Open-source, privacy-focused, self-hostable
- **Mixpanel** - Strong event tracking, user journeys
- **Amplitude** - Product analytics, user behavior
- **Custom solution** - Full control, data ownership

### Event Naming Convention
Use consistent naming: `[entity]_[action]`
- Examples: `incident_created`, `unit_assigned`, `responder_en_route`

### Event Properties
Always include:
- `timestamp` - ISO 8601 format
- `user_id` - Who performed the action
- `user_role` - Citizen/Dispatch/Responder/Monitoring
- `session_id` - User session identifier
- `device_type` - Mobile/Desktop/Tablet
- `app_version` - Application version

### Privacy Considerations
- **PII Handling** - Hash sensitive data (phone numbers, addresses)
- **GDPR Compliance** - User consent, data retention
- **Data Minimization** - Only track necessary data
- **Anonymization** - Aggregate data where possible

---

## 13. Dashboard Metrics Priority

### High Priority (Must Have)
1. ✅ Total Incidents (with trends)
2. ✅ Active Incidents (real-time)
3. ✅ Average Response Time (by priority)
4. ✅ Resolution Rate
5. ✅ Unit Utilization
6. ✅ Queue Depth

### Medium Priority (Should Have)
1. ⚠️ Incident Volume Chart (time-series)
2. ⚠️ Status Breakdown
3. ⚠️ Incidents by Type
4. ⚠️ Response Time Performance (SLA compliance)
5. ⚠️ Fleet Overview
6. ⚠️ Resource Utilization Trends

### Low Priority (Nice to Have)
1. ⚪ Geographic Heatmaps
2. ⚪ User Activity Patterns
3. ⚪ Feature Usage Analytics
4. ⚪ Communication Metrics
5. ⚪ AI Performance Metrics
6. ⚪ Alert Effectiveness

---

## 14. Data Retention & Archival

### Retention Periods
- **Real-time Data** - 30 days
- **Daily Aggregates** - 2 years
- **Monthly Aggregates** - 7 years
- **Audit Logs** - Per compliance requirements

### Archival Strategy
- **Hot Storage** - Last 90 days (fast queries)
- **Warm Storage** - 90 days - 2 years (slower queries)
- **Cold Storage** - 2+ years (archive only)

---

## 15. Reporting & Alerts

### Automated Reports
- **Daily Summary** - Key metrics, incidents, performance
- **Weekly Analysis** - Trends, patterns, recommendations
- **Monthly Review** - Comprehensive analysis, insights

### Alert Thresholds
- **Critical** - Response time > SLA threshold
- **Warning** - Queue depth > 10 incidents
- **Info** - High incident volume spike
- **Success** - SLA compliance achieved

---

## 16. Implementation Checklist

### Phase 1: Core Tracking (MVP)
- [ ] Implement event tracking library
- [ ] Track incident lifecycle events
- [ ] Track response time metrics
- [ ] Basic analytics dashboard integration
- [ ] Daily KPI calculations

### Phase 2: Enhanced Tracking
- [ ] User behavior tracking
- [ ] Communication metrics
- [ ] Geographic analytics
- [ ] Resource utilization tracking
- [ ] Real-time dashboard updates

### Phase 3: Advanced Analytics
- [ ] AI performance metrics
- [ ] Predictive analytics
- [ ] Anomaly detection
- [ ] Custom report builder
- [ ] Data export capabilities

### Phase 4: Optimization
- [ ] Performance monitoring
- [ ] Data retention policies
- [ ] Privacy compliance
- [ ] Automated alerts
- [ ] Advanced visualizations

---

## Summary

**Current State**: Analytics dashboard exists with mock data, but no actual event tracking is implemented.

**Critical Gaps**:
1. No event tracking infrastructure
2. No real-time data collection
3. No user behavior tracking
4. No performance monitoring
5. No automated reporting

**Priority Actions**:
1. Implement event tracking system
2. Track core incident lifecycle events
3. Measure response time metrics
4. Monitor resource utilization
5. Build real-time analytics pipeline

---

*Last updated: Based on comprehensive codebase analysis and incident response platform best practices*
