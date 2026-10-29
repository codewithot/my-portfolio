import React from 'react';
import { RotatingBadge } from './RotatingBadge';
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
    role: 'Backend / Automation Engineer',
    subtitle: 'Contractor — VMO2',
    period: 'Sep 2024 — Present',
    location: 'London, UK (Remote)',
    description:
      "Built GitLab CI automation modules, Kubernetes/Helm deployment pipelines, and Python ORT acceptance tests for VMO2's OpenShift platform. Integrated HashiCorp Vault for credential handling and built audit-trail validation with Splunk/Kafka.",
    tags: ['Python', 'GitLab CI', 'Kubernetes', 'Helm', 'HashiCorp Vault', 'OpenShift', 'Splunk', 'Node.js'],
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

const projects = [
  {
    name: 'Analytics & AI Platform',
    description:
      'Multi-tenant analytics service with RAG search on pgvector, LLM-powered report generation, and a Celery worker pipeline handling brand, competitor, and commerce intelligence.',
    url: 'https://linkedin.com/in/victory-ikuomola',
  },
  {
    name: 'Tractiv — Team & Workflow Management SaaS',
    description:
      'An enterprise-grade, multi-tenant B2B SaaS platform for team and workflow management, featuring tenant isolation, granular RBAC, immutable audit trails, and Kafka-powered event-driven architecture. Built with NestJS, PostgreSQL, Docker, Kubernetes, and GCP.',
    url: 'https://github.com/codewithot', // Replace with actual project URL
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

        {/* Experience Section */}
        <div className="works-experience">
          <div className="works-exp-header">
            <h2 className="works-exp-title">Experience</h2>
            <p className="works-exp-subtitle">
              Highlights from each role. The full details are in my{' '}
              <a
                href="https://docs.google.com/document/d/1tPXOaJMMUYCe2oOOEBI7E0jB6MD-U4Z9/edit?usp=sharing&ouid=101085036632476798211&rtpof=true&sd=true"
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
              href="https://docs.google.com/document/d/1tPXOaJMMUYCe2oOOEBI7E0jB6MD-U4Z9/edit?usp=sharing&ouid=101085036632476798211&rtpof=true&sd=true"
              target="_blank"
              rel="noreferrer"
              className="works-resume-btn"
            >
              Read the full resume ↗
            </a>
          </div>
        </div>

        {/* Selected Projects Section */}
        <div className="works-projects">
          <h2 className="works-projects-title">Selected projects</h2>
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
    </section>
  );
}
