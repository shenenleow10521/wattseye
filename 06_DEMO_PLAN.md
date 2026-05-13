# 06 — Demo Plan: What We Show During Presentation

## 1. Purpose of this file

This file explains how we should demonstrate WattsEye.

It focuses on what happens during the live demo.

## 2. Demo goal

The demo should prove the main idea:

```text
One sensor can measure total electricity usage, and AI can estimate appliance-level usage.
```

The stronger demo story should also show that WattsEye turns those estimates into useful decisions:

```text
Appliance detection -> routine context -> bill forecast -> waste alert -> recommended action
```

The demo should not try to prove every future feature perfectly.

## 3. What must work live

Minimum live demo:

1. Dashboard opens.
2. Total power is shown.
3. An appliance turns on.
4. Total power changes.
5. Dashboard shows the change.
6. At least one demo-core appliance is identified or highlighted.
7. At least one smart insight is shown, such as projected bill, waste score, or energy coach recommendation.

## 4. Demo-core appliances

Choose appliances that are easy to bring and easy to understand.

Recommended:

- Kettle
- Lamp
- Hair dryer
- Phone charger
- Microwave, if safe and available

Kettle and hair dryer are especially useful because their power changes are large and obvious.

## 5. Supplementary appliances

These support the story but do not need to be live-perfect.

Examples:

- AC
- Fridge
- Washing machine
- Water heater
- Rice cooker
- Iron
- Fan

They can be shown through:

- Recorded results
- Dataset validation
- Dashboard mock data
- Future scalability explanation

## 6. Recommended demo sequence

### Part 1 — Introduce the problem

Say:

```text
Most people only see their total electricity bill, but they do not know which appliance caused it.
Smart plugs require one device per appliance. Our system uses one main sensor and AI.
```

### Part 2 — Show the hardware

Show:

- Demo box
- CT clamp
- Raspberry Pi
- ESP32
- Dashboard device

Explain simply:

```text
This clamp watches the total electricity flow.
The Raspberry Pi turns that into data and runs AI.
```

### Part 3 — Baseline reading

Open dashboard.

Show normal baseline usage.

Example:

```text
Current total power: 200W
```

### Part 4 — Turn on kettle

Turn on kettle.

Expected result:

```text
Total power jumps to around 2000W+.
Kettle card becomes active.
```

Explain:

```text
The system detects the power pattern and estimates kettle usage.
```

### Part 5 — Turn on another appliance

Turn on lamp or hair dryer.

Show dashboard update.

Explain:

```text
The same one sensor sees the combined signal. The AI tries to separate the appliance patterns.
```

### Part 6 — Show AC empty-room alert

This can be simulated or pre-recorded if no real AC is available.

Flow:

```text
AC detected as ON
Room occupancy = empty
System sends WhatsApp alert
User replies YES
ESP32 sends IR OFF command
```

### Part 7 - Show smart insight layer

Show prepared dashboard data if there is not enough real history yet.

Examples:

```text
Projected bill: RM128, 22% higher than usual
Waste score: 81/100
Main waste: AC ran in an empty room for 42 minutes
Recommendation: enable AC auto-off after 20 minutes empty
Estimated saving: RM18/month
```

Explain:

```text
The system does not only detect appliances. It learns normal routines, checks occupancy, forecasts cost, and recommends actions.
```

### Part 8 - Show supplementary model coverage

Show a slide or notebook result saying:

```text
We train around 10 appliance models.
Live demo focuses on high-confidence demo appliances.
Supplementary models support real household coverage, such as AC, fridge, washer, and water heater.
```

### Part 9 - End with impact

Say:

```text
WattsEye helps users understand electricity usage, predict bills, reduce waste, and detect appliance problems early without installing smart plugs everywhere.
```

## 7. What is live and what can be simulated

Be clear internally.

| Feature | Live or simulated? | Notes |
|---|---|---|
| Total power sensing | Live | Must work |
| Kettle detection | Live preferred | Demo-core |
| Lamp/hair dryer detection | Live preferred | Demo-core |
| AC detection | Can be recorded/simulated | Hard to bring AC |
| WhatsApp alert | Live or simulated | Depends on Twilio setup |
| IR AC off | Can be shown with LED or recorded | If no AC available |
| Fridge anomaly | Simulated/recorded | Better as dashboard story |
| Bill forecast / waste score | Simulated or based on stored sample data | Good smart-layer proof |
| Routine-aware insight | Simulated or based on stored sample data | Needs history, so sample data is acceptable |

## 8. Backup plan if ML fails live

If live appliance recognition is unstable:

- Still show live total power measurement.
- Show pre-recorded appliance disaggregation notebook.
- Show dashboard using prepared sample data.
- Explain that live integration is in progress but the model pipeline is validated separately.

This is safer than having the whole demo fail.

## 9. Demo script sample

```text
This is WattsEye, a one-sensor electricity intelligence system.
Instead of placing smart plugs on every appliance, we clip one sensor around the main wire.
The sensor reads total electricity usage.
Our AI then estimates which appliance is contributing to that total.

Now the dashboard shows the baseline usage.
When I turn on this kettle, the total power jumps.
The model recognizes this high-power pattern as kettle usage.

This proves our core idea: one sensor can create appliance-level insight.
The same architecture can scale to around 10 appliance models, including AC, fridge, washer, water heater, and rice cooker.

For Malaysian homes, the AC is especially important. If the AC is running but our mmWave sensor detects nobody in the room, the system can send a WhatsApp alert and even turn it off using infrared control.

The smarter layer goes further. It learns routines, forecasts the bill, scores avoidable waste, and recommends the best action. That means WattsEye is not only a monitor. It becomes an energy coach for the home.
```

## 10. Things not to overclaim

Avoid saying:

```text
All 10 models work perfectly live.
```

Better say:

```text
We train around 10 models to show scalability, but the live demo focuses on high-confidence appliances.
```

Avoid saying:

```text
The AI is always accurate.
```

Better say:

```text
The model estimates appliance usage based on learned electrical patterns, and accuracy improves with calibration and local data.
```

## 11. Demo success criteria

The demo is successful if judges understand:

1. Why one sensor is useful.
2. How AI separates appliance patterns.
3. How the dashboard gives practical value.
4. Why this is better than many smart plugs.
5. How routine-aware insights, bill forecasting, and recommendations make the system smarter.
6. How the system can scale beyond the prototype.

## 12. Demo summary

The demo should be simple:

```text
Show sensor -> turn on appliance -> show dashboard -> explain AI -> show smart insight -> show alert/control vision
```

Do not overload the live demo with too many appliances.

A clean demo with two strong appliances is better than a messy demo with 10 unstable predictions.
