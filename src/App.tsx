import { useState, useEffect } from 'react'

type Category = 'domestic-violence' | 'sexual-assault' | 'education' | 'legal' | 'housing' | 'mental-health'

interface Resource {
  id: number
  name: string
  description: string
  category: Category[]
  phone?: string
  textLine?: string
  website?: string
  hours?: string
  cost: 'free' | 'sliding-scale' | 'low-cost'
  tags: string[]
}

const resources: Resource[] = [
  {
    id: 1,
    name: 'National Domestic Violence Hotline',
    description: 'Confidential support, safety planning, and local shelter referrals for survivors of domestic violence. Available by call, text, or live chat.',
    category: ['domestic-violence'],
    phone: '1-800-799-7233',
    website: 'thehotline.org',
    hours: '24/7',
    cost: 'free',
    tags: ['crisis line', 'shelter referral', 'safety planning', 'chat available'],
  },
  {
    id: 2,
    name: 'RAINN — Sexual Assault Hotline',
    description: "The nation's largest anti-sexual violence organization. Connects survivors to local care and provides confidential support online and by phone.",
    category: ['sexual-assault'],
    phone: '1-800-656-4673',
    website: 'rainn.org',
    hours: '24/7',
    cost: 'free',
    tags: ['crisis line', 'trauma support', 'online chat', 'local referrals'],
  },
  {
    id: 3,
    name: 'National Sexual Violence Resource Center',
    description: 'Guides, toolkits, and multilingual resources on sexual violence prevention, healing, and survivor rights. Free to access.',
    category: ['sexual-assault'],
    website: 'nsvrc.org',
    hours: 'Online anytime',
    cost: 'free',
    tags: ['multilingual', 'guides', 'survivor rights'],
  },
  {
    id: 4,
    name: 'WomensLaw.org',
    description: 'Plain-language legal guides for every U.S. state covering restraining orders, custody, divorce, and immigration rights for survivors.',
    category: ['domestic-violence', 'sexual-assault', 'legal'],
    website: 'womenslaw.org',
    hours: 'Email hotline available',
    cost: 'free',
    tags: ['legal', 'restraining orders', 'custody', 'multilingual'],
  },
  {
    id: 5,
    name: 'Futures Without Violence',
    description: "Resources for survivors and healthcare providers, including safety planning tools, children's programs, and trauma-informed care guides.",
    category: ['domestic-violence', 'mental-health'],
    website: 'futureswithoutviolence.org',
    hours: 'Online anytime',
    cost: 'free',
    tags: ['healthcare', 'children', 'safety planning'],
  },
  {
    id: 6,
    name: 'Malala Fund',
    description: 'Global advocacy and scholarship connections for girls and women denied access to 12 years of quality education. Resources in multiple languages.',
    category: ['education'],
    website: 'malala.org',
    hours: 'Online anytime',
    cost: 'free',
    tags: ['global', 'scholarships', 'advocacy', 'multilingual'],
  },
  {
    id: 11,
    name: 'Psychology Today — Trauma Therapist Finder',
    description: 'Search for trauma-informed therapists who specialize in domestic violence and sexual assault. Filter by sliding-scale fees and insurance accepted.',
    category: ['mental-health'],
    website: 'psychologytoday.com/us/therapists',
    hours: 'Online search',
    cost: 'sliding-scale',
    tags: ['therapy', 'PTSD', 'trauma', 'sliding scale'],
  },
  {
    id: 12,
    name: 'Crisis Text Line',
    description: 'Free, 24/7 mental health crisis support via text message. Trained crisis counselors, completely confidential.',
    category: ['mental-health', 'domestic-violence', 'sexual-assault'],
    textLine: 'Text HOME to 741741',
    website: 'crisistextline.org',
    hours: '24/7',
    cost: 'free',
    tags: ['crisis', 'text-based', 'anonymous', 'mental health'],
  },
]

const navCategories: { id: Category; label: string }[] = [
  { id: 'domestic-violence', label: 'Domestic Violence' },
  { id: 'sexual-assault', label: 'Sexual Assault' },
  { id: 'education', label: 'Education' },
  { id: 'legal', label: 'Legal Aid' },
  { id: 'housing', label: 'Housing' },
  { id: 'mental-health', label: 'Mental Health' },
]

const costBadge: Record<string, string> = {
  free: 'Free',
  'sliding-scale': 'Sliding Scale',
  'low-cost': 'Low Cost',
}

// placeholder for what will later be a better visual interface
const BODY_ZONES = [
  {
    id: 'mind',
    label: 'Mind & Emotional Health',
    care: 'Mental Health Support',
    symptoms: 'Anxiety, PTSD, depression, intrusive thoughts, sleep disturbances, emotional numbness',
    category: 'mental-health' as Category,
    description: "Trauma lives in the mind. Whether you're experiencing flashbacks, panic, grief, or numbness — counselors who understand are ready to listen.",
  },
  {
    id: 'chest',
    label: 'Heart & Safety',
    care: 'Domestic Violence & Safety Planning',
    symptoms: 'Fear, isolation, grief, the aftermath of relationship violence, coercive control',
    category: 'domestic-violence' as Category,
    description: "Safety and emotional wellbeing are deeply connected. If your heart feels unsafe, we can help you plan next steps and find support.",
  },
  {
    id: 'abdomen',
    label: 'Physical Wellbeing',
    care: 'Medical & Trauma-Informed Care',
    symptoms: 'Physical injuries, chronic pain, somatic symptoms, fatigue, unexplained aches',
    category: 'mental-health' as Category,
    description: "Trauma shows up in the body. Trauma-informed medical providers address physical symptoms with the sensitivity and context they deserve.",
  },
  {
    id: 'pelvis',
    label: 'Reproductive & Sexual Health',
    care: 'Sexual Assault Resources',
    symptoms: 'Sexual trauma, assault aftermath, reproductive health concerns, OB/GYN-related needs',
    category: 'sexual-assault' as Category,
    description: "You deserve compassionate, specialized care. Sexual assault nurses and trauma-informed providers can help — on your terms, at your pace.",
  },
  {
    id: 'stability',
    label: 'Safety & Stability',
    care: 'Housing, Legal & Financial Aid',
    symptoms: 'Housing instability, legal needs, financial insecurity, barriers to leaving a situation',
    category: 'legal' as Category,
    description: "Stability is safety. Legal advocates, housing programs, and financial resources can help you build a foundation to move forward.",
  },
]

// current place holder for what will eventually be a real interactive map to locate trauma care deserts
type Dot = { col: number; row: number; coverage: number }
const DESERT_DOTS: Dot[] = [
  { col: 2, row: 0, coverage: 0.20 }, { col: 3, row: 0, coverage: 0.10 }, { col: 4, row: 0, coverage: 0.10 },
  { col: 5, row: 0, coverage: 0.28 }, { col: 6, row: 0, coverage: 0.38 }, { col: 7, row: 0, coverage: 0.18 },
  { col: 8, row: 0, coverage: 0.14 }, { col: 9, row: 0, coverage: 0.48 }, { col: 10, row: 0, coverage: 0.65 }, { col: 11, row: 0, coverage: 0.78 },
  { col: 1, row: 1, coverage: 0.55 }, { col: 2, row: 1, coverage: 0.22 }, { col: 3, row: 1, coverage: 0.12 },
  { col: 4, row: 1, coverage: 0.10 }, { col: 5, row: 1, coverage: 0.20 }, { col: 6, row: 1, coverage: 0.40 },
  { col: 7, row: 1, coverage: 0.48 }, { col: 8, row: 1, coverage: 0.34 }, { col: 9, row: 1, coverage: 0.60 },
  { col: 10, row: 1, coverage: 0.82 }, { col: 11, row: 1, coverage: 0.90 },
  { col: 1, row: 2, coverage: 0.62 }, { col: 2, row: 2, coverage: 0.28 }, { col: 3, row: 2, coverage: 0.12 },
  { col: 4, row: 2, coverage: 0.10 }, { col: 5, row: 2, coverage: 0.20 }, { col: 6, row: 2, coverage: 0.30 },
  { col: 7, row: 2, coverage: 0.48 }, { col: 8, row: 2, coverage: 0.60 }, { col: 9, row: 2, coverage: 0.72 }, { col: 10, row: 2, coverage: 0.88 },
  { col: 1, row: 3, coverage: 0.70 }, { col: 2, row: 3, coverage: 0.30 }, { col: 3, row: 3, coverage: 0.22 },
  { col: 4, row: 3, coverage: 0.12 }, { col: 5, row: 3, coverage: 0.20 }, { col: 6, row: 3, coverage: 0.30 },
  { col: 7, row: 3, coverage: 0.42 }, { col: 8, row: 3, coverage: 0.62 }, { col: 9, row: 3, coverage: 0.72 }, { col: 10, row: 3, coverage: 0.80 },
  { col: 2, row: 4, coverage: 0.22 }, { col: 3, row: 4, coverage: 0.20 }, { col: 4, row: 4, coverage: 0.12 },
  { col: 5, row: 4, coverage: 0.22 }, { col: 6, row: 4, coverage: 0.30 }, { col: 7, row: 4, coverage: 0.40 },
  { col: 8, row: 4, coverage: 0.52 }, { col: 9, row: 4, coverage: 0.60 },
  { col: 3, row: 5, coverage: 0.30 }, { col: 4, row: 5, coverage: 0.22 }, { col: 5, row: 5, coverage: 0.22 },
  { col: 6, row: 5, coverage: 0.22 }, { col: 7, row: 5, coverage: 0.32 }, { col: 8, row: 5, coverage: 0.44 }, { col: 9, row: 5, coverage: 0.52 },
  { col: 9, row: 6, coverage: 0.50 }, { col: 10, row: 6, coverage: 0.62 },
]

function coverageColor(c: number): string {
  if (c < 0.25) return '#451227'
  if (c < 0.45) return '#7C2D42'
  if (c < 0.65) return '#B5687A'
  return '#E8C4CE'
}

// ── Main App ────────────────────────────────────────────────────────────────
export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null)
  const [search, setSearch] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [view, setView] = useState<'overview' | 'directory'>('overview')
  const [hoveredZone, setHoveredZone] = useState<string | null>(null)
  const [selectedZone, setSelectedZone] = useState<string | null>(null)
  const [desertModalOpen, setDesertModalOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = desertModalOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [desertModalOpen])

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setDesertModalOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  const filtered = resources.filter(r => {
    const matchesCat = !activeCategory || r.category.includes(activeCategory)
    const q = search.toLowerCase()
    const matchesSearch =
      !q ||
      r.name.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.tags.some(t => t.toLowerCase().includes(q))
    return matchesCat && matchesSearch
  })

  function selectCategory(cat: Category) {
    setActiveCategory(cat)
    setView('directory')
    setMenuOpen(false)
    setTimeout(() => {
      document.getElementById('resources')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  function goToDirectory() {
    setView('directory')
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function goToOverview() {
    setView('overview')
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const activeBodyZone = BODY_ZONES.find(z => z.id === (selectedZone || hoveredZone))

  return (
    <div style={{ backgroundColor: '#FAF4F1', color: '#261318', fontFamily: "'Source Sans 3', system-ui, sans-serif" }} className="min-h-screen flex flex-col">

      {/* Crisis strip */}
      <div style={{ backgroundColor: '#6B1F33', color: '#FAF4F1' }} className="py-2 px-4 text-center text-xs tracking-wide">
        In danger now?&ensp;
        <a href="tel:911" style={{ textDecoration: 'underline', fontWeight: 600 }}>Call 911</a>
        <span className="mx-3 opacity-40">|</span>
        DV Hotline&ensp;<a href="tel:18007997233" style={{ textDecoration: 'underline', fontWeight: 600 }}>1-800-799-7233</a>
        <span className="mx-3 opacity-40">|</span>
        SA Hotline&ensp;<a href="tel:18006564673" style={{ textDecoration: 'underline', fontWeight: 600 }}>1-800-656-4673</a>
      </div>

      {/* Nav */}
      <nav
        style={{
          backgroundColor: scrolled ? 'rgba(250,244,241,0.97)' : '#FAF4F1',
          borderBottom: '1px solid #E2CBCB',
          backdropFilter: 'blur(8px)',
          position: 'sticky',
          top: 0,
          zIndex: 50,
          transition: 'background-color 0.2s',
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.9rem 0 0' }}>
            <button onClick={goToOverview} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.45rem', fontWeight: 700, color: '#6B1F33', letterSpacing: '-0.01em' }}>
                Fem<span style={{ color: '#B5687A', fontStyle: 'italic' }}>Aura</span>
              </span>
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <a href="#safety" style={{ fontSize: '0.8rem', color: '#7A4050', textDecoration: 'underline', textUnderlineOffset: '3px' }} className="hidden md:block">
                Safe browsing tips
              </a>
              <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }} className="md:hidden">
                <div style={{ width: 22, display: 'flex', flexDirection: 'column', gap: 5 }}>
                  <span style={{ height: 1.5, background: '#261318', display: 'block' }} />
                  <span style={{ height: 1.5, background: '#261318', display: 'block', width: '65%' }} />
                  <span style={{ height: 1.5, background: '#261318', display: 'block' }} />
                </div>
              </button>
            </div>
          </div>

          <div className="hidden md:flex" style={{ gap: '0.15rem', marginTop: '0.6rem', overflowX: 'auto' }}>
            <button
              onClick={goToDirectory}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '0.55rem 1rem', fontSize: '0.82rem',
                fontWeight: view === 'directory' && activeCategory === null ? 700 : 500,
                color: view === 'directory' && activeCategory === null ? '#6B1F33' : '#7A4050',
                borderBottom: view === 'directory' && activeCategory === null ? '2px solid #6B1F33' : '2px solid transparent',
                transition: 'all 0.15s', whiteSpace: 'nowrap', fontFamily: "'Source Sans 3', sans-serif",
              }}
            >Full Directory</button>
            {navCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => selectCategory(cat.id)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '0.55rem 1rem', fontSize: '0.82rem',
                  fontWeight: view === 'directory' && activeCategory === cat.id ? 700 : 500,
                  color: view === 'directory' && activeCategory === cat.id ? '#6B1F33' : '#7A4050',
                  borderBottom: view === 'directory' && activeCategory === cat.id ? '2px solid #6B1F33' : '2px solid transparent',
                  transition: 'all 0.15s', whiteSpace: 'nowrap', fontFamily: "'Source Sans 3', sans-serif",
                }}
              >{cat.label}</button>
            ))}
          </div>
        </div>

        {menuOpen && (
          <div style={{ borderTop: '1px solid #E2CBCB', padding: '1rem 1.5rem' }}>
            <button onClick={goToOverview} style={{ display: 'block', background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem 0', fontSize: '0.9rem', color: view === 'overview' ? '#6B1F33' : '#7A4050', fontWeight: view === 'overview' ? 700 : 400, fontFamily: "'Source Sans 3', sans-serif" }}>Overview</button>
            <button onClick={goToDirectory} style={{ display: 'block', background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem 0', fontSize: '0.9rem', color: view === 'directory' && activeCategory === null ? '#6B1F33' : '#7A4050', fontWeight: view === 'directory' && activeCategory === null ? 700 : 400, fontFamily: "'Source Sans 3', sans-serif" }}>Full Directory</button>
            {navCategories.map(cat => (
              <button key={cat.id} onClick={() => selectCategory(cat.id)} style={{ display: 'block', background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem 0', fontSize: '0.9rem', color: view === 'directory' && activeCategory === cat.id ? '#6B1F33' : '#7A4050', fontWeight: view === 'directory' && activeCategory === cat.id ? 700 : 400, fontFamily: "'Source Sans 3', sans-serif" }}>{cat.label}</button>
            ))}
            <a href="#safety" style={{ display: 'block', padding: '0.5rem 0', fontSize: '0.85rem', color: '#7A4050', textDecoration: 'underline' }} onClick={() => setMenuOpen(false)}>Safe browsing tips</a>
          </div>
        )}
      </nav>

      <main className="flex-grow">
        {view === 'overview' ? (
          <div className="animate-in fade-in duration-500">

            {/* ── Hero ──────────────────────────────────────────────────── */}
            <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '3.5rem 1.5rem 3rem' }}>
              <p style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(1.75rem, 4.5vw, 2.75rem)',
                fontWeight: 400,
                lineHeight: 1.35,
                color: '#261318',
                maxWidth: '640px',
                marginBottom: '1.25rem',
              }}>
                FemAura exists to remind women they are not alone.
              </p>
              <p style={{ fontSize: '0.95rem', color: '#7A4050', lineHeight: 1.75, maxWidth: '460px', marginBottom: '2rem' }}>
                We bypass medical and infrastructure barriers to connect you with trauma-informed care, localized resources, and educational support.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => document.getElementById('body-map')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                  style={{ padding: '0.7rem 1.5rem', backgroundColor: '#6B1F33', color: '#FAF4F1', border: 'none', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', letterSpacing: '0.01em' }}
                >
                  Find care by symptom
                </button>
                <button
                  onClick={goToDirectory}
                  style={{ padding: '0.7rem 1.5rem', backgroundColor: 'transparent', color: '#6B1F33', border: '1px solid #6B1F33', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', letterSpacing: '0.01em' }}
                >
                  Browse directory
                </button>
              </div>
            </section>

            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem' }}>
              <hr style={{ border: 'none', borderTop: '1px solid #E2CBCB' }} />
            </div>

            {/* ── Entry points grid ─────────────────────────────────────── */}
            <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div style={{ backgroundColor: '#FDF7F5', border: '1px solid #EDD9DC', padding: '2rem' }}>
                  <div style={{ color: '#B5687A', marginBottom: '1rem' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
                    </svg>
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.15rem', color: '#261318', marginBottom: '0.65rem' }}>Find Care by Symptom</h3>
                  <p style={{ fontSize: '0.875rem', color: '#5C3040', lineHeight: 1.65, marginBottom: '1.25rem' }}>
                    You don't need to know the medical terminology. Select how you are feeling and we'll translate it into the clinical language needed to find the right care.
                  </p>
                  <button
                    onClick={() => document.getElementById('body-map')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                    style={{ fontSize: '0.82rem', fontWeight: 600, color: '#6B1F33', textDecoration: 'underline', textUnderlineOffset: '4px', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                  >Start symptom check →</button>
                </div>

                <div style={{ backgroundColor: '#FDF7F5', border: '1px solid #EDD9DC', padding: '2rem' }}>
                  <div style={{ color: '#B5687A', marginBottom: '1rem' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.15rem', color: '#261318', marginBottom: '0.65rem' }}>Local Support Map</h3>
                  <p style={{ fontSize: '0.875rem', color: '#5C3040', lineHeight: 1.65, marginBottom: '1.25rem' }}>
                    Discover non-traditional, decentralized, or telehealth referral networks in your area. Filter by free, low-cost, or online.
                  </p>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input type="text" placeholder="Zip code" style={{ flex: 1, padding: '0.45rem 0.75rem', border: '1px solid #D9BFC0', background: 'transparent', outline: 'none', fontSize: '0.875rem', color: '#261318' }} />
                    <button style={{ padding: '0.45rem 1rem', backgroundColor: '#EDD9DC', color: '#6B1F33', border: 'none', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer' }}>Search</button>
                  </div>
                </div>

                <div style={{ backgroundColor: '#FDF7F5', border: '1px solid #EDD9DC', padding: '2rem' }}>
                  <div style={{ color: '#B5687A', marginBottom: '1rem' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    </svg>
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.15rem', color: '#261318', marginBottom: '0.65rem' }}>Educational Empowerment</h3>
                  <p style={{ fontSize: '0.875rem', color: '#5C3040', lineHeight: 1.65, marginBottom: '1.25rem' }}>
                    Re-enter the workforce or continue your studies. Access advocacy programs, scholarship databases, and job training designed for women.
                  </p>
                  <button onClick={() => selectCategory('education')} style={{ fontSize: '0.82rem', fontWeight: 600, color: '#6B1F33', textDecoration: 'underline', textUnderlineOffset: '4px', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
                    Explore education resources →
                  </button>
                </div>

                <div style={{ backgroundColor: '#FDF7F5', border: '1px solid #EDD9DC', padding: '2rem' }}>
                  <div style={{ color: '#B5687A', marginBottom: '1rem' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.15rem', color: '#261318', marginBottom: '0.65rem' }}>Full Directory</h3>
                  <p style={{ fontSize: '0.875rem', color: '#5C3040', lineHeight: 1.65, marginBottom: '1.25rem' }}>
                    Browse our comprehensive directory of organizations, scholarships, legal aid, and housing resources — categorized and searchable.
                  </p>
                  <button onClick={goToDirectory} style={{ fontSize: '0.82rem', fontWeight: 600, color: '#6B1F33', textDecoration: 'underline', textUnderlineOffset: '4px', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
                    Browse directory →
                  </button>
                </div>
              </div>
            </section>

            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem' }}>
              <hr style={{ border: 'none', borderTop: '1px solid #E2CBCB' }} />
            </div>

            {/* ── Body map intake ───────────────────────────────────────── */}
            <section id="body-map" style={{ maxWidth: '1100px', margin: '0 auto', padding: '3.5rem 1.5rem' }}>
              <div style={{ marginBottom: '2.5rem' }}>
                <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#B5687A', fontWeight: 600, marginBottom: '0.5rem' }}>Symptom Intake</p>
                <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', fontWeight: 500, color: '#261318', marginBottom: '0.65rem', lineHeight: 1.3 }}>
                  Where are you feeling it?
                </h2>
                <p style={{ fontSize: '0.9rem', color: '#7A4050', lineHeight: 1.75, maxWidth: '460px' }}>
                  Touch or click any area of the body. We'll translate what you're experiencing into the care you need — no medical terminology required.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '3.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <BodyDiagram
                  hoveredZone={hoveredZone}
                  selectedZone={selectedZone}
                  onHover={setHoveredZone}
                  onSelect={z => setSelectedZone(prev => prev === z ? null : z)}
                />

                <div style={{ flex: 1, minWidth: '260px', paddingTop: '0.25rem' }}>
                  {activeBodyZone ? (
                    <div>
                      <p style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#B5687A', fontWeight: 600, marginBottom: '0.5rem' }}>Selected area</p>
                      <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.3rem', color: '#261318', marginBottom: '0.85rem', lineHeight: 1.3 }}>
                        {activeBodyZone.label}
                      </h3>
                      <p style={{ fontSize: '0.875rem', color: '#5C3040', lineHeight: 1.75, marginBottom: '1.25rem' }}>
                        {activeBodyZone.description}
                      </p>
                      <div style={{ backgroundColor: '#FDF7F5', border: '1px solid #EDD9DC', padding: '1rem 1.25rem', marginBottom: '1.25rem' }}>
                        <p style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#B5687A', fontWeight: 600, marginBottom: '0.35rem' }}>Common experiences</p>
                        <p style={{ fontSize: '0.85rem', color: '#5C3040', lineHeight: 1.6, margin: 0 }}>{activeBodyZone.symptoms}</p>
                      </div>
                      <div style={{ marginBottom: '1.5rem' }}>
                        <p style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#B5687A', fontWeight: 600, marginBottom: '0.3rem' }}>Connects you to</p>
                        <p style={{ fontSize: '0.9rem', color: '#261318', fontWeight: 600 }}>{activeBodyZone.care}</p>
                      </div>
                      <button
                        onClick={() => selectCategory(activeBodyZone.category)}
                        style={{ padding: '0.65rem 1.5rem', backgroundColor: '#6B1F33', color: '#FAF4F1', border: 'none', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}
                      >
                        Find resources →
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: '#F2DDE2', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B5687A" strokeWidth="1.5">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                      </div>
                      <p style={{ fontSize: '0.9rem', color: '#9B7580', lineHeight: 1.8, maxWidth: '280px' }}>
                        Select any area of the body — head, chest, abdomen, pelvis, or lower body — and we'll show you the type of care that best matches your experience.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </section>

            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem' }}>
              <hr style={{ border: 'none', borderTop: '1px solid #E2CBCB' }} />
            </div>

            {/* ── Trauma deserts teaser ─────────────────────────────────── */}
            <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '3.5rem 1.5rem' }}>
              <div style={{ display: 'flex', gap: '4rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '260px' }}>
                  <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#B5687A', fontWeight: 600, marginBottom: '0.5rem' }}>Data & Research</p>
                  <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', fontWeight: 500, color: '#261318', marginBottom: '1rem', lineHeight: 1.3 }}>
                    Mapping where care is missing
                  </h2>
                  <p style={{ fontSize: '0.9rem', color: '#5C3040', lineHeight: 1.8, marginBottom: '1.75rem', maxWidth: '400px' }}>
                    In over 40% of U.S. counties, there is no trauma-informed specialist within reach. We call these <em>trauma care deserts</em>. FemAura is building a geospatial data pipeline to identify these gaps and build better referral networks — so no woman is left without options.
                  </p>
                  <button
                    onClick={() => setDesertModalOpen(true)}
                    style={{ fontSize: '0.875rem', fontWeight: 600, color: '#6B1F33', textDecoration: 'underline', textUnderlineOffset: '4px', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                  >
                    Explore the data →
                  </button>
                </div>

                <button
                  onClick={() => setDesertModalOpen(true)}
                  style={{ flexShrink: 0, background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'block' }}
                  aria-label="Open trauma deserts data visualization"
                >
                  <DesertDotMap scale={1} />
                </button>
              </div>
            </section>

          </div>
        ) : (
          /* ── Directory view ───────────────────────────────────────────── */
          <div className="animate-in fade-in duration-500">
            <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 1.5rem 1rem' }}>
              <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.8rem', fontWeight: 400, color: '#261318', marginBottom: '0.5rem' }}>
                Resource Directory
              </p>
              <p style={{ fontSize: '0.9rem', color: '#7A4050', lineHeight: 1.6, maxWidth: '500px' }}>
                Browse privately — we collect nothing. If you need to exit quickly, press Escape or Cmd+W.
              </p>
            </section>

            <section id="resources" style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1.75rem' }}>
                <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.4rem', fontWeight: 500, color: '#261318', margin: 0 }}>
                  {activeCategory ? navCategories.find(c => c.id === activeCategory)?.label : 'All Resources'}
                </h2>
                <span style={{ fontSize: '0.8rem', color: '#9B7580' }}>{filtered.length} listing{filtered.length !== 1 ? 's' : ''}</span>
                {activeCategory && (
                  <button onClick={() => setActiveCategory(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem', color: '#B5687A', textDecoration: 'underline', fontFamily: "'Source Sans 3', sans-serif" }}>
                    Clear filter
                  </button>
                )}
              </div>

              <div style={{ marginBottom: '2.5rem' }}>
                <input
                  type="search"
                  placeholder="Search by keyword — shelter, therapy, scholarship, legal…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{ width: '100%', maxWidth: '520px', padding: '0.75rem 1rem', border: '1px solid #D9BFC0', backgroundColor: '#FDF7F5', color: '#261318', fontSize: '0.9rem', fontFamily: "'Source Sans 3', sans-serif", outline: 'none' }}
                  onFocus={e => { e.currentTarget.style.borderColor = '#B5687A' }}
                  onBlur={e => { e.currentTarget.style.borderColor = '#D9BFC0' }}
                />
              </div>

              {filtered.length === 0 ? (
                <p style={{ color: '#9B7580', fontSize: '0.95rem' }}>No resources match. Try a different keyword or clear the filter.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {filtered.map((resource, i) => (
                    <ResourceRow key={resource.id} resource={resource} index={i} total={filtered.length} />
                  ))}
                </div>
              )}
            </section>
          </div>
        )}
      </main>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem', width: '100%' }}>
        <hr style={{ border: 'none', borderTop: '1px solid #E2CBCB' }} />
      </div>

      {/* Safety tips */}
      <section id="safety" style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 1.5rem' }}>
        <div style={{ display: 'grid', gap: '3rem', gridTemplateColumns: '1fr' }} className="md:grid-cols-2-custom">
          <div style={{ maxWidth: '460px' }}>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.7rem', fontWeight: 500, color: '#261318', marginBottom: '1rem', lineHeight: 1.3 }}>
              Stay safe while browsing
            </h2>
            <p style={{ color: '#5C3040', lineHeight: 1.7, fontSize: '0.95rem' }}>
              If someone monitors your device, your browsing history could put you at risk. These steps take less than a minute.
            </p>
          </div>
          <div>
            {[
              { n: '01', title: 'Use incognito mode', body: 'Open a private window — Ctrl+Shift+N (Windows) or Cmd+Shift+N (Mac). History and cookies are not saved.' },
              { n: '02', title: 'Use a safer device', body: "A library computer, a trusted friend's phone, or a work device that your abuser cannot access." },
              { n: '03', title: 'Clear your history', body: 'Go to your browser settings and clear history, cookies, and cached files after each visit here.' },
              { n: '04', title: 'Quick exit', body: 'Press Alt+F4 (Windows) or Cmd+W (Mac) to close this window immediately. Or press Escape.' },
              { n: '05', title: 'Text or chat instead of calling', body: 'Many hotlines offer text and online chat if you cannot speak privately. DV Text: text START to 88788.' },
            ].map(tip => (
              <div key={tip.n} style={{ display: 'flex', gap: '1.25rem', paddingBottom: '1.25rem', marginBottom: '1.25rem', borderBottom: '1px solid #EDD9DC' }}>
                <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '0.8rem', color: '#C9849A', minWidth: '1.8rem', paddingTop: '0.15rem' }}>{tip.n}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#261318', marginBottom: '0.25rem' }}>{tip.title}</div>
                  <p style={{ fontSize: '0.875rem', color: '#5C3040', lineHeight: 1.65, margin: 0 }}>{tip.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA bar */}
      <div style={{ backgroundColor: '#451227', padding: '4rem 1.5rem', textAlign: 'center', width: '100%' }}>
        <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '2rem', fontWeight: 500, color: '#FAF4F1', marginBottom: '0.75rem' }}>
          You are not alone.
        </h3>
        <p style={{ color: '#C9849A', fontSize: '0.9rem', marginBottom: '2rem' }}>All hotlines below are free and completely confidential.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
          <a href="tel:18007997233" style={{ backgroundColor: '#C9849A', color: '#FAF4F1', padding: '0.75rem 1.75rem', fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none', letterSpacing: '0.03em' }}>
            DV Hotline · 1-800-799-7233
          </a>
          <a href="tel:18006564673" style={{ border: '1px solid #C9849A', color: '#FAF4F1', padding: '0.75rem 1.75rem', fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none', letterSpacing: '0.03em' }}>
            SA Hotline · 1-800-656-4673
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #E2CBCB', padding: '2.5rem 1.5rem', width: '100%' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '2rem' }}>
          <div>
            <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.15rem', fontWeight: 700, color: '#6B1F33' }}>Fem<em>Aura</em></span>
            <p style={{ fontSize: '0.8rem', color: '#9B7580', marginTop: '0.4rem', maxWidth: '280px', lineHeight: 1.6 }}>
              A free, private resource directory for women. No accounts. No data collected.
            </p>
          </div>
          <div style={{ fontSize: '0.8rem', color: '#9B7580', lineHeight: 2 }}>
            <p><strong style={{ color: '#5C3040' }}>Emergency:</strong> <a href="tel:911" style={{ textDecoration: 'underline' }}>911</a></p>
            <p><strong style={{ color: '#5C3040' }}>DV Hotline:</strong> <a href="tel:18007997233" style={{ textDecoration: 'underline' }}>1-800-799-7233</a></p>
            <p><strong style={{ color: '#5C3040' }}>SA Hotline:</strong> <a href="tel:18006564673" style={{ textDecoration: 'underline' }}>1-800-656-4673</a></p>
            <p><strong style={{ color: '#5C3040' }}>Crisis Text:</strong> HOME to 741741</p>
          </div>
          <div style={{ fontSize: '0.8rem', color: '#9B7580', lineHeight: 2 }}>
            {navCategories.map(cat => (
              <p key={cat.id}>
                <button onClick={() => { setActiveCategory(cat.id); goToDirectory() }} style={{ background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', color: '#9B7580', fontSize: '0.8rem', padding: 0, fontFamily: "'Source Sans 3', sans-serif" }}>
                  {cat.label}
                </button>
              </p>
            ))}
          </div>
        </div>
        <div style={{ maxWidth: '1100px', margin: '2rem auto 0', paddingTop: '1.5rem', borderTop: '1px solid #E2CBCB', fontSize: '0.75rem', color: '#B09098' }}>
          Resource information is for guidance only. Verify details directly with each organization. If you are in immediate danger, call 911.
        </div>
      </footer>

      {/* Trauma deserts modal */}
      {desertModalOpen && (
        <TraumaDesertsModal onClose={() => setDesertModalOpen(false)} />
      )}
    </div>
  )
}

// ── Body diagram SVG ─────────────────────────────────────────────────────────
function BodyDiagram({
  hoveredZone,
  selectedZone,
  onHover,
  onSelect,
}: {
  hoveredZone: string | null
  selectedZone: string | null
  onHover: (id: string | null) => void
  onSelect: (id: string) => void
}) {
  function zoneState(id: string) {
    if (selectedZone === id) return 'selected'
    if (hoveredZone === id) return 'hovered'
    return 'idle'
  }

  function zoneFill(id: string) {
    const s = zoneState(id)
    if (s === 'selected') return '#B5687A'
    if (s === 'hovered') return '#DDB8C0'
    return '#F2DDE2'
  }

  function zoneStroke(id: string) {
    const s = zoneState(id)
    if (s === 'selected') return '#6B1F33'
    if (s === 'hovered') return '#B5687A'
    return '#DDB8C0'
  }

  const zoneProps = (id: string) => ({
    fill: zoneFill(id),
    stroke: zoneStroke(id),
    strokeWidth: zoneState(id) === 'idle' ? 1 : 1.5,
    style: { cursor: 'pointer', transition: 'fill 0.18s, stroke 0.18s' },
    onClick: () => onSelect(id),
    onMouseEnter: () => onHover(id),
    onMouseLeave: () => onHover(null),
    role: 'button' as const,
    tabIndex: 0,
    'aria-label': BODY_ZONES.find(z => z.id === id)?.label,
    onKeyDown: (e: React.KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') onSelect(id) },
  })

  return (
    <div style={{ flexShrink: 0 }}>
      <svg
        viewBox="0 0 160 410"
        width="148"
        height="380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Interactive body diagram — click a zone to explore care options"
      >
        {/* Arms (visual only, not interactive) */}
        <rect x="6" y="104" width="22" height="70" rx="10" fill="#EDD9DC" stroke="#DDB8C0" strokeWidth="1" transform="rotate(-4 6 104)" />
        <rect x="132" y="104" width="22" height="70" rx="10" fill="#EDD9DC" stroke="#DDB8C0" strokeWidth="1" transform="rotate(4 154 104)" />

        {/* Head — Mind & Emotional Health */}
        <ellipse cx="80" cy="44" rx="32" ry="38" {...zoneProps('mind')} />

        {/* Neck connector (visual) */}
        <rect x="70" y="78" width="20" height="20" rx="6" fill="#EDD9DC" stroke="#DDB8C0" strokeWidth="1" />

        {/* Chest — Heart & Safety */}
        <rect x="30" y="94" width="100" height="68" rx="14" {...zoneProps('chest')} />

        {/* Abdomen — Physical Wellbeing */}
        <rect x="40" y="158" width="80" height="52" rx="10" {...zoneProps('abdomen')} />

        {/* Pelvis — Reproductive & Sexual Health */}
        <rect x="28" y="206" width="104" height="52" rx="14" {...zoneProps('pelvis')} />

        {/* Left leg — Safety & Stability */}
        <rect x="32" y="254" width="42" height="130" rx="14" {...zoneProps('stability')} />

        {/* Right leg — Safety & Stability (shares zone) */}
        <rect x="86" y="254" width="42" height="130" rx="14"
          fill={zoneFill('stability')}
          stroke={zoneStroke('stability')}
          strokeWidth={zoneState('stability') === 'idle' ? 1 : 1.5}
          style={{ cursor: 'pointer', transition: 'fill 0.18s, stroke 0.18s' }}
          onClick={() => onSelect('stability')}
          onMouseEnter={() => onHover('stability')}
          onMouseLeave={() => onHover(null)}
        />

        {/* Zone pulse indicator for selected */}
        {selectedZone === 'mind' && <ellipse cx="80" cy="44" rx="36" ry="42" fill="none" stroke="#B5687A" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />}
        {selectedZone === 'chest' && <rect x="26" y="90" width="108" height="76" rx="16" fill="none" stroke="#B5687A" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />}
        {selectedZone === 'abdomen' && <rect x="36" y="154" width="88" height="60" rx="12" fill="none" stroke="#B5687A" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />}
        {selectedZone === 'pelvis' && <rect x="24" y="202" width="112" height="60" rx="16" fill="none" stroke="#B5687A" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />}
        {selectedZone === 'stability' && <>
          <rect x="28" y="250" width="50" height="138" rx="16" fill="none" stroke="#B5687A" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
          <rect x="82" y="250" width="50" height="138" rx="16" fill="none" stroke="#B5687A" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
        </>}
      </svg>

      {/* Zone labels below */}
      <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.3rem', width: 148 }}>
        {BODY_ZONES.map(z => (
          <button
            key={z.id}
            onClick={() => onSelect(z.id)}
            onMouseEnter={() => onHover(z.id)}
            onMouseLeave={() => onHover(null)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.2rem 0',
              textAlign: 'left',
              fontFamily: "'Source Sans 3', sans-serif",
            }}
          >
            <span style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              flexShrink: 0,
              backgroundColor: selectedZone === z.id ? '#6B1F33' : hoveredZone === z.id ? '#B5687A' : '#DDB8C0',
              transition: 'background-color 0.18s',
            }} />
            <span style={{
              fontSize: '0.72rem',
              color: selectedZone === z.id ? '#6B1F33' : hoveredZone === z.id ? '#7A4050' : '#9B7580',
              fontWeight: selectedZone === z.id ? 600 : 400,
              transition: 'color 0.18s',
            }}>
              {z.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Desert dot map (used in teaser + modal) ──────────────────────────────────
function DesertDotMap({ scale = 1 }: { scale?: number }) {
  const cellSize = 26 * scale
  const dotR = 8 * scale
  const cols = 12
  const rows = 7
  const w = cols * cellSize + cellSize
  const h = rows * cellSize + cellSize

  return (
    <div style={{ position: 'relative' }}>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        width={w}
        height={h}
        style={{ display: 'block' }}
        aria-label="Trauma care desert coverage map"
      >
        {DESERT_DOTS.map((d, i) => (
          <circle
            key={i}
            cx={(d.col + 0.5) * cellSize + cellSize / 2}
            cy={(d.row + 0.5) * cellSize + cellSize / 2}
            r={dotR}
            fill={coverageColor(d.coverage)}
            opacity={0.88}
          />
        ))}
      </svg>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '1.25rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
        {[
          { color: '#451227', label: 'Care desert' },
          { color: '#7C2D42', label: 'Limited' },
          { color: '#B5687A', label: 'Moderate' },
          { color: '#E8C4CE', label: 'Covered' },
        ].map(l => (
          <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: l.color, flexShrink: 0, display: 'block' }} />
            <span style={{ fontSize: `${0.68 * scale}rem`, color: '#9B7580' }}>{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Trauma deserts modal ──────────────────────────────────────────────────────
function TraumaDesertsModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', overflowY: 'auto', padding: '2rem 1rem', backgroundColor: 'rgba(38,19,24,0.55)', backdropFilter: 'blur(4px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        style={{ backgroundColor: '#FAF4F1', maxWidth: '780px', width: '100%', padding: '3rem', position: 'relative', border: '1px solid #E2CBCB', marginTop: 'auto', marginBottom: 'auto' }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', cursor: 'pointer', color: '#9B7580', fontSize: '1.2rem', lineHeight: 1, padding: '0.25rem' }}
          aria-label="Close"
        >
          ×
        </button>

        <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#B5687A', fontWeight: 600, marginBottom: '0.5rem' }}>Data & Research</p>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.75rem', fontWeight: 500, color: '#261318', marginBottom: '0.85rem', lineHeight: 1.3 }}>
          Trauma Care Deserts — U.S. Coverage Map
        </h2>
        <p style={{ fontSize: '0.875rem', color: '#7A4050', marginBottom: '2rem', lineHeight: 1.7, maxWidth: '560px' }}>
          Each dot represents a U.S. county cluster. Color indicates the density of accessible, trauma-informed care relative to population need. Dark regions are care deserts — areas where survivors have no accessible specialist within a reasonable distance.
        </p>

        <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
          <DesertDotMap scale={1.7} />
        </div>

        <div style={{ backgroundColor: '#FDF7F5', border: '1px solid #EDD9DC', padding: '1.25rem 1.5rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B5687A" strokeWidth="1.5" style={{ flexShrink: 0, marginTop: '0.1rem' }}>
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p style={{ fontSize: '0.82rem', color: '#7A4050', lineHeight: 1.6, margin: 0 }}>
              <strong>Pipeline in progress.</strong> This visualization uses preliminary reference data. FemAura's Python scraping pipeline will layer in live zip-code level resource density, telehealth coverage, and waitlist estimates when the backend launches.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          {[
            { stat: '40%+', label: 'of U.S. counties with no trauma-informed specialist' },
            { stat: '1 in 4', label: 'women experience severe domestic violence' },
            { stat: '80%', label: 'of survivors never access specialized care' },
          ].map(s => (
            <div key={s.stat} style={{ borderTop: '2px solid #E2CBCB', paddingTop: '1rem' }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.75rem', color: '#6B1F33', marginBottom: '0.35rem' }}>{s.stat}</div>
              <p style={{ fontSize: '0.8rem', color: '#5C3040', lineHeight: 1.55, margin: 0 }}>{s.label}</p>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          style={{ padding: '0.65rem 1.5rem', backgroundColor: 'transparent', color: '#6B1F33', border: '1px solid #6B1F33', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}
        >
          Close
        </button>
      </div>
    </div>
  )
}

// ── Resource row ─────────────────────────────────────────────────────────────
function ResourceRow({ resource, index, total }: { resource: Resource; index: number; total: number }) {
  const isLast = index === total - 1

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: '1rem',
        padding: '1.75rem 0',
        borderBottom: isLast ? 'none' : '1px solid #EDD9DC',
        alignItems: 'start',
      }}
    >
      <div>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '0.6rem', marginBottom: '0.5rem' }}>
          <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.1rem', fontWeight: 600, color: '#261318', margin: 0 }}>
            {resource.name}
          </h3>
          <span style={{
            fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
            color: resource.cost === 'free' ? '#6B1F33' : '#7A4050',
            backgroundColor: resource.cost === 'free' ? '#F2DDE2' : '#EDD9DC',
            padding: '0.15rem 0.5rem',
          }}>
            {costBadge[resource.cost]}
          </span>
          {resource.hours && <span style={{ fontSize: '0.78rem', color: '#9B7580' }}>{resource.hours}</span>}
        </div>

        <p style={{ fontSize: '0.9rem', color: '#5C3040', lineHeight: 1.65, margin: '0 0 0.85rem', maxWidth: '680px' }}>
          {resource.description}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.85rem' }}>
          {resource.tags.map(tag => (
            <span key={tag} style={{ fontSize: '0.72rem', color: '#9B7580', border: '1px solid #DCC8CB', padding: '0.1rem 0.5rem', letterSpacing: '0.02em' }}>
              {tag}
            </span>
          ))}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', alignItems: 'center' }}>
          {resource.phone && (
            <a href={`tel:${resource.phone.replace(/\D/g, '')}`} style={{ fontSize: '0.9rem', fontWeight: 700, color: '#6B1F33', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
              {resource.phone}
            </a>
          )}
          {resource.textLine && (
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#6B1F33' }}>{resource.textLine}</span>
          )}
          {resource.website && (
            <a href={`https://${resource.website}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.85rem', color: '#B5687A', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
              {resource.website} ↗
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
