import styles from '../styles/DashboardComponents.module.css';

/**
 * COMPONENT: RiskLevelIndicator
 * 
 * PURPOSE: Visual indicator showing heat/climate risk level
 * 
 * PROPS:
 * - level (string): Risk level - "EXTREME", "SEVERE", "MODERATE", "MILD"
 * - temperature (number): Current temperature
 * - threshold (number): Temperature threshold for alert
 * - affected (number): Number of people affected
 * 
 * DEMONSTRATES:
 * - Conditional Rendering: Display different content based on risk level
 * - Props: Each instance receives different data
 */

export function RiskLevelIndicator({
  level = 'MODERATE',
  temperature = 40,
  threshold = 45,
  affected = 0,
}) {
  // Determine display properties based on risk level
  // This is CONDITIONAL LOGIC based on PROPS
  const getRiskConfig = () => {
    const config = {
      EXTREME: {
        label: 'EXTREME RISK',
        color: '#D62828',
        bgColor: '#FFF1F1',
        icon: '🚨',
        desc: 'Life-threatening heat conditions',
      },
      SEVERE: {
        label: 'SEVERE RISK',
        color: '#F77F00',
        bgColor: '#FFF7ED',
        icon: '⚠️',
        desc: 'High heat stress conditions',
      },
      MODERATE: {
        label: 'MODERATE RISK',
        color: '#FFD166',
        bgColor: '#FFFBEB',
        icon: '⚡',
        desc: 'Caution recommended',
      },
      MILD: {
        label: 'LOW RISK',
        color: '#4CAF50',
        bgColor: '#F1F8F4',
        icon: '✓',
        desc: 'Safe conditions',
      },
    };
    return config[level] || config.MODERATE;
  };

  const config = getRiskConfig();
  const riskPercentage = Math.min(
    100,
    Math.round(((temperature - threshold) / threshold) * 100)
  );

  return (
    <div
      className={styles.riskIndicator}
      style={{ background: config.bgColor }}
    >
      <div className={styles.riskHeader}>
        <span className={styles.riskIcon}>
          {config.icon}
        </span>
        <h3 style={{ color: config.color }}>
          {config.label}
        </h3>
      </div>

      <p className={styles.riskDesc}>
        {config.desc}
      </p>

      {/* CONDITIONAL RENDERING: Show affected count if > 0 */}
      {affected > 0 && (
        <p className={styles.affectedPeople}>
          👥 {affected.toLocaleString()} people affected
        </p>
      )}

      <div className={styles.riskMeter}>
        <div
          className={styles.riskFill}
          style={{
            width: `${riskPercentage}%`,
            background: config.color,
          }}
        />
      </div>

      <p className={styles.riskTemp}>
        Temp: {temperature}°C (Threshold: {threshold}°C)
      </p>
    </div>
  );
}
