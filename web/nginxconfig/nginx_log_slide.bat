@echo off
taskkill /F /IM nginx.exe > nul
cd D:\nginx-1.12.2
rem date格式：Wed 11/02/2016
set today=%date:~,4%_%date:~5,2%_%date:~8,2%
set dir=D:\nginx-1.12.2\logs\%today%
md %dir%
rem access log 
move D:\nginx-1.12.2\logs\access.log %dir%\access.log

start nginx