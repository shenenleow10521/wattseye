# 02 — Hardware: What We Need and How It Works

## 1. Purpose of this file

This file explains the physical parts of WattsEye.

It focuses on:

- What hardware we need
- Why each part exists
- How each part connects
- What safety rules matter

This file is written for beginners.

## 2. Full hardware list

### Electricity sensing hardware

- CT clamp sensor, such as SCT-013-030
- Voltage sensor module, such as ZMPT101B
- ADS1115 ADC breakout board
- Signal conditioning components:
  - Burden resistor
  - Voltage divider resistors
  - Capacitor
- Raspberry Pi 4
- Jumper wires
- Breadboard or PCB

### Control and occupancy hardware

- ESP32 development board
- LD2410 mmWave sensor
- IR LED
- NPN transistor, such as 2N2222
- Resistors for transistor and LED circuit

### Demo rig hardware

- Clear or closed plastic enclosure
- Power inlet cable
- Outlet bank or extension socket
- Inline fuse
- Terminal blocks
- Live, neutral, and earth wiring
- Strain relief for cable

## 3. Safety warning

The demo box involves mains electricity.

In Malaysia, this is around 240V AC.

This can be dangerous.

Important rules:

- Do not leave live wires exposed.
- Put high-voltage parts inside a closed enclosure.
- Use an inline fuse.
- Connect earth properly.
- Separate high-voltage wiring from low-voltage electronics.
- Use strain relief so cables cannot be pulled loose.
- Ask a lecturer, lab technician, or electrician to check before powering on.

The software can be tested safely first. The mains wiring must be treated carefully.

## 4. CT clamp

### What it is

A CT clamp is a plastic clip that wraps around a wire.

It does not cut the wire.

It does not directly touch the copper conductor.

### Why we need it

It measures current safely.

When electricity flows through a wire, it creates a magnetic field.

The CT clamp senses this magnetic field.

More current means a stronger magnetic field.

### Where it goes

The CT clamp clips around the main live wire inside the demo box.

It should only go around the live wire, not live and neutral together.

### What happens if we remove it

The system cannot measure electricity usage.

## 5. Why the CT clamp signal needs conditioning

The CT clamp produces a small AC signal.

This signal moves positive and negative.

But the electronics can only read safe positive voltages.

So we need a signal conditioning circuit.

The circuit does three main things:

1. Converts the clamp signal into a measurable voltage.
2. Shifts the signal upward so it stays positive.
3. Keeps the signal inside a safe voltage range.

## 6. Burden resistor

### What it does

The CT clamp output behaves like a current signal.

The ADC reads voltage, not current.

The burden resistor converts that current signal into a voltage signal.

### Simple analogy

The clamp gives “flow.”

The resistor turns that flow into “pressure” that the chip can measure.

## 7. Voltage divider

### What it does

The voltage divider creates a safe midpoint voltage.

For a 3.3V system, the midpoint is usually around 1.65V.

This shifts the AC signal upward.

### Why it matters

Without this, part of the signal may go negative.

The ADC cannot read negative voltage safely.

## 8. Capacitor

### What it does

The capacitor helps combine the moving clamp signal with the steady midpoint voltage.

This allows the final signal to wobble around 1.65V instead of 0V.

## 9. ADS1115 ADC

### What it is

ADS1115 is an analog-to-digital converter.

### Why we need it

The Raspberry Pi does not have analog input pins.

The clamp and voltage sensor produce analog signals.

The ADS1115 converts those analog signals into digital numbers.

### How it connects to Raspberry Pi

Typical connection:

```text
ADS1115 VDD → Raspberry Pi 3.3V
ADS1115 GND → Raspberry Pi GND
ADS1115 SDA → Raspberry Pi GPIO 2
ADS1115 SCL → Raspberry Pi GPIO 3
CT clamp conditioned signal → ADS1115 A0
Voltage sensor output → ADS1115 A1
```

## 10. ZMPT101B voltage sensor

### What it is

ZMPT101B is a voltage sensor module.

### Why we need it

To calculate power, we need voltage and current.

```text
Power = Voltage × Current
```

The CT clamp gives current information.

The ZMPT101B gives voltage information.

### Why not measure 240V directly?

Because 240V is dangerous and too high for electronics.

The ZMPT101B safely converts it into a small signal.

## 11. Raspberry Pi

### What it is

A Raspberry Pi is a small computer.

### What it does in this project

It handles:

- Reading ADS1115 data
- Calculating power
- Running AI models
- Storing readings
- Hosting dashboard
- Sending WhatsApp alerts
- Communicating with ESP32

## 12. ESP32

### What it is

ESP32 is a small microcontroller board with WiFi.

### What it does in this project

It handles:

- Reading the mmWave sensor
- Sending IR commands to AC
- Receiving commands from Raspberry Pi

## 13. LD2410 mmWave sensor

### What it is

A presence sensor.

It detects whether someone is in the room.

### Why we use mmWave instead of normal motion sensor

Normal PIR motion sensors mainly detect movement.

If a person sits still, a PIR sensor may think the room is empty.

mmWave can detect smaller movements, including breathing-like movement.

This is better for room occupancy.

## 14. IR LED and transistor

### What it does

The IR LED sends infrared light signals like an AC remote.

### Why we need a transistor

The ESP32 pin is not strong enough to drive the IR LED brightly by itself.

The transistor acts like a switch.

The ESP32 controls the transistor, and the transistor allows more current to pass through the IR LED.

## 15. Demo box build concept

The demo box simulates a home distribution system.

It should contain:

```text
Power inlet
↓
Fuse
↓
Live wire to outlet bank
```

The CT clamp wraps around the live wire after the fuse.

The voltage sensor connects across live and neutral after the fuse.

Low-voltage sensor wires go out to the electronics area.

## 16. Hardware testing order

Recommended order:

1. Build low-voltage circuits first without mains power.
2. Test Raspberry Pi and ADS1115 using simple known signals.
3. Test ESP32 and mmWave sensor.
4. Test ESP32 and IR LED with an AC or IR receiver.
5. Build demo box wiring.
6. Ask someone qualified to check wiring.
7. Power on with caution.
8. Test with one appliance.
9. Compare measured power with expected appliance rating.

## 17. Common beginner mistakes

### Mistake 1: Clamping around both live and neutral

If the clamp wraps around both live and neutral, the magnetic fields may cancel out.

The reading may become near zero.

### Mistake 2: Feeding raw clamp signal directly to electronics

The signal may go negative or exceed safe range.

Use signal conditioning.

### Mistake 3: Forgetting voltage measurement

Current alone is not enough for accurate watt calculation.

### Mistake 4: Mixing high-voltage and low-voltage areas

Keep mains wiring away from Raspberry Pi, ESP32, and breadboard.

### Mistake 5: No calibration

Even if the circuit works, readings may not match real watts.

Use known appliances to calibrate.

## 18. Hardware summary

The hardware does not magically identify appliances.

It only produces electricity data.

The AI does the appliance identification.

The hardware goal is:

```text
Safely convert real electricity usage into clean digital power readings.
```
