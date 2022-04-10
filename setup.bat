@echo off

set EMSDK_LOCAL=%~dp0build\emsdk

setlocal EnableDelayedExpansion
    if not exist "%EMSDK_LOCAL%" (
        git clone "https://github.com/emscripten-core/emsdk.git" "%EMSDK_LOCAL%"
        call "%EMSDK_LOCAL%\emsdk.bat" install latest
    )

    call "%EMSDK_LOCAL%\emsdk.bat" activate latest
    call "%EMSDK_LOCAL%\emsdk_env.bat"

    git -C "%EMSDK_LOCAL%" pull
endlocal

"%EMSDK_LOCAL%\emsdk_env.bat"
