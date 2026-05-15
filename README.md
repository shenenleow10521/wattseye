# WattsEye Teammate Onboarding Folder

Read the files in this order:

1. `00_BIG_PICTURE.md`
2. `01_SYSTEM_CONNECTION.md`
3. `02_HARDWARE.md`
4. `03_MACHINE_LEARNING.md`
5. `04_LIVE_DATA_FLOW.md`
6. `05_USER_EXPERIENCE.md`
7. `06_DEMO_PLAN.md`
8. `07_TASK_BREAKDOWN.md`
9. `08_QA_DEFENSE.md`

## Purpose

This folder explains WattsEye in a beginner-friendly but detailed way so teammates can understand the full system.

## Main idea

WattsEye uses one electricity sensor to monitor total power usage, then uses AI to estimate appliance-level usage and show insights on a dashboard.

The smarter product vision is:

```text
Power sensing -> appliance detection -> occupancy and routine context -> smart insights
```

The dashboard should not only show what is using power. It should also forecast bills, detect waste, learn household routines, recommend actions, and warn about abnormal appliance behavior.

## Visual diagrams

- [System connection flow](assets/system-connection-flow.svg)
- [Smart insight architecture](assets/smart-insight-architecture.svg)
- [Live data pipeline](assets/live-data-pipeline.svg)
- [Three-pillar product map](assets/three-pillars-map.svg)

## Important note

The files are written for teammate explanation and prototype planning. Hardware involving mains electricity must be checked by a qualified person before powering on.

## Frontend dashboard demo

A simple static WattsEye dashboard prototype is available in the `frontend/` folder. It uses dummy data so the frontend can be demonstrated before the backend or live sensor feed is ready.

### Run locally

Option 1: open `frontend/index.html` directly in a browser.

Option 2: serve it with Python from the repository root:

```bash
python3 -m http.server 8000 -d frontend
```

Then visit `http://localhost:8000`.
