import React, { useState, useEffect, useRef } from 'react';
 import robotImg from './assets/robot.jpg';

const PROJECTS = [
  {
    id: 1,
    title: 'SOC Homelab',
    tag: 'Blue Team',
    tagColor: '#5DCAA5',
    desc: 'Built a hybrid Windows + Kali lab, configured Elastic Cloud SIEM, and wrote custom detection rules that caught real simulated attacks.',
    skills: ['Elastic SIEM', 'Sysmon', 'Threat Detection', 'Linux/Windows'],
    link: 'https://github.com/hal-imaxabdi/Soc-Homelab',
    screenshot: null,
    featured: true,
  },
  {
    id: 2,
    title: 'WAF HomeLab',
    tag: 'Defensive Security',
    tagColor: '#f0a500',
    desc: 'Deployed SafeLine WAF to detect and block SQL Injection, XSS, and Command Injection in real-time with rate limiting and IP blacklisting.',
    skills: ['SafeLine WAF', 'SQLi/XSS', 'Rate Limiting', 'IP Blacklisting'],
    link: 'https://github.com/hal-imaxabdi/WAF-HomeLab-SafeLine',
    screenshot: null,
    featured: true,
  },
  {
    id: 3,
    title: 'SEMIS',
    tag: 'Full-Stack',
    tagColor: '#a29bfe',
    desc: 'Enterprise HR system implementing all 10 OWASP Top 10 mitigations — MFA, encryption at rest, RBAC, and audit logging.',
    skills: ['React', 'Node.js', 'OWASP Top 10', 'RBAC'],
    link: 'https://github.com/hal-imaxabdi/SEMIS-Secure-Employee-Management-Information-System',
    screenshot: null,
    featured: false,
  },
  {
    id: 4,
    title: 'Coffee-Demo-Shop',
    tag: 'Web App',
    tagColor: '#e17055',
    desc: 'Full-stack e-commerce demo with brute force simulation. Shows vulnerable vs. secure design with BCrypt, JWT, rate limiting, and CSRF protection.',
    skills: ['Flask', 'Python', 'JWT', 'CSRF'],
    link: 'https://github.com/hal-imaxabdi/Coffee-Demo-shop',
    screenshot: null,
    featured: false,
  },
  {
    id: 5,
    title: 'Mini SIEM',
    tag: 'In Progress',
    tagColor: '#f9ca24',
    desc: 'Custom SIEM built from scratch — log collection, normalization, detection engine, and dashboard. A deep dive into how SIEMs work.',
    skills: ['Python', 'Log Normalization', 'Detection Engine', 'Dashboard'],
    link: 'https://github.com/hal-imaxabdi/mini-siem',
    screenshot: null,
    featured: false,
  },
  {
    id: 6,
    title: 'Expense Tracker',
    tag: 'Frontend',
    tagColor: '#74b9ff',
    desc: 'Interactive expense tracking app with category breakdowns, monthly charts, and local data persistence. Built with vanilla JS and DOM manipulation.',
    skills: ['JavaScript', 'DOM', 'CSS3', 'LocalStorage'],
    link: 'https://github.com/hal-imaxabdi',
    screenshot: null,
    featured: false,
  },
];

const ALL_SKILLS = [
  'Python', 'JavaScript', 'React', 'Node.js', 'Flask', 'SQL', 'C++',
  'HTML & CSS', 'REST APIs', 'Git & GitHub',
  'Elastic SIEM', 'Wireshark', 'Nmap', 'Burp Suite', 'Sysmon', 'SafeLine WAF',
  'Log Analysis', 'Threat Detection', 'Incident Response', 'Alert Triage',
  'OWASP Top 10', 'NIST CSF', 'MITRE ATT&CK', 'ITILv4',
  'Linux', 'Windows', 'VirtualBox', 'Networking',
  'JWT', 'CSRF', 'BCrypt', 'RBAC',
  'MongoDB', 'SQLite', 'Docker basics',
];

const CERTS = [
  { name: 'Google Cybersecurity Professional', issuer: 'Google' },
  { name: 'IBM Incident Response & Digital Forensics', issuer: 'IBM' },
  { name: 'AWS Security Fundamentals', issuer: 'Amazon Web Services' },
  { name: 'TryHackMe Pre-Security', issuer: 'TryHackMe' },
  { name: 'President English Test (PET)', issuer: 'President University · Score 556' },
];

function useTypewriter(text, speed = 85, delay = 400) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => {
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) { clearInterval(interval); setDone(true); }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, speed, delay]);
  return { displayed, done };
}

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  const links = ['About', 'Projects', 'Skills', 'Certifications', 'Contact'];
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '0 clamp(20px, 5vw, 48px)', height: 60,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled ? 'rgba(11,11,15,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(14px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
      transition: 'all 0.3s ease',
    }}>
      <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontSize: 13, letterSpacing: 2 }}>
        HAL<span style={{ animation: 'blink 1.2s step-end infinite' }}>_</span>
      </span>
      <div className="desktop-nav" style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
        {links.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`}
            style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', textDecoration: 'none', letterSpacing: 1, transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = 'var(--accent)'}
            onMouseLeave={e => e.target.style.color = 'var(--muted)'}
          >{l}</a>
        ))}
        <a href="https://github.com/hal-imaxabdi" target="_blank" rel="noreferrer"
          style={{ fontFamily: 'var(--font-mono)', fontSize: 11, padding: '5px 14px', border: '1px solid var(--accent)', color: 'var(--accent)', borderRadius: 4, textDecoration: 'none', transition: 'all 0.2s' }}
          onMouseEnter={e => { e.target.style.background = 'var(--accent)'; e.target.style.color = '#0b0b0f'; }}
          onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--accent)'; }}
        >GitHub</a>
      </div>
      <button className="mobile-menu-btn" onClick={() => setMenuOpen(o => !o)}
        style={{ display: 'none', background: 'none', border: 'none', color: 'var(--accent)', fontSize: 22, cursor: 'pointer', padding: 4 }}
        aria-label="Toggle menu"
      >{menuOpen ? '✕' : '☰'}</button>
      {menuOpen && (
        <div style={{
          position: 'absolute', top: 60, left: 0, right: 0,
          background: 'rgba(11,11,15,0.98)', backdropFilter: 'blur(14px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16,
        }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)}
              style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--muted)', textDecoration: 'none', letterSpacing: 1 }}
            >{l}</a>
          ))}
          <a href="https://github.com/hal-imaxabdi" target="_blank" rel="noreferrer"
            style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent)', textDecoration: 'none', letterSpacing: 1 }}
          >GitHub ↗</a>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const { displayed, done } = useTypewriter('Halima Abdirizak', 85, 300);
  const [sub, setSub] = useState(false);
  useEffect(() => { if (done) setTimeout(() => setSub(true), 200); }, [done]);

  return (
    <section id="about" style={{
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      alignItems: 'center', gap: 40,
      padding: 'clamp(80px, 12vw, 120px) clamp(20px, 8vw, 80px) clamp(40px, 6vw, 60px)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: `linear-gradient(rgba(93,202,165,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(93,202,165,0.025) 1px, transparent 1px)`,
        backgroundSize: '64px 64px',
      }} />
      <div style={{
        position: 'absolute', top: '15%', right: '5%', width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(93,202,165,0.05) 0%, transparent 65%)',
        borderRadius: '50%', zIndex: 0, pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent)', letterSpacing: 3, marginBottom: 18, opacity: 0, animation: 'fadeUp 0.6s ease 0.1s forwards' }}>
          &gt; IT STUDENT · CYBERSECURITY FOCUS
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(34px, 6vw, 62px)', lineHeight: 1.08, color: '#fff', marginBottom: 4, letterSpacing: '-0.5px' }}>
          {displayed}
          {!done && <span style={{ animation: 'blink 0.8s step-end infinite', color: 'var(--accent)' }}>|</span>}
        </h1>
        <div style={{ height: 2, width: 56, background: 'var(--accent)', marginBottom: 24, marginTop: 14, opacity: done ? 1 : 0, transition: 'opacity 0.5s' }} />
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 'clamp(14px, 2vw, 16px)', lineHeight: 1.75,
          color: 'var(--muted)', maxWidth: 460,
          opacity: sub ? 1 : 0, transform: sub ? 'translateY(0)' : 'translateY(18px)', transition: 'all 0.7s ease',
        }}>
          BSc Informatics (Cybersecurity) at President University, Indonesia. I build full-stack apps, set up security homelabs, and document everything I learn along the way.
        </p>
        <div style={{
          display: 'flex', gap: 12, marginTop: 36, flexWrap: 'wrap',
          opacity: sub ? 1 : 0, transform: sub ? 'translateY(0)' : 'translateY(16px)', transition: 'all 0.7s ease 0.15s',
        }}>
          <a href="#projects"
            style={{ fontFamily: 'var(--font-mono)', fontSize: 12, padding: '11px 26px', background: 'var(--accent)', color: '#0b0b0f', borderRadius: 5, textDecoration: 'none', fontWeight: 700, letterSpacing: 0.5, transition: 'opacity 0.2s' }}
            onMouseEnter={e => e.target.style.opacity = '0.85'}
            onMouseLeave={e => e.target.style.opacity = '1'}
          >View Work</a>
          <a href="mailto:halimamohamedabdirizak@email.com"
            style={{ fontFamily: 'var(--font-mono)', fontSize: 12, padding: '11px 26px', border: '1px solid rgba(255,255,255,0.12)', color: 'var(--text)', borderRadius: 5, textDecoration: 'none', letterSpacing: 0.5, transition: 'border-color 0.2s, color 0.2s' }}
            onMouseEnter={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.color = 'var(--accent)'; }}
            onMouseLeave={e => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; e.target.style.color = 'var(--text)'; }}
          >Get In Touch</a>
        </div>
        <div style={{
          display: 'flex', gap: 20, marginTop: 36, flexWrap: 'wrap',
          opacity: sub ? 1 : 0, transition: 'opacity 0.7s ease 0.3s',
        }}>
          {['📍 Bekasi, Indonesia', '🎓 President University', '⚡ Open to Internships'].map(t => (
            <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: 0.3 }}>{t}</span>
          ))}
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ position: 'relative', width: 'min(300px, 70vw)', aspectRatio: '1/1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1.5px solid rgba(93,202,165,0.25)', animation: 'glowPulse 3.5s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', inset: '12%', borderRadius: '50%', border: '1px solid rgba(93,202,165,0.1)' }} />
          <div style={{
            width: '72%', aspectRatio: '1/1', borderRadius: '50%',
            background: 'linear-gradient(145deg, #16161e, #1c1c28)',
            border: '2px solid rgba(93,202,165,0.35)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: 'floatRobot 4.5s ease-in-out infinite',
            overflow: 'hidden',
          }}>
             <img src={robotImg} alt="Halima" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
          </div>
        </div>
      </div>
    </section>
  );
}

function RobotPlaceholder() {
  return (
    <div style={{ textAlign: 'center', padding: 16 }}>
      <div style={{ fontSize: 64, lineHeight: 1 }}>🤖</div>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(255,255,255,0.2)', marginTop: 8, lineHeight: 1.5 }}>
        robot.jpg<br />goes here
      </p>
    </div>
  );
}

function ScreenshotPlaceholder({ color }) {
  return (
    <div style={{
      width: '100%', aspectRatio: '16/9',
      background: 'linear-gradient(135deg, #13131a, #1a1a24)',
      border: `1px dashed ${color}35`,
      borderRadius: '8px 8px 0 0',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
    }}>
      <div style={{ display: 'flex', gap: 5 }}>
        {['#ff5f5760','#febc2e60','#28c84060'].map(c => (
          <div key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />
        ))}
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(255,255,255,0.15)', letterSpacing: 1 }}>
        ADD SCREENSHOT
      </div>
    </div>
  );
}

function Projects() {
  const { ref, inView } = useInView();
  const featured = PROJECTS.filter(p => p.featured);
  const rest = PROJECTS.filter(p => !p.featured);

  return (
    <section id="projects" ref={ref} style={{ padding: 'clamp(60px, 10vw, 100px) clamp(20px, 8vw, 80px)' }}>
      <SectionHeader label="02 / PROJECTS" title="Things I've Built" inView={inView} />
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 20, marginBottom: 20,
        opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(28px)',
        transition: 'all 0.7s ease 0.2s',
      }}>
        {featured.map(p => <ProjectCard key={p.id} project={p} />)}
      </div>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 20,
        opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(28px)',
        transition: 'all 0.7s ease 0.38s',
      }}>
        {rest.map(p => <ProjectCard key={p.id} project={p} />)}
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a href={project.link} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered ? '#15151e' : '#111118',
          border: `1px solid ${hovered ? project.tagColor + '45' : 'rgba(255,255,255,0.06)'}`,
          borderRadius: 10, overflow: 'hidden',
          transition: 'all 0.3s ease',
          transform: hovered ? 'translateY(-3px)' : 'none',
          boxShadow: hovered ? `0 12px 32px ${project.tagColor}12` : 'none',
          height: '100%', display: 'flex', flexDirection: 'column',
        }}
      >
        {project.screenshot
          ? <img src={project.screenshot} alt={project.title} style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover' }} />
          : <ScreenshotPlaceholder color={project.tagColor} />
        }
        <div style={{ padding: '18px 20px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16, color: '#fff', letterSpacing: '-0.2px' }}>
              {project.title}
            </h3>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 9, padding: '3px 9px',
              background: project.tagColor + '18', color: project.tagColor,
              borderRadius: 20, letterSpacing: 0.8, whiteSpace: 'nowrap', marginLeft: 8,
            }}>{project.tag}</span>
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, flex: 1, marginBottom: 14 }}>
            {project.desc}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
            {project.skills.map(s => (
              <span key={s} style={{
                fontFamily: 'var(--font-mono)', fontSize: 9, padding: '3px 8px',
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 3, color: 'rgba(255,255,255,0.4)', letterSpacing: 0.3,
              }}>{s}</span>
            ))}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: hovered ? project.tagColor : 'var(--muted)', transition: 'color 0.2s', letterSpacing: 0.5 }}>
            View on GitHub →
          </div>
        </div>
      </div>
    </a>
  );
}

// Rotating 3D tag cloud
function SkillGlobe() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const tagsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const speedRef = useRef({ x: 0.003, y: 0.006 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    canvas.width = W;
    canvas.height = H;
    const cx = W / 2, cy = H / 2;
    const R = Math.min(W, H) * 0.38;

    // Distribute skills evenly on sphere surface using golden spiral
    tagsRef.current = ALL_SKILLS.map((text, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / ALL_SKILLS.length);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      return {
        text,
        x: Math.sin(phi) * Math.cos(theta),
        y: Math.sin(phi) * Math.sin(theta),
        z: Math.cos(phi),
      };
    });

    let angleX = 0, angleY = 0;

    const rotate = (tag, ax, ay) => {
      // Rotate around Y
      const cosY = Math.cos(ay), sinY = Math.sin(ay);
      const x1 = tag.x * cosY + tag.z * sinY;
      const z1 = -tag.x * sinY + tag.z * cosY;
      // Rotate around X
      const cosX = Math.cos(ax), sinX = Math.sin(ax);
      const y2 = tag.y * cosX - z1 * sinX;
      const z2 = tag.y * sinX + z1 * cosX;
      return { x: x1, y: y2, z: z2 };
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      angleX += speedRef.current.x;
      angleY += speedRef.current.y;

      const projected = tagsRef.current.map(tag => {
        const r = rotate(tag, angleX, angleY);
        const scale = (r.z + 1.8) / 2.8;
        return { text: tag.text, px: cx + r.x * R, py: cy + r.y * R, scale, z: r.z };
      });

      projected.sort((a, b) => a.z - b.z);

      projected.forEach(({ text, px, py, scale }) => {
        const alpha = (scale - 0.1) / 0.9;
        const fontSize = Math.round(10 + scale * 5);
        ctx.font = `${scale > 0.75 ? 500 : 400} ${fontSize}px 'DM Sans', sans-serif`;
        ctx.fillStyle = scale > 0.7
          ? `rgba(93,202,165,${alpha.toFixed(2)})`
          : `rgba(120,120,150,${(alpha * 0.6).toFixed(2)})`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, px, py);
      });

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    const onMove = e => {
      const rect = canvas.getBoundingClientRect();
      const mx = (e.clientX - rect.left - cx) / cx;
      const my = (e.clientY - rect.top - cy) / cy;
      speedRef.current = { x: my * 0.015, y: mx * 0.015 };
    };
    const onLeave = () => { speedRef.current = { x: 0.003, y: 0.006 }; };

    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(animRef.current);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', display: 'block', cursor: 'grab' }}
    />
  );
}

function Skills() {
  const { ref, inView } = useInView();
  return (
    <section id="skills" ref={ref} style={{ padding: 'clamp(60px, 10vw, 100px) clamp(20px, 8vw, 80px)', background: '#0e0e14' }}>
      <SectionHeader label="03 / SKILLS" title="What I Work With" inView={inView} />
      <div style={{
        opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(28px)',
        transition: 'all 0.7s ease 0.2s',
      }}>
        <div style={{
          width: '100%', height: 'clamp(320px, 50vw, 480px)',
          background: '#0b0b0f', border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 12, overflow: 'hidden',
        }}>
          <SkillGlobe />
        </div>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.2)', textAlign: 'center', marginTop: 12, letterSpacing: 1 }}>
          MOVE MOUSE OVER GLOBE TO STEER
        </p>
      </div>

      <div style={{
        marginTop: 20, padding: 'clamp(18px, 4vw, 28px)',
        background: '#0b0b0f', border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 8,
        display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12,
        opacity: inView ? 1 : 0, transition: 'opacity 0.7s ease 0.45s',
      }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--muted)', letterSpacing: 2, marginBottom: 6, textTransform: 'uppercase' }}>Education</div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 17, color: '#fff' }}>President University</div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--muted)', marginTop: 3 }}>BSc Informatics — Cybersecurity Track · 2024–2027</div>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)' }}>Bekasi, Indonesia</div>
      </div>
    </section>
  );
}

function Certifications() {
  const { ref, inView } = useInView();
  return (
    <section id="certifications" ref={ref} style={{ padding: 'clamp(60px, 10vw, 100px) clamp(20px, 8vw, 80px)' }}>
      <SectionHeader label="04 / CERTIFICATIONS" title="Certifications" inView={inView} />
      <div style={{
        display: 'flex', flexDirection: 'column', gap: 1,
        opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(28px)',
        transition: 'all 0.7s ease 0.2s',
        border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, overflow: 'hidden',
      }}>
        {CERTS.map((cert, i) => (
          <div key={cert.name} style={{
            background: i % 2 === 0 ? '#111118' : '#0f0f16',
            padding: '16px 24px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            flexWrap: 'wrap', gap: 8,
            borderBottom: i < CERTS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
          }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text)' }}>{cert.name}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: 0.5, whiteSpace: 'nowrap' }}>{cert.issuer}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const { ref, inView } = useInView();
  return (
    <section id="contact" ref={ref} style={{ padding: 'clamp(60px, 10vw, 100px) clamp(20px, 8vw, 80px)', background: '#0e0e14', textAlign: 'center' }}>
      <div style={{
        maxWidth: 560, margin: '0 auto',
        opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(28px)',
        transition: 'all 0.7s ease',
      }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--accent)', letterSpacing: 3, marginBottom: 14 }}>05 / CONTACT</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(32px, 6vw, 46px)', color: '#fff', marginBottom: 16, letterSpacing: '-0.5px' }}>Let's Connect</h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--muted)', lineHeight: 1.75, marginBottom: 36 }}>
          I'm looking for SOC analyst internship opportunities. Recruiter, fellow student, or just want to talk IT — my inbox is open.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <ContactLink href="mailto:halimamohamedabdirizak@email.com" label="Email" color="#5DCAA5" />
          <ContactLink href="https://github.com/hal-imaxabdi" label="GitHub" color="#a29bfe" />
          <ContactLink href="https://linkedin.com/in/halimaabdirizak-mohamed" label="LinkedIn" color="#f0a500" />
        </div>
        <div style={{ marginTop: 48, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.2)', letterSpacing: 1 }}>
          +62 8179727975 · Bekasi, Indonesia
        </div>
      </div>
    </section>
  );
}

function ContactLink({ href, label, color }) {
  const [h, setH] = useState(false);
  return (
    <a href={href} target="_blank" rel="noreferrer"
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        fontFamily: 'var(--font-mono)', fontSize: 12, padding: '12px 28px',
        background: h ? color : 'transparent', border: `1px solid ${color}`,
        color: h ? '#0b0b0f' : color, borderRadius: 5, textDecoration: 'none',
        fontWeight: 700, letterSpacing: 0.5, transition: 'all 0.2s',
      }}>{label}</a>
  );
}

function SectionHeader({ label, title, inView }) {
  return (
    <div style={{ marginBottom: 'clamp(32px, 6vw, 52px)', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(18px)', transition: 'all 0.6s ease' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--accent)', letterSpacing: 3, marginBottom: 10 }}>{label}</div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(28px, 5vw, 38px)', color: '#fff', letterSpacing: '-0.5px' }}>{title}</h2>
      <div style={{ width: 40, height: 2, background: 'var(--accent)', marginTop: 14 }} />
    </div>
  );
}

function Footer() {
  return (
    <footer style={{
      padding: 'clamp(16px, 3vw, 24px) clamp(20px, 8vw, 80px)',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8,
    }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.2)' }}>© 2025 Halima Abdirizak Mohamed</span>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.2)' }}>React · Cloudflare Pages</span>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
      <Navbar />
      <Hero />
      <Projects />
      <Skills />
      <Certifications />
      <Contact />
      <Footer />
    </>
  );
}
