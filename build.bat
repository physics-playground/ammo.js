@echo off

setlocal EnableDelayedExpansion

if not exist "%~dp0build\emsdk\python\3.9.2-nuget_64bit\python.exe" (
    call "%~dp0setup.bat"
)

set EMSDK_PYTHON=%~dp0build\emsdk\python\3.9.2-nuget_64bit\python.exe
set EMSDK_MAKE=%~dp0build\emsdk\mingw\4.6.2_32bit\mingw32-make.exe
set "_emsdk_make=%EMSDK_MAKE:\=/%"

set _root=%~dp0
set "_root=%_root:\=/%"

call "%~dp0build\emsdk\emsdk_env.bat"
echo EMSDK: "%EMSDK%"

set PATH=%~dp0build\emsdk\python\3.9.2-nuget_64bit;%~dp0build\emsdk\mingw\4.6.2_32bit;%PATH%

:: cmake -S "%~dp0/" -B "%~dp0build\emscripten" -G Ninja^
::  -D"CMAKE_MAKE_PROGRAM:PATH=%_emsdk_make%"^
::  -DCMAKE_TOOLCHAIN_FILE="%EMSDK%/upstream/emscripten/cmake/Modules/Platform/Emscripten.cmake"^
::  -DCMAKE_BUILD_TYPE=Release^
::  -DCLOSURE=1 -DTOTAL_MEMORY=268435456 -DALLOW_MEMORY_GROWTH=1

cmake -S "%~dp0/" -B "%~dp0build\emscripten" -G "MinGW Makefiles"^
 -DCMAKE_INSTALL_PREFIX=%_root%/bin^
 -DCMAKE_TOOLCHAIN_FILE="%EMSDK%/upstream/emscripten/cmake/Modules/Platform/Emscripten.cmake"^
 -DCMAKE_BUILD_TYPE=Release^
 -DCLOSURE=1 -DTOTAL_MEMORY=268435456 -DALLOW_MEMORY_GROWTH=1

:: With Makefiles you could call `make` directly e.g., make -C "%~dp0build\emscripten" -j20
cmake --build "%~dp0build\emscripten" --parallel 30

call npm install
call npm test
