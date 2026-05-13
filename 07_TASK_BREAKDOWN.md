# 07 — Task Breakdown: Who Does What

## 1. Purpose of this file

This file turns the project into tasks.

It helps teammates know what to build, test, and prepare.

## 2. Main workstreams

We can split the project into six workstreams:

1. Hardware
2. Raspberry Pi backend
3. Machine learning
4. ESP32 control system
5. Dashboard / frontend
6. Demo and pitch preparation

The smarter version also needs a cross-cutting smart insight layer. This sits mostly in Raspberry Pi backend, machine learning, and dashboard work.

## 3. Hardware team tasks

| Task | Priority | Notes |
|---|---|---|
| Prepare hardware list | High | Confirm what we already have and what to buy |
| Build demo box design | High | Must include safety layout |
| Wire inlet, fuse, outlets | High | Needs supervision |
| Mount CT clamp | High | Clamp around live wire only |
| Connect voltage sensor | High | Must be safe and enclosed |
| Build signal conditioning circuit | High | Needed before ADC reading |
| Connect ADS1115 to Raspberry Pi | High | I2C connection |
| Test known appliance readings | High | For calibration |
| Prepare hardware diagram | Medium | For teammate explanation and presentation |

## 4. Raspberry Pi backend tasks

| Task | Priority | Notes |
|---|---|---|
| Install Raspberry Pi OS | High | Basic setup |
| Enable I2C | High | Needed for ADS1115 |
| Read ADS1115 values | High | First sensor test |
| Convert readings to voltage/current | High | Needs calibration formula |
| Calculate watts | High | Core data output |
| Store one reading per second | High | Needed for ML rolling window |
| Store historical predictions and occupancy | High | Needed for routine-aware insights |
| Load TFLite model | High | For live inference |
| Run model on rolling window | High | Core AI connection |
| Build smart insight engine | High | Routines, forecast, waste score, recommendations |
| Calculate bill forecast | Medium | Uses cost history and tariff assumption |
| Calculate waste score | Medium | Summarizes avoidable waste |
| Serve Flask dashboard API | High | Send data to frontend |
| Install Mosquitto MQTT | Medium | For ESP32 communication |
| Integrate Twilio | Medium | For WhatsApp alert |

## 5. Machine learning tasks

| Task | Priority | Notes |
|---|---|---|
| Set up Python environment | High | Conda or venv |
| Download public datasets | High | UK-DALE, ENERTALK, etc. |
| Preprocess data to common format | High | Same sampling rate |
| Train kettle model | High | First proof of pipeline |
| Train other demo-core models | High | Lamp/hair dryer may need own data |
| Train supplementary models | Medium | AC, fridge, washer, etc. |
| Evaluate models | High | F1, MAE, SAE |
| Convert models to TFLite | High | Needed for Pi |
| Test TFLite inference | High | Check speed and output |
| Build routine-aware detection logic | High | Time/day + occupancy + historical usage |
| Build appliance health scoring logic | Medium | Compare current behavior with normal pattern |
| Build standby power detection | Medium | Detect always-on background load |
| Prepare ML result visuals | Medium | For pitch/demo |

## 6. ESP32 control tasks

| Task | Priority | Notes |
|---|---|---|
| Set up ESP32 development environment | High | Arduino IDE or PlatformIO |
| Read LD2410 mmWave sensor | High | Occupancy detection |
| Connect ESP32 to WiFi | High | Needed for MQTT |
| Publish occupancy to MQTT | High | ESP32 → Pi |
| Subscribe to AC command topic | High | Pi → ESP32 |
| Build IR LED transistor circuit | Medium | Needed for AC control |
| Send test IR signal | Medium | Can test with camera/receiver |
| Add AC brand remote code | Medium | Depends on demo AC |

## 7. Dashboard/frontend tasks

| Task | Priority | Notes |
|---|---|---|
| Build dashboard layout | High | Simple and clean |
| Show total power | High | Must work live |
| Show appliance cards | High | Kettle/lamp/hair dryer etc. |
| Show cost estimate | Medium | Based on tariff assumptions |
| Show projected bill | High | Key smart insight |
| Show waste score | Medium | Makes waste easy to understand |
| Show energy coach recommendation | Medium | Turns data into action |
| Show routine-aware insight | Medium | Example: unusual AC usage |
| Show appliance health score | Medium | Fridge/AC abnormality story |
| Show graph over time | Medium | Makes demo more visual |
| Show alert panel | Medium | AC empty-room alert |
| Connect to Flask API | High | Live data |
| Add demo mode | Medium | Useful backup |

## 8. Demo and pitch tasks

| Task | Priority | Notes |
|---|---|---|
| Prepare demo script | High | Avoid confusion during presentation |
| Decide live appliances | High | Choose reliable ones |
| Prepare backup recording | High | In case live ML fails |
| Prepare system diagram | High | Explain architecture quickly |
| Prepare ML explanation slide | High | One sensor + AI patterns |
| Prepare smart insight slide | High | Routine + forecast + recommendation |
| Prepare Q&A document | High | For judges |
| Practice full demo | High | Time the flow |
| Prepare safety explanation | Medium | Important if demo uses mains electricity |

## 9. Recommended build order

### Stage 1 — Prove power reading

Goal:

```text
Raspberry Pi can read total power from sensor.
```

Tasks:

- Build sensor circuit.
- Read ADS1115.
- Calculate approximate watts.
- Test with known appliance.

### Stage 2 — Prove dashboard

Goal:

```text
Dashboard updates when power changes.
```

Tasks:

- Build Flask API.
- Build simple dashboard.
- Show total power live.

### Stage 3 — Prove ML offline

Goal:

```text
Model can identify appliance patterns using dataset/notebook.
```

Tasks:

- Train kettle model.
- Evaluate model.
- Convert to TFLite.

### Stage 4 — Prove live ML

Goal:

```text
Live sensor readings can enter model and update dashboard.
```

Tasks:

- Create rolling window.
- Normalize input.
- Run TFLite model.
- Smooth prediction.
- Show appliance card.

### Stage 5 — Add control and alerts

Goal:

```text
System can detect empty room and send alert/control command.
```

Tasks:

- Connect ESP32 and mmWave.
- Use MQTT.
- Add WhatsApp/Twilio.
- Add IR control.

### Stage 6 - Add smart insight layer

Goal:

```text
System can turn appliance predictions into routine-aware insights, bill forecasts, and recommendations.
```

Tasks:

- Store timestamped power, predictions, occupancy, cost, and alerts.
- Learn simple routine baselines by hour/day.
- Add projected monthly bill.
- Add waste score.
- Add energy coach recommendation.
- Add appliance health score for at least one appliance story.
- Show these insights on the dashboard.

## 10. Priority labels

Use these labels in project management:

```text
P0 = must work for demo
P1 = strongly preferred
P2 = nice to have
P3 = future / pitch only
```

Suggested priorities:

| Feature | Priority |
|---|---|
| Total power sensing | P0 |
| Dashboard live total power | P0 |
| Kettle detection | P0/P1 |
| Second demo appliance detection | P1 |
| TFLite inference on Pi | P1 |
| AC empty-room alert | P1/P2 |
| Bill forecasting | P1 |
| Routine-aware alert | P1/P2 |
| Energy coach recommendation | P1/P2 |
| Waste score | P2 |
| Appliance health score | P2 |
| Standby power detection | P2 |
| Full 10 appliance dashboard | P2 |
| Anomaly detection | P2/P3 |
| Automatic AC control | P2 |

## 11. Simple weekly plan

### Week 1

- Finalize architecture.
- Set up Pi and ML environment.
- Build basic dashboard mockup.
- Start hardware sourcing.

### Week 2

- Build power sensing pipeline.
- Train first demo-core model.
- Start dashboard API.
- Test ESP32 occupancy separately.

### Week 3

- Integrate live data with dashboard.
- Convert models to TFLite.
- Test demo appliances.
- Add MQTT and alert flow.

### Week 4

- Polish dashboard.
- Prepare demo script.
- Record backup demo.
- Practice Q&A.
- Fix reliability issues.

## 12. Task ownership template

Use this table:

| Task | Owner | Priority | Status | Deadline | Notes |
|---|---|---|---|---|---|
| Read ADS1115 from Pi |  | P0 | Not started |  |  |
| Train kettle model |  | P0 | Not started |  |  |
| Build dashboard total power card |  | P0 | Not started |  |  |
| ESP32 reads mmWave |  | P1 | Not started |  |  |
| WhatsApp alert |  | P2 | Not started |  |  |

## 13. Main project management principle

Do not build the hardest version first.

Build in this order:

```text
Working simple system → reliable demo → expanded features → polished pitch
```

A simple working demo beats a huge unstable system.
