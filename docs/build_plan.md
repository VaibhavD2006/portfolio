# Build Plan — Notebook-Style AI/ML Portfolio

## Build Goal
Ship a polished, interactive, NotebookLM-style portfolio website that feels like a product workspace and showcases projects as technical notebooks.

## Build Philosophy
- Build the shell first
- Make one notebook page excellent before scaling
- Reuse a single strong project template
- Keep interactivity meaningful and limited
- Avoid fake complexity

## Suggested Stack
- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion for subtle motion
- Lucide icons
- Static JSON or TypeScript content files for seeded data

## Directory Recommendation
- app/
- components/
- data/
- lib/
- public/
- styles/

## Phase 1 — Foundation
### Goal
Set up the app shell and design system.

### Tasks
- initialize Next.js project
- configure Tailwind CSS
- set typography and color tokens
- implement light and dark mode
- build base layout
- build top bar
- build left sidebar
- build right metadata panel shell
- define spacing, card, and panel styles

### Deliverable
A functional shell with placeholder content and responsive navigation.

## Phase 2 — Data Model
### Goal
Create a reusable structured content model for project notebooks.

### Tasks
Define project schema with fields such as:
- slug
- title
- category
- summary
- role
- timeframe
- stack
- top metrics
- quick facts
- problem
- approach
- architecture blocks
- results
- artifacts
- lessons
- links
- preset questions

### Deliverable
A seeded local data source for all initial projects.

## Phase 3 — Homepage
### Goal
Build the notebook-style homepage.

### Tasks
- create positioning hero
- add project category filters
- add featured notebook cards
- add quick introduction section
- add CTA row for resume / GitHub / contact
- add “start here” guided exploration section

### Deliverable
A homepage that feels like a workspace entry point rather than a brochure.

## Phase 4 — Project Notebook Experience
### Goal
Build the main interactive notebook page pattern.

### Tasks
- create notebook layout with left / center / right structure
- add project selector navigation
- build notebook header
- build tab system or section navigation
- build project content renderer
- build metadata panel
- build preset question chips

### Deliverable
A fully functional notebook page for at least one flagship project.

## Phase 5 — Interactive Components
### Goal
Add the interactions that create a high-quality UX.

### Tasks
- interactive architecture blocks
- metrics drawer
- artifact gallery / output panel
- view toggle: executive vs technical
- smooth in-page navigation from question chips
- hover and active states

### Deliverable
An experience that feels inspectable and dynamic without being bloated.

## Phase 6 — Content Population
### Goal
Populate the portfolio with real content from resume and projects.

### Priority Order
1. KeyMail
2. NASA / LUMIN
3. UNC Radiation Oncology
4. DoD edge ML
5. HavenSmart RAG chatbot
6. LeapGPT

### Tasks
For each project:
- write summary
- write problem statement
- write architecture breakdown
- define realistic metrics
- create quick facts
- define artifacts and links
- write lessons learned
- create preset questions

### Deliverable
A content-rich portfolio with consistent project depth.

## Phase 7 — Supporting Pages
### Goal
Build supporting non-notebook pages.

### Pages
- About
- Resume
- Contact

### Tasks
- create polished resume page
- add experience timeline
- add skills and strengths layout
- add clean contact page with links and CTA

### Deliverable
A complete portfolio structure around the notebook experience.

## Phase 8 — UX Polish
### Goal
Refine the experience.

### Tasks
- improve animation timing
- refine spacing and visual hierarchy
- improve empty states
- improve mobile responsiveness
- ensure accessibility and keyboard navigation
- tighten copy
- test navigation flow for recruiter and technical interviewer use cases

### Deliverable
A polished production-quality feel.

## Core Components
- AppShell
- TopBar
- SidebarNav
- ProjectFilterBar
- NotebookCard
- NotebookLayout
- NotebookHeader
- QuestionChips
- SectionTabs
- MetadataPanel
- ArchitectureExplorer
- MetricsDrawer
- ArtifactGallery
- ViewModeToggle
- ResumeTimeline
- ContactPanel

## Data Structures
### Project
- id
- slug
- title
- category
- summary
- role
- dates
- tags
- stack
- topMetrics
- quickFacts
- sections
- architecture
- artifacts
- links
- questions

### Architecture Block
- id
- title
- description
- tools
- details

### Metric
- label
- value
- context

### Artifact
- type
- title
- description
- image or link

## MVP Acceptance Criteria
- homepage communicates identity immediately
- users can browse and open project notebooks smoothly
- each flagship project has a strong structured notebook
- architecture interaction works clearly
- question chips provide useful navigation
- metadata panel is informative but lightweight
- resume and contact are accessible within one click
- dark mode works
- site is responsive and polished

## Nice-to-Have After MVP
- command palette search
- ask-this-project assistant
- richer transitions
- notebook notes section backed by markdown files
- interactive benchmark comparison panel

## Build Order Recommendation for Claude / Cursor
1. scaffold app and design system
2. build shell
3. create seeded data model
4. build homepage
5. build notebook view
6. complete one flagship project notebook
7. generalize template to remaining projects
8. build supporting pages
9. polish and optimize

## Common Failure Modes To Avoid
- building too many pages before nailing the notebook experience
- adding unnecessary dashboards
- overusing gradients and motion
- making the page feel like a blog instead of a product
- stuffing too much text above the fold