import styles from '../styles/DashboardComponents.module.css';

/**
 * COMPONENT: ClimateMetric
 * 
 * PURPOSE: Displays a single climate metric with icon and status
 * 
 * PROPS:
 * - label (string): Metric name (e.g., "Humidity")
 * - value (string): Current value (e.g., "45%")
 * - icon (string): Emoji icon
 * - status (string): "good", "warning", "danger"
 * - trend (string): "up", "down", "stable"
 * 
 * DEMONSTRATES PROPS:
 * Same component used for Humidity, Wind Speed, UV Index, etc.
 * by just passing different props
 */

export function ClimateMetric({
  label = 'Metric',
  value = 'N/A',
  icon = '📊',
  status = 'good',
  trend = 'stable',
  unit = '',
}) {
  // Get status color
  const getStatusColor = () => {
    switch (status) {
      case 'danger':
        return '#D62828';
      case 'warning':
        return '#F77F00';
      case 'good':
      default:
        return '#4CAF50';
    }
  };

  // Get trend indicator
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return '↑';
      case 'down':
        return '↓';
      default:
        return '→';
    }
  };

  const statusColor = getStatusColor();

  return (
    <div
      className={styles.climateMetric}
      style={{ borderLeftColor: statusColor }}
    >
      <div className={styles.metricTop}>
        <span className={styles.metricIcon}>
          {icon}
        </span>
        <h4>{label}</h4>
      </div>

      <div className={styles.metricValue}>
        <p>
          <strong style={{ color: statusColor }}>
            {value}
          </strong>
          {unit && <span>{unit}</span>}
        </p>
      </div>

      <div className={styles.metricTrend}>
        <span style={{ color: statusColor }}>
          {getTrendIcon()}
        </span>
        <p className={styles.trendText}>
          {trend === 'up' && 'Increasing'}
          {trend === 'down' && 'Decreasing'}
          {trend === 'stable' && 'Stable'}
        </p>
      </div>
    </div>
  );
}
