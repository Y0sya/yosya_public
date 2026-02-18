#!/usr/bin/env node
// Syncs custom CSS from Obsidian vault to Quartz custom.scss
// Run: node sync-css.js

const fs = require("fs")
const path = require("path")

const VAULT_CSS = "C:\\Users\\josep\\SynologyDrive\\documents_yosya\\Obisidian notes\\Obsidian Vault\\.site\\custom.css"
const QUARTZ_CSS = "C:\\Users\\josep\\SynologyDrive\\Projects\\yosya_public\\quartz\\styles\\custom.scss"

if (fs.existsSync(VAULT_CSS)) {
  const vaultCss = fs.readFileSync(VAULT_CSS, "utf-8")
  const scss = `@use "./base.scss";\n\n${vaultCss}`
  fs.writeFileSync(QUARTZ_CSS, scss)
  console.log("✓ CSS synced from vault to Quartz")
  console.log(`  From: ${VAULT_CSS}`)
  console.log(`  To:   ${QUARTZ_CSS}`)
} else {
  console.error(`✗ No custom.css found at:\n  ${VAULT_CSS}`)
  process.exit(1)
}
