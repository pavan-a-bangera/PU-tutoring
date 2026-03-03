import { useState } from "react";

// ─── Router simulation (hash-based, no external deps) ───────────────────────
// (fixed syntax error in default path)

function useRouter() {
  const [path, setPath] = useState(window.location.hash || "#/");


  const navigate = (to) => {
    window.location.hash = to;
    setPath(to);
  };
  window.onhashchange = () => setPath(window.location.hash);
  return { path, navigate };
}

// ─── Design tokens ───────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --navy: #0A1628;
    --blue: #1B4FD8;
    --blue-light: #3B6EF0;
    --gold: #F0A500;
    --gold-light: #FFD166;
    --cream: #FAFAF7;
    --slate: #64748B;
    --white: #FFFFFF;
    --card-bg: #FFFFFF;
    --border: #E2E8F0;
    --font-display: 'Playfair Display', serif;
    --font-body: 'DM Sans', sans-serif;
    --radius: 12px;
    --shadow: 0 4px 24px rgba(10,22,40,0.10);
    --shadow-lg: 0 12px 40px rgba(10,22,40,0.15);
  }

  body { font-family: var(--font-body); background: var(--cream); color: var(--navy); }

  .app { min-height: 100vh; display: flex; flex-direction: column; }
  .main { flex: 1; }

  /* NAV */
  .nav {
    background: var(--navy);
    padding: 0 2rem;
    display: flex; align-items: center; justify-content: space-between;
    height: 68px;
    position: sticky; top: 0; z-index: 100;
    box-shadow: 0 2px 20px rgba(0,0,0,0.25);
  }
  .nav-brand {
    font-family: var(--font-display);
    font-size: 1.35rem; color: var(--white);
    letter-spacing: -0.01em; cursor: pointer;
  }
  .nav-brand span { color: var(--gold); }
  .nav-links { display: flex; gap: 0.25rem; align-items: center; }
  .nav-link {
    color: rgba(255,255,255,0.75); font-size: 0.9rem; font-weight: 500;
    padding: 0.45rem 0.9rem; border-radius: 8px; cursor: pointer;
    transition: all 0.2s; border: none; background: none; font-family: var(--font-body);
  }
  .nav-link:hover { color: white; background: rgba(255,255,255,0.1); }
  .nav-link.active { color: var(--gold); background: rgba(240,165,0,0.12); }
  .nav-link.cta {
    background: var(--gold); color: var(--navy); font-weight: 700;
    padding: 0.45rem 1.1rem;
  }
  .nav-link.cta:hover { background: var(--gold-light); }

  /* HERO */
  .hero {
    background: linear-gradient(135deg, var(--navy) 0%, #1a2e5a 60%, #1B4FD8 100%);
    padding: 6rem 2rem 5rem;
    text-align: center; position: relative; overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse at 70% 50%, rgba(27,79,216,0.35) 0%, transparent 70%);
    pointer-events: none;
  }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 0.4rem;
    background: rgba(240,165,0,0.15); border: 1px solid rgba(240,165,0,0.4);
    color: var(--gold-light); font-size: 0.8rem; font-weight: 600;
    padding: 0.35rem 1rem; border-radius: 99px; margin-bottom: 1.5rem;
    letter-spacing: 0.05em; text-transform: uppercase;
  }
  .hero h1 {
    font-family: var(--font-display); font-size: clamp(2.2rem, 5vw, 3.5rem);
    color: white; line-height: 1.15; margin-bottom: 1.25rem; max-width: 720px; margin-inline: auto;
  }
  .hero h1 em { color: var(--gold); font-style: normal; }
  .hero p {
    color: rgba(255,255,255,0.72); font-size: 1.1rem; margin-bottom: 2.5rem;
    max-width: 540px; margin-inline: auto; line-height: 1.7;
  }
  .hero-btns { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
  .btn-primary {
    background: var(--gold); color: var(--navy); font-weight: 700;
    padding: 0.85rem 2rem; border-radius: var(--radius); font-size: 1rem;
    border: none; cursor: pointer; font-family: var(--font-body);
    transition: all 0.2s; box-shadow: 0 4px 16px rgba(240,165,0,0.4);
  }
  .btn-primary:hover { background: var(--gold-light); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(240,165,0,0.45); }
  .btn-outline {
    background: transparent; color: white; font-weight: 600;
    padding: 0.85rem 2rem; border-radius: var(--radius); font-size: 1rem;
    border: 1.5px solid rgba(255,255,255,0.35); cursor: pointer; font-family: var(--font-body);
    transition: all 0.2s;
  }
  .btn-outline:hover { border-color: white; background: rgba(255,255,255,0.08); }

  /* STATS BAR */
  .stats-bar {
    background: var(--white); border-bottom: 1px solid var(--border);
    display: flex; justify-content: center; flex-wrap: wrap; gap: 0;
  }
  .stat-item {
    padding: 1.5rem 3rem; text-align: center; border-right: 1px solid var(--border);
    flex: 1; min-width: 140px;
  }
  .stat-item:last-child { border-right: none; }
  .stat-num { font-family: var(--font-display); font-size: 2rem; color: var(--blue); font-weight: 900; }
  .stat-label { font-size: 0.8rem; color: var(--slate); font-weight: 500; margin-top: 0.2rem; }

  /* SECTIONS */
  .section { padding: 5rem 2rem; }
  .section-inner { max-width: 1100px; margin: auto; }
  .section-tag {
    display: inline-block; background: rgba(27,79,216,0.1);
    color: var(--blue); font-size: 0.75rem; font-weight: 700;
    padding: 0.3rem 0.9rem; border-radius: 99px; letter-spacing: 0.08em;
    text-transform: uppercase; margin-bottom: 1rem;
  }
  .section-title {
    font-family: var(--font-display); font-size: clamp(1.8rem, 3.5vw, 2.6rem);
    color: var(--navy); line-height: 1.2; margin-bottom: 1rem;
  }
  .section-sub { color: var(--slate); font-size: 1rem; line-height: 1.7; max-width: 560px; }

  /* FEATURE CARDS */
  .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-top: 3rem; }
  .feature-card {
    background: var(--white); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 2rem;
    transition: all 0.25s; position: relative; overflow: hidden;
  }
  .feature-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, var(--blue), var(--gold));
    opacity: 0; transition: opacity 0.25s;
  }
  .feature-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }
  .feature-card:hover::before { opacity: 1; }
  .feature-icon {
    width: 48px; height: 48px; border-radius: 12px;
    background: linear-gradient(135deg, var(--blue), var(--blue-light));
    display: flex; align-items: center; justify-content: center;
    font-size: 1.3rem; margin-bottom: 1.2rem;
  }
  .feature-card h3 { font-weight: 700; font-size: 1.05rem; margin-bottom: 0.5rem; }
  .feature-card p { color: var(--slate); font-size: 0.9rem; line-height: 1.65; }

  /* COURSE CARDS */
  .courses-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem; margin-top: 3rem; }
  .course-card {
    background: var(--white); border: 1px solid var(--border);
    border-radius: 16px; overflow: hidden; transition: all 0.25s;
    box-shadow: var(--shadow);
  }
  .course-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-lg); }
  .course-card-header { padding: 2rem 2rem 1.5rem; background: linear-gradient(135deg, var(--navy), #1a3060); }
  .course-card-header h3 { font-family: var(--font-display); font-size: 1.5rem; color: white; margin-bottom: 0.4rem; }
  .course-card-header p { color: rgba(255,255,255,0.65); font-size: 0.85rem; }
  .course-badge {
    display: inline-block; background: var(--gold); color: var(--navy);
    font-size: 0.72rem; font-weight: 800; padding: 0.25rem 0.7rem;
    border-radius: 99px; margin-bottom: 0.75rem; letter-spacing: 0.05em; text-transform: uppercase;
  }
  .course-card-body { padding: 1.5rem 2rem 2rem; }
  .course-subjects { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem; }
  .subject-chip {
    background: rgba(27,79,216,0.08); color: var(--blue);
    font-size: 0.78rem; font-weight: 600; padding: 0.3rem 0.8rem; border-radius: 99px;
    border: 1px solid rgba(27,79,216,0.15);
  }
  .course-price { font-family: var(--font-display); font-size: 1.8rem; color: var(--navy); font-weight: 900; }
  .course-price span { font-family: var(--font-body); font-size: 0.85rem; color: var(--slate); font-weight: 400; }
  .course-enroll {
    display: block; width: 100%; margin-top: 1.25rem;
    background: var(--blue); color: white; font-weight: 700;
    padding: 0.8rem; border-radius: 10px; font-size: 0.95rem;
    border: none; cursor: pointer; font-family: var(--font-body);
    transition: all 0.2s; text-align: center;
  }
  .course-enroll:hover { background: var(--blue-light); transform: translateY(-1px); }
`;

export default styles;