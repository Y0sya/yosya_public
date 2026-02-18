#!/bin/bash
# Syncs custom CSS from Obsidian vault to Quartz custom.scss
# Run this before building if you've edited custom.css in the vault.

VAULT_CSS="/c/Users/josep/SynologyDrive/documents_yosya/Obisidian notes/Obsidian Vault/.site/custom.css"
QUARTZ_CSS="/c/Users/josep/SynologyDrive/Projects/yosya_public/quartz/styles/custom.scss"

if [ -f "$VAULT_CSS" ]; then
  echo '@use "./base.scss";' > "$QUARTZ_CSS"
  echo "" >> "$QUARTZ_CSS"
  cat "$VAULT_CSS" >> "$QUARTZ_CSS"
  echo "CSS synced from vault to Quartz"
else
  echo "No custom.css found in vault at $VAULT_CSS"
fi
