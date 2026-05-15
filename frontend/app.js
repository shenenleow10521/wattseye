const dashboardData = {
  currentPowerWatts: 2250,
  todayUsageKwh: 9.8,
  todayCostRm: 3.2,
  projectedBillRm: 128,
  normalBillRm: 105,
  savingStatus: "Needs attention",
  wasteScore: 81,
  billReason: "extra AC usage",
  appliances: [
    {
      name: "Kettle",
      icon: "☕",
      status: "ON",
      watts: 2000,
      costPerHour: 1.1,
      confidence: 94,
    },
    {
      name: "Fridge",
      icon: "🧊",
      status: "Normal",
      watts: 120,
      costPerHour: 0.07,
      confidence: 88,
    },
    {
      name: "Lamp",
      icon: "💡",
      status: "ON",
      watts: 15,
      costPerHour: 0.01,
      confidence: 91,
    },
    {
      name: "Air Conditioner",
      icon: "❄️",
      status: "Idle risk",
      watts: 0,
      costPerHour: 0,
      confidence: 76,
    },
    {
      name: "Standby Load",
      icon: "📺",
      status: "Always on",
      watts: 85,
      costPerHour: 0.05,
      confidence: 82,
    },
  ],
  recentUsageKw: [0.3, 0.45, 0.6, 1.2, 2.25, 1.7, 0.95, 0.55],
  alerts: [
    {
      title: "AC ran in an empty room for 42 minutes",
      message:
        "Enable auto-off after 20 minutes empty to save about RM18/month.",
      icon: "🚨",
      level: "high",
    },
    {
      title: "Projected bill is 22% higher than usual",
      message:
        "Most extra usage came from afternoon cooling. Try 25°C eco mode during peak hours.",
      icon: "📈",
      level: "medium",
    },
    {
      title: "Fridge pattern looks healthy",
      message:
        "Cycling behavior is regular. No maintenance warning detected today.",
      icon: "✅",
      level: "low",
    },
  ],
};

const currencyFormatter = new Intl.NumberFormat("en-MY", {
  style: "currency",
  currency: "MYR",
  maximumFractionDigits: 0,
});

const decimalCurrencyFormatter = new Intl.NumberFormat("en-MY", {
  style: "currency",
  currency: "MYR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function setText(id, value) {
  document.getElementById(id).textContent = value;
}

function renderSummary() {
  setText(
    "currentPower",
    `${dashboardData.currentPowerWatts.toLocaleString()} W`,
  );
  setText("todayUsage", `${dashboardData.todayUsageKwh.toFixed(1)} kWh`);
  setText(
    "todayCost",
    `${decimalCurrencyFormatter.format(dashboardData.todayCostRm)} estimated cost today`,
  );
  setText(
    "monthlyBill",
    currencyFormatter.format(dashboardData.projectedBillRm),
  );
  setText("billDelta", "22% higher than normal usage");
  setText("savingStatus", dashboardData.savingStatus);
  setText("savingScore", `${dashboardData.wasteScore}/100 waste score`);
}

function renderAppliances() {
  const maxWatts = Math.max(
    ...dashboardData.appliances.map((appliance) => appliance.watts),
  );
  const applianceList = document.getElementById("applianceList");

  applianceList.innerHTML = dashboardData.appliances
    .map((appliance) => {
      const usageWidth = maxWatts
        ? Math.max((appliance.watts / maxWatts) * 100, 4)
        : 4;
      const hourlyCost = decimalCurrencyFormatter.format(appliance.costPerHour);

      return `
        <div class="appliance-row">
          <div class="appliance-icon" aria-hidden="true">${appliance.icon}</div>
          <div class="appliance-main">
            <div class="appliance-top">
              <span>${appliance.name}</span>
              <span>${appliance.watts} W</span>
            </div>
            <div class="usage-track" aria-label="${appliance.name} usage level">
              <div class="usage-fill" style="width: ${usageWidth}%"></div>
            </div>
            <p class="appliance-meta">
              Status: ${appliance.status} • ${hourlyCost}/hour • ${appliance.confidence}% confidence
            </p>
          </div>
        </div>
      `;
    })
    .join("");
}

function renderUsageChart() {
  const chart = document.getElementById("usageChart");
  const maxKw = Math.max(...dashboardData.recentUsageKw);

  chart.innerHTML = dashboardData.recentUsageKw
    .map((usage, index) => {
      const height = Math.max((usage / maxKw) * 100, 8);
      const label = `${7 - index}h ago`;

      return `
        <div class="bar">
          <span style="height: ${height}%" title="${usage.toFixed(2)} kW"></span>
          <span>${label}</span>
        </div>
      `;
    })
    .join("");
}

function renderForecast() {
  const meterWidth = Math.min(
    (dashboardData.projectedBillRm / (dashboardData.normalBillRm * 1.4)) * 100,
    100,
  );

  document.getElementById("billMeter").style.width = `${meterWidth}%`;
  setText(
    "forecastBill",
    currencyFormatter.format(dashboardData.projectedBillRm),
  );
  setText("normalBill", currencyFormatter.format(dashboardData.normalBillRm));
  setText("billReason", dashboardData.billReason);
}

function renderAlerts() {
  const alertsList = document.getElementById("alertsList");

  alertsList.innerHTML = dashboardData.alerts
    .map(
      (alert) => `
        <div class="alert-row ${alert.level}">
          <div class="alert-icon" aria-hidden="true">${alert.icon}</div>
          <div>
            <strong>${alert.title}</strong>
            <p>${alert.message}</p>
          </div>
        </div>
      `,
    )
    .join("");
}

function initDashboard() {
  renderSummary();
  renderAppliances();
  renderUsageChart();
  renderForecast();
  renderAlerts();
}

initDashboard();
