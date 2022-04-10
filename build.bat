@echo off

setlocal EnableDelayedExpansion

call "%~dp0setup.bat"
call "%EMSDK_LOCAL%\emsdk\emsdk_env.bat"
echo EMSDK: "%EMSDK%"
set EMSDK_PYTHON=%~dp0build\emsdk\python\3.9.2-nuget_64bit\python.exe

if exist "%~dp0build\emscripten" rmdir /q /s "%~dp0build\emscripten"
cmake -S "%~dp0/" -B "%~dp0build\emscripten"^
 -DCMAKE_TOOLCHAIN_FILE="%EMSDK%/upstream/emscripten/cmake/Modules/Platform/Emscripten.cmake"^
 -DCMAKE_BUILD_TYPE=Release

cmake --build "%~dp0build\emscripten"
