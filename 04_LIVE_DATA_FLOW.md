# 04 — Live Data Flow: How Real Sensor Data Enters the AI

## 1. Purpose of this file

This file explains the bridge between hardware and machine learning.

The hardware file explains how we measure electricity.

The ML file explains how we train the model.

This file explains how live sensor readings become model input.

It also explains how live predictions become smarter insights using stored history, occupancy, routine patterns, and cost assumptions.

This is one of the most important files because many people understand hardware and ML separately, but not how they connect.

## 2. The full live data flow

```text
CT clamp and voltage sensor
↓
ADS1115 raw readings
↓
Convert raw readings to current and voltage
↓
Calculate real power in watts
↓
Store one reading per second
↓
Build a rolling time window
↓
Normalize the input
↓
Feed the window into TFLite models
↓
Get appliance predictions
↓
Smooth predictions
↓
Send results to dashboard
```

## 3. Step 1 — Sensor readings

The CT clamp gives current-related signal.

The voltage sensor gives voltage-related signal.

These signals are analog.

The ADS1115 converts them into digital numbers.

The Raspberry Pi reads these numbers.

At this point, the numbers are not yet meaningful watts.

They are still raw readings.

## 4. Step 2 — Convert raw readings into voltage and current

The Raspberry Pi needs to convert ADS1115 readings into real-world values.

Example:

```text
ADS1115 reading → sensor voltage
Sensor voltage → current estimate
Voltage sensor reading → mains voltage estimate
```

This requires calibration.

## 5. Step 3 — Calculate watts

Once we have current and voltage, we calculate power.

```text
Power = Voltage × Current
```

In real AC systems, power calculation can be more complex because voltage and current are waves.

For a prototype, we estimate real-time power using sampled voltage and current values over a short time window.

The goal is to output one useful power value per second.

Example:

```text
Second 1: 230W
Second 2: 235W
Second 3: 2250W
Second 4: 2240W
```

## 6. Step 4 — Resample to 1 Hz

The AI model expects data at a fixed rate.

A simple choice is 1 reading per second.

This is called **1 Hz**.

Even if the sensor reads faster internally, we summarize it into one value per second.

Example:

```text
Power at 10:00:01 = 230W
Power at 10:00:02 = 232W
Power at 10:00:03 = 2200W
```

## 7. Step 5 — Store a rolling window

The model does not look at only one power value.

It looks at a window of recent power values.

Example window size:

```text
599 seconds for kettle or microwave
1023 seconds for fridge or AC
2047 seconds for washing machine
```

A rolling window means the system always keeps the latest readings.

Example:

```text
At second 600: use readings 1–599
At second 601: use readings 2–600
At second 602: use readings 3–601
```

## 8. Step 6 — Normalize the input

The live input must be prepared the same way as the training data.

If the training data was normalized, the live data must also be normalized.

Example:

```text
normalized_power = (power - mean) / standard_deviation
```

This is important.

If training data and live data are prepared differently, the model may perform badly.

## 9. Step 7 — Feed into TFLite model

The Raspberry Pi loads the TFLite models.

Each model receives the rolling window.

Example:

```text
kettle_model(input_window) → kettle power estimate
fridge_model(input_window) → fridge power estimate
ac_model(input_window) → AC power estimate
```

If we train around 10 models, the Pi may run multiple models every second.

For the live demo, we can prioritize demo-core models first.

## 10. Step 8 — Smooth the prediction

Raw model outputs may jump around.

Example:

```text
Kettle prediction: 0W, 1500W, 2100W, 1800W, 2050W
```

To make the dashboard look stable, we can smooth predictions.

Simple methods:

- Moving average
- Ignore tiny predictions below a threshold
- Require the prediction to stay active for a few seconds

Example rule:

```text
If kettle prediction is below 100W, show 0W.
If it stays above 1000W for 3 seconds, show kettle ON.
```

## 11. Step 9 — Send to dashboard

After smoothing, the Raspberry Pi sends the appliance predictions to the dashboard.

Example dashboard data:

```json
{
  "total_power": 2250,
  "appliances": {
    "kettle": 2000,
    "lamp": 15,
    "fridge": 120,
    "ac": 0
  }
}
```

The dashboard updates the appliance cards.

Before triggering smarter alerts, the Raspberry Pi should also store history and run the smart insight engine.

History to store:

- Timestamp
- Total power
- Appliance predictions
- Occupancy state
- Estimated cost
- Alerts triggered
- User responses, if any

This history lets WattsEye learn routines such as normal AC hours, usual kettle time, typical empty-room periods, and normal standby power.

The smart insight engine combines current predictions, occupancy, time/day, historical routine patterns, tariff assumptions, and anomaly scores.

It can output bill forecasts, waste scores, routine-aware alerts, energy coach recommendations, appliance health warnings, and standby power insights.

## 12. Step 10 — Trigger alerts

The same prediction data can trigger alerts.

Example:

```text
AC model says AC is on.
mmWave says room is empty.
This continues for 30 minutes.
System sends WhatsApp alert.
```

Smarter alert example:

```text
AC model says AC is on.
mmWave says room is empty.
This continues for 30 minutes.
The home is usually empty at this time.
The bill forecast is trending high.
System sends an alert with estimated avoidable cost.
```

## 13. Calibration plan

Calibration makes readings more believable.

Use known appliances.

Example:

1. Plug in a kettle rated around 2000W.
2. See what WattsEye reads.
3. If it reads 1800W, apply a correction factor.
4. Repeat with another appliance.

This helps align sensor output with real power.

## 14. Demo calibration table

Create a table like this during testing:

| Appliance | Expected power | Measured power | Correction needed? |
|---|---:|---:|---|
| Kettle | 2000W | 1900W | Yes |
| Lamp | 15W | 18W | Small error |
| Hair dryer | 1200W | 1150W | Small error |

## 15. Why live data may differ from training data

Training data comes from public datasets.

Live data comes from our demo rig.

They may differ because of:

- Different sampling rate
- Different sensor noise
- Different appliance brands
- Different voltage levels
- Different wiring setup
- Different appliance combinations

That is why calibration and demo fine-tuning matter.

## 16. Minimum live demo pipeline

For a simple working demo, we need at least:

```text
Sensor reading → watts calculation → rolling window → one or two demo models → dashboard
```

The complete system can have 10 models, alerts, anomaly detection, routine-aware insights, bill forecasting, and recommendations.

But the first working version should prove the main pipeline.

## 17. Recommended live demo priority

Priority 1:

```text
Show total power changes accurately.
```

Priority 2:

```text
Show one demo-core appliance detection, such as kettle.
```

Priority 3:

```text
Show multiple appliance predictions.
```

Priority 4:

```text
Show occupancy + AC alert flow.
```

Priority 5:

```text
Show anomaly detection.
```

Priority 6:

```text
Show smart insights: projected bill, waste score, routine-aware alert, or energy coach recommendation.
```

## 18. Backup plan

If live ML is unstable, we can still demo honestly by separating parts:

- Live sensor shows total power.
- Pre-recorded or notebook output shows appliance disaggregation.
- Dashboard mock/live hybrid shows final product experience.

This is acceptable for a prototype if we clearly explain what is live and what is simulated.

## 19. Main takeaway

The live data flow is the bridge:

```text
Real electricity → clean watts → model input → appliance prediction → user display
```

If this bridge is unclear, teammates may understand the hardware and ML separately but not the full system.
