export type BroilerHeatStressSeverity = 'optimal' | 'warning' | 'critical';

export interface HeatStressThresholds {
  warningThresholdC: number;
  criticalThresholdC: number;
  bandLabel: string;
}

export interface HeatStressResult {
  thiC: number | null;
  severity: BroilerHeatStressSeverity;
  thresholds: HeatStressThresholds;
  // Useful for building a transparent UI message
  tempC: number | null;
  rhPercent: number | null;
}

/**
 * Heat Index / "feels-like" temperature using temperature (°C) and RH (%).
 * Formula provided by the user.
 */
export function heatIndexCelsius(tempC: number, rhPercent: number): number {
  const T = tempC;
  const RH = rhPercent;
  // HI = −8.784 + 1.611T + 2.339RH − 0.146T(RH)
  return -8.784 + 1.611 * T + 2.339 * RH - 0.146 * T * RH;
}

export function getBroilerHeatStressThresholds(ageDays: number): HeatStressThresholds {
  const age = Number.isFinite(ageDays) ? ageDays : 21;
  const clamped = Math.min(42, Math.max(1, age));

  // Table based on the user message.
  if (clamped >= 1 && clamped <= 7) {
    return {
      warningThresholdC: 35,
      criticalThresholdC: 38,
      bandLabel: 'Day 1–7',
    };
  }
  if (clamped >= 8 && clamped <= 14) {
    return {
      warningThresholdC: 33,
      criticalThresholdC: 36,
      bandLabel: 'Day 8–14',
    };
  }
  if (clamped >= 15 && clamped <= 21) {
    return {
      warningThresholdC: 31,
      criticalThresholdC: 34,
      bandLabel: 'Day 15–21',
    };
  }
  if (clamped >= 22 && clamped <= 28) {
    return {
      warningThresholdC: 29,
      criticalThresholdC: 32,
      bandLabel: 'Day 22–28',
    };
  }
  if (clamped >= 29 && clamped <= 35) {
    return {
      warningThresholdC: 28,
      criticalThresholdC: 31,
      bandLabel: 'Day 29–35',
    };
  }

  return {
    warningThresholdC: 27,
    criticalThresholdC: 30,
    bandLabel: 'Day 36–42',
  };
}

export function classifyBroilerHeatStress(
  tempC: number | null,
  rhPercent: number | null,
  ageDays: number,
): HeatStressResult {
  const thresholds = getBroilerHeatStressThresholds(ageDays);

  if (tempC === null || rhPercent === null) {
    return {
      thiC: null,
      severity: 'optimal',
      thresholds,
      tempC,
      rhPercent,
    };
  }

  const thiC = heatIndexCelsius(tempC, rhPercent);

  let severity: BroilerHeatStressSeverity = 'optimal';
  if (thiC >= thresholds.criticalThresholdC) severity = 'critical';
  else if (thiC >= thresholds.warningThresholdC) severity = 'warning';

  return {
    thiC,
    severity,
    thresholds,
    tempC,
    rhPercent,
  };
}

