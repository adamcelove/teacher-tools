# Teacher-Facing AI Tools: Portfolio Inventory

Draft 2026-10-23. Audience: the 2026-2027 NAIS AI Vanguard Teachers Program application (due 2026-10-23; cohort of up to 20; first Zoom meetup 2026-11-19). Purpose: decide which tools go on the interactive portfolio page, how they group, and what each entry needs before it is presentable. Review this, strike or add, then the HTML page gets built (style: clear-civic).

Organizing thesis: every tool removes a step in producing teaching materials that is necessary, tedious, and involves no student contact. The teacher's time goes back to the parts of the job that do.

## 0. Program fit (NAIS AI Vanguard Teachers, read 2026-10-23)

What the program asks for: a **problem of practice** related to AI and teaching and learning, tied to one or more of **mindset, skill set, tool set**; evidence of driving change in a school; curriculum built with "appropriate use, or intentional non-use, of AI"; interest in thought leadership. Deliverables during the year: one resource (how-to guide, case study, checklist, assessment) and one webinar or 3- to 10-minute video tutorial. Listed trend areas include administrative efficiency and data governance and safety.

**Problem of practice this portfolio answers (tool set, with a mindset edge):** Teachers lose hours to the steps of producing materials that are necessary, tedious, and involve no student. AI can take those steps, but only if its output is held to deterministic checks and the teacher keeps the student-facing judgment. The portfolio is the evidence: every tool either removes a non-student step (produce, distribute, organize) or is a guard that makes AI output trustworthy enough to use (check, remember).

**How each selection criterion maps:**

- *Driving change in schools*: Physics Doc Kit and printfit are public and used by the parallel-section co-teacher; the Teacher AI Memory Kit workshop teaches the memory approach to colleagues; the class site serves two courses.
- *Problem of practice*: the thesis above, with the printfit fit-loop numbers and the dream-cycle drift failure as evidence that it is being measured, not asserted.
- *Appropriate use or intentional non-use*: Lab Group Mixer deliberately uses no AI and hashes student names; student data is blocked from the AI account by a hook; every student-facing document passes a language auditor and a physics reviewer; answer keys are AI-drafted but derivation rules are human-set. Say this explicitly on the page.
- *Thought leadership*: the two public repos, the workshop, and the ready-made year deliverables below.

**Year deliverables the portfolio already seeds:** the resource could be a how-to guide, "Deterministic gates for AI-drafted classroom materials" (printfit + reviewer agents + key toggle), or the Teacher AI Memory Kit as a checklist; the video tutorial could be the 10-minute walk-through of one worksheet going from brief to printed page through the gates.

**Page framing change:** lead with the problem of practice, not the tool list. Categories become the program's own language where it fits: Tool set (produce, check, distribute), Mindset (what AI is kept out of), Skill set (the kit, the workshop). Add a short "intentional non-use" panel.

## 1. Tier A: headline entries (one card each, with a demo or screenshot)

| # | Tool | Tedious step it removes | Status / evidence | Needs before showing |
|---|---|---|---|---|
| A1 | **printfit** (`~/projects/printfit`, public on GitHub) | Printing a draft, finding a figure doubled in height or a question split from its work space, editing, reprinting. Renders the page as Chrome prints it, measures it, names the broken element and a fix; `fit` adjusts figure and work-space heights to a page budget. | In daily use; a hard gate on every printable. Public repo, MIT, CI green, 24 commits, 3 experiment forks (`-corpus`, `-pbr`, `-visual-gates`). Fit-loop experiment measured $0.36 per cell and is working toward a first-attempt pass rate above 70 %. | A before/after screenshot pair (fail report, pass report). The README already has one. |
| A2 | **Workspace sizing + solved-sheet key library** (`workspace-sizing-standard.md`, `build-workspace-sizing-options.py`, `lib/solvedkey.py`, `lib/svgarrow.py`) | Guessing how much blank space a student needs per problem; hand-laying-out worked solutions. Encodes 0.30 in per line, three big subquestions per test page, FBD-first forces layout; keys render as diagram-left, work-below, graph-beside, boxed answer. | In use on every Honors sheet since 2026-10-22; still being developed (uncommitted edits in the Unit 4 builders, overnight key-restyle brief queued). | One worksheet page with sizing annotated; one solved-sheet key page. Decide the public name for "the HTML sizing tool". |
| A3 | **Answer-key toggle** (`scripts/add-edit-mode.py` + key-toggle snippets) | Maintaining two files (blank and key) that drift apart. One HTML document; a fixed button or `?key` URL flips the key on; print is unchanged. | Standard on every answer-bearing HTML. Edit-mode and Save-to-file halves were retired after measured non-use (a good "what we removed" story). | 10-second GIF of the toggle. |
| A4 | **Lab Group Mixer** (`~/projects/lab-group-mixer`) | Making lab groups of 2 to 4 that rotate partners widely and spread roles evenly, by hand, every lab. Local app on port 8765, no internet, no AI; names are HMAC-hashed to IDs and the only name file is gitignored. | Data files touched today (2026-10-23). No git history, so no commit count. | Screenshot with a fake roster. Never the real `names.json`. |
| A5 | **Class site + the workflows that built it** (`~/projects/student-guides`, 139 commits; `~/projects/honors-physics-site`, spec only) | Writing, formatting, and re-posting study guides, practice sets, and worksheets to a site by hand. One markdown source per guide; two renderings (MkDocs reader build, Google-Sites paste build); a QUEUE-driven overnight runner builds pages unattended; `student-language-auditor` strips teacher-facing metadata before handback. | Built nightly by `~/projects/overnight/tonight.sh` (logs 10-20, 10-21, 10-22). Not deployed; runs locally on port 8000. | Decide whether to show the site itself or the pipeline diagram (source → queue → runner → audit → render). Probably both. |
| A6 | **Diagram tooling** (`figure-lib`, `tools/diagram-bench`, `sim-cookbook`, `anim-cookbook`, `lib/svgarrow.py`) | Hand-editing SVG coordinates for every FBD, v–t graph, and interaction diagram. Figures generated from data to one house style; a diagram linter; a recipe library for lab-tool-style simulations. | `figure-lib` has a spec, decisions, tests, and output but "no code yet" at Milestone 1 per its index; `diagram-bench` and `svgarrow` are the working pieces. `sim-cookbook` shipped 2026-06-17. | Be precise: show diagram-bench + svgarrow as working, figure-lib as in design. Gallery of 6 figures. |
| A7 | **Question bank workflows** (`student-practice-question-bank/` with `spqb-build` and `spqb-diagram-build` skills; `assessment-item-auditor`; `standards-tracker` standards list) | Writing, tagging, and quality-checking practice items by hand. Resumable one-subcategory-per-run builder, 10 primary items per standard, every item tagged to one of 306 custom standards; an auditor agent re-solves every item and flags bad keys, giveaway distractors, and cueing. | 14 commits since 2026-10-01; 9 subcategories built. The standards app itself is dormant (last commit 2026-05-08) but its list is the live taxonomy. | Show one tagged item with its audit result. Note the quiz-generation goal (bank first, quizzes generated). |
| A8 | **Blackbaud `bb` CLI** (`~/projects/blackbaud-dashboard/tools/bb.py`, 20 commits, last 2026-10-21) | Clicking through the LMS to list what is due, create an assignment for two parallel sections, export a roster, or stage grades. Dry run first, created unpublished, one shared assignment per parallel pair. | In use. Uses the faculty web session, not the vendor API (which cannot create assignments). | Show a dry-run transcript with fake names. The gradebook commands are blocked on the personal account; say so. |
| A9 | **Knowledge base** (`~/projects/knowledge-base`: 495 wiki pages, 604 commits; `ai/` mirror; `/dream` cycle; `/research` workflow) | Re-researching the same pedagogy and physics questions every time, and losing what was learned between sessions. A typed wiki (topics, concepts, entities, comparisons, curriculum) with a four-tier `ai/` mirror that answers most queries at about a quarter of the token cost, an autonomous nightly research and review cycle, and a queue-driven fan-out research workflow. Every curriculum artifact is built from cited pages, not from scratch. | 30+ dream cycles run. Cycle 17 lost 15 pages to silent merge drift, which produced the five-detector preflight guard with fixture tests. `ai-mirror-ablation` is a frozen-benchmark eval harness (accuracy per 1k retrieval tokens) that measured the mirror design. Mirror maintenance is an ongoing cost; say so. | Architecture diagram (wiki → mirror → session), one retrieval-log excerpt, the drift-guard story as the "what failed" panel. |
| A10 | **Memory serving** (per-project memory files + `MEMORY.md` index; prompt-time hooks that inject the active design style, the KB-mirror hint, and physics-language rules; `teacher-ai-kit` as the portable version) | Re-explaining classroom conventions, course structure, and hard-won corrections at the start of every AI session. One fact per file with a why and a how-to-apply; an index loaded each session; hooks that surface the right rules at the right moment instead of one giant prompt; deterministic guards (student-data guard, subagent model rules) that deny rather than remind. | 70+ memory entries in this project alone, most of them corrections that stuck (no "backward", F_N not N, blank work space not lines). The teacher-ai-kit is the no-automation version other teachers can use with any chatbot. | Show three memory files side by side (user, feedback, project), one hook firing, and the kit's two-file design. No personal data beyond teaching practice. |

## 2. Tier B: supporting entries (grouped, one line each)

- **Physics Doc Kit** (public Claude Code plugin, 2026-10-12): bundles the worksheet, solution-keys, and mathml-html skills, the printfit hook, and the language standards. The distribution vehicle for A1–A3.
- **Overnight loops** (`~/projects/overnight/tonight.sh`): chains a one-shot brief, the class-site queue, and the printfit fit-loop queue under `caffeinate`; rows that need a human end as `needs-adam`.
- **Review Desk** (`~/projects/review-desk`): Obsidian cards with dropdowns pre-set to the recommended answer; the next session reads only the exceptions. The human-approval step made cheap.
- **Loop Deck** (`~/projects/loop-deck`, 2026-09-12): local panel on port 7717 that schedules which recurring quality pass runs next.
- **Reviewer agents**: `physics-content-reviewer` (language and graph rules), `student-language-auditor`, `assessment-item-auditor`. Each is read-only and runs before handback.
- **KB build scripts** (`knowledge-base/scripts/`): school-schedule builder, homework HTML builder, Hewitt and Giancoli text and equation extractors, Giancoli readings stamper.
- **Teacher AI Memory Kit** (`knowledge-base/teacher-ai-kit`): workshop plus a Drive starter folder teaching other teachers a portable, no-automation AI memory system. Evidence the work transfers.
- **Materials Library** (`~/projects/materials-library`, 287 commits, last 2026-10-11): batch conversion of about 5,000 legacy school files from seven years into searchable form.
- **MC OMR scorer**: scan-to-CSV scorer for the summer final answer sheet. **Source file is missing**: the `scoring/` folder now holds only `__pycache__` and `omr.py` is not in git history. Recover it or drop this entry.

## 3. Left out, and why

- **worksheet-editor** (2 commits, 2026-08-31): browser prose editor that saves back to the original bytes. Clever, but idle since August; include only if you still use it.
- **student-practice platform / redesign, positive-physics**: student-facing, not this portfolio's category.
- **Postround (Debate-Evaluator), pf-research, trading bots, garmin, volcano, ADHD-help, metr-application**: off-category.
- **Grading-system, design-loop, tiptap-prototype**: dormant.

## 4. Open questions for you

0. The application is due today (2026-10-23). The page itself cannot be built and polished in time for a link in the application; the application's problem-of-practice answer can draw on section 0 now, and the page can be the first-year resource. Confirm which you want today.
1. The application form's actual questions: no copy is in any memory folder. Paste them if you want the answers drafted.
2. Name for the sizing tool (A2). Candidates: "Workspace Sizing", "Solved-Sheet Builder", or fold it into printfit as "fit + sizing".
3. Show the OMR scorer? Its source needs recovering first.
4. Do you want worksheet-editor in?
5. Demo medium for each card: static screenshot, short GIF, or a live local link. Live links only work on your machine; for an application, screenshots and GIFs travel.

## 5. Proposed page structure (for the HTML build)

Hero (one-sentence thesis, three numbers: pages checked by printfit, items in the bank, wiki pages serving every session) → filterable card grid by category (Produce / Check / Distribute / Organize / Remember) → one expandable panel per Tier A card (problem, what it does, evidence, what was removed or failed) → Tier B as a compact list → "How these fit together" pipeline diagram → about. Style: clear-civic; reduced-motion default; no student data anywhere on the page.
