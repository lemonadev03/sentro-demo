# Sentro - Core KPI Reference

Essential KPIs and metrics for the Sentro analytics dashboard.

---

## Core 10 KPIs & Metrics

### 1. Active Incidents
- **Chart Type**: Number Card / Badge
- **What it shows**: Current count of incidents that are not resolved
- **Question answered**: "How many incidents are we handling right now?"
- **Details**: Real-time count, updates automatically

### 2. Total Incidents
- **Chart Type**: Number Card with Sparkline
- **What it shows**: Total incidents in selected time period with trend
- **Question answered**: "How many incidents occurred vs previous period?"
- **Details**: Shows comparison (e.g., "+12% vs yesterday"), includes mini trend chart

### 3. Average Response Time
- **Chart Type**: Number Card with Sparkline
- **What it shows**: Average time from report to responder arrival
- **Question answered**: "Are we meeting our response time goals?"
- **Details**: Shows trend, comparison to previous period, critical KPI

### 4. Resolution Rate
- **Chart Type**: Number Card with Sparkline / Percentage Gauge
- **What it shows**: Percentage of incidents resolved within SLA
- **Question answered**: "What percentage of incidents are resolved successfully?"
- **Details**: Shows trend, comparison to target (e.g., 94% vs 90% target)

### 5. Units Deployed
- **Chart Type**: Number Card with Fraction (e.g., "12/27")
- **What it shows**: Currently deployed units vs total available units
- **Question answered**: "What percentage of our fleet is currently in use?"
- **Details**: Shows utilization percentage, available vs busy breakdown

### 6. Queue Depth
- **Chart Type**: Number Card / Badge
- **What it shows**: Number of incidents waiting for assignment
- **Question answered**: "How many incidents are pending assignment?"
- **Details**: Critical for dispatch workload management

### 7. Response Time by Priority
- **Chart Type**: Grouped Bar Chart / Comparison Chart
- **What it shows**: Average response time for each priority level (Critical/Major/Moderate/Low)
- **Question answered**: "Are we responding faster to critical incidents?"
- **Details**: Shows target vs actual, SLA compliance per priority

### 8. Incidents by Type
- **Chart Type**: Pie Chart / Donut Chart / Bar Chart
- **What it shows**: Distribution of incidents by category
- **Question answered**: "What types of incidents are most common?"
- **Details**: Shows percentages, helps resource planning (e.g., more EMS units if medical emergencies are high)

### 9. Status Breakdown
- **Chart Type**: Stacked Bar Chart / Horizontal Bar Chart / Pie Chart
- **What it shows**: Count of incidents by current status (Pending/En Route/On Scene/Resolved)
- **Question answered**: "What's the current state of all incidents?"
- **Details**: Shows distribution, percentages, helps identify bottlenecks

### 10. Incident Volume Over Time
- **Chart Type**: Line Chart / Area Chart
- **What it shows**: Incident count by hour/day/week/month
- **Question answered**: "When do incidents peak? What are the patterns?"
- **Details**: Time-series data, shows peaks, valleys, trends, helps identify busy periods

---

## Quick Reference Table

| # | Metric | Chart Type | Key Question |
|---|--------|------------|---------------|
| 1 | Active Incidents | Number Card | How many incidents right now? |
| 2 | Total Incidents | Number Card + Sparkline | How many vs previous period? |
| 3 | Average Response Time | Number Card + Sparkline | Meeting response goals? |
| 4 | Resolution Rate | Number Card + Sparkline | % resolved successfully? |
| 5 | Units Deployed | Number Card (Fraction) | What % of fleet is in use? |
| 6 | Queue Depth | Number Card | How many pending assignments? |
| 7 | Response Time by Priority | Grouped Bar Chart | Faster for critical incidents? |
| 8 | Incidents by Type | Pie/Donut Chart | What types are most common? |
| 9 | Status Breakdown | Stacked Bar/Pie Chart | Current state of incidents? |
| 10 | Incident Volume Over Time | Line/Area Chart | When do incidents peak? |

---

*Core metrics for Sentro analytics dashboard*
