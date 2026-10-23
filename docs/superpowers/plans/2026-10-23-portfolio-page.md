# Teacher Tools Portfolio Page Implementation Plan

> **For agentic workers:** Implement this plan task-by-task: dispatch `spec-task-executor` per task followed by `spec-task-reviewer`, or execute inline with checkpoints between batches. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A single-page interactive portfolio of Adam's teacher-facing AI tools, framed as the NAIS AI Vanguard problem of practice, live at a public URL before the application is submitted tonight (2026-10-23).

**Architecture:** One static `index.html` (inline CSS and JS, no build step) renders cards from a data file `tools.js` built from `inventory.md`. A category filter (segmented control) narrows the grid; a card opens a native `<dialog>` with the full entry (problem, what it does, evidence, what failed or was removed). A static SVG shows the pipeline. Hosted on GitHub Pages from a new public repo.

**Tech Stack:** HTML, CSS custom properties, vanilla JS (ES2020), native `<dialog>`, inline SVG, Google Fonts (Nunito Sans, JetBrains Mono), Python 3 for the content test, `gh` CLI for hosting. No frameworks, no npm.

**Model roster:** orchestrator = this session (never spawned) · reviewer = `opus` at `medium` · implementer default = `sonnet` at `medium` (`high` for harder or longer tasks) · transcription-grade tasks = `haiku` at `medium` · `fable` only for a sub-orchestrator or an evaluator over other models' outputs (Fable sessions only; never a worker). Per-task overrides are on each task's `**Model:**` line.

## Global Constraints

- Style: `clear-civic` (`~/projects/knowledge-base/design/styles/clear-civic.md`) plus `_shared.md`. Light palette: bg #F4EEE6, surface #FFFCF8, border #E3D8CB, text #1C2433, text-2 #5E6370, primary #1F6FA3 (label #FFFFFF), primary-text #1A5F8C, tint #DDEBF5, secondary #3F7A62. Dark: bg #102638, surface #17324A, border #2A4A66, text #F3EEE6, text-2 #AFC0CF, primary #E8833A (label #102638), primary-text #F09A55, tint #3A3328, secondary #E9C85B.
- Type: Nunito Sans body 16px; headline 700 under a tracked UPPERCASE eyebrow (12px/700, letter-spacing .12em, primary-text). Numbers in JetBrains Mono with `font-variant-numeric: tabular-nums`.
- Shape: radius 4 everywhere; cards carry a 6px top colour band (primary = tool set, secondary = mindset / non-use) and `0 1px 3px rgba(0,0,0,.12)` shadow. Buttons 48px tall. Focus-visible: 2px ring + 2px offset.
- Motion: none by default. One staggered entrance on the hero only (rise 12px + fade, 200ms, cubic-bezier(.2,.8,.2,1)), fully disabled under `prefers-reduced-motion`.
- Clicking the filter never moves the controls beside it: filter labels reserve bold width; the count badge has `min-width: 3ch`.
- Phone width works at 360px with 16px gutters and no horizontal scroll.
- No student data, student names, gradebook output, or class-list files anywhere in the repo. No screenshots of real class lists.
- No em dashes in any file. No hype words (transform, revolutionary, leverage, empower).
- Content source of truth: `~/projects/tool-portfolio/inventory.md` sections 0 to 2. Do not invent numbers; every number in `tools.js` must appear in `inventory.md`.
- Commit after every task. Repo: `~/projects/tool-portfolio` (git init in Task 1). Never commit `application/` (it holds the application draft; add to `.gitignore`).
- Searches in this repo are run on named files, never recursively from a directory (the student-data guard hook blocks recursive greps on this account).

---

## File structure

```
~/projects/tool-portfolio/
  .gitignore            application/, .DS_Store
  .design-style         clear-civic (exists)
  inventory.md          source content (exists)
  index.html            the page: markup, CSS, JS
  tools.js              window.TOOLS = [...]  (content only)
  assets/pipeline.svg   hand-authored pipeline diagram
  assets/shots/         optional screenshots (Task 5)
  tests/check_content.py  content and hygiene test, run with python3 -I
  docs/superpowers/plans/ this plan
```

---

### Task 1: Repo scaffold and content data

**Files:**
- Create: `.gitignore`, `tools.js`, `tests/check_content.py`
- Read: `inventory.md`

**Model:** `sonnet`, effort `high`: 4b, content authoring from a source document with judgment on phrasing, 3 files. Reviewer: `opus`, effort `medium`.

**Interfaces:**
- Produces: `window.TOOLS`, an array of objects with this exact shape, consumed by Task 2:

```js
{
  id: "printfit",                    // kebab-case, unique
  name: "printfit",
  tier: "A",                         // "A" | "B"
  category: "check",                 // "produce" | "check" | "distribute" | "organize" | "remember"
  dimension: "toolset",              // "toolset" | "mindset" | "skillset"
  aiRole: "checks",                  // "drafts" | "checks" | "none"  (none = AI deliberately kept out)
  tagline: "Print checks for HTML worksheets, measured the way Chrome prints them.",
  removes: "Printing a draft, finding a figure doubled in height ...",
  does: "Renders the page as Chrome prints it, measures it, ...",
  evidence: ["Daily use; a hard gate on every printable.", "Public repo, MIT, CI green, 24 commits."],
  failed: "The 2026-09-15 free-fall sheet shrank SVG axis labels to 6.1px against 13.33px body text; invisible on screen, caught by the 7px floor.",
  links: [{ label: "GitHub", href: "https://github.com/adamcelove/printfit" }],
  media: null                        // or { src: "assets/shots/printfit.png", alt: "..." }
}
```

- [ ] **Step 1: Init the repo and ignore the application folder**

```bash
cd ~/projects/tool-portfolio && git init -b main
printf 'application/\n.DS_Store\n' > .gitignore
git add .gitignore .design-style inventory.md docs && git commit -m "chore: scaffold tool-portfolio"
```

- [ ] **Step 2: Write the failing content test**

`tests/check_content.py`:

```python
"""Content and hygiene checks for tools.js. Run: python3 -I tests/check_content.py"""
import json, re, sys, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = (ROOT / "tools.js").read_text()
INVENTORY = (ROOT / "inventory.md").read_text()
REQUIRED = {"id", "name", "tier", "category", "dimension", "aiRole", "tagline",
            "removes", "does", "evidence", "failed", "links", "media"}
CATS = {"produce", "check", "distribute", "organize", "remember"}
BANNED = ["—", "transform", "revolutionary", "leverage", "empower"]

def load():
    m = re.search(r"window\.TOOLS\s*=\s*(\[.*\]);?\s*$", SRC, re.S)
    assert m, "tools.js must assign window.TOOLS = [...]"
    return json.loads(m.group(1))

def main():
    tools = load()
    ids = [t["id"] for t in tools]
    assert len(ids) == len(set(ids)), f"duplicate ids: {ids}"
    a = [t for t in tools if t["tier"] == "A"]
    assert len(a) == 10, f"expected 10 tier-A entries, got {len(a)}"
    for t in tools:
        missing = REQUIRED - set(t)
        assert not missing, f"{t.get('id')}: missing {missing}"
        assert t["category"] in CATS, f"{t['id']}: bad category {t['category']}"
        assert t["dimension"] in {"toolset", "mindset", "skillset"}
        assert t["aiRole"] in {"drafts", "checks", "none"}
        assert isinstance(t["evidence"], list) and t["evidence"], f"{t['id']}: evidence empty"
        for n in re.findall(r"\b\d[\d,]*\b", t["removes"] + t["does"] + " ".join(t["evidence"]) + t["failed"]):
            assert n in INVENTORY, f"{t['id']}: number {n} not in inventory.md"
    low = SRC.lower()
    for b in BANNED:
        assert b not in low, f"banned token {b!r} in tools.js"
    assert any(t["aiRole"] == "none" for t in tools), "need at least one intentional non-use entry"
    print(f"ok: {len(tools)} tools, {len(a)} tier A")

if __name__ == "__main__":
    main()
```

- [ ] **Step 3: Run it to verify it fails**

Run: `cd ~/projects/tool-portfolio && python3 -I tests/check_content.py`
Expected: FAIL with `FileNotFoundError` for tools.js.

- [ ] **Step 4: Write tools.js from inventory.md**

Ten tier-A entries, in this order and with these ids and fields (fill `removes`, `does`, `evidence`, `failed` from the matching inventory row; keep each under 60 words):

| id | category | dimension | aiRole |
|---|---|---|---|
| printfit | check | toolset | checks |
| workspace-sizing | produce | toolset | drafts |
| answer-key-toggle | produce | toolset | drafts |
| lab-group-mixer | organize | mindset | none |
| class-site | distribute | toolset | drafts |
| diagram-tooling | produce | toolset | drafts |
| question-bank | produce | toolset | checks |
| blackbaud-cli | distribute | toolset | none |
| knowledge-base | remember | skillset | drafts |
| memory-serving | remember | skillset | checks |

Tier B entries (tier "B", `failed` may be an empty string, `evidence` one item): physics-doc-kit (distribute), overnight-loops (produce), review-desk (check), loop-deck (organize), reviewer-agents (check, aiRole checks), kb-scripts (produce), teacher-ai-kit (remember, skillset), materials-library (organize). Omit the OMR scorer (source missing) and worksheet-editor.

The `failed` field for a tier-A entry is its "what failed or was removed" story: printfit = the shrunken axis labels; answer-key-toggle = the retired edit mode; knowledge-base = Cycle 17 drift and the preflight guard; lab-group-mixer = "AI was considered and rejected: grouping is a relationship decision, and the class list never leaves the machine"; blackbaud-cli = the gradebook commands are blocked on the AI account by the student-data guard. Where the inventory gives none, write the honest limitation (diagram-tooling: figure-lib is in design, only diagram-bench and svgarrow work today).

Links: printfit and physics-doc-kit to their GitHub repos; everything else `links: []`. All `media: null` (Task 5 fills in any screenshots).

File starts with `// Content for index.html. Edit here, not in the page.` and ends with `];` after `window.TOOLS = [`. The array must be valid JSON (double quotes, no trailing commas, no comments inside).

- [ ] **Step 5: Run the test to verify it passes**

Run: `python3 -I tests/check_content.py`
Expected: `ok: 18 tools, 10 tier A`

- [ ] **Step 6: Commit**

```bash
git add tools.js tests/check_content.py && git commit -m "feat: tool content data and content test"
```

---

### Task 2: Page shell, cards, filter, and detail dialog

**Files:**
- Create: `index.html`
- Read: `tools.js` (Task 1), `~/projects/knowledge-base/design/styles/clear-civic.md`, `_shared.md`, `components/card.md`, `components/segmented-control.md`, `components/modal.md`, `components/skip-link.md`, `components/hero.md`

**Model:** `sonnet`, effort `high`: 4b, new UI logic with a design standard to meet, one large file. Reviewer: `opus`, effort `medium`.

**Interfaces:**
- Consumes: `window.TOOLS` (Task 1 shape).
- Produces: `index.html` with ids `#hero`, `#tools`, `#filter` (segmented control), `#grid`, `#detail` (dialog), `#nonuse`, `#pipeline`, `#supporting`, `#about`. Task 3 inserts the SVG into `#pipeline .figure`; Task 4 tests use these ids.

- [ ] **Step 1: Write the smoke test**

Append to `tests/check_content.py`, before `if __name__`:

```python
def check_page():
    html = (ROOT / "index.html").read_text()
    for anchor in ["#hero", "#tools", "#filter", "#grid", "#detail", "#nonuse", "#pipeline", "#supporting", "#about"]:
        assert f'id="{anchor[1:]}"' in html, f"missing {anchor}"
    assert "prefers-reduced-motion" in html, "no reduced-motion path"
    assert "prefers-color-scheme: dark" in html, "no dark palette"
    assert 'src="tools.js"' in html
    assert "—" not in html, "em dash in index.html"
    assert '<a class="skip" href="#tools">' in html, "skip link missing"
    print("ok: page anchors")
```

and call `check_page()` from `main()` after the tools checks.

- [ ] **Step 2: Run it to verify it fails**

Run: `python3 -I tests/check_content.py`
Expected: FAIL with `FileNotFoundError` for index.html.

- [ ] **Step 3: Write index.html**

Structure, top to bottom. Copy the CSS tokens from Global Constraints verbatim.

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Teacher Tools, Checked</title>
<meta name="description" content="Adam Love's teacher-facing AI tools: what each one takes off a physics teacher's desk, how its output is checked, and where AI is deliberately kept out.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;700;800&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
<style>
:root{--bg:#F4EEE6;--surface:#FFFCF8;--border:#E3D8CB;--text:#1C2433;--text2:#5E6370;--primary:#1F6FA3;--on-primary:#FFFFFF;--primary-text:#1A5F8C;--tint:#DDEBF5;--secondary:#3F7A62;--radius:4px;--shadow:0 1px 3px rgba(0,0,0,.12)}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){--bg:#102638;--surface:#17324A;--border:#2A4A66;--text:#F3EEE6;--text2:#AFC0CF;--primary:#E8833A;--on-primary:#102638;--primary-text:#F09A55;--tint:#3A3328;--secondary:#E9C85B}}
:root[data-theme="dark"]{--bg:#102638;--surface:#17324A;--border:#2A4A66;--text:#F3EEE6;--text2:#AFC0CF;--primary:#E8833A;--on-primary:#102638;--primary-text:#F09A55;--tint:#3A3328;--secondary:#E9C85B}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text);font:16px/1.55 "Nunito Sans",system-ui,sans-serif}
.wrap{max-width:1080px;margin:0 auto;padding:0 16px}
.skip{position:absolute;left:-999px;top:8px;background:var(--primary);color:var(--on-primary);padding:12px 16px;border-radius:var(--radius)}
.skip:focus{left:16px;z-index:10}
.eyebrow{font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--primary-text);margin:0 0 8px}
h1,h2,h3{line-height:1.15;margin:0 0 12px}
h1{font-size:clamp(28px,5vw,44px);font-weight:800}
h2{font-size:28px;font-weight:700}
.num{font-family:"JetBrains Mono",monospace;font-variant-numeric:tabular-nums}
nav.bar{background:var(--text);color:var(--bg);padding:12px 0}
nav.bar .wrap{display:flex;gap:16px;align-items:center;flex-wrap:wrap}
nav.bar a{color:inherit;text-decoration:none;padding:8px 12px;border-radius:var(--radius)}
nav.bar a[aria-current="true"]{background:rgba(255,255,255,.15)}
.btn{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:0 20px;border-radius:var(--radius);font-weight:700;font-size:16px;text-decoration:none;border:2px solid transparent;cursor:pointer;background:var(--primary);color:var(--on-primary)}
.btn.secondary{background:transparent;border-color:var(--primary-text);color:var(--primary-text)}
.btn:hover{filter:brightness(.92)}
:where(a,button,[tabindex]):focus-visible{outline:2px solid var(--secondary);outline-offset:2px}
.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:24px;margin:32px 0}
.stat{background:var(--surface);border:1px solid var(--border);border-top:6px solid var(--primary);border-radius:var(--radius);padding:16px;box-shadow:var(--shadow)}
.stat .num{font-size:36px;font-weight:700;display:block}
.seg{display:inline-flex;border:2px solid var(--text);border-radius:var(--radius);overflow:hidden;flex-wrap:wrap}
.seg button{min-height:48px;padding:0 16px;border:0;background:var(--surface);color:var(--text);font:inherit;cursor:pointer;display:grid}
.seg button>span{grid-area:1/1}
.seg button>span.ghost{font-weight:700;visibility:hidden}
.seg button[aria-pressed="true"]{background:var(--primary);color:var(--on-primary);font-weight:700}
.count{display:inline-block;min-width:3ch;text-align:right}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:24px;margin-top:24px}
.card{background:var(--surface);border:1px solid var(--border);border-top:6px solid var(--primary);border-radius:var(--radius);box-shadow:var(--shadow);padding:16px;text-align:left;font:inherit;color:inherit;cursor:pointer;display:flex;flex-direction:column;gap:8px}
.card[data-dimension="mindset"]{border-top-color:var(--secondary)}
.card:hover{filter:brightness(.97)}
.card h3{font-size:20px;margin:0}
.card .tag{font-size:13px;color:var(--text2)}
.card[hidden]{display:none}
dialog{border:1px solid var(--border);border-radius:var(--radius);background:var(--surface);color:var(--text);max-width:720px;width:calc(100% - 32px);padding:24px;box-shadow:0 8px 18px rgba(0,0,0,.2)}
dialog::backdrop{background:rgba(16,38,56,.55)}
dialog h4{margin:16px 0 4px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:var(--primary-text)}
dialog ul{margin:0;padding-left:20px}
section{padding:48px 0}
.list{display:grid;gap:12px;padding:0;margin:0}
.list li{list-style:none;padding:12px 16px;background:var(--surface);border:1px solid var(--border);border-left:6px solid var(--primary);border-radius:var(--radius)}
.figure svg{width:100%;height:auto}
@media (prefers-reduced-motion: no-preference){.rise{animation:rise 200ms cubic-bezier(.2,.8,.2,1) both}.rise:nth-child(2){animation-delay:45ms}.rise:nth-child(3){animation-delay:90ms}}
@keyframes rise{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
</style>
</head>
<body>
<a class="skip" href="#tools">Skip to the tools</a>
<nav class="bar" aria-label="Sections"><div class="wrap">
  <strong>Adam Love</strong>
  <a href="#tools">Tools</a><a href="#nonuse">Where AI is kept out</a><a href="#pipeline">How it fits together</a><a href="#about">About</a>
</div></nav>

<header id="hero" class="wrap" style="padding:56px 16px 24px">
  <p class="eyebrow rise">Problem of practice · tool set with a mindset edge</p>
  <h1 class="rise">Teachers lose hours to steps that are necessary, tedious, and involve no student.</h1>
  <p class="rise" style="font-size:20px;max-width:60ch">AI can take those steps. It earns that only behind deterministic checks, with the teacher keeping every judgment that touches a student. These are the tools I built and use every week in two physics courses.</p>
  <p><a class="btn" href="#tools">See the tools</a> <a class="btn secondary" href="#nonuse">Where AI is kept out</a></p>
  <div class="stats" aria-label="Three numbers">
    <div class="stat"><span class="num">495</span>wiki pages serving every session</div>
    <div class="stat"><span class="num">306</span>standards every practice item is tagged to</div>
    <div class="stat"><span class="num">2</span>public repos for other physics teachers</div>
  </div>
</header>

<section id="tools" class="wrap">
  <p class="eyebrow">The tools</p>
  <h2>What each one takes off the desk</h2>
  <div id="filter" class="seg" role="group" aria-label="Filter by what the tool does"></div>
  <p class="tag"><span class="count num" id="count"></span> shown. Select a card for the full story, including what failed.</p>
  <div id="grid" class="grid"></div>
</section>

<dialog id="detail" aria-labelledby="detail-title">
  <p class="eyebrow" id="detail-eyebrow"></p>
  <h3 id="detail-title" style="font-size:26px"></h3>
  <div id="detail-body"></div>
  <p style="margin-top:24px"><button class="btn secondary" id="detail-close" type="button">Close</button></p>
</dialog>

<section id="nonuse" class="wrap">
  <p class="eyebrow">Mindset</p>
  <h2>Where AI is kept out, on purpose</h2>
  <ul class="list">
    <li><strong>Grouping students.</strong> The Lab Group Mixer uses no AI and no network. Names are hashed to IDs; the only name file never leaves the machine.</li>
    <li><strong>Student data.</strong> A hook on the AI account blocks every path that holds student work or grades. Grading stays on a separate account with no AI tools.</li>
    <li><strong>Final judgment on anything a student reads.</strong> Every student-facing document passes a language auditor and a physics reviewer, then me, before it prints.</li>
    <li><strong>Derivation rules in answer keys.</strong> AI drafts; the rules for how a solution is written (symbolic before numbers, derive symmetry, never assert it) are mine and are checked.</li>
  </ul>
</section>

<section id="pipeline" class="wrap">
  <p class="eyebrow">How it fits together</p>
  <h2>From a brief to a printed page</h2>
  <div class="figure"><!-- Task 3 inserts assets/pipeline.svg inline here --></div>
</section>

<section id="supporting" class="wrap">
  <p class="eyebrow">Supporting pieces</p>
  <h2>Behind the headline tools</h2>
  <ul class="list" id="supporting-list"></ul>
</section>

<section id="about" class="wrap">
  <p class="eyebrow">About</p>
  <h2>Adam Love</h2>
  <p style="max-width:60ch">Physics teacher at University School since 2019: General Physics and Honors Physics, grades 10 to 12. Public Forum debate coach. MIT physics. I build these tools with Claude Code and share the ones that travel: <a href="https://github.com/adamcelove/physics-doc-kit">physics-doc-kit</a> and <a href="https://github.com/adamcelove/printfit">printfit</a>.</p>
</section>
<footer class="wrap" style="padding:24px 16px;color:var(--text2);font-size:14px">No student data appears on this page or in its repository.</footer>

<script src="tools.js"></script>
<script>
(function(){
  const CATS=[["all","All"],["produce","Produce"],["check","Check"],["distribute","Distribute"],["organize","Organize"],["remember","Remember"]];
  const AIROLE={drafts:"AI drafts, checks gate it",checks:"AI output is checked here",none:"No AI, by design"};
  const tools=window.TOOLS||[];
  const grid=document.getElementById("grid"), filter=document.getElementById("filter"), count=document.getElementById("count");
  const dlg=document.getElementById("detail");
  let active="all", last=null;
  function esc(s){return String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));}
  function renderFilter(){
    filter.innerHTML=CATS.map(([k,l])=>`<button type="button" data-cat="${k}" aria-pressed="${k===active}"><span>${l}</span><span class="ghost" aria-hidden="true">${l}</span></button>`).join("");
    filter.querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>{active=b.dataset.cat;renderFilter();applyFilter();}));
  }
  function applyFilter(){
    let n=0;
    grid.querySelectorAll(".card").forEach(c=>{const show=active==="all"||c.dataset.category===active;c.hidden=!show;if(show)n++;});
    count.textContent=n;
  }
  function renderGrid(){
    grid.innerHTML=tools.filter(t=>t.tier==="A").map(t=>`<button class="card" type="button" data-id="${t.id}" data-category="${t.category}" data-dimension="${t.dimension}" aria-haspopup="dialog">
      <span class="tag">${esc(t.category)} · ${esc(AIROLE[t.aiRole])}</span><h3>${esc(t.name)}</h3><span>${esc(t.tagline)}</span></button>`).join("");
    grid.querySelectorAll(".card").forEach(c=>c.addEventListener("click",()=>openDetail(c.dataset.id)));
  }
  function renderSupporting(){
    document.getElementById("supporting-list").innerHTML=tools.filter(t=>t.tier==="B").map(t=>`<li><strong>${esc(t.name)}.</strong> ${esc(t.tagline)} ${esc(t.evidence[0]||"")}</li>`).join("");
  }
  function openDetail(id){
    const t=tools.find(x=>x.id===id); if(!t) return;
    last=document.activeElement;
    document.getElementById("detail-eyebrow").textContent=`${t.category} · ${AIROLE[t.aiRole]}`;
    document.getElementById("detail-title").textContent=t.name;
    document.getElementById("detail-body").innerHTML=
      `<h4>The tedious step it removes</h4><p>${esc(t.removes)}</p>`+
      `<h4>What it does</h4><p>${esc(t.does)}</p>`+
      `<h4>Evidence</h4><ul>${t.evidence.map(e=>`<li>${esc(e)}</li>`).join("")}</ul>`+
      (t.failed?`<h4>What failed or was removed</h4><p>${esc(t.failed)}</p>`:"")+
      (t.media?`<img src="${esc(t.media.src)}" alt="${esc(t.media.alt)}" style="width:100%;margin-top:12px;border:1px solid var(--border)">`:"")+
      (t.links.length?`<p>${t.links.map(l=>`<a href="${esc(l.href)}">${esc(l.label)}</a>`).join(" · ")}</p>`:"");
    dlg.showModal();
  }
  document.getElementById("detail-close").addEventListener("click",()=>dlg.close());
  dlg.addEventListener("click",e=>{if(e.target===dlg)dlg.close();});
  dlg.addEventListener("close",()=>{if(last)last.focus();});
  renderFilter(); renderGrid(); renderSupporting(); applyFilter();
})();
</script>
</body>
</html>
```

- [ ] **Step 4: Run the test and open the page**

Run: `python3 -I tests/check_content.py && open index.html`
Expected: `ok: 18 tools, 10 tier A` then `ok: page anchors`; the page opens with 10 cards, the filter narrows them, a card opens the dialog, Escape closes it and focus returns to the card.

- [ ] **Step 5: Check the filter click does not shift neighbours**

Run: `uv run ~/projects/knowledge-base/scripts/ui-change-classify.py ~/projects/tool-portfolio/index.html --click '#filter button[data-cat="check"]' --effect`
Expected: verdict SAFE (paint or composite only). If SHIFTS, the ghost span or the count `min-width` is missing; fix and rerun.

- [ ] **Step 6: Commit**

```bash
git add index.html tests/check_content.py && git commit -m "feat: portfolio page with filter, cards, and detail dialog"
```

---

### Task 3: Pipeline diagram

**Files:**
- Create: `assets/pipeline.svg`
- Modify: `index.html` (`#pipeline .figure` gets the SVG inline)

**Model:** `sonnet`, effort `medium`: 4b, one hand-authored SVG with a fixed spec. Reviewer: `opus`, effort `medium`.

**Interfaces:**
- Consumes: the `.figure` container and the CSS variables from Task 2.
- Produces: an inline `<svg role="img" aria-labelledby="pipe-title">` inside `#pipeline .figure`.

- [ ] **Step 1: Author the SVG**

viewBox `0 0 960 260`, six boxes left to right connected by arrows whose shafts stop at the arrowhead (one `<path>` per arrow with a `marker-end`, never a separate head). Box text 16px Nunito Sans, fill `currentColor`, box stroke `var(--primary)` 2px, radius 4. Boxes, in order: "Brief" → "Draft (Claude Code)" → "Checks: printfit, physics reviewer, language auditor" → "Answer key toggle" → "Print or class site" → "Memory: what changed, why". Under box 3 a secondary-coloured band labelled "Teacher judgment gates here". The SVG must use `<title id="pipe-title">From a brief to a printed page</title>` and have an explicit `height` attribute of 260 and `width` 960 (printfit rule: never height:auto only).

- [ ] **Step 2: Inline it and verify**

Replace the comment in `#pipeline .figure` with the SVG contents. Run `python3 -I tests/check_content.py && open index.html`. Expected: tests pass; the diagram scales to the column at 360px and 1080px widths without clipping, arrowheads touch the next box.

- [ ] **Step 3: Commit**

```bash
git add assets/pipeline.svg index.html && git commit -m "feat: pipeline diagram"
```

---

### Task 4: Hygiene, accessibility, and phone-width review

**Files:**
- Modify: `index.html`, `tools.js` (fixes only)
- Create: `tests/check_hygiene.sh`

**Model:** `sonnet`, effort `medium`: 4b, checks with fixes inside one brief. Reviewer: `opus`, effort `medium` (this reviewer also reads the page as the fresh-eyes design gate).

- [ ] **Step 1: Write the hygiene script**

`tests/check_hygiene.sh` (named files only; no recursive search):

```bash
#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
FILES="index.html tools.js assets/pipeline.svg README.md"
for f in $FILES; do [ -f "$f" ] || continue
  if grep -n -e '—' "$f"; then echo "em dash in $f"; exit 1; fi
done
if grep -niE 'names\.json|gradebook|roster' index.html tools.js; then echo "student-data word on page; reword"; exit 1; fi
if grep -niE '\b(transform|revolutionary|leverage|empower)' index.html tools.js; then echo "hype word"; exit 1; fi
python3 -I tests/check_content.py
echo "hygiene ok"
```

Note: the word "roster" is allowed only inside `inventory.md`; on the page say "class list".

- [ ] **Step 2: Run it and fix every hit**

Run: `bash tests/check_hygiene.sh`
Expected: `hygiene ok`. Fix wording in `tools.js` or `index.html` until it passes.

- [ ] **Step 3: Phone width and contrast**

Run from `~/projects/printfit` (it has Chrome tooling):

```bash
uv run --with playwright python - <<'EOF'
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':360,'height':800})
    pg.goto('file:///Users/alove/projects/tool-portfolio/index.html')
    print('scrollWidth', pg.evaluate('document.documentElement.scrollWidth'))
    pg.screenshot(path='/Users/alove/projects/tool-portfolio/tests/phone.png', full_page=True); b.close()
EOF
```

Expected: `scrollWidth 360`. If larger, find the overflowing element (`.seg` wraps; `.stats` collapses to one column) and fix. If chromium is missing, run `uv run --with playwright python -m playwright install chromium` first. Read `tests/phone.png` and confirm the filter wraps to two rows cleanly and cards stack.

Contrast: primary-text #1A5F8C on bg #F4EEE6 and text2 #5E6370 on surface #FFFCF8 both exceed 4.5:1; dark mode primary-text #F09A55 on #102638 exceeds 4.5:1. Do not introduce any other accent-as-text pairing.

- [ ] **Step 4: Keyboard pass**

Open the page, Tab from the top: skip link appears, nav links, both hero buttons, six filter buttons, ten cards, then section links. Enter on a card opens the dialog with focus inside; Escape closes and returns focus to the card (the `close` listener in Task 2 handles this; verify it).

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "chore: hygiene script, phone-width and keyboard fixes"
```

---

### Task 5: Screenshots (time-boxed, 45 minutes, skip whatever does not fit)

**Files:**
- Create: `assets/shots/printfit-fail.png`, `assets/shots/printfit-pass.png`, `assets/shots/key-toggle.png`, `assets/shots/mixer.png`
- Modify: `tools.js` (`media` fields)

**Model:** `sonnet`, effort `high`: 4b, runs real tools and captures output; judgment on what is safe to show. Reviewer: `opus`, effort `medium` (checks no student data in any image).

- [ ] **Step 1: printfit reports**

Run `cd ~/projects/printfit && uv run printfit check corpus/<a fixture that fails>.html` and the same on the physics-doc-kit example worksheet (`~/projects/physics-doc-kit/examples/`, the one with a passing verdict). Render each text report into an HTML `<pre>` in the clear-civic palette and screenshot it with the Task 4 playwright snippet at 1200px wide. Save as the two printfit PNGs.

- [ ] **Step 2: Answer key toggle**

Open the physics-doc-kit horizontal-launch example worksheet (it has a key), screenshot one problem with the key off and again with `?key` (two playwright screenshots at 700px width). Keep both images; use the key-on one as `key-toggle.png`.

- [ ] **Step 3: Lab Group Mixer with a fake class**

Use a throwaway data folder in the session scratchpad, never the real `data/` folder. Check `lsof -ti:8800` is empty first.

```bash
S=/private/tmp/claude-503/-Users-alove-projects-knowledge-base/62d09165-8c8d-4ff6-99db-e7750d2cc910/scratchpad/mixer-fake
mkdir -p "$S"
printf 'Ada Lovelace\nIsaac Newton\nEmmy Noether\nMarie Curie\nRichard Feynman\nLise Meitner\nChien-Shiung Wu\nJames Maxwell\n' > "$S/fake.txt"
cd ~/projects/lab-group-mixer
uv run mixer --data "$S" import "$S/fake.txt" --class "Demo"
uv run mixer --data "$S" serve --port 8800 --no-open &
```

Screenshot `http://localhost:8800` with playwright at 1200px, then stop the server (`kill %1`).

- [ ] **Step 4: Wire media and verify**

Set `media: {"src": "assets/shots/printfit-fail.png", "alt": "printfit check report listing hard findings with element and fix"}` on printfit, and the matching entries on answer-key-toggle and lab-group-mixer. Run `bash tests/check_hygiene.sh`, open the page, open each of the three dialogs and confirm the image loads. Confirm no real student name appears in any PNG (the fake list above is the only class list used).

- [ ] **Step 5: Commit**

```bash
git add assets/shots tools.js && git commit -m "feat: screenshots for printfit, key toggle, and group mixer"
```

---

### Task 6: Publish to GitHub Pages

**Files:**
- Create: `README.md`
- Gate: Adam confirms the public push in chat before Step 2 runs.

**Model:** `sonnet`, effort `medium`: 4b, CLI steps with a verification. Reviewer: `opus`, effort `medium`.

- [ ] **Step 1: README**

```markdown
# Teacher Tools, Checked

Adam Love's teacher-facing AI tools for a physics classroom: what each removes, how its output is checked, and where AI is kept out. Static page, no build. Open `index.html` or visit the Pages URL in the repo description.

Content lives in `tools.js`. Run `bash tests/check_hygiene.sh` before pushing.
```

- [ ] **Step 2: Create the public repo and push (after Adam's yes)**

```bash
cd ~/projects/tool-portfolio && git add README.md && git commit -m "docs: README"
gh repo create adamcelove/teacher-tools --public --source . --remote origin --push --description "Teacher-facing AI tools, checked: a physics teacher's portfolio"
gh api -X POST repos/adamcelove/teacher-tools/pages -f 'source[branch]=main' -f 'source[path]=/'
```

- [ ] **Step 3: Verify the live page**

Run: `sleep 90; curl -sI https://adamcelove.github.io/teacher-tools/ | head -1`
Expected: `HTTP/2 200`. If 404 after three minutes, run `gh api repos/adamcelove/teacher-tools/pages` and check `status: built`. Open the URL in Chrome, open one card, check dark mode by toggling the OS appearance.

- [ ] **Step 4: Hand the URL back**

Paste `https://adamcelove.github.io/teacher-tools/` into `application/draft-responses.md` wherever `[PORTFOLIO LINK]` appears, and report the URL in chat.

Fallback if Pages is slow: `netlify deploy --prod --dir . --site <new site>` costs 15 credits per production deploy on Adam's plan; use it only if Pages is not live 15 minutes after the push.

---

## Execution notes

- Order: 1 → 2 → 3 → 4 → 5 → 6. Task 5 is the only optional one; if the clock is short, go 4 → 6 and publish with `media: null` everywhere, then add screenshots in a later push.
- Two reviewer bounces on any task move the third attempt one tier up on a fresh subagent (sonnet → opus; opus → opus at high).
- The public push in Task 6 Step 2 is gated on Adam's explicit yes in chat.
- The application draft in `application/` never enters git.
