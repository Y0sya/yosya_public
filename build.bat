@echo off
echo Building joseph's notes...
cd /d "%~dp0"
npx quartz build --directory "C:/Users/josep/SynologyDrive/documents_yosya/Obisidian notes/Obsidian Vault"
echo Build complete! Output in public/ folder
pause
