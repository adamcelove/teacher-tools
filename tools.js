// Content for index.html. Edit here, not in the page.
window.TOOLS = [
  {
    "id": "printfit",
    "name": "printfit",
    "tier": "A",
    "category": "check",
    "dimension": "toolset",
    "aiRole": "checks",
    "tagline": "Print checks for HTML worksheets, measured the way Chrome prints them.",
    "removes": "Printing a draft, finding a figure doubled in height or a question split from its work space, editing, and reprinting.",
    "does": "Renders the page as Chrome prints it, measures it, and names the broken element with a fix. The fit command adjusts figure and work-space heights to a page budget.",
    "evidence": [
      "Daily use; a hard gate on every printable.",
      "Public repo, MIT, CI green, 24 commits, 3 experiment forks.",
      "Fit-loop experiment measured about 36 cents per automated layout attempt and is working toward a first-attempt pass rate above 70 %."
    ],
    "failed": "On the 2026-09-15 free-fall sheet, fitting two pages shrank SVG axis labels to 6.1px against 13.33px body text. It was invisible on screen and unreadable on paper; printfit's 7px floor caught it.",
    "links": [
      {
        "label": "GitHub",
        "href": "https://github.com/adamcelove/printfit"
      }
    ],
    "media": null
  },
  {
    "id": "workspace-sizing",
    "name": "Workspace sizing and solved-sheet keys",
    "tier": "A",
    "category": "produce",
    "dimension": "toolset",
    "aiRole": "drafts",
    "tagline": "How much blank space a student needs per problem, and keys that render the same way every time.",
    "removes": "Guessing how much blank space a student needs per problem, and laying out worked solutions by hand.",
    "does": "Encodes 0.30 in per line, three big subquestions per test page, and a free-body-diagram-first forces layout. Keys render as diagram left, work below, graph beside, boxed answer.",
    "evidence": [
      "In use on every Honors sheet since 2026-10-22."
    ],
    "failed": "Still being developed: the Unit 4 builders have uncommitted edits and a key-restyle brief is queued for the overnight run.",
    "links": [],
    "media": null
  },
  {
    "id": "answer-key-toggle",
    "name": "Answer-key toggle",
    "tier": "A",
    "category": "produce",
    "dimension": "toolset",
    "aiRole": "drafts",
    "tagline": "One HTML file holds the blank sheet and its key.",
    "removes": "Maintaining two files, blank and key, that drift apart.",
    "does": "One HTML document. A fixed button or a ?key URL switch flips the key on. Print output is unchanged.",
    "evidence": [
      "Standard on every answer-bearing HTML document."
    ],
    "failed": "The edit mode and Save-to-file halves were retired after measured non-use. Only the toggle survived.",
    "links": [],
    "media": null
  },
  {
    "id": "lab-group-mixer",
    "name": "Lab Group Mixer",
    "tier": "A",
    "category": "organize",
    "dimension": "mindset",
    "aiRole": "none",
    "tagline": "Lab groups of 2 to 4 that rotate partners and spread roles, with no AI and no network.",
    "removes": "Making lab groups of 2 to 4 by hand every lab, rotating partners widely and spreading roles evenly.",
    "does": "A local app on port 8765 with no internet and no AI. Names are replaced by coded IDs, and the only name file is never uploaded.",
    "evidence": [
      "Data files touched on 2026-10-23."
    ],
    "failed": "AI was considered and rejected: grouping is a relationship decision, and the class list never leaves the machine.",
    "links": [],
    "media": null
  },
  {
    "id": "class-site",
    "name": "Class site and the workflows behind it",
    "tier": "A",
    "category": "distribute",
    "dimension": "toolset",
    "aiRole": "drafts",
    "tagline": "Study guides, practice sets, and worksheets posted without hand formatting.",
    "removes": "Writing, formatting, and re-posting study guides, practice sets, and worksheets to a site by hand.",
    "does": "One markdown source per guide, rendered two ways: a MkDocs reader build and a Google-Sites paste build. A queue-driven overnight runner builds pages unattended, and a language auditor strips teacher-facing metadata before handback.",
    "evidence": [
      "Built nightly by the overnight run (logs 10-20, 10-21, 10-22).",
      "139 commits in student-guides."
    ],
    "failed": "Not deployed. The site runs locally on port 8000, and the honors unit site is a spec only.",
    "links": [],
    "media": null
  },
  {
    "id": "diagram-tooling",
    "name": "Diagram tooling",
    "tier": "A",
    "category": "produce",
    "dimension": "toolset",
    "aiRole": "drafts",
    "tagline": "A diagram linter and arrow library that draw vectors to one house style.",
    "removes": "Hand-editing SVG coordinates for every free-body diagram, v-t graph, and interaction diagram.",
    "does": "A diagram linter (diagram-bench) and an arrow library (svgarrow) that draw vectors to one house style, plus a recipe library for lab-tool-style simulations. A data-driven figure library is in design.",
    "evidence": [
      "diagram-bench and svgarrow are the working pieces.",
      "sim-cookbook shipped 2026-06-17."
    ],
    "failed": "figure-lib is in design: it has a spec, decisions, and tests, but no code yet at Milestone 1. Only diagram-bench and svgarrow work today.",
    "links": [],
    "media": null
  },
  {
    "id": "question-bank",
    "name": "Question bank workflows",
    "tier": "A",
    "category": "produce",
    "dimension": "toolset",
    "aiRole": "checks",
    "tagline": "Practice items written, tagged, and audited without doing each by hand.",
    "removes": "Writing, tagging, and quality-checking practice items by hand.",
    "does": "A resumable builder runs one subcategory per run with 10 primary items per standard. Every item is tagged to one of 306 custom standards. An auditor agent re-solves every item and flags bad keys, giveaway distractors, and cueing.",
    "evidence": [
      "14 commits since 2026-10-01; 9 subcategories built.",
      "The standards list is the live taxonomy."
    ],
    "failed": "The standards app itself is dormant, with its last commit on 2026-05-08. Only its list is still in use.",
    "links": [],
    "media": null
  },
  {
    "id": "blackbaud-cli",
    "name": "Blackbaud bb CLI",
    "tier": "A",
    "category": "distribute",
    "dimension": "toolset",
    "aiRole": "none",
    "tagline": "List what is due, create assignments, and stage grades from the terminal.",
    "removes": "Clicking through the LMS to list what is due, create an assignment for two parallel sections, export a class list, or stage grades.",
    "does": "A command-line tool that uses the faculty web session, not the vendor API, which cannot create assignments. Dry run first, created unpublished, one shared assignment per parallel pair.",
    "evidence": [
      "In use.",
      "20 commits, last on 2026-10-21."
    ],
    "failed": "The grade-entry commands are blocked on the AI account by the student-data guard.",
    "links": [],
    "media": null
  },
  {
    "id": "knowledge-base",
    "name": "Knowledge base",
    "tier": "A",
    "category": "remember",
    "dimension": "skillset",
    "aiRole": "drafts",
    "tagline": "A typed wiki that keeps what was learned between sessions.",
    "removes": "Re-researching the same pedagogy and physics questions every time, and losing what was learned between sessions.",
    "does": "A typed wiki with a four-tier mirror that answers most queries at about a quarter of the token cost, an autonomous nightly research and review cycle, and a queue-driven research workflow. Curriculum artifacts are built from cited pages.",
    "evidence": [
      "495 wiki pages, 604 commits.",
      "30+ dream cycles run.",
      "An eval harness measured the mirror design as accuracy per 1k retrieval tokens."
    ],
    "failed": "Cycle 17 lost 15 pages to silent merge drift. That produced a five-detector preflight guard with fixture tests. Mirror maintenance is an ongoing cost.",
    "links": [],
    "media": null
  },
  {
    "id": "memory-serving",
    "name": "Memory serving",
    "tier": "A",
    "category": "remember",
    "dimension": "skillset",
    "aiRole": "checks",
    "tagline": "Classroom conventions and past corrections load at the start of every session.",
    "removes": "Re-explaining classroom conventions, course structure, and hard-won corrections at the start of every AI session.",
    "does": "One fact per file with a why and a how-to-apply, and an index loaded each session. Hooks surface the right rules at the right moment. Deterministic guards deny instead of remind.",
    "evidence": [
      "70+ memory entries in this project alone, most of them corrections that stuck.",
      "The teacher-ai-kit is the no-automation version other teachers can use with any chatbot."
    ],
    "failed": "Memory files need upkeep: a wrong entry keeps being applied until someone removes it, which is why the student-data guard denies the action instead of relying on a reminder.",
    "links": [],
    "media": null
  },
  {
    "id": "physics-doc-kit",
    "name": "Physics Doc Kit",
    "tier": "B",
    "category": "distribute",
    "dimension": "toolset",
    "aiRole": "drafts",
    "tagline": "A public Claude Code plugin that bundles the worksheet, solution-keys, and mathml-html skills, the printfit hook, and the language standards.",
    "removes": "Rebuilding the same document standards for each new sheet.",
    "does": "The distribution vehicle for printfit, workspace sizing, and the answer-key toggle.",
    "evidence": [
      "Public since 2026-10-12."
    ],
    "failed": "",
    "links": [
      {
        "label": "GitHub",
        "href": "https://github.com/adamcelove/physics-doc-kit"
      }
    ],
    "media": null
  },
  {
    "id": "overnight-loops",
    "name": "Overnight loops",
    "tier": "B",
    "category": "produce",
    "dimension": "toolset",
    "aiRole": "drafts",
    "tagline": "Queued build jobs run unattended overnight.",
    "removes": "Running queued build steps by hand.",
    "does": "Chains a one-off brief, the class-site queue, and the printfit layout queue in a single run that keeps the laptop awake. Rows that need the teacher stop and wait.",
    "evidence": [
      "Logs on 2026-10-20, 10-21, and 10-22."
    ],
    "failed": "",
    "links": [],
    "media": null
  },
  {
    "id": "review-desk",
    "name": "Review Desk",
    "tier": "B",
    "category": "check",
    "dimension": "toolset",
    "aiRole": "checks",
    "tagline": "Obsidian cards with dropdowns pre-set to the recommended answer.",
    "removes": "Reading every draft end to end to approve it.",
    "does": "The next session reads only the exceptions. The human-approval step made cheap.",
    "evidence": [
      "The next session reads only the exceptions."
    ],
    "failed": "",
    "links": [],
    "media": null
  },
  {
    "id": "loop-deck",
    "name": "Loop Deck",
    "tier": "B",
    "category": "organize",
    "dimension": "toolset",
    "aiRole": "checks",
    "tagline": "A local panel on port 7717 that schedules which recurring quality pass runs next.",
    "removes": "Remembering which recurring checks are due.",
    "does": "Schedules the next quality pass.",
    "evidence": [
      "Started 2026-09-12."
    ],
    "failed": "",
    "links": [],
    "media": null
  },
  {
    "id": "reviewer-agents",
    "name": "Reviewer agents",
    "tier": "B",
    "category": "check",
    "dimension": "toolset",
    "aiRole": "checks",
    "tagline": "A physics content reviewer, a student-language auditor, and an assessment-item auditor, each read-only.",
    "removes": "Proofreading drafts for the same rule violations.",
    "does": "Each runs before handback and returns a violation list.",
    "evidence": [
      "Three agents, each read-only."
    ],
    "failed": "",
    "links": [],
    "media": null
  },
  {
    "id": "kb-scripts",
    "name": "KB build scripts",
    "tier": "B",
    "category": "produce",
    "dimension": "toolset",
    "aiRole": "drafts",
    "tagline": "Small scripts that turn source data into the school schedule and homework pages.",
    "removes": "Retyping schedules, homework, and readings.",
    "does": "Builds the documents from source data.",
    "evidence": [
      "Hewitt and Giancoli text and equation extractors."
    ],
    "failed": "",
    "links": [],
    "media": null
  },
  {
    "id": "teacher-ai-kit",
    "name": "Teacher AI Memory Kit",
    "tier": "B",
    "category": "remember",
    "dimension": "skillset",
    "aiRole": "drafts",
    "tagline": "A colleague workshop on keeping AI memory in plain files that any chatbot can use.",
    "removes": "Starting every chatbot session from zero.",
    "does": "Teaches a portable memory approach that works with any chatbot.",
    "evidence": [
      "A workshop and starter folder for colleagues."
    ],
    "failed": "",
    "links": [],
    "media": null
  },
  {
    "id": "materials-library",
    "name": "Materials Library",
    "tier": "B",
    "category": "organize",
    "dimension": "toolset",
    "aiRole": "drafts",
    "tagline": "Batch conversion of about 5,000 legacy school files from seven years into searchable form.",
    "removes": "Hunting through old files for past materials.",
    "does": "Converts legacy files into a searchable library.",
    "evidence": [
      "287 commits, last on 2026-10-11."
    ],
    "failed": "",
    "links": [],
    "media": null
  }
];
