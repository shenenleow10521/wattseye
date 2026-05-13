# 09 — Components List and Price Estimation

## Purpose of this file

This file helps the team understand **what we need to buy, what we may already have, and how much the prototype may cost**.

This is not the final shopping list yet. It is a **budget planning file**.

Prices can change depending on seller, shipping, quality, and whether the item is local stock or overseas stock. For the final purchase, we should compare 2–3 sellers before buying.

---

# 1. Important idea: split components into categories

Do not treat every component as equally important.

Some parts are **core**. Without them, the demo cannot work.

Some parts are **feature add-ons**. They support occupancy detection, AC control, and alerts.

Some parts are **safety/build parts**. They are not exciting, but they are very important because the demo uses mains electricity.

---

# 2. Prototype component categories

## A. Core electricity sensing parts

These are needed for the main promise of WattsEye:

> One sensor reads total electricity, then AI separates appliance usage.

| Component | Qty | Estimated price range | Why we need it | Priority |
|---|---:|---:|---|---|
| CT clamp sensor, e.g. SCT-013-030 | 1 | RM25–RM60 | Clips around the live wire to sense current without cutting the wire | Must-have |
| ZMPT101B voltage sensor module | 1 | RM10–RM25 | Measures mains voltage safely after stepping it down | Must-have |
| ADS1115 ADC module | 1 | RM6–RM25 | Converts analog sensor signals into digital values for Raspberry Pi | Must-have |
| Burden resistor, e.g. 33Ω | 1–3 | RM1–RM5 total | Helps convert CT clamp output into measurable voltage | Must-have |
| 10kΩ resistors | 2–10 | RM1–RM5 total | Creates the voltage divider / midpoint for safe signal reading | Must-have |
| Capacitor for signal coupling | 1–3 | RM1–RM5 total | Helps shift the AC signal into a readable range | Must-have |

Estimated subtotal: **RM44–RM125**

---

## B. Main computing and control parts

These parts run the software, AI model, dashboard, and device control.

| Component | Qty | Estimated price range | Why we need it | Priority |
|---|---:|---:|---|---|
| Raspberry Pi 4, preferably 4GB RAM | 1 | RM250–RM650 | Main brain: reads power data, runs ML model, hosts dashboard | Must-have |
| Raspberry Pi power supply, USB-C 5V 3A | 1 | RM25–RM60 | Stable power for Raspberry Pi | Must-have |
| MicroSD card, 32GB or 64GB | 1 | RM20–RM50 | Stores Raspberry Pi OS, code, models, logs | Must-have |
| ESP32 dev board | 1 | RM8–RM35 | Helper controller for mmWave sensor and IR AC control | Must-have if doing AC automation |
| USB cable for ESP32 | 1 | RM5–RM15 | Programming and power | Useful |

Estimated subtotal: **RM308–RM810**

Note: The Raspberry Pi is the most expensive and price-volatile item. If we already have one, the total cost drops a lot.

---

## C. Occupancy and AC-control feature parts

These parts support the smart “empty room + AC still running” feature.

| Component | Qty | Estimated price range | Why we need it | Priority |
|---|---:|---:|---|---|
| LD2410 / LD2410B mmWave human presence sensor | 1 | RM25–RM35 | Detects whether someone is in the room, even if they are sitting still | Important feature |
| IR LED | 1–3 | RM1–RM5 total | Sends invisible AC remote-control signal | Important feature |
| NPN transistor, e.g. 2N2222 | 1–3 | RM1–RM5 total | Lets ESP32 drive the IR LED strongly enough | Important feature |
| Resistors for IR circuit, e.g. 100Ω / 220Ω | Several | RM1–RM5 total | Protects LED and transistor circuit | Important feature |
| Small wires / heat shrink / tape | Some | RM5–RM15 | Keeps IR circuit stable | Useful |

Estimated subtotal: **RM33–RM65**

---

## D. Prototyping and wiring parts

These make the circuit easier to build and test.

| Component | Qty | Estimated price range | Why we need it | Priority |
|---|---:|---:|---|---|
| Breadboard | 1–2 | RM1–RM10 | Build circuits without soldering | Must-have for early prototype |
| Jumper wires | 1 set | RM5–RM20 | Connect modules together | Must-have |
| Screw terminal blocks | Several | RM5–RM20 | Safer wire connection inside demo box | Must-have |
| Small PCB / perfboard | 1 | RM5–RM20 | More stable version after breadboard testing | Useful |
| Multimeter | 1 | RM20–RM80 | Testing continuity, voltage, and wiring safety | Must-have |
| USB keyboard/mouse/HDMI cable for Pi setup | 1 set | RM0–RM50 | Only needed if not using SSH/headless setup | Optional |

Estimated subtotal: **RM36–RM200**

---

## E. Demo rig and safety parts

These are for the physical demo box.

Because this system touches mains electricity, this category matters a lot.

| Component | Qty | Estimated price range | Why we need it | Priority |
|---|---:|---:|---|---|
| Clear plastic enclosure / electrical box | 1 | RM20–RM80 | Holds the demo wiring safely | Must-have |
| Extension socket / outlet bank | 1 | RM15–RM40 | Lets us plug in demo appliances | Must-have |
| 13A plug + power cable | 1 | RM10–RM30 | Power input for demo rig | Must-have |
| Inline fuse holder + fuse, around 10A | 1 | RM5–RM20 | Protects circuit if something goes wrong | Must-have |
| Proper earth wire / cable lugs | Some | RM5–RM20 | Safety grounding | Must-have |
| Strain relief / cable gland | 1–2 | RM3–RM15 | Stops cable from being pulled loose | Must-have |
| Insulation tape / heat shrink | Some | RM5–RM15 | Covers and protects connections | Must-have |
| Labels / warning stickers | Some | RM2–RM10 | Makes demo safer and clearer | Useful |

Estimated subtotal: **RM65–RM230**

Important: Do not power the demo rig until a lecturer, lab technician, or electrician checks the wiring.

---

## F. Demo appliances

We do not need to buy all of these if the team can borrow them.

| Appliance | Qty | Estimated price range if buying | Why we use it | Demo value |
|---|---:|---:|---|---|
| Kettle | 1 | RM30–RM100 | Clear high-power on/off pattern | Very high |
| Hair dryer | 1 | RM30–RM100 | Strong power change, easy live demo | Very high |
| Lamp | 1 | RM10–RM40 | Simple low-power appliance | Medium |
| Phone charger | 1 | RM0–RM30 | Small load, shows limitation of detection | Medium |
| Microwave | 1 | Borrow | Strong appliance signature | High, but hard to carry |
| Fan | 1 | RM30–RM100 | Common Malaysian appliance | Medium |
| Rice cooker | 1 | RM50–RM150 | Malaysian/Asian relevance | High |
| Portable AC / actual AC | 1 | Borrow only | Important product story | High, but not practical for live stage |

Estimated subtotal if buying only basic demo appliances: **RM70–RM270**

---

# 3. Total estimated budget

## Minimum working prototype

This version focuses on:

- CT clamp power sensing
- Raspberry Pi reading data
- Simple dashboard
- A few live demo appliances

Estimated cost:

> **RM450–RM900**

This assumes we buy a Raspberry Pi and most electronics.

If we already have the Raspberry Pi, the cost may drop to around:

> **RM200–RM350**

---

## Full stronger prototype

This version includes:

- Power sensing
- Voltage sensing
- Raspberry Pi dashboard
- ESP32
- mmWave occupancy sensor
- IR AC control
- Safer demo enclosure
- More polished wiring

Estimated cost:

> **RM650–RM1,300**

The largest cost difference depends on the Raspberry Pi and whether we already own demo appliances.

---

# 4. What we should buy first

## First purchase batch: make electricity sensing work

Buy these first:

| Item | Reason |
|---|---|
| CT clamp | Main electricity sensor |
| ADS1115 | Needed for Pi to read analog signal |
| ZMPT101B | Needed for voltage measurement |
| Resistors + capacitor | Needed for signal conditioning |
| Breadboard + jumper wires | Needed to prototype the circuit |
| Raspberry Pi 4 + power supply + SD card | Needed to run the main system |

Goal after Batch 1:

> Raspberry Pi can read current/voltage and show total watts.

---

## Second purchase batch: make the demo safe and presentable

Buy these next:

| Item | Reason |
|---|---|
| Clear enclosure | Makes the demo visible and safer |
| Fuse holder + fuse | Protects the system |
| Cable gland / strain relief | Prevents cable pulling |
| Terminal blocks | Cleaner and safer wiring |
| Labels | Helps judges understand the demo |

Goal after Batch 2:

> We have a safe demo box where appliances can be plugged in.

---

## Third purchase batch: add smart control features

Buy these after the main sensing works:

| Item | Reason |
|---|---|
| ESP32 | Controls sensors and IR |
| LD2410 mmWave sensor | Detects room occupancy |
| IR LED | Sends AC control signal |
| 2N2222 transistor + resistors | Makes IR LED strong enough |

Goal after Batch 3:

> System can detect empty room and simulate / perform AC-off control.

---

# 5. What we can borrow instead of buying

To reduce cost, try to borrow:

- Raspberry Pi
- Multimeter
- Kettle
- Hair dryer
- Lamp
- Fan
- Microwave
- Rice cooker
- Extension socket
- Basic wires
- Enclosure
- Screw terminals
- Soldering iron

The most important item to borrow is the **Raspberry Pi**, because it is the biggest cost.

---

# 6. Must-have vs optional list

## Must-have for basic demo

- CT clamp
- ADS1115
- Signal conditioning components
- Raspberry Pi
- Power supply
- MicroSD card
- Breadboard
- Jumper wires
- Demo box / outlet rig
- Fuse
- Basic appliances

## Important but not required for first demo

- ZMPT101B voltage sensor  
  We can temporarily assume 240V for a rough demo, but actual voltage sensing is better and more defensible.

- ESP32  
  Needed only when we add mmWave and IR control.

- LD2410 mmWave sensor  
  Needed for occupancy feature.

- IR LED and transistor  
  Needed for AC control feature.

## Optional / polish

- PCB / perfboard
- Better enclosure
- Printed labels
- Dashboard tablet stand
- Extra appliance props

---

# 7. Budget risk notes

## Risk 1: Raspberry Pi price changes a lot

The Raspberry Pi may cost much more than expected depending on stock and RAM size.

Mitigation:

- Borrow from lab if possible.
- Use Raspberry Pi 4 with 2GB or 4GB if enough.
- Use laptop for training and only use Pi for inference/demo.
- If Pi is unavailable, run dashboard and ML on a laptop first, then port to Pi later.

---

## Risk 2: Cheap modules may be inconsistent

Very cheap ADS1115, ZMPT101B, or CT clamp modules may have different quality.

Mitigation:

- Buy 1 extra small module if budget allows.
- Test each sensor separately before full integration.
- Use calibration with known appliances.

---

## Risk 3: Safety parts get ignored

Safety parts look boring, but they are critical.

Mitigation:

- Put safety parts in the first budget, not as “later if enough money.”
- Get wiring checked before powering on.

---

# 8. Recommended budget table for proposal / teammate planning

| Budget level | What it includes | Estimated cost |
|---|---|---:|
| Basic proof-of-concept | Power sensing + Pi + simple dashboard | RM450–RM900 |
| Safer demo build | Basic version + enclosure + fuse + cleaner wiring | RM550–RM1,050 |
| Full prototype | Safer demo + ESP32 + mmWave + IR AC control | RM650–RM1,300 |
| Lower-cost version if borrowing Pi | Most electronics, but no Pi purchase | RM200–RM450 |

---

# 9. Final recommendation

For our team, the best strategy is:

1. **Do not buy everything at once.**
2. First prove that the Raspberry Pi can read electricity data.
3. Then build the safe demo box.
4. Then add ML inference.
5. Only after that, add mmWave + IR AC control.

The buying order should follow the build order.

The most important early milestone is:

> Can we turn on a kettle and see the total wattage increase correctly?

If yes, the hardware foundation works.

After that, the AI and dashboard become much easier to explain and demonstrate.
