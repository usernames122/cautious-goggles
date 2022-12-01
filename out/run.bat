@echo off
:run
timeout /t 2 /nobreak
node index.js
goto run