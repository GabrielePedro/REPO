
#!/usr/bin/env bash
set -euo pipefail

# Search for inline style attributes in HTML files and report them.
echo 'Checking for inline styles (style=") in HTML files...'

# Only search HTML files to avoid false positives in scripts or templates
matches=$(grep -RIn --exclude-dir=node_modules --exclude='*.min.*' --include='*.html' 'style="' . || true)

if [ -z "$matches" ]; then
	echo "No inline style attributes found."
	exit 0
else
	echo "Inline style attributes found:" >&2
	echo "$matches" >&2
	exit 1
fi
