import React from 'react';
import { RotatingBadge } from './RotatingBadge';
import openKioskImg from '../assets/openkiosk.jpg';
import skillbridgeImg from '../assets/skillbridge-africa.jpg';
import tractivImg from '../assets/tractiv.png';
import './Works.css';

const experiences = [
  {
    company: 'Koloxo Home',
    role: 'Senior Full-Stack Engineer',
    subtitle: 'Analytics & AI Platform',
    period: 'Dec 2025 — Present',
    location: 'Dubai, UAE',
    description:
      'Sole owner of the core analytics service — REST APIs, multi-tenant row-level security, a production RAG pipeline (pgvector), Celery worker queues, and a standalone Campaign Intelligence Report Engine built with hexagonal architecture.',
    tags: ['Python', 'FastAPI', 'pgvector', 'Celery', 'BigQuery', 'GCP', 'Azure', 'Kafka', 'Redis'],
  },
  {
    company: 'EGA Tech',
    role: 'Backend Developer / Automation Engineer',
    subtitle: 'Contractor — Client: VMO2',
    period: 'Sep 2024 — Present',
    location: 'London, UK (Remote)',
    description:
      "Engineered backend APIs and ad scheduling for VMO2's enterprise captive portal platform (branded Wi-Fi across venues), built impression tracking and metrics retrieval services, and resolved core signup/login page defects. Additionally authored GitLab CI automation modules, Kubernetes/Helm pipelines, and Python ORT acceptance tests on OpenShift.",
    tags: ['Python', 'Node.js', 'REST APIs', 'GitLab CI', 'Kubernetes', 'Helm', 'HashiCorp Vault', 'OpenShift'],
  },
  {
    company: 'ProEdge / eXp Realty',
    role: 'GoHighLevel Developer',
    subtitle: 'Automation Engineer (Part-time)',
    period: 'May 2025 — Dec 2025',
    location: 'Remote',
    description:
      'Built a Node.js ingest service (CSV/XLSX parsing, PostgreSQL upserts) and a Next.js/Prisma lead-delivery app with configurable geography rules, idempotent queues, and GoHighLevel OAuth integration.',
    tags: ['Node.js', 'Next.js', 'Prisma', 'PostgreSQL', 'GoHighLevel', 'OAuth'],
  },
  {
    company: 'Nuture Technology',
    role: 'Full-Stack Engineer',
    subtitle: 'Project Lead',
    period: 'Apr 2024 — Aug 2024',
    location: 'Lagos, Nigeria',
    description:
      'Led backend architecture of Zoid, a multi-tenant estate-management platform — onboarding, dues, QR-based access control (persistent + short-lived passes), a bill-payments engine, and real-time broadcast notifications.',
    tags: ['Node.js', 'PostgreSQL', 'QR Auth', 'REST API', 'Multi-tenancy', 'WebSockets'],
  },
  {
    company: 'Gemini Engineering',
    role: 'Full-Stack Software Engineer',
    subtitle: null,
    period: 'Nov 2023 — Mar 2024',
    location: 'Abuja, Nigeria',
    description:
      'Integrated MTN USSD, SMS v2 and Subscription APIs; architected a reusable bulk SMS API. Built admin health dashboards; improved corporate SEO by 50% and shipped a landing page lifting brand visibility by 30%.',
    tags: ['Laravel', 'MTN API', 'USSD', 'SMS', 'SEO', 'Admin Dashboard'],
  },
  {
    company: 'Bincom ICT Solutions',
    role: 'Team Lead, Backend',
    subtitle: 'Junior SWE → Intern (Aug 2020)',
    period: 'Aug 2020 — Oct 2023',
    location: 'Lagos, Nigeria',
    description:
      'Led the backend team across concurrent products — owned delivery timelines and tech direction, ran code reviews, and mentored engineers. Shipped Laravel REST APIs, built a Moodle-based LMS, and improved Social Lender API algorithms.',
    tags: ['Laravel', 'REST API', 'Moodle', 'SQL', 'Jira', 'Azure DevOps'],
  },
  {
    company: 'Trustvas Limited',
    role: 'Software Developer Intern',
    subtitle: null,
    period: 'May 2022 — Mar 2023',
    location: 'Lagos, Nigeria',
    description:
      'Refactored high-value payment services (PushBankTransfer, PushBillPayment) for maintainability; built and tested API integrations for MTN MADAPI and Zenith Bank.',
    tags: ['API Integration', 'Payment Services', 'MTN MADAPI', 'Zenith Bank'],
  },
];

const featuredProjects = [
  {
    name: 'OpenKiosk',
    description:
      'OpenKiosk is a modern multi-tenant e-commerce platform designed to help independent businesses, market stalls, and neighborhood retail businesses launch, customize, and manage their online storefronts / websites with zero technical overhead.',
    image: openKioskImg,
    tags: ['Multi-tenant', 'E-commerce', 'Storefront Builder', 'SaaS', 'Zero-Code'],
    url: 'https://open-kiosk.vercel.app/',
  },
  {
    name: 'Skillbridge Africa',
    description:
      'High-fidelity marketplace connecting everyday customers with vetted local craftsmen across African cities. Powered by React 19, Tailwind CSS v4, and Vite.',
    image: skillbridgeImg,
    tags: ['React 19', 'Tailwind CSS v4', 'Vite', 'Marketplace', 'African Cities'],
    url: 'https://skillbridge-africa-seven.vercel.app/',
  },
  {
    name: 'Tractiv',
    description:
      'A workspace platform that helps companies coordinate team workflows, set precise access permissions, and track every change with a complete, tamper-proof activity log.',
    image: tractivImg,
    tags: ['Team Management', 'Access Control', 'NestJS', 'PostgreSQL', 'Audit Logs'],
    url: 'https://tractiv-frontend.vercel.app/',
  },
];

const projects = [
  {
    name: 'VMO2 Enterprise Captive Portal',
    description:
      'Enterprise captive portal platform for VMO2 enabling businesses to provide branded Wi-Fi access. Extended backend APIs for ad scheduling across signup and login pages, built impression/interaction tracking APIs, and resolved page-generation defects.',
    url: 'https://linkedin.com/in/victory-ikuomola',
  },
  {
    name: 'Analytics & AI Platform',
    description:
      'Multi-tenant analytics service with RAG search on pgvector, LLM-powered report generation, and a Celery worker pipeline handling brand, competitor, and commerce intelligence.',
    url: 'https://linkedin.com/in/victory-ikuomola',
  },
  {
    name: 'Campaign Intelligence Engine',
    description:
      'Standalone report engine using hexagonal architecture — async 202/job-ID APIs, chained KPI/benchmarking/LLM worker pipeline, versioned immutable reports, and domain events.',
    url: 'https://linkedin.com/in/victory-ikuomola',
  },
  {
    name: 'Zoid Estate Platform',
    description:
      'Multi-tenant estate management covering onboarding, dues, fines, QR-based access control with persistent and short-lived passes, bill payments, and real-time notifications.',
    url: 'https://linkedin.com/in/victory-ikuomola',
  },
  {
    name: 'VMO2 Test Automation Suite',
    description:
      'Python ORT acceptance test modules for OpenShift on GitLab CI — meta.yml contracts, per-cluster pass/fail, Vault credentials, and guaranteed cleanup after each run.',
    url: 'https://linkedin.com/in/victory-ikuomola',
  },
  {
    name: 'Zest Real Estate Listing Platform',
    description:
      'A real estate marketplace connecting property seekers with available listings, simplifying property discovery through searchable listings, detailed property information, and streamlined interactions between agents and prospective buyers or renters.',
    url: 'https://github.com/codewithot',
  },
  {
    name: 'ProEdge Lead Delivery System',
    description:
      'Node.js ingest service + Next.js/Prisma lead-delivery app with geography/ZIP/radius matching, idempotent database-backed queues, and GoHighLevel OAuth automation.',
    url: 'https://linkedin.com/in/victory-ikuomola',
  },
  {
    name: 'Bulk SMS & USSD API',
    description:
      'Reusable high-volume bulk SMS API abstracting MTN USSD, SMS v2, and Subscription v2 — with an open-source log-parser utility that converts app logs to CSV.',
    url: 'https://github.com/codewithot',
  },
  {
    name: 'Zeal Artisan Marketplace',
    description:
      'A service marketplace connecting customers with trusted artisans and skilled professionals. Enables artisans to register and showcase their expertise while helping users discover, connect with, and hire reliable professionals for their everyday service needs.',
    url: 'https://github.com/codewithot',
  },
];

export function Works({ onAboutClick }) {
  return (
    <section className="works-section">
      <div className="works-container">

        {/* Page Header */}
        <div className="works-header">
          <div className="works-header-left">
            <h1 className="works-page-title">Work</h1>
            <p className="works-page-subtitle">
              Software work across APIs, cloud platforms, and full-stack product engineering.
            </p>
          </div>
          <div className="works-header-badge">
            <RotatingBadge
              text="· ABOUT ME · ABOUT ME · ABOUT ME "
              ariaLabel="About Me"
              onClick={onAboutClick}
            />
          </div>
        </div>

        {/* Selected Projects Section */}
        <div className="works-projects">
          <div className="works-projects-header">
            <div className="works-section-pill">
              <span className="pill-dot" aria-hidden="true" />
              <span>Personal Projects</span>
            </div>
            <h2 className="works-projects-title">Featured Personal Projects</h2>
            <p className="works-projects-subtitle">
              Independent SaaS platforms and marketplaces conceived, architected, and engineered end-to-end as personal products.
            </p>
          </div>

          {/* Featured Visual Showcase Grid */}
          <div className="works-featured-grid">
            {featuredProjects.map((project) => (
              <div className="works-featured-card" key={project.name}>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="works-featured-media-link"
                >
                  <div className="works-featured-media">
                    <span className="works-card-badge">
                      <span className="badge-sparkle" aria-hidden="true">✦</span>
                      <span>Personal Project</span>
                    </span>
                    <img
                      src={project.image}
                      alt={project.name}
                      className="works-featured-img"
                      loading="lazy"
                    />
                    <div className="works-featured-overlay" />
                  </div>
                </a>

                <div className="works-featured-body">
                  <div className="works-featured-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="exp-tag">{tag}</span>
                    ))}
                  </div>

                  <h3 className="works-featured-title">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className="works-featured-title-link"
                    >
                      <span>{project.name}</span>
                      <span className="works-featured-arrow" aria-hidden="true">↗</span>
                    </a>
                  </h3>

                  <p className="works-featured-desc">{project.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* More Projects Grid */}
          <div className="works-more-projects">
            <h3 className="works-more-title">Other Engineering & Client Platforms</h3>
            <p className="works-more-subtitle">
              Distributed services, automation suites, and backend infrastructure engineered across contracts and client roles.
            </p>
            <div className="works-projects-grid">
              {projects.map((project) => (
                <div className="works-project-item" key={project.name}>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="works-project-name"
                  >
                    {project.name}
                  </a>
                  <p className="works-project-desc">{project.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div className="works-experience">
          <div className="works-exp-header">
            <h2 className="works-exp-title">Experience</h2>
            <p className="works-exp-subtitle">
              Highlights from each role. The full details are in my{' '}
              <a
                href="https://docs.google.com/document/d/1BWPNHqZUD2OLtAfpiL4wZq6WKCQvsn8_a4i6ifXNZcY/edit?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className="works-resume-link"
              >
                Resume ↗
              </a>
            </p>
          </div>

          <div className="works-exp-grid">
            {experiences.map((exp) => (
              <div className="works-exp-card" key={exp.company + exp.period}>
                <div className="exp-card-meta">
                  <span className="exp-period">{exp.period}</span>
                  {exp.location && <span className="exp-location">{exp.location}</span>}
                </div>
                <h3 className="exp-company">{exp.company}</h3>
                <p className="exp-role">{exp.role}</p>
                {exp.subtitle && <p className="exp-subtitle-text">{exp.subtitle}</p>}
                <p className="exp-desc">{exp.description}</p>
                <div className="exp-tags">
                  {exp.tags.map((tag) => (
                    <span key={tag} className="exp-tag">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Read the full resume button */}
          <div className="works-resume-cta">
            <a
              href="https://docs.google.com/document/d/1BWPNHqZUD2OLtAfpiL4wZq6WKCQvsn8_a4i6ifXNZcY/edit?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="works-resume-btn"
            >
              Read the full resume ↗
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
