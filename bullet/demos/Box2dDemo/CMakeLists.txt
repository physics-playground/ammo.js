# This is basically the overall name of the project in Visual Studio this is the name of the Solution File

# For every executable you have with a main method you should have an add_executable line below.
# For every add executable line you should list every .cpp and .h file you have associated with that executable.

# This is the variable for Windows.  I use this to define the root of my directory structure.
set(GLUT_ROOT ${BULLET_PHYSICS_SOURCE_DIR}/Glut)

# You shouldn't have to modify anything below this line
########################################################

include_directories(
        ${BULLET_PHYSICS_SOURCE_DIR}/src ${BULLET_PHYSICS_SOURCE_DIR}/demos/OpenGL
)

if(USE_GLUT)
    link_libraries(
            OpenGLSupport BulletDynamics BulletCollision LinearMath ${GLUT_glut_LIBRARY} ${OPENGL_gl_LIBRARY} ${OPENGL_glu_LIBRARY}
    )

    if(WIN32)
        add_executable(AppBox2dDemo
                main.cpp
                Box2dDemo.cpp
                Box2dDemo.h
                ${BULLET_PHYSICS_SOURCE_DIR}/build/bullet.rc
                )
    else()
        add_executable(AppBox2dDemo
                main.cpp
                Box2dDemo.cpp
                Box2dDemo.h
                )
    endif()
    if(WIN32)
        if(NOT INTERNAL_CREATE_DISTRIBUTABLE_MSVC_PROJECTFILES)
            if(CMAKE_CL_64)
                add_custom_command(
                        TARGET AppBox2dDemo
                        POST_BUILD
                        COMMAND ${CMAKE_COMMAND} ARGS -E copy_if_different ${BULLET_PHYSICS_SOURCE_DIR}/glut64.dll ${CMAKE_CURRENT_BINARY_DIR}
                )
            else(CMAKE_CL_64)
                add_custom_command(
                        TARGET AppBox2dDemo
                        POST_BUILD
                        COMMAND ${CMAKE_COMMAND} ARGS -E copy_if_different ${BULLET_PHYSICS_SOURCE_DIR}/GLUT32.DLL ${CMAKE_CURRENT_BINARY_DIR}
                )
            endif(CMAKE_CL_64)
        endif(NOT INTERNAL_CREATE_DISTRIBUTABLE_MSVC_PROJECTFILES)

    endif(WIN32)
else(USE_GLUT)
    link_libraries(
            OpenGLSupport BulletDynamics BulletCollision LinearMath ${OPENGL_gl_LIBRARY} ${OPENGL_glu_LIBRARY}
    )

    add_executable(AppBox2dDemo
            WIN32
            ../OpenGL/Win32AppMain.cpp
            Win32Box2dDemo.cpp
            Box2dDemo.cpp
            Box2dDemo.h
            ${BULLET_PHYSICS_SOURCE_DIR}/build/bullet.rc
            )
endif(USE_GLUT)

if(INTERNAL_ADD_POSTFIX_EXECUTABLE_NAMES)
    set_target_properties(AppBox2dDemo PROPERTIES DEBUG_POSTFIX "_Debug")
    set_target_properties(AppBox2dDemo PROPERTIES MINSIZEREL_POSTFIX "_MinsizeRel")
    set_target_properties(AppBox2dDemo PROPERTIES RELWITHDEBINFO_POSTFIX "_RelWithDebugInfo")
endif(INTERNAL_ADD_POSTFIX_EXECUTABLE_NAMES)
