import { useState } from 'react'

const NAV_LINKS = ['Home', 'Live Dashboard', 'IoT Network', 'Advisories', 'API Docs']

function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <nav
      style={{
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        backgroundColor: 'rgba(248, 250, 252, 0.85)',
        borderBottom: '1px solid rgba(15, 76, 129, 0.08)',
      }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #0F4C81 0%, #00A896 100%)' }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="7" stroke="white" strokeWidth="1.5" />
              <path d="M10 3v14M3 10h14" stroke="white" strokeWidth="1.5" />
              <path d="M5 5.5Q10 8 15 5.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M5 14.5Q10 12 15 14.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
              <circle cx="14.5" cy="7" r="2" fill="#FFD166" />
              <line x1="14.5" y1="4.5" x2="14.5" y2="3.5" stroke="#FFD166" strokeWidth="1.2" />
              <line x1="14.5" y1="9.5" x2="14.5" y2="10.5" stroke="#FFD166" strokeWidth="1.2" />
              <line x1="12.5" y1="7" x2="11.5" y2="7" stroke="#FFD166" strokeWidth="1.2" />
              <line x1="16.5" y1="7" x2="17.5" y2="7" stroke="#FFD166" strokeWidth="1.2" />
            </svg>
          </div>
          <span className="font-heading font-700 text-lg" style={{ color: '#0F4C81', fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
            ClimateIntel<span style={{ color: '#00A896' }}> KJS</span>
          </span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((l) => (
            <a
              key={l}
              href="#"
              className="text-sm font-medium transition-colors"
              style={{ color: '#475569', fontFamily: 'Inter, sans-serif' }}
              onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = '#0F4C81')}
              onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = '#475569')}
            >
              {l}
            </a>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button
            className="px-4 py-2 text-sm font-medium rounded-lg border transition-all"
            style={{ borderColor: '#0F4C81', color: '#0F4C81', fontFamily: 'Inter, sans-serif', background: 'transparent' }}
            onMouseEnter={(e) => {
              const b = e.currentTarget
              b.style.background = '#0F4C81'
              b.style.color = 'white'
            }}
            onMouseLeave={(e) => {
              const b = e.currentTarget
              b.style.background = 'transparent'
              b.style.color = '#0F4C81'
            }}
          >
            Login
          </button>
          <button
            className="px-4 py-2 text-sm font-semibold rounded-lg text-white transition-opacity"
            style={{ background: '#0F4C81', fontFamily: 'Inter, sans-serif' }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Access Command Center
          </button>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          <div className="space-y-1.5">
            <span className="block w-5 h-0.5 bg-slate-700" />
            <span className="block w-5 h-0.5 bg-slate-700" />
            <span className="block w-5 h-0.5 bg-slate-700" />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-slate-100 bg-white px-6 py-4 space-y-3">
          {NAV_LINKS.map((l) => (
            <a key={l} href="#" className="block text-sm text-slate-600 py-1">
              {l}
            </a>
          ))}
          <div className="flex gap-3 pt-2">
            <button className="flex-1 py-2 text-sm border rounded-lg" style={{ borderColor: '#0F4C81', color: '#0F4C81' }}>
              Login
            </button>
            <button className="flex-1 py-2 text-sm rounded-lg text-white font-medium" style={{ background: '#0F4C81' }}>
              Command Center
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

function HeroIllustration() {
  return (
    <div className="relative w-full h-full min-h-105 flex items-center justify-center">
      {/* City map base */}
      <div
        className="relative w-full max-w-120 h-95 rounded-2xl overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #0a2540 0%, #0d3d6b 40%, #0a2d50 100%)' }}
      >
        {/* Grid overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,168,150,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,168,150,0.08) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Glowing heat hotspots */}
        <HeatSpot cx="35%" cy="30%" color="#D62828" size={90} label="Vidarbha" intensity="EXTREME" />
        <HeatSpot cx="62%" cy="52%" color="#F77F00" size={70} label="Marathwada" intensity="SEVERE" />
        <HeatSpot cx="22%" cy="65%" color="#FFD166" size={55} label="Konkan" intensity="MODERATE" />

        {/* City block grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 480 380">
          {[60, 120, 180, 240, 300, 360, 420].map((x) => (
            <line key={x} x1={x} y1="0" x2={x} y2="380" stroke="#00A896" strokeWidth="0.5" />
          ))}
          {[60, 120, 180, 240, 300].map((y) => (
            <line key={y} x1="0" y1={y} x2="480" y2={y} stroke="#00A896" strokeWidth="0.5" />
          ))}
          {/* Road-like thicker lines */}
          <line x1="0" y1="190" x2="480" y2="190" stroke="#00A896" strokeWidth="1.5" />
          <line x1="240" y1="0" x2="240" y2="380" stroke="#00A896" strokeWidth="1.5" />
        </svg>

        {/* IoT sensor nodes */}
        {[
          { x: '15%', y: '20%' }, { x: '55%', y: '15%' }, { x: '80%', y: '30%' },
          { x: '10%', y: '55%' }, { x: '75%', y: '70%' }, { x: '45%', y: '80%' },
        ].map((pos, i) => (
          <SensorNode key={i} x={pos.x} y={pos.y} />
        ))}

        {/* Temperature scale legend */}
        <div className="absolute bottom-4 right-4 rounded-lg px-3 py-2" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}>
          <p className="text-xs text-slate-300 mb-1.5" style={{ fontFamily: 'Inter, sans-serif', fontSize: 10 }}>Heat Index</p>
          {[
            { color: '#D62828', label: 'Extreme' },
            { color: '#F77F00', label: 'Severe' },
            { color: '#FFD166', label: 'Moderate' },
            { color: '#4CAF50', label: 'Normal' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5 mb-1">
              <div className="w-2 h-2 rounded-sm" style={{ background: item.color }} />
              <span style={{ color: '#CBD5E1', fontFamily: 'Inter, sans-serif', fontSize: 10 }}>{item.label}</span>
            </div>
          ))}
        </div>

        {/* Live badge */}
        <div
          className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span style={{ color: '#86EFAC', fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600 }}>LIVE</span>
        </div>

        {/* Temp readout */}
        <div className="absolute top-4 right-4 text-right">
          <p style={{ color: '#D62828', fontFamily: 'Poppins, sans-serif', fontSize: 28, fontWeight: 700, lineHeight: 1 }}>47°C</p>
          <p style={{ color: '#94A3B8', fontFamily: 'Inter, sans-serif', fontSize: 10 }}>Peak Today · Vidarbha</p>
        </div>
      </div>
    </div>
  )
}

function HeatSpot({ cx, cy, color, size, label, intensity }: {
  cx: string; cy: string; color: string; size: number; label: string; intensity: string
}) {
  return (
    <div
      className="absolute flex items-center justify-center"
      style={{ left: cx, top: cy, transform: 'translate(-50%, -50%)' }}
    >
      <div
        className="rounded-full flex items-center justify-center"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle, ${color}55 0%, ${color}22 60%, transparent 100%)`,
          boxShadow: `0 0 ${size * 0.6}px ${color}44`,
          animation: 'pulse 2.5s ease-in-out infinite',
        }}
      >
        <div
          className="rounded-full flex items-center justify-center"
          style={{
            width: size * 0.4,
            height: size * 0.4,
            background: color,
            boxShadow: `0 0 12px ${color}`,
          }}
        />
      </div>
      <div
        className="absolute -bottom-7 text-center whitespace-nowrap"
        style={{ fontFamily: 'Inter, sans-serif', fontSize: 9, color: '#CBD5E1', fontWeight: 500 }}
      >
        <span style={{ color }}>{intensity}</span> · {label}
      </div>
    </div>
  )
}

function SensorNode({ x, y }: { x: string; y: string }) {
  return (
    <div
      className="absolute"
      style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
    >
      <div
        className="w-4 h-4 rounded-full flex items-center justify-center"
        style={{ background: '#00A896', boxShadow: '0 0 8px #00A89688' }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-white" />
      </div>
      <div
        className="absolute inset-0 rounded-full border"
        style={{ borderColor: '#00A896', animation: 'ping 2s linear infinite', opacity: 0.4 }}
      />
    </div>
  )
}

const CAPABILITIES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="2" y="14" width="5" height="10" rx="1" fill="#0F4C81" opacity="0.3" />
        <rect x="9" y="9" width="5" height="15" rx="1" fill="#0F4C81" opacity="0.6" />
        <rect x="16" y="5" width="5" height="19" rx="1" fill="#0F4C81" />
        <path d="M3 12 L7 8 L12 10 L17 5 L22 7" stroke="#00A896" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="22" cy="7" r="2" fill="#00A896" />
        <path d="M19 2 Q22 4 25 2 M19 2 Q22 0 25 2" stroke="#0F4C81" strokeWidth="1" />
      </svg>
    ),
    title: 'AI Spatio-Temporal Forecasting',
    text: 'Deep learning models analyzing historical IMD GRD files to predict region-wise maximum temperatures and hotspot evolution with 92% accuracy.',
    stat: '92% accuracy',
    statColor: '#0F4C81',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="4" fill="#00A896" />
        <path d="M14 10 C10 10 7 12.5 7 14" stroke="#00A896" strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />
        <path d="M14 10 C18 10 21 12.5 21 14" stroke="#00A896" strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />
        <path d="M14 10 C8 10 4 12 4 14" stroke="#00A896" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
        <path d="M14 10 C20 10 24 12 24 14" stroke="#00A896" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
        <rect x="12" y="18" width="4" height="6" rx="1" fill="#0F4C81" opacity="0.4" />
        <rect x="10" y="23" width="8" height="1.5" rx="0.75" fill="#0F4C81" opacity="0.6" />
        <circle cx="8" cy="8" r="1.5" fill="#FFD166" />
        <circle cx="20" cy="6" r="1.5" fill="#F77F00" />
        <circle cx="22" cy="20" r="1.5" fill="#4CAF50" />
      </svg>
    ),
    title: 'IoT AWS Integration',
    text: 'Real-time ground-truth validation using 847+ localized Automated Weather Stations to capture micro-climate heat stress at sub-district resolution.',
    stat: '847+ stations',
    statColor: '#00A896',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="4" width="20" height="20" rx="3" fill="#0F4C81" opacity="0.1" stroke="#0F4C81" strokeWidth="1.5" />
        <path d="M8 10 h12 M8 14 h8 M8 18 h10" stroke="#0F4C81" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="22" cy="8" r="5" fill="#00A896" />
        <path d="M20 8 L21.5 9.5 L24 6.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'LLM-Generated Advisories',
    text: 'Automated translation of complex meteorological data into stakeholder-specific alerts for farmers, hospitals, and citizens in 12 regional languages.',
    stat: '12 languages',
    statColor: '#F77F00',
  },
]

function CapabilityCard({ cap }: { cap: typeof CAPABILITIES[0] }) {
  return (
    <div
      className="rounded-2xl p-6 transition-all duration-200"
      style={{
        background: 'white',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.08), 0 2px 4px -1px rgba(0,0,0,0.04)',
        border: '1px solid rgba(15, 76, 129, 0.06)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 12px 24px -4px rgba(15,76,129,0.12), 0 4px 8px -2px rgba(0,0,0,0.06)'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.08), 0 2px 4px -1px rgba(0,0,0,0.04)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: '#F0F7FF' }}>
        {cap.icon}
      </div>
      <h3 className="font-semibold text-base mb-2" style={{ color: '#1E293B', fontFamily: 'Poppins, sans-serif' }}>
        {cap.title}
      </h3>
      <p className="text-sm leading-relaxed mb-4" style={{ color: '#475569', fontFamily: 'Inter, sans-serif' }}>
        {cap.text}
      </p>
      <div
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
        style={{ background: cap.statColor + '12', color: cap.statColor, fontFamily: 'Inter, sans-serif' }}
      >
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: cap.statColor }} />
        {cap.stat}
      </div>
    </div>
  )
}

function DashboardPreview() {
  const alerts = [
    { badge: '#D62828', label: 'EXTREME', title: 'Extreme Heatwave — Vidarbha Region', time: '2m ago', bg: '#FFF1F1' },
    { badge: '#F77F00', label: 'WARNING', title: 'AWS Sensor Offline — Station 42, Nagpur', time: '8m ago', bg: '#FFF7ED' },
    { badge: '#0F4C81', label: 'ADVISORY', title: 'Advisory Generated for Agricultural Dept.', time: '15m ago', bg: '#EFF6FF' },
  ]

  return (
    <section className="py-20 px-6" style={{ background: '#F0F7FF' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
            style={{ background: '#0F4C8115', color: '#0F4C81', fontFamily: 'Inter, sans-serif' }}
          >
            COMMAND CENTER
          </span>
          <h2
            className="text-3xl font-bold mb-3"
            style={{ color: '#1E293B', fontFamily: 'Poppins, sans-serif' }}
          >
            Centralized Command &amp; Control Dashboard
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: '#475569', fontFamily: 'Inter, sans-serif' }}>
            All districts, all sensors, all advisories — unified in one real-time situational awareness interface.
          </p>
        </div>

        {/* Browser frame */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            boxShadow: '0 25px 50px -12px rgba(15, 76, 129, 0.22)',
            border: '1px solid rgba(15,76,129,0.12)',
          }}
        >
          {/* Browser chrome */}
          <div className="h-10 flex items-center gap-2 px-4" style={{ background: '#1E293B' }}>
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <div
              className="flex-1 max-w-xs mx-4 h-6 rounded flex items-center px-3"
              style={{ background: '#334155' }}
            >
              <span style={{ color: '#94A3B8', fontFamily: 'Inter, sans-serif', fontSize: 11 }}>
                climateintel.kjsit.gov.in/dashboard
              </span>
            </div>
          </div>

          {/* Dashboard body */}
          <div className="flex" style={{ background: '#F8FAFC', minHeight: 480 }}>
            {/* Sidebar */}
            <div className="w-16 flex flex-col items-center gap-5 py-6" style={{ background: '#0F4C81' }}>
              {[
                <MapIcon key="map" />,
                <AnalyticsIcon key="analytics" />,
                <AlertIcon key="alert" />,
                <SettingsIcon key="settings" />,
              ].map((icon, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer transition-all"
                  style={{ background: i === 0 ? '#00A896' : 'rgba(255,255,255,0.1)' }}
                >
                  {icon}
                </div>
              ))}
            </div>

            {/* Main map area */}
            <div className="flex-1 relative overflow-hidden" style={{ background: '#0d2a4a' }}>
              {/* Grid lines */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(0,168,150,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,168,150,0.06) 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />
              {/* India outline placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-64 h-72 opacity-20">
                  <svg viewBox="0 0 200 240" fill="none" className="w-full h-full">
                    <path
                      d="M80 10 L120 8 L140 20 L160 30 L170 60 L165 90 L155 110 L150 140 L140 165 L120 190 L100 220 L80 190 L60 160 L50 130 L45 100 L40 70 L50 40 L65 20 Z"
                      stroke="#00A896"
                      strokeWidth="1.5"
                      fill="rgba(0, 168, 150, 0.1)"
                    />
                  </svg>
                </div>
              </div>

              {/* Heat hotspots on map */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-64 h-72">
                  {/* Vidarbha - extreme */}
                  <div className="absolute" style={{ right: '20%', top: '42%' }}>
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{
                        background: 'radial-gradient(circle, #D6282866 0%, #D6282822 60%, transparent 100%)',
                        boxShadow: '0 0 20px #D6282844',
                      }}
                    >
                      <div className="w-5 h-5 rounded-full" style={{ background: '#D62828', boxShadow: '0 0 10px #D62828' }} />
                    </div>
                    <p style={{ color: '#F87171', fontSize: 9, fontFamily: 'Inter, sans-serif', textAlign: 'center', marginTop: 2 }}>47°C</p>
                  </div>
                  {/* Marathwada - severe */}
                  <div className="absolute" style={{ left: '28%', top: '50%' }}>
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{
                        background: 'radial-gradient(circle, #F77F0055 0%, #F77F0020 60%, transparent 100%)',
                        boxShadow: '0 0 16px #F77F0044',
                      }}
                    >
                      <div className="w-4 h-4 rounded-full" style={{ background: '#F77F00', boxShadow: '0 0 8px #F77F00' }} />
                    </div>
                    <p style={{ color: '#FB923C', fontSize: 9, fontFamily: 'Inter, sans-serif', textAlign: 'center', marginTop: 2 }}>43°C</p>
                  </div>
                  {/* Konkan - moderate */}
                  <div className="absolute" style={{ left: '12%', top: '65%' }}>
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{
                        background: 'radial-gradient(circle, #FFD16644 0%, #FFD16618 60%, transparent 100%)',
                        boxShadow: '0 0 12px #FFD16633',
                      }}
                    >
                      <div className="w-3 h-3 rounded-full" style={{ background: '#FFD166', boxShadow: '0 0 6px #FFD166' }} />
                    </div>
                    <p style={{ color: '#FDE047', fontSize: 9, fontFamily: 'Inter, sans-serif', textAlign: 'center', marginTop: 2 }}>39°C</p>
                  </div>
                </div>
              </div>

              {/* Stats bar */}
              <div className="absolute bottom-0 left-0 right-0 flex gap-4 p-4" style={{ background: 'rgba(13,42,74,0.9)', backdropFilter: 'blur(8px)' }}>
                {[
                  { label: 'Active Hotspots', value: '12', color: '#D62828' },
                  { label: 'Sensors Online', value: '839/847', color: '#4CAF50' },
                  { label: 'Advisories Sent', value: '1,284', color: '#00A896' },
                  { label: 'Districts Monitored', value: '36', color: '#FFD166' },
                ].map((s) => (
                  <div key={s.label} className="flex-1 text-center">
                    <p style={{ color: s.color, fontFamily: 'Poppins, sans-serif', fontSize: 18, fontWeight: 700, lineHeight: 1 }}>{s.value}</p>
                    <p style={{ color: '#94A3B8', fontFamily: 'Inter, sans-serif', fontSize: 10, marginTop: 2 }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right panel — alerts */}
            <div className="w-64 flex flex-col" style={{ background: 'white', borderLeft: '1px solid #E2E8F0' }}>
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <span style={{ color: '#1E293B', fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 600 }}>Live Alerts</span>
                <span
                  className="px-2 py-0.5 rounded-full text-xs font-semibold"
                  style={{ background: '#FFF1F1', color: '#D62828', fontFamily: 'Inter, sans-serif' }}
                >
                  3 Active
                </span>
              </div>
              <div className="flex-1 p-3 space-y-2 overflow-y-auto">
                {alerts.map((a, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl"
                    style={{ background: a.bg, border: `1px solid ${a.badge}22` }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="px-1.5 py-0.5 rounded text-xs font-bold"
                        style={{ background: a.badge, color: 'white', fontFamily: 'Inter, sans-serif', fontSize: 9, letterSpacing: '0.05em' }}
                      >
                        {a.label}
                      </span>
                      <span style={{ color: '#94A3B8', fontFamily: 'Inter, sans-serif', fontSize: 10, marginLeft: 'auto' }}>{a.time}</span>
                    </div>
                    <p style={{ color: '#1E293B', fontFamily: 'Inter, sans-serif', fontSize: 11, lineHeight: 1.5 }}>{a.title}</p>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-slate-100">
                <button
                  className="w-full py-2 rounded-lg text-xs font-semibold text-white"
                  style={{ background: '#0F4C81', fontFamily: 'Inter, sans-serif' }}
                >
                  View All Alerts →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function MapIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <polygon points="6,2 12,4 12,16 6,14" stroke="white" strokeWidth="1.2" fill="rgba(255,255,255,0.2)" />
      <polygon points="1,3 6,2 6,14 1,15" stroke="white" strokeWidth="1.2" fill="rgba(255,255,255,0.1)" />
      <polygon points="12,4 17,3 17,15 12,16" stroke="white" strokeWidth="1.2" fill="rgba(255,255,255,0.1)" />
    </svg>
  )
}
function AnalyticsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="2" y="10" width="3" height="6" rx="1" fill="white" opacity="0.6" />
      <rect x="7" y="6" width="3" height="10" rx="1" fill="white" opacity="0.8" />
      <rect x="12" y="3" width="3" height="13" rx="1" fill="white" />
    </svg>
  )
}
function AlertIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 2 L16 14 H2 Z" stroke="white" strokeWidth="1.2" fill="rgba(255,255,255,0.2)" />
      <line x1="9" y1="7" x2="9" y2="11" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="9" cy="13" r="0.8" fill="white" />
    </svg>
  )
}
function SettingsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="2.5" stroke="white" strokeWidth="1.2" />
      <path d="M9 1.5 V3.5 M9 14.5 V16.5 M1.5 9 H3.5 M14.5 9 H16.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M4.4 4.4 L5.8 5.8 M12.2 12.2 L13.6 13.6 M4.4 13.6 L5.8 12.2 M12.2 5.8 L13.6 4.4" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

const STAKEHOLDERS = [
  {
    icon: '🏛️',
    title: 'Disaster Management',
    desc: 'Real-time resource allocation, cooling center deployment, and evacuation routing based on predictive hotspot maps.',
    color: '#0F4C81',
  },
  {
    icon: '🌾',
    title: 'Agriculture',
    desc: 'Crop-specific heat stress advisories, optimal irrigation scheduling, and harvest timing recommendations for 14 crop types.',
    color: '#4CAF50',
  },
  {
    icon: '🏥',
    title: 'Public Health',
    desc: 'Predictive heat-stroke case load forecasting to enable hospital bed management and emergency medication pre-positioning.',
    color: '#D62828',
  },
  {
    icon: '📱',
    title: 'Citizens',
    desc: 'Hyper-local SMS and app-based daily safety alerts with heat action plans in regional languages for vulnerable populations.',
    color: '#00A896',
  },
]

export default function App({ showNav = true }: { showNav?: boolean }) {
  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh' }}>
      {showNav && <Nav />}

      {/* Hero */}
      <section className="pt-28 pb-20 px-6" style={{ background: 'linear-gradient(160deg, #F0F7FF 0%, #F8FAFC 60%, #FAFFFE 100%)' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left text */}
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
              style={{
                background: 'rgba(15, 76, 129, 0.08)',
                color: '#0F4C81',
                fontFamily: 'Inter, sans-serif',
                border: '1px solid rgba(15, 76, 129, 0.15)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
              AI-Driven Meteorological Analytics
            </div>

            <h1
              className="text-4xl lg:text-5xl font-bold leading-tight mb-5"
              style={{ color: '#1E293B', fontFamily: 'Poppins, sans-serif', letterSpacing: '-0.02em' }}
            >
              Predict, Monitor, and Mitigate{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg, #D62828 0%, #F77F00 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Heatwaves
              </span>{' '}
              with AI Intelligence.
            </h1>

            <p className="text-base leading-relaxed mb-8" style={{ color: '#475569', fontFamily: 'Inter, sans-serif', maxWidth: 480 }}>
              Integrating IMD historical data with real-time IoT Automated Weather Stations and LLM-powered advisory generation for proactive disaster management across India.
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                className="px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all"
                style={{
                  background: '#0F4C81',
                  fontFamily: 'Inter, sans-serif',
                  boxShadow: '0 4px 14px rgba(15, 76, 129, 0.35)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 6px 20px rgba(15, 76, 129, 0.45)')}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 4px 14px rgba(15, 76, 129, 0.35)')}
              >
                View Live Heatmap →
              </button>
              <button
                className="px-6 py-3 rounded-xl text-sm font-semibold transition-all"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  border: '2px solid #00A896',
                  color: '#00A896',
                  background: 'transparent',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#00A896'
                  e.currentTarget.style.color = 'white'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = '#00A896'
                }}
              >
                Subscribe to SMS Alerts
              </button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-6 mt-10 pt-8 border-t border-slate-200">
              {[
                { label: 'IMD Data Years', value: '30+' },
                { label: 'Districts Covered', value: '720' },
                { label: 'Uptime', value: '99.7%' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold" style={{ color: '#0F4C81', fontFamily: 'Poppins, sans-serif' }}>{stat.value}</p>
                  <p className="text-xs" style={{ color: '#94A3B8', fontFamily: 'Inter, sans-serif' }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right illustration */}
          <HeroIllustration />
        </div>
      </section>

      {/* Alert ticker */}
      <div className="py-3 overflow-hidden" style={{ background: '#D62828' }}>
        <div className="flex items-center gap-8 animate-marquee whitespace-nowrap px-6">
          {[
            '🔴 EXTREME HEATWAVE ALERT — Vidarbha, Marathwada: 47°C Expected',
            '🟠 SEVERE HEAT — Rajasthan Districts on High Alert',
            '🟡 MODERATE ADVISORY — Punjab Agricultural Zones Active',
            '🟢 SMS ALERTS ACTIVE — 2.3M Citizens Notified Today',
            '📡 SENSOR NETWORK — 839/847 Stations Operational',
          ].map((msg, i) => (
            <span key={i} style={{ color: 'white', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500, flexShrink: 0 }}>
              {msg}
              <span className="mx-8 opacity-40">|</span>
            </span>
          ))}
        </div>
      </div>

      {/* Core capabilities */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
              style={{ background: '#00A89612', color: '#00A896', fontFamily: 'Inter, sans-serif', border: '1px solid #00A89630' }}
            >
              CORE CAPABILITIES
            </span>
            <h2 className="text-3xl font-bold mb-3" style={{ color: '#1E293B', fontFamily: 'Poppins, sans-serif' }}>
              End-to-End Climate Intelligence Stack
            </h2>
            <p className="text-base max-w-lg mx-auto" style={{ color: '#475569', fontFamily: 'Inter, sans-serif' }}>
              From raw meteorological data ingestion to actionable public advisories — fully automated, sub-hourly refresh.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CAPABILITIES.map((cap) => (
              <CapabilityCard key={cap.title} cap={cap} />
            ))}
          </div>
        </div>
      </section>

      {/* Heat alert reference band */}
      <section className="py-10 px-6" style={{ background: '#1E293B' }}>
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold text-center mb-6" style={{ color: '#64748B', fontFamily: 'Inter, sans-serif', letterSpacing: '0.1em' }}>
            HEAT INDEX CLASSIFICATION SCALE — IMD STANDARD
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { level: 'Normal / Safe', range: '< 35°C', color: '#4CAF50', bg: 'rgba(76, 175, 80, 0.12)', border: 'rgba(76, 175, 80, 0.3)' },
              { level: 'Moderate Heat', range: '35 – 40°C', color: '#FFD166', bg: 'rgba(255, 209, 102, 0.12)', border: 'rgba(255, 209, 102, 0.3)' },
              { level: 'Severe Heatwave', range: '40 – 45°C', color: '#F77F00', bg: 'rgba(247, 127, 0, 0.12)', border: 'rgba(247, 127, 0, 0.3)' },
              { level: 'Extreme Heatwave', range: '> 45°C', color: '#D62828', bg: 'rgba(214, 40, 40, 0.12)', border: 'rgba(214, 40, 40, 0.3)' },
            ].map((item) => (
              <div
                key={item.level}
                className="rounded-xl p-4 text-center"
                style={{ background: item.bg, border: `1px solid ${item.border}` }}
              >
                <p className="text-2xl font-bold mb-1" style={{ color: item.color, fontFamily: 'Poppins, sans-serif' }}>{item.range}</p>
                <p className="text-xs font-semibold" style={{ color: item.color, fontFamily: 'Inter, sans-serif', opacity: 0.85 }}>{item.level}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <DashboardPreview />

      {/* Stakeholders */}
      <section className="py-20 px-6" style={{ background: '#F8FAFC' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
              style={{ background: '#0F4C8112', color: '#0F4C81', fontFamily: 'Inter, sans-serif', border: '1px solid #0F4C8120' }}
            >
              STAKEHOLDERS
            </span>
            <h2 className="text-3xl font-bold mb-3" style={{ color: '#1E293B', fontFamily: 'Poppins, sans-serif' }}>
              Empowering Decision Makers Across Sectors
            </h2>
            <p className="text-base max-w-lg mx-auto" style={{ color: '#475569', fontFamily: 'Inter, sans-serif' }}>
              Purpose-built advisory channels for each stakeholder group — the right information to the right authority at the right time.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STAKEHOLDERS.map((s) => (
              <div
                key={s.title}
                className="rounded-2xl p-6 transition-all duration-200"
                style={{
                  background: 'white',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.07)',
                  border: `1px solid ${s.color}18`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 12px 24px -4px ${s.color}20`
                  e.currentTarget.style.borderColor = `${s.color}40`
                  e.currentTarget.style.transform = 'translateY(-3px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.07)'
                  e.currentTarget.style.borderColor = `${s.color}18`
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                  style={{ background: `${s.color}10` }}
                >
                  {s.icon}
                </div>
                <h3 className="font-semibold text-base mb-2" style={{ color: '#1E293B', fontFamily: 'Poppins, sans-serif' }}>
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#475569', fontFamily: 'Inter, sans-serif' }}>
                  {s.desc}
                </p>
                <div className="mt-4">
                  <a
                    href="#"
                    className="text-xs font-semibold"
                    style={{ color: s.color, fontFamily: 'Inter, sans-serif', textDecoration: 'none' }}
                  >
                    Learn more →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="py-16 px-6" style={{ background: 'linear-gradient(135deg, #0F4C81 0%, #0a3560 100%)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Ready to deploy predictive heatwave protection?
          </h2>
          <p className="text-base mb-8" style={{ color: '#93C5FD', fontFamily: 'Inter, sans-serif' }}>
            Join 36 district authorities and 12 state agencies already using ClimateIntel KJS for early warning coverage.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              className="px-8 py-3.5 rounded-xl text-sm font-semibold transition-all"
              style={{ background: '#00A896', color: 'white', fontFamily: 'Inter, sans-serif', boxShadow: '0 4px 14px rgba(0,168,150,0.4)' }}
            >
              Request a Demo
            </button>
            <button
              className="px-8 py-3.5 rounded-xl text-sm font-semibold transition-all"
              style={{ background: 'rgba(255,255,255,0.1)', color: 'white', fontFamily: 'Inter, sans-serif', border: '1px solid rgba(255,255,255,0.2)' }}
            >
              View API Documentation
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#0F1C2E' }}>
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #0F4C81 0%, #00A896 100%)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="7" stroke="white" strokeWidth="1.5" />
                    <path d="M10 3v14M3 10h14" stroke="white" strokeWidth="1.5" />
                  </svg>
                </div>
                <span style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
                  ClimateIntel <span style={{ color: '#00A896' }}>KJS</span>
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#64748B', fontFamily: 'Inter, sans-serif' }}>
                A research collaboration between KJSIT and KJSSE for AI-powered climate intelligence and heatwave early warning systems across India.
              </p>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="text-xs font-semibold mb-4" style={{ color: '#94A3B8', fontFamily: 'Inter, sans-serif', letterSpacing: '0.08em' }}>
                PLATFORM
              </h4>
              {['Live Dashboard', 'IoT Network Map', 'Heatwave Advisories', 'SMS Alert Service', 'API Access'].map((l) => (
                <a key={l} href="#" className="block text-sm mb-2 transition-colors" style={{ color: '#64748B', fontFamily: 'Inter, sans-serif', textDecoration: 'none' }}
                  onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = '#00A896')}
                  onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = '#64748B')}
                >
                  {l}
                </a>
              ))}
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-xs font-semibold mb-4" style={{ color: '#94A3B8', fontFamily: 'Inter, sans-serif', letterSpacing: '0.08em' }}>
                RESOURCES
              </h4>
              {['IMD Data Portal', 'Research Papers', 'Technical Documentation', 'Open Datasets', 'Case Studies'].map((l) => (
                <a key={l} href="#" className="block text-sm mb-2 transition-colors" style={{ color: '#64748B', fontFamily: 'Inter, sans-serif', textDecoration: 'none' }}
                  onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = '#00A896')}
                  onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = '#64748B')}
                >
                  {l}
                </a>
              ))}
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-xs font-semibold mb-4" style={{ color: '#94A3B8', fontFamily: 'Inter, sans-serif', letterSpacing: '0.08em' }}>
                CONTACT & SUPPORT
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <span style={{ color: '#00A896', fontSize: 14 }}>📧</span>
                  <span className="text-sm" style={{ color: '#64748B', fontFamily: 'Inter, sans-serif' }}>climateintel@kjsit.edu.in</span>
                </div>
                <div className="flex items-start gap-2">
                  <span style={{ color: '#00A896', fontSize: 14 }}>📍</span>
                  <span className="text-sm" style={{ color: '#64748B', fontFamily: 'Inter, sans-serif' }}>KJSIT, Vidyavihar (W), Mumbai — 400 086</span>
                </div>
                <div className="flex items-start gap-2">
                  <span style={{ color: '#00A896', fontSize: 14 }}>🕐</span>
                  <span className="text-sm" style={{ color: '#64748B', fontFamily: 'Inter, sans-serif' }}>Support: Mon–Sat, 9:00–18:00 IST</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <p style={{ color: '#475569', fontFamily: 'Inter, sans-serif', fontSize: 13 }}>
              © 2026 Climate Intelligence Project — KJSIT / KJSSE Collaboration. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              {['Privacy Policy', 'Terms of Service', 'Data Usage Policy'].map((l) => (
                <a
                  key={l}
                  href="#"
                  className="text-xs transition-colors"
                  style={{ color: '#475569', fontFamily: 'Inter, sans-serif', textDecoration: 'none' }}
                  onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = '#00A896')}
                  onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = '#475569')}
                >
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 28s linear infinite;
          width: max-content;
        }
        @keyframes ping {
          0% { transform: scale(1); opacity: 0.4; }
          75%, 100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  )
}
