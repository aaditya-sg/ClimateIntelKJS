import { useEffect, useMemo, useState } from 'react';

import { ActionButton } from '../src/components/ActionButton';
import { AlertCard } from '../src/components/AlertCard';
import { ForecastCard } from '../src/components/ForecastCard';
import { HeatMapPanel } from '../src/components/HeatMapPanel';
import { StatCard } from '../src/components/StatCard';
import { StatusBadge } from '../src/components/StatusBadge';
import { TemperatureCard } from '../src/components/TemperatureCard';
import { PredictionCard } from '../src/components/PredictionCard';
import { RiskLevelIndicator } from '../src/components/RiskLevelIndicator';
import { ClimateMetric } from '../src/components/ClimateMetric';
import styles from './LiveDashboard.module.css';

/* =====================================================
   MOCK AI CLIMATE PREDICTION API SERVICE
   
   This simulates a real AI-powered climate prediction API
   using async/await and promises.
   
   DEMONSTRATES: Promise, Async/Await, Error Handling
===================================================== */

const aiClimateAPI = {
  // Simulates fetching live climate monitoring data
  fetchLiveClimateData: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          timestamp: new Date().toISOString(),
          region: 'Maharashtra',
          temperature: 42,
          humidity: 52,
          feelsLike: 46,
          uvIndex: 11,
          windSpeed: 15,
          predictions: {
            sixHour: 44,
            twelveHour: 40,
            confidence: 92,
          },
          riskLevel: 'SEVERE',
          affectedPopulation: 2300000,
        });
      }, 1200);
    });
  },

  // Simulates AI generating risk analysis
  generateRiskAnalysis: async (temperatureData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const temp = temperatureData.temperature || 40;
        let riskLevel = 'MODERATE';
        let recommendations = [];

        if (temp >= 45) {
          riskLevel = 'EXTREME';
          recommendations = [
            'Issue Red Alert to all districts',
            'Activate emergency cooling centers',
            'Deploy medical emergency teams',
            'Implement water rationing protocols',
          ];
        } else if (temp >= 42) {
          riskLevel = 'SEVERE';
          recommendations = [
            'Issue Orange Alert',
            'Increase public awareness campaigns',
            'Deploy cooling support services',
            'Monitor vulnerable populations',
          ];
        } else if (temp >= 38) {
          riskLevel = 'MODERATE';
          recommendations = [
            'Issue Yellow Alert',
            'Public health advisories',
            'Prepare emergency resources',
            'Monitor heat-related cases',
          ];
        } else {
          riskLevel = 'MILD';
          recommendations = [
            'Standard monitoring protocols',
            'Regular health advisories',
            'Routine operations',
          ];
        }

        resolve({
          riskLevel,
          recommendations,
          analysis: `AI analysis indicates ${riskLevel} heat conditions with ${92}% confidence`,
          timestamp: new Date().toISOString(),
        });
      }, 1000);
    });
  },
};

const alerts = [
  {
    id: 1,
    level: 'EXTREME',
    title: 'Extreme Heatwave — Vidarbha',
    location: 'Nagpur, Wardha, Akola',
    temp: '47°C',
    time: '2 min ago',
    color: '#D62828',
    bg: '#FFF1F1',
    summary: 'Peak exposure risk detected across central districts with sustained nighttime temperatures remaining elevated.',
  },
  {
    id: 2,
    level: 'SEVERE',
    title: 'Severe Heat — Marathwada',
    location: 'Aurangabad, Latur',
    temp: '43°C',
    time: '8 min ago',
    color: '#F77F00',
    bg: '#FFF7ED',
    summary: 'Heat stress and dehydration risk are rising in semi-arid zones due to a prolonged dry spell.',
  },
  {
    id: 3,
    level: 'WARNING',
    title: 'High Heat Stress',
    location: 'Pune, Solapur',
    temp: '40°C',
    time: '15 min ago',
    color: '#FFD166',
    bg: '#FFFBEB',
    summary: 'Urban heat stress is increasing during mid-afternoon, especially in densely populated corridors.',
  },
];

const districtMarkers = [
  { name: 'Vidarbha', shortName: 'VIDARBHA', x: '74%', y: '38%', temp: '47°C', size: 122, dotSize: 30, color: '#D62828', ringColor: '#D62828' },
  { name: 'Marathwada', shortName: 'MARATHWADA', x: '46%', y: '52%', temp: '43°C', size: 100, dotSize: 26, color: '#F77F00', ringColor: '#F77F00' },
  { name: 'Konkan', shortName: 'KONKAN', x: '26%', y: '68%', temp: '39°C', size: 82, dotSize: 22, color: '#FFD166', ringColor: '#FFD166' },
];

const metrics = [
  { title: 'Active Hotspots', value: '12', subtitle: '↑ 3 today', color: '#D62828' },
  { title: 'Sensors Online', value: '839', subtitle: 'of 847', color: '#00A896' },
  { title: 'Districts Monitored', value: '36', subtitle: '100% coverage', color: '#0F4C81' },
  { title: 'Citizens Alerted', value: '2.3M', subtitle: 'today', color: '#F77F00' },
];

function StatCardItem({ title, value, subtitle, color }) {
  return (
    <div className={styles.statCard}>
      <p className={styles.cardLabel}>{title}</p>
      <div className={styles.cardBody}>
        <h3 className={styles.cardValue} style={{ color }}>{value}</h3>
        <span className={styles.cardMeta}>{subtitle}</span>
      </div>
    </div>
  );
}

/* =====================================================
   MAIN COMPONENT: LiveDashboard
   
   This component demonstrates comprehensive React concepts:
   - JSX for UI structure
   - Props for component communication
   - useState for state management
   - useEffect for side effects and API calls
   - Conditional rendering for dynamic UI
   - Event handling for user interactions
   - Async/Await for API calls
   - Form handling and validation
   - CSS Modules for scoped styling
===================================================== */

export default function LiveDashboard() {
  // ===================================================
  // STATE MANAGEMENT - useState Hook
  //
  // useState allows functional components to have state.
  // Each state has a current value and a setter function.
  // When state changes, React re-renders the component.
  //
  // Syntax: const [value, setValue] = useState(initialValue)
  // ===================================================

  // Selected region on the heatmap
  const [selectedRegion, setSelectedRegion] = useState('Vidarbha');

  // Currently displayed alert
  const [selectedAlertId, setSelectedAlertId] = useState(1);

  // Whether to show all alerts or just top 2
  const [showAllAlerts, setShowAllAlerts] = useState(false);

  // Whether response plan is expanded
  const [showResponsePlan, setShowResponsePlan] = useState(false);

  // Live weather data from API
  const [weather, setWeather] = useState(null);

  // Loading state for weather data
  const [loadingWeather, setLoadingWeather] = useState(true);

  // Error message for weather data
  const [weatherError, setWeatherError] = useState('');

  // Live climate data from AI API
  const [climateData, setClimateData] = useState(null);

  // Loading state for climate data
  const [loadingClimate, setLoadingClimate] = useState(true);

  // Risk analysis from AI
  const [riskAnalysis, setRiskAnalysis] = useState(null);

  // Refresh interval in seconds (user can change this)
  const [refreshInterval, setRefreshInterval] = useState(30);

  // Form data for advisory form
  const [formData, setFormData] = useState({
    district: '',
    severity: 'Severe',
    message: '',
    location: 'Vidarbha',
  });

  // Validation errors for form fields
  const [formErrors, setFormErrors] = useState({});

  // Form submission status message
  const [submitStatus, setSubmitStatus] = useState('');

  // ===================================================
  // useEffect Hook - Side Effects & API Calls
  //
  // useEffect runs code after component renders.
  // Dependency array [] means run once on mount.
  // Dependency array [dep1, dep2] means run when deps change.
  // No dependency array means run after every render.
  //
  // This is where we fetch data from APIs.
  // ===================================================

  // ===================================================
  // API DATA LOADING FUNCTIONS
  // These use async/await to handle asynchronous operations
  // ===================================================

  /**
   * Load weather data from Open-Meteo API
   * Demonstrates: Async/Await, Try/Catch Error Handling, Promise
   */
  const loadWeatherData = async () => {
    setLoadingWeather(true);
    setWeatherError('');

    try {
      // AWAIT makes JavaScript wait for this Promise to resolve
      const response = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=20.5937&longitude=78.9629&current=temperature_2m,relative_humidity_2m,apparent_temperature&timezone=auto'
      );

      // If response is not ok (400+ status), throw an error
      if (!response.ok) {
        throw new Error('Weather API error');
      }

      // AWAIT: Wait for response to be converted to JSON
      const data = await response.json();

      // Extract current weather conditions from API response
      setWeather(data.current);
    } catch (error) {
      // CATCH: Handle errors from the try block
      setWeatherError('Weather feed unavailable. Showing fallback values.');

      // Fallback weather data
      setWeather({
        temperature_2m: 42,
        relative_humidity_2m: 52,
        apparent_temperature: 46,
      });
    } finally {
      // FINALLY: Always run this, whether success or error
      setLoadingWeather(false);
    }
  };

  /**
   * Load climate data using mock AI API
   * Demonstrates: Async/Await, Promise Chain, State Management
   */
  const loadClimateData = async () => {
    setLoadingClimate(true);

    try {
      // AWAIT: Wait for climate data from AI API
      const clData = await aiClimateAPI.fetchLiveClimateData();
      setClimateData(clData);

      // AWAIT: Chain another async call for risk analysis
      const riskData = await aiClimateAPI.generateRiskAnalysis(clData);
      setRiskAnalysis(riskData);
    } catch (error) {
      console.error('Error loading climate data:', error);

      // Fallback climate data
      setClimateData({
        temperature: 42,
        humidity: 52,
        feelsLike: 46,
        predictions: { sixHour: 44, twelveHour: 40, confidence: 92 },
        riskLevel: 'SEVERE',
      });
    } finally {
      setLoadingClimate(false);
    }
  };

  // Load weather data when component mounts
  useEffect(() => {
    loadWeatherData();
  }, []); // Empty dependency array = run once on mount

  // Load climate data when component mounts
  useEffect(() => {
    loadClimateData();
  }, []); // Empty dependency array = run once on mount

  // Set up auto-refresh interval
  useEffect(() => {
    const interval = setInterval(() => {
      // Auto-refresh climate data every 'refreshInterval' seconds
      loadClimateData();
    }, refreshInterval * 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [refreshInterval]); // Run when refreshInterval changes

  // THIS USEEFFECT IS DUPLICATE AND SHOULD BE REMOVED
  // useEffect(() => {
  //   const loadWeather = async () => {
  //     try {
  //       setLoadingWeather(true);
  //       const response = await fetch(
  //         'https://api.open-meteo.com/v1/forecast?latitude=20.5937&longitude=78.9629&current=temperature_2m,relative_humidity_2m,apparent_temperature&timezone=auto'
  //       );
  //
  //       if (!response.ok) {
  //         throw new Error('Weather API failed');
  //       }
  //
  //       const data = await response.json();
  //       setWeather(data.current);
  //       setWeatherError('');
  //     } catch (error) {
  //       setWeatherError('Weather feed unavailable. Showing fallback values.');
  //       setWeather({
  //         temperature_2m: 42,
  //         relative_humidity_2m: 52,
  //         apparent_temperature: 46,
  //       });
  //     } finally {
  //       setLoadingWeather(false);
  //     }
  //   };
  //
  //   loadWeather();
  // }, []);

  const visibleAlerts = useMemo(
    () => (showAllAlerts ? alerts : alerts.slice(0, 2)),
    [showAllAlerts],
  );

  const activeAlert = alerts.find((alert) => alert.id === selectedAlertId) ?? alerts[0];

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    setFormErrors((previous) => ({ ...previous, [name]: '' }));
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.district.trim()) {
      errors.district = 'District is required';
    }

    if (!formData.message.trim()) {
      errors.message = 'Advisory message is required';
    }

    if (formData.message.trim().length < 10) {
      errors.message = 'Message should be at least 10 characters';
    }

    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setSubmitStatus('Please correct the form before sending.');
      return;
    }

    try {
      setSubmitStatus('Sending advisory...');
      
      // Wait a bit to show loading state
      await new Promise((resolve) => setTimeout(resolve, 700));

      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `Heat advisory for ${formData.district}`,
          body: `${formData.message} Severity: ${formData.severity}`,
          userId: 1,
        }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const result = await response.json();
      setSubmitStatus(`Advisory submitted successfully. ID: ${result.id}`);
      setFormData({ district: '', severity: 'Severe', message: '', location: 'Vidarbha' });
      setFormErrors({});
    } catch (error) {
      setSubmitStatus('Submission failed, but the UI validation works correctly.');
    }
  };

  const handleExportReport = () => {
    const report = {
      generatedAt: new Date().toISOString(),
      selectedRegion,
      highestRisk: activeAlert.title,
      summary: activeAlert.summary,
      status: 'Operational',
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'climateintel-report.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSendAdvisory = () => {
    const message = `Early warning advisory dispatched for ${selectedRegion}. Public safety reminders and hydration recommendations are being sent to the affected districts.`;
    window.alert(message);
  };

  return (
    <div className={styles.dashboardPage}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div>
            <p className={styles.kicker}>COMMAND CENTER</p>
            <h1 className={styles.title}>Live Heatwave Dashboard</h1>
            <p className={styles.subtitle}>Real-time climate intelligence across monitored districts.</p>
          </div>

          <div className={styles.headerActions}>
            <StatusBadge label="SYSTEM OPERATIONAL" tone="success" />
            <button type="button" className={styles.secondaryButton} onClick={handleExportReport}>
              Export Report
            </button>
          </div>
        </div>
      </header>

      <main className={styles.mainContent}>
        <section className={styles.statsGrid}>
          {metrics.map((metric) => (
            <StatCardItem
              key={metric.title}
              title={metric.title}
              value={metric.value}
              subtitle={metric.subtitle}
              color={metric.color}
            />
          ))}
        </section>

        {/* NEW COMPONENTS DEMONSTRATION - COMPONENT REUSABILITY */}
        {climateData && (
          <section className={styles.contentGrid}>
            <div className={styles.leftColumn}>
              {/* CONCEPT 2: PROPS - Custom TemperatureCard component
                  Shows how props let us reuse components with different data */}
              <TemperatureCard
                temperature={climateData.temperature}
                feelsLike={climateData.feelsLike}
                riskLevel={climateData.riskLevel}
                location="Central Maharashtra"
                color="#D62828"
              />

              {/* Prediction cards using the PredictionCard component
                  Demonstrates component reusability with different props */}
              <div className={styles.predictionGrid}>
                <PredictionCard
                  title="6-Hour Forecast"
                  value={`${climateData.predictions.sixHour}°C`}
                  confidence={92}
                  description="Expected peak temperature within 6 hours"
                  icon="🔥"
                  color="#D62828"
                />
                <PredictionCard
                  title="12-Hour Forecast"
                  value={`${climateData.predictions.twelveHour}°C`}
                  confidence={88}
                  description="Temperature trend after 12 hours"
                  icon="📉"
                  color="#00A896"
                />
              </div>

              {/* Risk level indicator component
                  Demonstrates conditional rendering and props */}
              <RiskLevelIndicator
                level={riskAnalysis?.riskLevel || 'MODERATE'}
                temperature={climateData.temperature}
                threshold={45}
                affected={climateData.affectedPopulation}
              />

              {/* Climate metrics grid showing different climate parameters */}
              <div className={styles.metricsGrid}>
                <ClimateMetric
                  label="Humidity"
                  value={climateData.humidity}
                  unit="%"
                  icon="💧"
                  status={climateData.humidity > 60 ? 'warning' : 'good'}
                  trend="down"
                />
                <ClimateMetric
                  label="UV Index"
                  value={climateData.uvIndex}
                  icon="☀️"
                  status={climateData.uvIndex > 10 ? 'danger' : 'warning'}
                  trend="up"
                />
                <ClimateMetric
                  label="Wind Speed"
                  value={climateData.windSpeed}
                  unit="km/h"
                  icon="💨"
                  status="good"
                  trend="stable"
                />
              </div>
            </div>
          </section>
        )}

        {/* CONDITIONAL RENDERING: Loading state
            Show this when climate data is loading */}
        {loadingClimate && (
          <section className={styles.loadingSection}>
            <p>Loading climate data...</p>
          </section>
        )}

        <section className={styles.alertsMapGrid}>
          <div className={styles.leftColumn}>
            <div className={styles.mapPanel}>
              <div className={styles.mapHeader}>
                <span className={styles.liveDot} />
                <span className={styles.mapLabel}>LIVE HEATMAP</span>
              </div>

              <div className={styles.mapCanvas}>
                {districtMarkers.map((district) => {
                  const isSelected = selectedRegion === district.name;
                  return (
                    <button
                      key={district.name}
                      type="button"
                      className={styles.mapMarkerButton}
                      style={{ left: district.x, top: district.y }}
                      onClick={() => setSelectedRegion(district.name)}
                    >
                      <div
                        className={styles.mapMarker}
                        style={{
                          width: district.size,
                          height: district.size,
                          background: `radial-gradient(circle, ${district.ringColor}70, ${district.ringColor}20, transparent)`,
                          boxShadow: isSelected ? `0 0 45px ${district.ringColor}90` : `0 0 25px ${district.ringColor}70`,
                          border: isSelected ? `2px solid ${district.ringColor}` : '2px solid transparent',
                        }}
                      >
                        <div
                          className={styles.mapMarkerDot}
                          style={{
                            background: district.color,
                            boxShadow: `0 0 18px ${district.color}`,
                          }}
                        />
                      </div>
                      <span className={styles.mapText}>{district.shortName}</span>
                      <span className={styles.tempText}>{district.temp}</span>
                    </button>
                  );
                })}
              </div>

              <div className={styles.legendBox}>
                <p className={styles.legendTitle}>Heat Index</p>
                {[
                  ['#D62828', 'Extreme'],
                  ['#F77F00', 'Severe'],
                  ['#FFD166', 'Moderate'],
                  ['#4CAF50', 'Normal'],
                ].map(([color, label]) => (
                  <div key={label} className={styles.legendItem}>
                    <span className={styles.legendSwatch} style={{ background: color }} />
                    <span className={styles.legendValue}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.forecastGrid}>
              <ForecastCard title="AI Forecast" value="47°C" description="Peak predicted within 6 hours" color="#D62828" />
              <ForecastCard title="Heat Index" value="52°C" description="Extreme physiological stress" color="#F77F00" />
              <ForecastCard title="Forecast Confidence" value="92%" description="AI model confidence" color="#00A896" />
            </div>
          </div>

          <aside className={styles.alertPanel}>
            <div className={styles.alertHeader}>
              <div>
                <h2 className={styles.alertTitle}>Live Alerts</h2>
                <p className={styles.alertSubtitle}>Updated continuously</p>
              </div>
              <span className={styles.alertBadge}>{alerts.length} Active</span>
            </div>

            <div className={styles.alertList}>
              {visibleAlerts.map((alert) => (
                <AlertCard
                  key={alert.id}
                  alert={alert}
                  onClick={() => {
                    setSelectedAlertId(alert.id);
                    const nextRegion = alert.title.includes('Vidarbha')
                      ? 'Vidarbha'
                      : alert.title.includes('Marathwada')
                        ? 'Marathwada'
                        : 'Pune';
                    setSelectedRegion(nextRegion);
                  }}
                />
              ))}
            </div>

            <div className={styles.alertFooter}>
              <button type="button" className={styles.primaryButton} onClick={() => setShowAllAlerts((previous) => !previous)}>
                {showAllAlerts ? 'Show Top Alerts' : 'View All Alerts →'}
              </button>
            </div>
          </aside>
        </section>

        <section className={styles.bottomGrid}>
          <div className={styles.summaryCard}>
            <div className={styles.summaryHeader}>
              <div>
                <p className={styles.summaryLabel}>AI Insight</p>
                <h3 className={styles.summaryTitle}>District Risk Summary</h3>
              </div>
              <StatusBadge label={`Focus: ${selectedRegion}`} tone="warning" />
            </div>

            <div className={styles.summaryBox}>
              <p className={styles.summaryRiskTitle}>{activeAlert.title}</p>
              <p className={styles.summaryText}>{activeAlert.summary}</p>
              <div className={styles.summaryActions}>
                <button type="button" className={styles.primaryButton} onClick={handleSendAdvisory}>Dispatch Advisory</button>
                <button
                  type="button"
                  className={styles.secondaryButton}
                  onClick={() => setShowResponsePlan((previous) => !previous)}
                >
                  {showResponsePlan ? 'Close Response Plan' : 'Open Response Plan'}
                </button>
              </div>

              {showResponsePlan ? (
                <div className={styles.responsePlanBox}>
                  <p className={styles.responsePlanTitle}>Response Plan for {selectedRegion}</p>
                  <ul className={styles.responsePlanList}>
                    <li>Activate public cooling centers and hydration support.</li>
                    <li>Issue priority alerts to vulnerable neighborhoods and schools.</li>
                    <li>Deploy field teams to monitor high-risk districts.</li>
                    <li>Coordinate transport and resource distribution for medical aid.</li>
                  </ul>
                </div>
              ) : null}
            </div>
          </div>

          <div className={styles.responseCard}>
            <p className={styles.responseLabel}>Response</p>
            <div className={styles.responseList}>
              <div className={styles.responseBoxDanger}>
                <p className={styles.responseTitleDanger}>Current risk</p>
                <p className={styles.responseValue}>{activeAlert.temp}</p>
              </div>

              <div className={styles.responseBoxWarning}>
                <p className={styles.responseTitleWarning}>Recommended action</p>
                <p className={styles.responseText}>Deploy cooling support and issue public health notices to vulnerable groups.</p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.apiCard}>
          <div className={styles.apiHeader}>
            <div>
              <p className={styles.summaryLabel}>API Monitor</p>
              <h3 className={styles.summaryTitle}>Live Weather Feed</h3>
            </div>
            <StatusBadge label={loadingWeather ? 'Loading...' : 'Live'} tone={loadingWeather ? 'neutral' : 'success'} />
          </div>

          {weatherError ? <p className={styles.errorText}>{weatherError}</p> : null}

          {weather ? (
            <div className={styles.apiGrid}>
              <div className={styles.apiMetric}><span>Temperature</span><strong>{weather.temperature_2m}°C</strong></div>
              <div className={styles.apiMetric}><span>Feels Like</span><strong>{weather.apparent_temperature}°C</strong></div>
              <div className={styles.apiMetric}><span>Humidity</span><strong>{weather.relative_humidity_2m}%</strong></div>
            </div>
          ) : (
            <p className={styles.emptyState}>No weather data available.</p>
          )}
        </section>

        <section className={styles.formCard}>
          <div className={styles.apiHeader}>
            <div>
              <p className={styles.summaryLabel}>Emergency Form</p>
              <h3 className={styles.summaryTitle}>Send Advisory</h3>
            </div>
          </div>

          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            <div className={styles.formRow}>
              <label className={styles.fieldLabel}>
                District
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleFieldChange}
                  placeholder="Enter district name"
                  className={styles.input}
                />
                {formErrors.district ? <span className={styles.fieldError}>{formErrors.district}</span> : null}
              </label>

              <label className={styles.fieldLabel}>
                Severity
                <select
                  name="severity"
                  value={formData.severity}
                  onChange={handleFieldChange}
                  className={styles.select}
                >
                  <option value="Low">Low</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Severe">Severe</option>
                  <option value="Extreme">Extreme</option>
                </select>
              </label>
            </div>

            <label className={styles.fieldLabel}>
              Advisory Message
              <textarea
                name="message"
                value={formData.message}
                onChange={handleFieldChange}
                placeholder="Write the public advisory message"
                className={styles.textarea}
              />
              {formErrors.message ? <span className={styles.fieldError}>{formErrors.message}</span> : null}
            </label>

            <div className={styles.actionRow}>
              <button type="submit" className={styles.primaryButton}>Send Advisory</button>
              {submitStatus ? <span className={styles.submitStatus}>{submitStatus}</span> : null}
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}