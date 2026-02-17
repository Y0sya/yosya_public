#!/bin/bash
# Publishes memos from Obsidian vault to the Quartz content directory
# Then commits and pushes to trigger GitHub Actions deployment

VAULT="C:/Users/josep/SynologyDrive/documents_yosya/Obisidian notes/Obsidian Vault"
CONTENT="C:/Users/josep/SynologyDrive/Projects/yosya_public/content"
PROJECT="C:/Users/josep/SynologyDrive/Projects/yosya_public"

echo "Publishing joseph's notes..."

# Clear existing content (except index.md and .gitkeep)
find "$CONTENT" -name "*.md" ! -name "index.md" -delete 2>/dev/null

# Copy files with publish: true from vault to content
# Use grep to find files with "publish: true" in frontmatter
find "$VAULT" -name "*.md" -not -path "*/.obsidian/*" -not -path "*/.site/*" | while read file; do
  if head -20 "$file" | grep -q "publish: true"; then
    filename=$(basename "$file")
    cp "$file" "$CONTENT/$filename"
    echo "  Copied: $filename"
  fi
done

echo "Content synced. Committing and pushing..."

cd "$PROJECT"
git add content/
git commit -m "publish: update memos $(date +%Y-%m-%d)"
git push origin main

echo "Pushed! GitHub Actions will deploy shortly."
