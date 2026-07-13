# Product Requirements Document — Notebook-Style AI/ML Portfolio

## Product Name
Vaibhav Research Notebook

## Product Type
Interactive portfolio website for an ML engineer / AI engineer / research engineer candidate.

## Product Summary
Vaibhav Research Notebook is a portfolio website designed as a calm, polished, interactive research workspace rather than a traditional portfolio. The site should resemble a hybrid of a notebook workspace and a model-card-driven engineering archive.

Instead of presenting projects as static cards on long landing pages, the product should let visitors browse project notebooks, inspect technical details at different levels of depth, interact with architecture views, open metrics and artifacts, and understand both technical and product impact quickly.

The portfolio should feel sophisticated, minimal, technical, and highly intentional.

## Problem
Most technical portfolios suffer from one of two failures:
- They are too generic and read like marketing pages rather than proof of engineering ability.
- They are too complicated and try to imitate full enterprise products, which becomes difficult to build well and often feels fake.

This product solves that by building a simpler but still distinctive interface: a notebook-style workspace where each project behaves like a technical artifact.

## Objective
Create a portfolio that:
- clearly signals ML engineer, AI engineer, and research engineer identity
- feels interactive and memorable
- is simpler than a full AI lab dashboard
- is elegant enough for recruiters and deep enough for engineers
- can be built within a realistic scope

## Primary Users
### Recruiters
Need quick signal on quality, experience, project depth, and legitimacy.

### Technical Interviewers
Need architecture detail, metrics, engineering tradeoffs, and proof of understanding.

### Founders / Product Teams
Need product intuition, technical breadth, execution quality, and polished presentation.

## User Needs
### Recruiter Needs
- quick understanding of what Vaibhav builds
- clear impact metrics
- easy access to resume, GitHub, LinkedIn, and standout projects

### Technical Interviewer Needs
- architecture visibility
- concrete metrics and system details
- insight into stack, decisions, limitations, and lessons learned

### Founder Needs
- product polish
- sense of execution and shipped systems
- ability to understand what was built and why it mattered

## Product Principles
- Simple over bloated
- Product-grade over portfolio-template
- Interactive over passive
- Structured over noisy
- Polished over flashy
- Depth on demand instead of overwhelming the user immediately

## Experience Vision
The site should feel like opening a well-organized engineering notebook.

Users should:
- land on the homepage and immediately understand the positioning
- choose a project notebook quickly
- inspect the project at multiple depth levels
- interact with meaningful UI elements
- leave with a strong sense of technical credibility and taste

## Core UX Concept
The product uses a workspace structure:
- left panel for project navigation
- center panel for notebook content
- right panel for metadata, actions, and technical facts

This should create a “research desk” feeling rather than a marketing-site feeling.

## MVP Scope
### Included in MVP
- notebook-style homepage
- project sidebar navigation
- project notebook detail pages
- project category filters
- tabbed content for each project
- metadata side panel
- architecture interaction blocks
- metrics / artifact drawers
- one small interactive demo pattern reused across projects
- resume page
- about page
- contact page
- dark mode
- responsive design

### Excluded from MVP
- full AI chatbot over the entire site
- real-time backend analytics
- live authentication
- admin CMS
- elaborate animation system
- complex dashboard simulation
- multi-user features

## Information Architecture
### Top-Level Pages
- Home
- Projects
- About
- Resume
- Contact

### Within Home / Projects
Each project opens into a notebook-style view.

Each project notebook includes:
- Summary
- Problem
- Approach
- Architecture
- Results
- Artifacts
- Lessons
- Links

## Key Features
### 1. Notebook Homepage
A calm landing/workspace hybrid.

Functional goals:
- present the positioning statement
- feature project notebooks
- show category filters
- direct people into exploration quickly

### 2. Project Notebook Viewer
Core interface for browsing projects.

Functional goals:
- let users switch between projects without losing context
- display technical content cleanly
- support layered depth

### 3. Metadata Side Panel
Persistent quick-reference panel for the selected project.

Contains:
- role
- timeframe
- stack
- domain
- links
- top metrics
- project tags

### 4. Preset Question Chips
Instead of a full chatbot, include clickable prompts.

Examples:
- What problem did this solve?
- Show the architecture
- What were the results?
- What was technically hard?
- What would you improve next?

Clicking a chip should scroll to or reveal the relevant section.

### 5. Interactive Architecture View
A simple, elegant architecture block view.

Behavior:
- clicking a block reveals technical explanation
- hovering shows tooltips
- the architecture should feel inspectable without being overwhelming

### 6. Metrics / Artifacts Drawer
A collapsible side or bottom drawer for proof.

Contains:
- screenshots
- charts
- example outputs
- benchmark bullets
- deployment notes

### 7. View Mode Toggle
Let users change perspective.

Modes:
- Executive View
- Technical View

Executive View emphasizes impact, clarity, outcomes.
Technical View emphasizes system design, stack, metrics, tradeoffs.

## Content Strategy
Content should be organized around real projects and experience:
- KeyMail
- NASA / LUMIN RAG system
- UNC Radiation Oncology computer vision pipeline
- DoD edge ML deployment
- HavenSmart RAG chatbot
- LeapGPT

Each project should have:
- concise summary
- concrete impact
- architecture explanation
- selected metrics
- limitations or lessons

## Success Criteria
The portfolio is successful if:
- a recruiter can understand the candidate’s value in under 60 seconds
- a technical interviewer can inspect real depth in under 3 minutes
- the site feels like a refined product experience
- the interaction feels meaningful rather than gimmicky
- the build remains within realistic implementation scope

## Design Requirements
- polished, premium, minimal product UI
- green accents used sparingly and intelligently
- clean white / off-white base and strong dark mode
- strong typography hierarchy
- restrained animation
- excellent desktop and mobile UX
- no cluttered dashboards
- no generic SaaS hero-copy vibe

## Technical Requirements
Preferred stack:
- Next.js
- TypeScript
- Tailwind CSS
- Framer Motion only where useful

Implementation requirements:
- reusable component system
- static seeded content for first version
- file-driven data or local JSON/MD content acceptable
- strong accessibility
- fast loading and responsive behavior

## Risks
- overdesigning the interface and losing simplicity
- making interactivity decorative rather than useful
- overwhelming the user with too much technical detail too early
- trying to simulate a huge product instead of building a focused experience

## Mitigations
- keep the number of major interactions small and useful
- use layered disclosure
- prioritize 3–4 strongest projects first
- default to clarity and navigation simplicity

## Future Enhancements
- ask-this-project mini assistant
- markdown-backed research note system
- live embedded demos for selected projects
- downloadable case study PDFs
- richer benchmark explorer