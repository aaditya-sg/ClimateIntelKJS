import styles from '../styles/DashboardComponents.module.css';

/**
 * COMPONENT: PredictionCard
 * 
 * PURPOSE: Displays AI-generated climate prediction for upcoming period
 * 
 * PROPS:
 * - title (string): Prediction title (e.g., "6-Hour Forecast")
 * - value (string): Predicted value (e.g., "47°C")
 * - confidence (number): AI model confidence 0-100
 * - description (string): Detailed prediction text
 * - icon (string): Emoji icon
 * 
 * DEMONSTRATION OF PROPS:
 * Props allow us to reuse this component multiple times
 * with different prediction data without duplicating code
 */

export function PredictionCard({
  title = 'Prediction',
  value = 'N/A',
  confidence = 85,
  description = '',
  icon = '🔮',
  color = '#00A896',
}) {
  return (
    <div className={styles.predictionCard}>
      <div className={styles.predHeader}>
        <span className={styles.predIcon}>{icon}</span>
        <div>
          <h4>{title}</h4>
          <p className={styles.predConfidence}>
            {confidence}% Confidence
          </p>
        </div>
      </div>

      <div className={styles.predValue}>
        <p style={{ color }}>{value}</p>
      </div>

      <p className={styles.predDescription}>
        {description}
      </p>

      <div className={styles.confidenceBar}>
        <div
          className={styles.confidenceFill}
          style={{
            width: `${confidence}%`,
            background: color,
          }}
        />
      </div>
    </div>
  );
}
