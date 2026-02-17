@echo off
echo Starting watch mode for joseph's notes...
echo Site will auto-rebuild when vault changes
echo Press Ctrl+C to stop
cd /d "%~dp0"
npx quartz build --directory "C:/Users/josep/SynologyDrive/documents_yosya/Obisidian notes/Obsidian Vault" --serve
