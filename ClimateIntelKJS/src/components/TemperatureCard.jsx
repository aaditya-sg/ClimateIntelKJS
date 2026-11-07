import styles from '../styles/DashboardComponents.module.css';

/**
 * COMPONENT: TemperatureCard
 * 
 * PURPOSE: Displays current temperature with risk level indicator
 * 
 * PROPS:
 * - temperature (number): Current temperature in Celsius
 * - feelsLike (number): Apparent/feels-like temperature
 * - riskLevel (string): "EXTREME", "SEVERE", "MODERATE", "MILD"
 * - location (string): Display location name
 * - color (string): Color based on risk level (passed from parent)
 * 
 * This is a REUSABLE COMPONENT - same component can display
 * different temperatures for different locations just by changing props
 */

export function TemperatureCard({
  temperature,
  feelsLike,
  riskLevel = 'MODERATE',
  location = 'Current Location',
  color = '#FFD166',
}) {
  // Determine text color based on risk level
  const getRiskLabel = () => {
    switch (riskLevel) {
      case 'EXTREME':
        return '🚨 EXTREME HEAT';
      case 'SEVERE':
        return '⚠️ SEVERE HEAT';
      case 'MODERATE':
        return '⚡ MODERATE HEAT';
      default:
        return '✓ NORMAL';
    }
  };

  return (
    <div className={styles.temperatureCard}>
      <div className={styles.tempHeader}>
        <h3>{location}</h3>
        <span
          className={styles.riskBadge}
          style={{ background: color }}
        >
          {getRiskLabel()}
        </span>
      </div>

      <div className={styles.tempDisplay}>
        <div className={styles.mainTemp}>
          <span className={styles.tempValue}>
            {temperature}°C
          </span>
          <span className={styles.tempUnit}>
            Current
          </span>
        </div>

        <div className={styles.feelsLike}>
          <p>Feels like</p>
          <p className={styles.feelsValue}>
            {feelsLike}°C
          </p>
        </div>
      </div>

      <div
        className={styles.tempIndicator}
        style={{ background: color }}
      />
    </div>
  );
}
