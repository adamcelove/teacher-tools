#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
FILES="index.html tools.js assets/pipeline.svg README.md"
for f in $FILES; do [ -f "$f" ] || continue
  if grep -n -e '—' "$f"; then echo "em dash in $f"; exit 1; fi
done
if grep -niE 'names\.json|gradebook|roster' index.html tools.js; then echo "student-data word on page; reword"; exit 1; fi
if grep -niE '(^|[^-a-zA-Z])(transforms|transformed|transforming|transform([^:a-zA-Z]|$)|revolutionary|leverage|empower)' index.html tools.js; then echo "hype word"; exit 1; fi
python3 -I tests/check_content.py
echo "hygiene ok"
