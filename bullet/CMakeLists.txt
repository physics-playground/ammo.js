cmake_minimum_required(VERSION 3.13 FATAL_ERROR)
set(CMAKE_ALLOW_LOOSE_LOOP_CONSTRUCTS true)

#this line has to appear before 'PROJECT' in order to be able to disable incremental linking
set(MSVC_INCREMENTAL_DEFAULT ON)

project(BULLET_PHYSICS)
set(BULLET_VERSION 2.82)

if(COMMAND cmake_policy)
    cmake_policy(SET CMP0003 NEW)
endif(COMMAND cmake_policy)

if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE "Release")
endif(NOT CMAKE_BUILD_TYPE)

set(CMAKE_CXX_FLAGS_DEBUG "${CMAKE_CXX_FLAGS_DEBUG} -D_DEBUG")
#MESSAGE("CMAKE_CXX_FLAGS_DEBUG="+${CMAKE_CXX_FLAGS_DEBUG})

option(USE_DOUBLE_PRECISION "Use double precision" OFF)
option(USE_GRAPHICAL_BENCHMARK "Use Graphical Benchmark" ON)

option(USE_MSVC_RUNTIME_LIBRARY_DLL "Use MSVC Runtime Library DLL (/MD or /MDd)" OFF)
option(USE_MSVC_INCREMENTAL_LINKING "Use MSVC Incremental Linking" OFF)

option(USE_CUSTOM_VECTOR_MATH "Use custom vectormath library" OFF)

if(USE_CUSTOM_VECTOR_MATH)
    add_definitions(-DUSE_SYSTEM_VECTORMATH)
    if(WIN32)
        set(VECTOR_MATH_INCLUDE ${BULLET_PHYSICS_SOURCE_DIR}/src/vectormath/sse CACHE PATH "Vector Math library include path.")
    else(WIN32)
        set(VECTOR_MATH_INCLUDE ${BULLET_PHYSICS_SOURCE_DIR}/src/vectormath/scalar CACHE PATH "Vector Math library include path.")
    endif(WIN32)
endif(USE_CUSTOM_VECTOR_MATH)

if(APPLE OR MSVC)
    option(BUILD_MULTITHREADING "Use BulletMultiThreading" ON)
else()
    option(BUILD_MULTITHREADING "Use BulletMultiThreading" OFF)
endif()

if(BUILD_MULTITHREADING)
    option(USE_MULTITHREADED_BENCHMARK "Use Multithreaded Benchmark" OFF)
    if(USE_MULTITHREADED_BENCHMARK)
        add_definitions(-DUSE_PARALLEL_SOLVER_BENCHMARK -DUSE_PARALLEL_DISPATCHER_BENCHMARK)
    endif(USE_MULTITHREADED_BENCHMARK)

    if(MSVC OR APPLE)
        option(BUILD_MINICL_OPENCL_DEMOS "Build OpenCL demos for MiniCL (Generic CPU)" ON)
    else()
        option(BUILD_MINICL_OPENCL_DEMOS "Build OpenCL demos for MiniCL (Generic CPU)" OFF)
    endif(MSVC OR APPLE)

    if(MSVC)
        find_path(DIRECTX_SDK_BASE_DIR Include/D3D11.h PATH $ENV{DXSDK_DIR})
        if(DIRECTX_SDK_BASE_DIR)
            option(USE_DX11 "Use DirectX 11" ON)
        else()
            option(USE_DX11 "Use DirectX 11" OFF)
        endif()

        find_path(AMD_OPENCL_BASE_DIR include/CL/cl.h PATH $ENV{ATISTREAMSDKROOT} $ENV{AMDAPPSDKROOT})
        if(AMD_OPENCL_BASE_DIR)
            #AMD adds an extras slash at the end of the ATISTREAMSDKROOT variable
            set(AMD_OPENCL_INCLUDES ${AMD_OPENCL_BASE_DIR}/include)
            message("AMD OPENCL SDK FOUND")
            if(CMAKE_CL_64)
                set(CMAKE_ATISTREAMSDK_LIBPATH ${AMD_OPENCL_BASE_DIR}/lib/x86_64)
            else(CMAKE_CL_64)
                set(CMAKE_ATISTREAMSDK_LIBPATH ${AMD_OPENCL_BASE_DIR}/lib/x86)
            endif(CMAKE_CL_64)
            set(CMAKE_ATISTREAMSDK_LIBRARY ${CMAKE_ATISTREAMSDK_LIBPATH}/OpenCL.lib)
            option(BUILD_AMD_OPENCL_DEMOS "Build OpenCL demos for AMD (GPU or CPU)" ON)
            if(CMAKE_CL_64)
                set(CMAK_GLEW_LIBRARY
                        ${BULLET_PHYSICS_SOURCE_DIR}/Glut/glew64s.lib)
            else(CMAKE_CL_64)
                set(CMAK_GLEW_LIBRARY ${BULLET_PHYSICS_SOURCE_DIR}/Glut/glew32s.lib)
            endif(CMAKE_CL_64)
        else()
            option(BUILD_AMD_OPENCL_DEMOS "Build OpenCL demos for AMD (GPU or CPU)" OFF)
        endif()

        find_path(INTEL_OPENCL_BASE_DIR include/CL/cl.h PATH $ENV{INTELOCLSDKROOT})
        if(INTEL_OPENCL_BASE_DIR)
            set(INTEL_OPENCL_INCLUDES ${INTEL_OPENCL_BASE_DIR}/include)
            message("INTEL OPENCL SDK FOUND")
            message(${INTEL_OPENCL_INCLUDES})
            if(CMAKE_CL_64)
                set(CMAKE_INTELOCLSDK_LIBPATH ${INTEL_OPENCL_BASE_DIR}/lib/x64)
            else(CMAKE_CL_64)
                set(CMAKE_INTELOCLSDK_LIBPATH ${INTEL_OPENCL_BASE_DIR}/lib/x86)
            endif(CMAKE_CL_64)
            set(INTEL_OPENCL_LIBRARIES ${CMAKE_INTELOCLSDK_LIBPATH}/OpenCL.lib)
            option(BUILD_INTEL_OPENCL_DEMOS "Build OpenCL demos for Intel (CPU)" ON)
        else()
            option(BUILD_INTEL_OPENCL_DEMOS "Build OpenCL demos for Intel (CPU)" OFF)
        endif()

        find_path(NVIDIA_OPENCL_BASE_DIR include/CL/cl.h PATH $ENV{CUDA_PATH})
        if(NVIDIA_OPENCL_BASE_DIR)
            set(NVIDIA_OPENCL_INCLUDES ${NVIDIA_OPENCL_BASE_DIR}/include)
            message("NVIDIA OPENCL SDK FOUND")
            message(${NVIDIA_OPENCL_INCLUDES})
            if(CMAKE_CL_64)
                set(CMAKE_NVSDKCOMPUTE_LIBPATH ${NVIDIA_OPENCL_BASE_DIR}/lib/x64)
            else(CMAKE_CL_64)
                set(CMAKE_NVSDKCOMPUTE_LIBPATH ${NVIDIA_OPENCL_BASE_DIR}/lib/Win32)
            endif(CMAKE_CL_64)
            set(NVIDIA_OPENCL_LIBRARIES ${CMAKE_NVSDKCOMPUTE_LIBPATH}/OpenCL.lib)

            option(BUILD_NVIDIA_OPENCL_DEMOS "Build OpenCL demos for NVidia (GPU)" ON)
        else()
            option(BUILD_NVIDIA_OPENCL_DEMOS "Build OpenCL demos for NVidia (GPU)" OFF)
        endif()
    else(MSVC)
        find_path(AMD_OPENCL_BASE_DIR include/CL/cl.h PATH $ENV{ATISTREAMSDKROOT} $ENV{AMDAPPSDKROOT})
        if(AMD_OPENCL_BASE_DIR)
            #AMD adds an extras slash at the end of the ATISTREAMSDKROOT variable
            set(AMD_OPENCL_INCLUDES ${AMD_OPENCL_BASE_DIR}/include)
            message("AMD OPENCL SDK FOUND")
            message(${AMD_OPENCL_INCLUDES})
            if(CMAKE_CL_64)
                set(CMAKE_ATISTREAMSDK_LIBPATH ${AMD_OPENCL_BASE_DIR}/lib/x86_64)
            else(CMAKE_CL_64)
                set(CMAKE_ATISTREAMSDK_LIBPATH ${AMD_OPENCL_BASE_DIR}/lib/x86)
            endif(CMAKE_CL_64)
            option(BUILD_AMD_OPENCL_DEMOS "Build OpenCL demos for AMD (GPU or CPU)" ON)
            set(CMAKE_ATISTREAMSDK_LIBRARY OpenCL)
        else()
            option(BUILD_AMD_OPENCL_DEMOS "Build OpenCL demos for AMD (GPU or CPU)" OFF)
        endif(AMD_OPENCL_BASE_DIR)

        find_path(INTEL_OPENCL_INCLUDES CL/cl.h)
        find_path(INTEL_OPENCL_ICD_CFG intelocl64.icd /etc/OpenCL/vendors)
        find_library(INTEL_OPENCL_LIBRARIES OpenCL PATH /usr/lib64)
        if(INTEL_OPENCL_INCLUDES AND INTEL_OPENCL_LIBRARIES AND INTEL_OPENCL_ICD_CFG)
            message("INTEL OPENCL SDK FOUND")
            message(${INTEL_OPENCL_LIBRARIES})
            option(BUILD_INTEL_OPENCL_DEMOS "Build OpenCL demos for Intel (CPU)" ON)
        else()
            message("INTEL OPENCL NOT FOUND")
            option(BUILD_INTEL_OPENCL_DEMOS "Build OpenCL demos for Intel (CPU)" OFF)
        endif()

        find_path(NVIDIA_OPENCL_INCLUDES CL/cl.h)
        find_path(NVIDIA_OPENCL_ICD_CFG nvidia.icd /etc/OpenCL/vendors)
        find_library(NVIDIA_OPENCL_LIBRARIES OpenCL PATH /usr/lib64 /usr/local/lib)
        if(NVIDIA_OPENCL_INCLUDES AND NVIDIA_OPENCL_LIBRARIES AND NVIDIA_OPENCL_ICD_CFG)
            message("NVidia OPENCL FOUND")
            message(${NVIDIA_OPENCL_LIBRARIES})
            option(BUILD_NVIDIA_OPENCL_DEMOS "Build OpenCL demos for NVidia (GPU)" ON)
        else()
            message("NVidia OPENCL NOT FOUND")
            option(BUILD_NVIDIA_OPENCL_DEMOS "Build OpenCL demos for NVidia (GPU)" OFF)
        endif()
    endif(MSVC)

else(BUILD_MULTITHREADING)
    # 	SET(BUILD_NVIDIA_OPENCL_DEMOS OFF CACHE BOOL "Build OpenCL demos for NVidia" FORCE)
    # 	SET(BUILD_AMD_OPENCL_DEMOS OFF CACHE BOOL "Build OpenCL demos for AMD" FORCE)
    # 	SET(BUILD_INTEL_OPENCL_DEMOS OFF CACHE BOOL "Build OpenCL demos for Intel (CPU)" FORCE)
    # 	SET(BUILD_MINICL_OPENCL_DEMOS  OFF CACHE BOOL "Build OpenCL demos for MiniCL (Generic CPU)" FORCE)
    # 	SET(USE_DX11  OFF CACHE BOOL "Use DirectX 11" FORCE)
    # 	SET(USE_MULTITHREADED_BENCHMARK  OFF CACHE BOOL "Use Multithreaded Benchmark" FORCE)
endif(BUILD_MULTITHREADING)

#SET(CMAKE_EXE_LINKER_FLAGS_INIT    "/STACK:10000000 /INCREMENTAL:NO")
#SET(CMAKE_EXE_LINKER_FLAGS    "/STACK:10000000 /INCREMENTAL:NO")

#MESSAGE("MSVC_INCREMENTAL_YES_FLAG"+${MSVC_INCREMENTAL_YES_FLAG})

if(MSVC)
    if(NOT USE_MSVC_INCREMENTAL_LINKING)
        #MESSAGE("MSVC_INCREMENTAL_DEFAULT"+${MSVC_INCREMENTAL_DEFAULT})
        set(MSVC_INCREMENTAL_YES_FLAG "/INCREMENTAL:NO")

        string(REPLACE "INCREMENTAL:YES" "INCREMENTAL:NO" replacementFlags ${CMAKE_EXE_LINKER_FLAGS_DEBUG})
        set(CMAKE_EXE_LINKER_FLAGS_DEBUG "/INCREMENTAL:NO ${replacementFlags}")
        message("CMAKE_EXE_LINKER_FLAGS_DEBUG=${CMAKE_EXE_LINKER_FLAGS_DEBUG}")

        #		STRING(REPLACE "INCREMENTAL:YES" "INCREMENTAL:NO" replacementFlags2 ${CMAKE_EXE_LINKER_FLAGS})
        #		SET(CMAKE_EXE_LINKER_FLAGS ${replacementFlag2})
        #		STRING(REPLACE "INCREMENTAL:YES" "" replacementFlags3 ${CMAKE_EXTRA_LINK_FLAGS})
        #		SET(CMAKE_EXTRA_LINK_FLAGS ${replacementFlag3})

        string(REPLACE "INCREMENTAL:YES" "INCREMENTAL:NO" replacementFlags3 ${CMAKE_EXE_LINKER_FLAGS_RELWITHDEBINFO})
        set(CMAKE_EXE_LINKER_FLAGS_RELWITHDEBINFO ${replacementFlags3})
        set(CMAKE_EXE_LINKER_FLAGS_RELWITHDEBINFO "/INCREMENTAL:NO ${replacementFlags3}")

    endif(NOT USE_MSVC_INCREMENTAL_LINKING)

    if(NOT USE_MSVC_RUNTIME_LIBRARY_DLL)
        #We statically link to reduce dependancies
        foreach(flag_var CMAKE_CXX_FLAGS CMAKE_CXX_FLAGS_DEBUG CMAKE_CXX_FLAGS_RELEASE CMAKE_CXX_FLAGS_MINSIZEREL CMAKE_CXX_FLAGS_RELWITHDEBINFO)
            if(${flag_var} MATCHES "/MD")
                string(REGEX REPLACE "/MD" "/MT" ${flag_var} "${${flag_var}}")
            endif(${flag_var} MATCHES "/MD")
            if(${flag_var} MATCHES "/MDd")
                string(REGEX REPLACE "/MDd" "/MTd" ${flag_var} "${${flag_var}}")
            endif(${flag_var} MATCHES "/MDd")
        endforeach(flag_var)
    endif(NOT USE_MSVC_RUNTIME_LIBRARY_DLL)

    if(CMAKE_CL_64)
        add_definitions(-D_WIN64)
    else()
        option(USE_MSVC_SSE "Use MSVC /arch:sse option" ON)
        if(USE_MSVC_SSE)
            add_definitions(/arch:SSE)
        endif()
    endif()
endif(MSVC)

if(WIN32)
    option(INTERNAL_CREATE_DISTRIBUTABLE_MSVC_PROJECTFILES "Create MSVC projectfiles that can be distributed" OFF)

    if(INTERNAL_CREATE_DISTRIBUTABLE_MSVC_PROJECTFILES)
        set(LIBRARY_OUTPUT_PATH ${BULLET_PHYSICS_SOURCE_DIR}/lib CACHE PATH "Single output directory for building all libraries.")
        set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${BULLET_PHYSICS_SOURCE_DIR})
        set(CMAKE_RUNTIME_OUTPUT_DIRECTORY_DEBUG ${BULLET_PHYSICS_SOURCE_DIR})
        set(CMAKE_RUNTIME_OUTPUT_DIRECTORY_RELEASE ${BULLET_PHYSICS_SOURCE_DIR})
        set(CMAKE_RUNTIME_OUTPUT_DIRECTORY_MINSIZEREL ${BULLET_PHYSICS_SOURCE_DIR})
        set(CMAKE_RUNTIME_OUTPUT_DIRECTORY_RELWITHDEBINFO ${BULLET_PHYSICS_SOURCE_DIR})
    else()
        set(LIBRARY_OUTPUT_PATH ${CMAKE_BINARY_DIR}/lib CACHE PATH "Single output directory for building all libraries.")
    endif()

    option(INTERNAL_CREATE_MSVC_RELATIVE_PATH_PROJECTFILES "Create MSVC projectfiles with relative paths" OFF)
    option(INTERNAL_ADD_POSTFIX_EXECUTABLE_NAMES "Add MSVC postfix for executable names (_Debug)" OFF)

    set(CMAKE_DEBUG_POSTFIX "_Debug" CACHE STRING "Adds a postfix for debug-built libraries.")
    set(CMAKE_MINSIZEREL_POSTFIX "_MinsizeRel" CACHE STRING "Adds a postfix for MinsizeRelease-built libraries.")
    set(CMAKE_RELWITHDEBINFO_POSTFIX "_RelWithDebugInfo" CACHE STRING "Adds a postfix for ReleaseWithDebug-built libraries.")

    if(INTERNAL_CREATE_MSVC_RELATIVE_PATH_PROJECTFILES)
        set(CMAKE_SUPPRESS_REGENERATION 1)
        set(CMAKE_USE_RELATIVE_PATHS 1)
    endif(INTERNAL_CREATE_MSVC_RELATIVE_PATH_PROJECTFILES)

endif(WIN32)

option(BUILD_CPU_DEMOS "Build original Bullet CPU demos" ON)

option(INTERNAL_UPDATE_SERIALIZATION_STRUCTURES "Internal update serialization structures" OFF)
if(INTERNAL_UPDATE_SERIALIZATION_STRUCTURES)
    add_definitions(-DBT_INTERNAL_UPDATE_SERIALIZATION_STRUCTURES)
endif(INTERNAL_UPDATE_SERIALIZATION_STRUCTURES)

if(USE_DOUBLE_PRECISION)
    add_definitions(-DBT_USE_DOUBLE_PRECISION)
    set(BULLET_DOUBLE_DEF "-DBT_USE_DOUBLE_PRECISION")
endif(USE_DOUBLE_PRECISION)

if(USE_GRAPHICAL_BENCHMARK)
    add_definitions(-DUSE_GRAPHICAL_BENCHMARK)
endif(USE_GRAPHICAL_BENCHMARK)

if(WIN32)
    option(USE_GLUT "Use Glut" ON)
    add_definitions(-D_IRR_STATIC_LIB_)
    add_definitions(-D_CRT_SECURE_NO_WARNINGS)
    add_definitions(-D_CRT_SECURE_NO_DEPRECATE)
    add_definitions(-D_SCL_SECURE_NO_WARNINGS)

    if(USE_GLUT AND MSVC)
        string(REPLACE "/D_WINDOWS" "" CMAKE_CXX_FLAGS ${CMAKE_CXX_FLAGS})
        remove_definitions(-D_WINDOWS)
    endif()

else(WIN32)
    option(USE_GLUT "Use Glut" ON)
endif(WIN32)

if(COMMAND cmake_policy)
    cmake_policy(SET CMP0003 NEW)
endif(COMMAND cmake_policy)

# This is the shortcut to finding GLU, GLUT and OpenGL if they are properly installed on your system
# This should be the case.

find_package(OpenGL)
if(OPENGL_FOUND)
    message("OPENGL FOUND")
    message(${OPENGL_LIBRARIES})
else(OPENGL_FOUND)
    message("OPENGL NOT FOUND")
    set(OPENGL_gl_LIBRARY opengl32)
    set(OPENGL_glu_LIBRARY glu32)
endif(OPENGL_FOUND)

# ADD_DEFINITIONS(-DBT_USE_FREEGLUT)

find_package(GLU)

if(USE_GLUT)
    find_package(GLUT)
    if(GLUT_FOUND)
        message("GLUT FOUND")
        message(${GLUT_glut_LIBRARY})
    else(GLUT_FOUND)
        if(MINGW)
            message("GLUT NOT FOUND not found, trying to use MINGW glut32")
            set(GLUT_glut_LIBRARY glut32)
            #TODO add better GLUT detection for MinGW
            set(GLUT_FOUND TRUE)
        endif(MINGW)
        if(MSVC)
            set(GLUT_FOUND TRUE)
            if(CMAKE_CL_64)
                message("Win64 using Glut/glut64.lib")
                set(GLUT_glut_LIBRARY ${BULLET_PHYSICS_SOURCE_DIR}/Glut/glut64.lib)
            else(CMAKE_CL_64)
                message("Win32 using Glut/glut32.lib")
                set(GLUT_glut_LIBRARY ${BULLET_PHYSICS_SOURCE_DIR}/Glut/glut32.lib)
            endif(CMAKE_CL_64)
            include_directories(${BULLET_PHYSICS_SOURCE_DIR}/Glut)
        else()
            message("GLUT NOT FOUND")
        endif(MSVC)
    endif(GLUT_FOUND)

    if(NOT WIN32)
        # This is added for linux. This should always work if everything is installed and working fine.
        include_directories(/usr/include /usr/local/include)
    endif()
endif(USE_GLUT)

option(BUILD_DEMOS "Set when you want to build the demos" ON)
if(BUILD_DEMOS)
    if(EXISTS ${BULLET_PHYSICS_SOURCE_DIR}/demos AND IS_DIRECTORY ${BULLET_PHYSICS_SOURCE_DIR}/demos)
        subdirs(demos)
    endif()
endif(BUILD_DEMOS)

#  "Demos_ps3")
if(MSVC)
    if(NOT INTERNAL_CREATE_DISTRIBUTABLE_MSVC_PROJECTFILES)
        if(EXISTS ${BULLET_PHYSICS_SOURCE_DIR}/Demos_ps3 AND IS_DIRECTORY ${BULLET_PHYSICS_SOURCE_DIR}/Demos_ps3)
            message("Demos_ps3 found")
            subdirs(Demos_ps3)
        endif()
    endif()
endif(MSVC)

option(BUILD_EXTRAS "Set when you want to build the extras" ON)
if(BUILD_EXTRAS)
    subdirs(extras)
endif(BUILD_EXTRAS)

#Maya Dynamica plugin is moved to http://dynamica.googlecode.com

subdirs(src)

if("${CMAKE_GENERATOR}" MATCHES "Unix Makefiles")
    option(INSTALL_LIBS "Set when you want to install libraries" ON)
else()
    if(APPLE AND FRAMEWORK)
        option(INSTALL_LIBS "Set when you want to install libraries" ON)
    else()
        #by default, don't enable the 'INSTALL' option for Xcode and MSVC projectfiles
        option(INSTALL_LIBS "Set when you want to install libraries" OFF)
    endif()
endif()

if(INSTALL_LIBS)
    set(LIB_SUFFIX "" CACHE STRING "Define suffix of directory name (32/64)")
    set(LIB_DESTINATION "${CMAKE_INSTALL_PREFIX}/lib${LIB_SUFFIX}" CACHE STRING "Library directory name")
    ## the following are directories where stuff will be installed to
    set(INCLUDE_INSTALL_DIR "${CMAKE_INSTALL_PREFIX}/include/bullet/" CACHE PATH "The subdirectory to the header prefix")
    set(PKGCONFIG_INSTALL_PREFIX "${CMAKE_INSTALL_PREFIX}/lib${LIB_SUFFIX}/pkgconfig/" CACHE STRING "Base directory for pkgconfig files")
    if(NOT WIN32)
        configure_file(${CMAKE_CURRENT_SOURCE_DIR}/bullet.pc.cmake ${CMAKE_CURRENT_BINARY_DIR}/bullet.pc @ONLY)
        install(
                FILES
                ${CMAKE_CURRENT_BINARY_DIR}/bullet.pc
                DESTINATION
                ${PKGCONFIG_INSTALL_PREFIX})
    endif(NOT WIN32)
endif(INSTALL_LIBS)

#INSTALL of other files requires CMake 2.6
if(${CMAKE_MAJOR_VERSION}.${CMAKE_MINOR_VERSION} GREATER 2.5)
    option(INSTALL_EXTRA_LIBS "Set when you want extra libraries installed" OFF)
endif(${CMAKE_MAJOR_VERSION}.${CMAKE_MINOR_VERSION} GREATER 2.5)

option(BUILD_UNIT_TESTS "Build Unit Tests" OFF)

if(BUILD_UNIT_TESTS)
    subdirs(UnitTests)
endif()

set(BULLET_CONFIG_CMAKE_PATH lib${LIB_SUFFIX}/cmake/bullet)
list(APPEND BULLET_LIBRARIES LinearMath)
list(APPEND BULLET_LIBRARIES BulletCollisions)
list(APPEND BULLET_LIBRARIES BulletDynamics)
list(APPEND BULLET_LIBRARIES BulletSoftBody)
set(BULLET_USE_FILE ${CMAKE_INSTALL_PREFIX}/${BULLET_CONFIG_CMAKE_PATH}/UseBullet.cmake)
# XXX AMMO Changed CMAKE_SOURCE_DIR to CMAKE_CURRENT_SOURCE_DIR
configure_file(${CMAKE_CURRENT_SOURCE_DIR}/BulletConfig.cmake.in
        ${CMAKE_CURRENT_BINARY_DIR}/BulletConfig.cmake
        @ONLY ESCAPE_QUOTES
        )
# XXX AMMO Changed CMAKE_SOURCE_DIR to CMAKE_CURRENT_SOURCE_DIR
install(FILES ${CMAKE_CURRENT_SOURCE_DIR}/UseBullet.cmake
        ${CMAKE_CURRENT_BINARY_DIR}/BulletConfig.cmake
        DESTINATION ${BULLET_CONFIG_CMAKE_PATH}
        )
