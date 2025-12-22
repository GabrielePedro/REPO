
#!/usr/bin/env bash
set -euo pipefail

# Search for inline style attributes in HTML files and report them.
echo 'Checking for inline styles (style=") in HTML files...'

# Only search HTML files to avoid false positives in scripts or templates
# Build a list of .html files (POSIX sh compatible)
html_files_list=""
find . -type f -name '*.html' -not -path './node_modules/*' -not -path './.git/*' | while IFS= read -r f; do
	# append filename separated by NUL-like marker (space-safe)
	html_files_list="$html_files_list""$f""\n"
done

matches=""
if [ -n "$html_files_list" ]; then
	# Use grep in a safe loop to avoid passing many args
	echo "$html_files_list" | while IFS= read -r file; do
		if [ -n "$file" ]; then
			res=$(grep -Hn --exclude='*.min.*' 'style="' "$file" || true)
			if [ -n "$res" ]; then
				matches="$matches""$res""\n"
			fi
		fi
	done
fi

if [ -z "$matches" ]; then
	echo "No inline style attributes found."
	exit 0
else
	echo "Inline style attributes found:" >&2
	echo "$matches" >&2
	exit 1
fi
