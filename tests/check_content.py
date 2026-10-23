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
