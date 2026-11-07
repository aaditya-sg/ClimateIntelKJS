import { useState } from "react";
import LiveDashboard from "/pages/LiveDashboard";
import IoTNetwork from "./IoT/IoTNetwork";
import Advisories from "/pages/Advisories";
import HomePage from "./App.tsx";

const NAV_LINKS = [
  "Home",
  "Live Dashboard",
  "IoT Network",
  "Advisories",
  "API Docs",
];

function AppNav({ page, setPage }) {
  const [open, setOpen] = useState(false);

  const goTo = (nextPage) => {
    setPage(nextPage);
    setOpen(false);
  };

  return (
    <nav
      style={{
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        backgroundColor: "rgba(248, 250, 252, 0.85)",
        borderBottom: "1px solid rgba(15, 76, 129, 0.08)",
      }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <button
          type="button"
          className="flex items-center gap-3 bg-transparent border-0 cursor-pointer"
          onClick={() => goTo("Home")}
        >
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #0F4C81 0%, #00A896 100%)",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="7" stroke="white" strokeWidth="1.5" />
              <path d="M10 3v14M3 10h14" stroke="white" strokeWidth="1.5" />
            </svg>
          </div>
          <span
            className="text-lg"
            style={{
              color: "#0F4C81",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 700,
            }}
          >
            ClimateIntel<span style={{ color: "#00A896" }}> KJS</span>
          </span>
        </button>

        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              type="button"
              className="text-sm font-medium bg-transparent border-0 cursor-pointer"
              style={{
                color: page === link ? "#0F4C81" : "#475569",
                fontFamily: "Inter, sans-serif",
                fontWeight: page === link ? 600 : 500,
              }}
              onClick={() => goTo(link)}
            >
              {link}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            className="px-4 py-2 text-sm font-semibold rounded-lg text-white"
            style={{ background: "#0F4C81", fontFamily: "Inter, sans-serif" }}
            onClick={() => goTo("Live Dashboard")}
          >
            Access Command Center
          </button>
        </div>

        <button
          type="button"
          className="md:hidden p-2 bg-transparent border-0"
          onClick={() => setOpen((previous) => !previous)}
        >
          <div className="space-y-1.5">
            <span className="block w-5 h-0.5 bg-slate-700" />
            <span className="block w-5 h-0.5 bg-slate-700" />
            <span className="block w-5 h-0.5 bg-slate-700" />
          </div>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-100 bg-white px-6 py-4 space-y-3">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              type="button"
              className="block w-full text-left text-sm py-1 bg-transparent border-0 cursor-pointer"
              style={{ color: page === link ? "#0F4C81" : "#475569" }}
              onClick={() => goTo(link)}
            >
              {link}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

function ApiDocs() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24">
      <div className="max-w-5xl mx-auto px-6 py-12">

        <div className="text-center mb-10">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
            style={{
              background: "#00A89615",
              color: "#00A896",
            }}
          >
            DEVELOPER RESOURCES
          </span>

          <h1
            className="text-4xl font-bold mt-4"
            style={{
              color: "#1E293B",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            API Documentation
          </h1>

          <p className="text-slate-500 mt-3 max-w-xl mx-auto">
            Access climate intelligence, weather station data,
            heatwave forecasts, and advisory services through
            ClimateIntel KJS APIs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {[
            {
              method: "GET",
              endpoint: "/api/weather",
              description: "Retrieve current weather observations.",
            },
            {
              method: "GET",
              endpoint: "/api/heatmap",
              description: "Retrieve regional heat hotspot data.",
            },
            {
              method: "GET",
              endpoint: "/api/sensors",
              description: "Retrieve IoT weather station status.",
            },
            {
              method: "GET",
              endpoint: "/api/advisories",
              description: "Retrieve generated heatwave advisories.",
            },
          ].map((api) => (
            <div
              key={api.endpoint}
              className="bg-white rounded-2xl p-5 border border-slate-200"
            >
              <div className="flex items-center gap-3">
                <span
                  className="px-2 py-1 rounded text-xs font-bold"
                  style={{
                    background: "#00A89615",
                    color: "#00A896",
                  }}
                >
                  {api.method}
                </span>

                <code className="text-sm font-semibold">
                  {api.endpoint}
                </code>
              </div>

              <p className="text-sm text-slate-500 mt-4">
                {api.description}
              </p>
            </div>
          ))}
        </div>

        <div
          className="mt-8 rounded-2xl p-6"
          style={{ background: "#0F1C2E" }}
        >
          <p className="text-xs text-slate-400 mb-3">
            Example request
          </p>

          <pre className="text-sm text-green-300 overflow-x-auto">
{`GET /api/weather?district=Nagpur

{
  "temperature": 44.8,
  "humidity": 31,
  "heatIndex": 52,
  "status": "EXTREME"
}`}
          </pre>
        </div>

      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("Home");

  const renderPage = () => {
    switch (page) {
      case "Live Dashboard":
        return <LiveDashboard />;

      case "IoT Network":
        return <IoTNetwork />;

      case "Advisories":
        return <Advisories />;

      case "API Docs":
        return <ApiDocs />;

      case "Home":
      default:
        return <HomePage showNav={false} />;
    }
  };

  return (
    <>
      <AppNav page={page} setPage={setPage} />
      {renderPage()}
    </>
  );
}