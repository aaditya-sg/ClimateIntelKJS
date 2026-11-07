import { useEffect, useState } from "react";
import styles from "./Advisories.module.css";

const API_URL = "http://localhost:5000/api";

const initialAdvisories = [
  {
    id: 1,
    title: "Extreme Heatwave Advisory",
    region: "Vidarbha Region",
    audience: "General Public",
    level: "EXTREME",
    temp: "47°C",
    language: "Marathi",
    time: "2 min ago",
    color: "#D62828",
  },
  {
    id: 2,
    title: "Agricultural Heat Stress Advisory",
    region: "Marathwada",
    audience: "Farmers",
    level: "SEVERE",
    temp: "43°C",
    language: "Hindi",
    time: "12 min ago",
    color: "#F77F00",
  },
  {
    id: 3,
    title: "Hospital Preparedness Advisory",
    region: "Nagpur District",
    audience: "Healthcare",
    level: "SEVERE",
    temp: "44°C",
    language: "English",
    time: "21 min ago",
    color: "#F77F00",
  },
  {
    id: 4,
    title: "Citizen Safety Advisory",
    region: "Pune District",
    audience: "Citizens",
    level: "MODERATE",
    temp: "39°C",
    language: "Marathi",
    time: "32 min ago",
    color: "#FFD166",
  },
];

/* =====================================================
   REUSABLE COMPONENT 1
===================================================== */

function AudienceCard({ icon, title, count, description }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.iconBox}>{icon}</div>

        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>

      <p className={styles.bigNumber}>{count}</p>

      <p className={styles.smallText}>
        advisories delivered
      </p>
    </div>
  );
}

/* =====================================================
   REUSABLE COMPONENT 2
===================================================== */

function AdvisoryCard({
  advisory,
  onPreview,
  onDistribute,
}) {
  return (
    <div className={styles.advisoryItem}>
      <div className={styles.advisoryContent}>

        <div
          className={styles.statusIcon}
          style={{
            background: `${advisory.color}15`,
          }}
        >
          <span
            className={styles.statusDot}
            style={{
              background: advisory.color,
            }}
          />
        </div>

        <div>
          <div className={styles.titleRow}>

            <h3>{advisory.title}</h3>

            <span
              className={styles.levelBadge}
              style={{
                background: advisory.color,
              }}
            >
              {advisory.level}
            </span>

          </div>

          <p className={styles.region}>
            {advisory.region} · {advisory.audience}
          </p>

          <div className={styles.metadata}>
            <span>🌡 {advisory.temp}</span>
            <span>🌐 {advisory.language}</span>
            <span>🕐 {advisory.time}</span>
          </div>
        </div>
      </div>

      <div className={styles.actionButtons}>

        <button
          className={styles.previewButton}
          onClick={() => onPreview(advisory)}
        >
          Preview
        </button>

        <button
          className={styles.distributeButton}
          onClick={() => onDistribute(advisory)}
        >
          Distribute
        </button>

      </div>
    </div>
  );
}

/* =====================================================
   REUSABLE COMPONENT 3
===================================================== */

function LanguageBar({ language, percentage }) {
  return (
    <div className={styles.languageRow}>

      <div className={styles.languageHeader}>
        <span>{language}</span>
        <span>{percentage}%</span>
      </div>

      <div className={styles.progressBackground}>
        <div
          className={styles.progressBar}
          style={{ width: `${percentage}%` }}
        />
      </div>

    </div>
  );
}

/* =====================================================
   REUSABLE COMPONENT 4
===================================================== */

function ChannelCard({ icon, channel, count }) {
  return (
    <div className={styles.channelCard}>
      <span className={styles.channelIcon}>
        {icon}
      </span>

      <p>{channel}</p>

      <strong>{count}</strong>
    </div>
  );
}

/* =====================================================
   MAIN COMPONENT
===================================================== */

export default function Advisories() {

  /* ===================================================
     STATE MANAGEMENT - useState
  =================================================== */

  const [advisories, setAdvisories] =
    useState(initialAdvisories);

  const [region, setRegion] =
    useState("Vidarbha");

  const [audience, setAudience] =
    useState("General Public");

  const [language, setLanguage] =
    useState("Marathi");

  const [temperature, setTemperature] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [generatedAdvisory, setGeneratedAdvisory] =
    useState(null);

  const [selectedAdvisory, setSelectedAdvisory] =
    useState(null);

  /* ===================================================
     useEffect - API Integration
  =================================================== */

  useEffect(() => {
    loadAdvisories();
  }, []);

  /* ===================================================
     ASYNC + AWAIT + PROMISE
  =================================================== */

  const loadAdvisories = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/advisories`
      );

      if (!response.ok) {
        throw new Error("Failed to load advisories");
      }

      const data = await response.json();

      setAdvisories(data);

    } catch (err) {

      console.log(
        "API unavailable. Using demo data."
      );

      /*
       * FALLBACK:
       * If backend is not running, existing
       * demo advisories are displayed.
       */

      setAdvisories(initialAdvisories);

    } finally {

      setLoading(false);

    }
  };

  /* ===================================================
     FORM VALIDATION
  =================================================== */

  const validateForm = () => {

    if (!region) {
      setError("Please select a region.");
      return false;
    }

    if (!audience) {
      setError("Please select an audience.");
      return false;
    }

    if (!language) {
      setError("Please select a language.");
      return false;
    }

    if (temperature === "") {
      setError("Please enter the temperature.");
      return false;
    }

    if (
      Number(temperature) < 20 ||
      Number(temperature) > 55
    ) {
      setError(
        "Temperature must be between 20°C and 55°C."
      );
      return false;
    }

    setError("");

    return true;
  };

  /* ===================================================
     FORM HANDLING + API POST
  =================================================== */

  const handleGenerate = async (event) => {

    event.preventDefault();

    setSuccess("");

    if (!validateForm()) {
      return;
    }

    try {

      setLoading(true);

      /*
       * API Integration
       */

      const response = await fetch(
        `${API_URL}/advisories/generate`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            region,
            audience,
            language,
            temperature,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Unable to generate advisory"
        );
      }

      const data = await response.json();

      setGeneratedAdvisory(data);

      setSuccess(
        "AI advisory generated successfully!"
      );

    } catch (err) {

      /*
       * DEMO FALLBACK
       */

      const temp = Number(temperature);

      let level = "MODERATE";
      let color = "#FFD166";

      if (temp >= 45) {
        level = "EXTREME";
        color = "#D62828";
      } else if (temp >= 42) {
        level = "SEVERE";
        color = "#F77F00";
      }

      const newAdvisory = {
        id: Date.now(),
        title: `${audience} Heatwave Advisory`,
        region: `${region} Region`,
        audience,
        level,
        temp: `${temperature}°C`,
        language,
        time: "Just now",
        color,
      };

      setGeneratedAdvisory(newAdvisory);

      setSuccess(
        "AI advisory generated successfully!"
      );

    } finally {

      setLoading(false);

    }
  };

  /* ===================================================
     EVENT HANDLING - PREVIEW
  =================================================== */

  const handlePreview = (advisory) => {

    setSelectedAdvisory(advisory);

  };

  /* ===================================================
     EVENT HANDLING - DISTRIBUTE
  =================================================== */

  const handleDistribute = (advisory) => {

    setSuccess(
      `"${advisory.title}" distributed successfully.`
    );

    setTimeout(() => {
      setSuccess("");
    }, 3000);
  };

  /* ===================================================
     ADD GENERATED ADVISORY
  =================================================== */

  const addGeneratedAdvisory = () => {

    if (!generatedAdvisory) {
      return;
    }

    setAdvisories((previous) => [
      generatedAdvisory,
      ...previous,
    ]);

    setGeneratedAdvisory(null);

    setSuccess(
      "Advisory added to Recent Advisories."
    );
  };

  return (

    <div className={styles.page}>

      {/* =================================================
          HEADER
      ================================================= */}

      <div className={styles.header}>

        <div className={styles.headerInner}>

          <p className={styles.label}>
            AI COMMUNICATION ENGINE
          </p>

          <div className={styles.headerFlex}>

            <div>

              <h1>
                Heatwave Advisories
              </h1>

              <p>
                AI-generated alerts tailored for
                different stakeholder groups.
              </p>

            </div>

            <button
              className={styles.primaryButton}
              onClick={() =>
                document
                  .getElementById("generator")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
            >
              Generate Advisory
            </button>

          </div>

        </div>

      </div>

      <main className={styles.container}>

        {/* =================================================
            SUMMARY CARDS
        ================================================= */}

        <div className={styles.summaryGrid}>

          <AudienceCard
            icon="👥"
            title="Citizens"
            count="1,284"
            description="Public safety alerts"
          />

          <AudienceCard
            icon="🌾"
            title="Agriculture"
            count="428"
            description="Crop advisories"
          />

          <AudienceCard
            icon="🏥"
            title="Healthcare"
            count="176"
            description="Hospital alerts"
          />

          <AudienceCard
            icon="🏛️"
            title="Government"
            count="96"
            description="Decision support"
          />

        </div>

        {/* =================================================
            AI GENERATION FORM
        ================================================= */}

        <div
          id="generator"
          className={styles.generator}
        >

          <div className={styles.generatorContent}>

            <div>

              <span className={styles.engineBadge}>
                AI ADVISORY ENGINE
              </span>

              <h2>
                Generate Stakeholder-Specific Alerts
              </h2>

              <p>
                Convert meteorological forecasts and IoT
                observations into actionable advisories
                using automated language generation.
              </p>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleGenerate}
              className={styles.form}
            >

              {/* REGION */}

              <select
                value={region}
                onChange={(e) =>
                  setRegion(e.target.value)
                }
              >

                <option value="Vidarbha">
                  Vidarbha
                </option>

                <option value="Marathwada">
                  Marathwada
                </option>

                <option value="Konkan">
                  Konkan
                </option>

              </select>

              {/* AUDIENCE */}

              <select
                value={audience}
                onChange={(e) =>
                  setAudience(e.target.value)
                }
              >

                <option value="General Public">
                  General Public
                </option>

                <option value="Farmers">
                  Farmers
                </option>

                <option value="Healthcare">
                  Healthcare
                </option>

                <option value="Government">
                  Government
                </option>

              </select>

              {/* LANGUAGE */}

              <select
                value={language}
                onChange={(e) =>
                  setLanguage(e.target.value)
                }
              >

                <option value="Marathi">
                  Marathi
                </option>

                <option value="Hindi">
                  Hindi
                </option>

                <option value="English">
                  English
                </option>

                <option value="Gujarati">
                  Gujarati
                </option>

                <option value="Tamil">
                  Tamil
                </option>

              </select>

              {/* TEMPERATURE */}

              <input
                type="number"
                placeholder="Temperature °C"
                value={temperature}
                onChange={(e) =>
                  setTemperature(e.target.value)
                }
              />

              {/* SUBMIT */}

              <button
                type="submit"
                disabled={loading}
                className={styles.generateButton}
              >

                {loading
                  ? "Generating..."
                  : "Generate →"}

              </button>

            </form>

          </div>

          {/* CONDITIONAL RENDERING */}

          {error && (
            <div className={styles.error}>
              ⚠️ {error}
            </div>
          )}

          {success && (
            <div className={styles.success}>
              ✅ {success}
            </div>
          )}

        </div>

        {/* =================================================
            GENERATED ADVISORY
        ================================================= */}

        {generatedAdvisory && (

          <div className={styles.generatedBox}>

            <div>

              <span className={styles.generatedBadge}>
                AI GENERATED
              </span>

              <h3>
                {generatedAdvisory.title}
              </h3>

              <p>
                {generatedAdvisory.region} ·{" "}
                {generatedAdvisory.audience}
              </p>

              <p>
                🌡 {generatedAdvisory.temp} ·{" "}
                🌐 {generatedAdvisory.language}
              </p>

            </div>

            <button
              className={styles.primaryButton}
              onClick={addGeneratedAdvisory}
            >
              Add to Advisories
            </button>

          </div>

        )}

        {/* =================================================
            RECENT ADVISORIES
        ================================================= */}

        <div className={styles.advisoriesBox}>

          <div className={styles.sectionHeader}>

            <div>

              <h2>
                Recent Advisories
              </h2>

              <p>
                Latest generated and distributed alerts
              </p>

            </div>

            <button className={styles.archiveButton}>
              View Archive →
            </button>

          </div>

          {/* CONDITIONAL RENDERING */}

          {loading && advisories.length === 0 ? (

            <div className={styles.emptyState}>
              Loading advisories...
            </div>

          ) : advisories.length === 0 ? (

            <div className={styles.emptyState}>
              No advisories available.
            </div>

          ) : (

            <div>

              {advisories.map((advisory) => (

                <AdvisoryCard
                  key={advisory.id || advisory.title}
                  advisory={advisory}
                  onPreview={handlePreview}
                  onDistribute={handleDistribute}
                />

              ))}

            </div>

          )}

        </div>

        {/* =================================================
            LANGUAGE + CHANNELS
        ================================================= */}

        <div className={styles.bottomGrid}>

          {/* LANGUAGE */}

          <div className={styles.whiteBox}>

            <h2>
              Language Coverage
            </h2>

            <p>
              Regional language advisory generation
            </p>

            <div className={styles.languageList}>

              <LanguageBar
                language="Marathi"
                percentage={94}
              />

              <LanguageBar
                language="Hindi"
                percentage={88}
              />

              <LanguageBar
                language="English"
                percentage={100}
              />

              <LanguageBar
                language="Gujarati"
                percentage={72}
              />

              <LanguageBar
                language="Tamil"
                percentage={61}
              />

            </div>

          </div>

          {/* CHANNELS */}

          <div className={styles.whiteBox}>

            <h2>
              Distribution Channels
            </h2>

            <p>
              Current advisory delivery status
            </p>

            <div className={styles.channelGrid}>

              <ChannelCard
                icon="📱"
                channel="SMS"
                count="2.3M"
              />

              <ChannelCard
                icon="🔔"
                channel="Mobile App"
                count="842K"
              />

              <ChannelCard
                icon="📧"
                channel="Email"
                count="184K"
              />

              <ChannelCard
                icon="📺"
                channel="Government Portal"
                count="36"
              />

            </div>

          </div>

        </div>

      </main>

      {/* ===================================================
          PREVIEW MODAL
      =================================================== */}

      {selectedAdvisory && (

        <div className={styles.modalOverlay}>

          <div className={styles.modal}>

            <h2>
              Advisory Preview
            </h2>

            <span
              className={styles.levelBadge}
              style={{
                background:
                  selectedAdvisory.color,
              }}
            >
              {selectedAdvisory.level}
            </span>

            <h3>
              {selectedAdvisory.title}
            </h3>

            <p>
              Region: {selectedAdvisory.region}
            </p>

            <p>
              Audience: {selectedAdvisory.audience}
            </p>

            <p>
              Temperature: {selectedAdvisory.temp}
            </p>

            <p>
              Language: {selectedAdvisory.language}
            </p>

            <button
              className={styles.primaryButton}
              onClick={() =>
                setSelectedAdvisory(null)
              }
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>
  );
}