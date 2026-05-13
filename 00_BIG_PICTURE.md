# 00 — Big Picture: What Are We Building?

## 1. Project name

**WattsEye**

## 2. One-sentence explanation

WattsEye is a home electricity monitoring system that uses **one main electricity sensor** and **AI** to estimate which appliances are using power, how much they cost, and whether something wasteful or abnormal is happening.

## 3. The problem

Most homes only know their total electricity bill at the end of the month.

The problem is:

- Users do not know which appliance is wasting electricity.
- Users only see the total bill, not appliance-level usage.
- Smart plugs require one plug per appliance.
- Smart plugs cannot easily monitor hardwired appliances like air conditioners, water heaters, or built-in systems.
- Users may forget to turn off AC, heaters, or other high-power appliances.
- Appliances may become inefficient or faulty before users notice.

## 4. Our solution

Instead of using many smart plugs, WattsEye uses **one CT clamp sensor** clipped around the main live wire.

That one sensor reads the total electricity usage of the whole house or demo box.

Then machine learning tries to separate the total electricity signal into different appliances.

Example:

```text
Total electricity signal
= fridge + kettle + AC + lamp + microwave + other appliances
```

The AI looks at the shape of electricity usage and estimates which appliance is active.

## 5. Simple analogy

Imagine standing outside a room where many people are talking.

At first, you hear one messy sound.

But if you know each person’s voice, you can guess who is speaking.

WattsEye works similarly:

- The total electricity signal is the messy sound.
- Each appliance has its own “electricity voice.”
- The AI learns those voices.
- The system estimates which appliance is using power.

## 6. What makes this different from smart plugs?

| Smart Plug System | WattsEye |
|---|---|
| Needs one smart plug per appliance | Uses one main sensor |
| Cannot easily monitor hardwired appliances | Can monitor appliances through main power signal |
| More setup work | Simpler installation concept |
| Shows usage only for plugged devices | Estimates usage across the whole home |
| Hardware-heavy | AI-heavy |

## 7. Three main product pillars

### Pillar 1 — Appliance-level electricity breakdown

The dashboard shows estimated power usage, cost, timing, and explanation for each appliance.

Example:

```text
Kettle: 2000W
Fridge: 120W
AC: 900W
Lamp: 15W
```

It can also show an event timeline and confidence explanation:

```text
7:05 AM - Kettle likely turned on
Reason: sudden 2000W rise lasting around 3 minutes
```

### Pillar 2 — Smart waste prevention

The system can detect waste by combining appliance detection, occupancy, routines, and cost forecasting.

Example situations:

```text
AC is running, but nobody is in the room.
AC usage is higher than usual for this time of day.
This month's bill is projected to be higher than normal.
```

Then it can send a useful alert or recommendation:

```text
AC is on in an empty room. Turn it off?
```

If the user says yes, the ESP32 sends an infrared signal to turn off the AC.

### Pillar 3 — Appliance abnormality warning

The system can learn normal appliance behavior and give appliance health warnings.

If an appliance starts behaving differently, the system can warn the user.

Example:

```text
Your fridge compressor seems to be cycling more often than usual.
This may indicate inefficiency or early fault.
```

## 8. Smart insight layer

The smarter version of WattsEye is not only appliance detection.

It adds a decision layer after the AI predictions:

```text
Power patterns
-> appliance predictions
-> occupancy status
-> household routine patterns
-> cost and health analysis
-> alerts, scores, forecasts, and recommendations
```

Examples of smart insights:

- Bill forecast: projected monthly cost before the bill arrives
- Waste score: daily score based on avoidable electricity use
- Energy coach: practical recommendations to save money
- Routine-aware alerts: warnings only when behavior is unusual for that home
- Appliance health score: early warning when usage patterns drift from normal
- Standby power detection: estimate always-on background load

## 9. What we are building for the prototype

For the prototype, we are not trying to build a perfect full commercial product.

We are building a working demonstration that proves the idea:

```text
One sensor -> total electricity data -> AI appliance estimation -> smart insight layer -> dashboard -> alerts / control
```

## 10. Important prototype strategy

We may train around **10 appliance models**, but not all of them are equally important for the live demo.

We split them into:

### Demo-core models

These are the appliances we want to show live.

Examples:

- Kettle
- Lamp
- Hair dryer
- Phone charger
- Microwave, if available

### Supplementary models

These support the pitch and show scalability.

Examples:

- Air conditioner
- Fridge
- Washing machine
- Water heater
- Rice cooker
- Iron
- Fan

The live demo focuses on appliances that are easy to test on stage. The extra models show that the system can scale to a real home.

## 11. The project in one simple line

**WattsEye is like a Fitbit for your house: one sensor watches the whole home, AI identifies appliance activity, and your phone shows usage, forecasts, waste, recommendations, and early warnings.**
