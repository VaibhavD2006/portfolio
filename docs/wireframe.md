# Wireframes — Notebook-Style AI/ML Portfolio

## UX Concept
The portfolio should feel like opening a clean research workspace. The user should be able to choose a project quickly, read a concise summary, inspect technical detail, and move deeper only when they want to.

## Global Layout Wireframe
```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ Top Bar: Logo | Search / Command Bar | Theme Toggle | GitHub | Resume     │
├───────────────────┬──────────────────────────────────────┬──────────────────┤
│ Left Navigation   │ Main Notebook Workspace             │ Right Panel      │
│                   │                                      │                  │
│ Home              │ Active page / notebook content       │ Metadata         │
│ Projects          │                                      │ Stack            │
│ About             │                                      │ Metrics          │
│ Resume            │                                      │ Links            │
│ Contact           │                                      │ Quick actions    │
│                   │                                      │                  │
│ Project list      │                                      │                  │
│ - KeyMail         │                                      │                  │
│ - NASA / LUMIN    │                                      │                  │
│ - UNC CV          │                                      │                  │
│ - DoD Edge ML     │                                      │                  │
│ - HavenSmart RAG  │                                      │                  │
│ - LeapGPT         │                                      │                  │
└───────────────────┴──────────────────────────────────────┴──────────────────┘
```

## Homepage Wireframe
```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ Hero / Positioning                                                         │
│ “Building ML systems, agentic products, and research-driven tools.”       │
│ Subtext: concise description                                               │
│ CTAs: Explore Projects | View Resume | GitHub                              │
├─────────────────────────────────────────────────────────────────────────────┤
│ Filter Chips: All | RAG | Vision | Agents | SaaS | Research               │
├─────────────────────────────────────────────────────────────────────────────┤
│ Featured Notebooks                                                         │
│ [KeyMail]  [NASA / LUMIN]  [UNC Pipeline]                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│ Start Here                                                                 │
│ Recruiter path | Engineer path | Founder path                              │
├─────────────────────────────────────────────────────────────────────────────┤
│ Supporting credibility strip                                               │
│ NCSU | ICMLA ’25 | NASA JPL | UNC | DoD | HavenSmart                       │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Projects Index Wireframe
```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ Page title: Project Notebooks                                              │
│ Short intro                                                                │
├─────────────────────────────────────────────────────────────────────────────┤
│ Filters + sort                                                             │
│ Category | Domain | Stack | Impact                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│ Notebook Cards Grid                                                        │
│ ┌────────────────┐ ┌────────────────┐ ┌────────────────┐                   │
│ │ title          │ │ title          │ │ title          │                   │
│ │ summary        │ │ summary        │ │ summary        │                   │
│ │ tags           │ │ tags           │ │ tags           │                   │
│ │ metric         │ │ metric         │ │ metric         │                   │
│ └────────────────┘ └────────────────┘ └────────────────┘                   │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Project Notebook Wireframe
```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ Notebook Header                                                            │
│ Title | role | timeframe | status                                          │
│ One-line summary                                                           │
├─────────────────────────────────────────────────────────────────────────────┤
│ Question chips                                                             │
│ [What problem did this solve?] [Show architecture] [Results] [Lessons]     │
├─────────────────────────────────────────────────────────────────────────────┤
│ Section nav / tabs                                                         │
│ Summary | Problem | Approach | Architecture | Results | Artifacts | Links  │
├─────────────────────────────────────────────────────────────────────────────┤
│ Main content area                                                          │
│                                                                             │
│ Section content with clean typography                                      │
│ Diagrams / architecture blocks                                             │
│ Metric highlights                                                           │
│ Artifact thumbnails                                                         │
│ Lessons / limitations                                                       │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Right Metadata Panel Wireframe
```text
┌──────────────────────────────┐
│ Project Metadata             │
├──────────────────────────────┤
│ Role                         │
│ Timeframe                    │
│ Domain                       │
│ Stack                        │
│ Tags                         │
├──────────────────────────────┤
│ Key Metrics                  │
│ - 93% accuracy               │
│ - 35% prep time reduction    │
│ - 65,000+ CT images          │
├──────────────────────────────┤
│ Quick Links                  │
│ Demo                         │
│ GitHub                       │
│ Writeup                      │
│ Resume                       │
└──────────────────────────────┘
```

## Interactive Architecture Wireframe
```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ Architecture Explorer                                                      │
│                                                                             │
│ [Data Source] → [Processing] → [Model / Agent] → [Output / Eval]           │
│      |              |                  |                    |               │
│   clickable      clickable         clickable           clickable            │
├─────────────────────────────────────────────────────────────────────────────┤
│ Detail panel for selected block                                             │
│ - what this block does                                                      │
│ - tools used                                                                │
│ - engineering tradeoffs                                                     │
│ - what was difficult                                                        │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Executive vs Technical View Toggle
```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ View mode: [Executive] [Technical]                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│ Executive mode: impact, summary, outcome, clean highlights                 │
│ Technical mode: stack, architecture, metrics, implementation details        │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Mobile Wireframe
```text
┌───────────────────────────────────────┐
│ Top bar: menu | logo | theme          │
├───────────────────────────────────────┤
│ Hero / notebook header                │
├───────────────────────────────────────┤
│ Filter chips / question chips         │
├───────────────────────────────────────┤
│ Main notebook content                 │
├───────────────────────────────────────┤
│ Collapsible metadata drawer           │
├───────────────────────────────────────┤
│ Bottom actions: Resume | GitHub       │
└───────────────────────────────────────┘
```

## Recommended Primary Flows
### Recruiter Flow
- land on homepage
- click featured notebook
- scan summary and metrics
- open resume
- contact

### Technical Interviewer Flow
- land on homepage
- open notebook
- inspect architecture explorer
- switch to technical view
- inspect lessons and links

### Founder Flow
- land on homepage
- open product-focused project like KeyMail
- inspect summary, outcome, and artifacts
- open About / Contact

## UX Design Rules
- show clarity before complexity
- each click should reveal something useful
- keep the first screen calm and focused
- use motion only to support navigation and state change
- preserve a polished green-accent product feel without overdecorating