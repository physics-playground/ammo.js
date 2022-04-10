@echo off

setlocal EnableDelayedExpansion

call "%~dp0setup.bat"

cmake -S "%~dp0" -B "%~dp0build\emscripten"^
 -DCMAKE_TOOLCHAIN_FILE=%EMSDK_LOCAL%/cmake/Modules/Platform/Emscripten.cmake^
 -DCMAKE_BUILD_TYPE=Release^
 -DCMAKE_EXE_LINKER_FLAGS="-s NODERAWFS=1 -s WASM=1 -s ALLOW_MEMORY_GROWTH=1"
