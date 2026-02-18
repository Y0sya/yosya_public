#!/usr/bin/env node
// Publishes memos from Obsidian vault to GitHub Pages
// Copies files with "publish: true" to content/ then commits and pushes
// Run: node publish.js

const fs = require("fs")
const path = require("path")
const { execSync } = require("child_process")

const VAULT = "C:\\Users\\josep\\SynologyDrive\\documents_yosya\\Obisidian notes\\Obsidian Vault"
const CONTENT = "C:\\Users\\josep\\SynologyDrive\\Projects\\yosya_public\\content"
const PROJECT = "C:\\Users\\josep\\SynologyDrive\\Projects\\yosya_public"

function run(cmd) {
  console.log(`  > ${cmd}`)
  return execSync(cmd, { cwd: PROJECT, encoding: "utf-8" })
}

function hasPublishTrue(filePath) {
  const content = fs.readFileSync(filePath, "utf-8")
  // Only check inside the YAML frontmatter (between first --- and second ---)
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return false
  return /^publish:\s*true\s*$/m.test(match[1])
}

function getAllMdFiles(dir) {
  const results = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (![".obsidian", ".site", ".trash"].includes(entry.name)) {
        results.push(...getAllMdFiles(fullPath))
      }
    } else if (entry.name.endsWith(".md")) {
      results.push(fullPath)
    }
  }
  return results
}

console.log("Publishing joseph's notes...\n")

// Clear existing content (keep index.md)
const existing = fs.readdirSync(CONTENT).filter(f => f.endsWith(".md") && f !== "index.md")
for (const file of existing) {
  fs.unlinkSync(path.join(CONTENT, file))
}

// Scan vault and copy publishable files
const allFiles = getAllMdFiles(VAULT)
let copied = 0

for (const file of allFiles) {
  if (path.basename(file) === "index.md") continue
  if (hasPublishTrue(file)) {
    const dest = path.join(CONTENT, path.basename(file))
    fs.copyFileSync(file, dest)
    console.log(`  ✓ ${path.basename(file)}`)
    copied++
  }
}

console.log(`\n${copied} memo(s) synced to content/`)

if (copied === 0) {
  console.log("Nothing to publish. Add 'publish: true' to a memo's frontmatter.")
  process.exit(0)
}

// Commit and push
console.log("\nCommitting and pushing...")
try {
  run("git add content/")
  const date = new Date().toISOString().slice(0, 10)
  run(`git commit -m "publish: update memos ${date}"`)
  run("git push origin main")
  console.log("\n✓ Pushed! GitHub Actions will deploy in ~40 seconds.")
  console.log("  https://y0sya.github.io/yosya_public/")
} catch (e) {
  const msg = (e.stdout || "") + (e.stderr || "") + e.message
  if (msg.includes("nothing to commit") || msg.includes("nothing added to commit")) {
    console.log("\n✓ No changes to push (content already up to date).")
  } else {
    console.error("\n✗ Push failed:", msg)
    process.exit(1)
  }
}
