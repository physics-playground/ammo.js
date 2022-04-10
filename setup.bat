@echo off

setlocal EnableDelayedExpansion
    set _emsdk_local=%~dp0build\emsdk
    set _emsdk=%_emsdk_local%\emsdk.bat

    if not exist "%_emsdk_local%" (
        git clone "https://github.com/emscripten-core/emsdk.git" "%_emsdk_local%"
        call "%_emsdk%" install latest
    )

    call "%_emsdk%" install mingw-4.6.2-32bit
    call "%_emsdk%" activate mingw-4.6.2-32bit

    call "%_emsdk%" activate latest

    git -C "%_emsdk_local%" pull
endlocal & (
    set "EMSDK_LOCAL=%_emsdk_local%"
)

call "%EMSDK_LOCAL%\emsdk_env.bat"
