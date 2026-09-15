@echo off
chcp 65001 >nul
setlocal

set "GIT=C:\Users\Administrator\.workbuddy\binaries\PortableGit\versions\1.2.0\cmd\git.exe"
set "DIR=C:\Users\Administrator\WorkBuddy\2026-09-08-13-04-57\halo-landing"

echo ============================================
echo  推送 yunwan-site 到 GitHub (main 分支)
echo ============================================
echo.

if not exist "%GIT%" (
    echo [错误] 找不到 git: %GIT%
    pause
    exit /b 1
)

cd /d "%DIR%" || (
    echo [错误] 进不去目录: %DIR%
    pause
    exit /b 1
)

echo 当前提交:
"%GIT%" log --oneline -1
echo.
echo 远端:
"%GIT%" remote -v
echo.
echo --------------------------------------------
echo  若弹出浏览器/窗口，请完成 GitHub 登录。
echo  若要求输入密码，请填 Personal Access Token
echo  （不是登录密码）。
echo --------------------------------------------
echo.

"%GIT%" push origin main

echo.
echo ============================================
echo  Exit code: %ERRORLEVEL%
echo  0 = 成功；非 0 请看上方报错
echo ============================================
pause
