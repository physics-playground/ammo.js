# HelloWorld is a minimal sample creating, stepping and deleting a Bullet dynamics world

include_directories(
        ${BULLET_PHYSICS_SOURCE_DIR}/src
)

link_libraries(
        BulletDynamics BulletCollision LinearMath
)

if(WIN32)
    add_executable(AppHelloWorld
            HelloWorld.cpp
            ${BULLET_PHYSICS_SOURCE_DIR}/build/bullet.rc
            )
else()
    add_executable(AppHelloWorld
            HelloWorld.cpp
            )
endif()

if(INTERNAL_ADD_POSTFIX_EXECUTABLE_NAMES)
    set_target_properties(AppHelloWorld PROPERTIES DEBUG_POSTFIX "_Debug")
    set_target_properties(AppHelloWorld PROPERTIES MINSIZEREL_POSTFIX "_MinsizeRel")
    set_target_properties(AppHelloWorld PROPERTIES RELWITHDEBINFO_POSTFIX "_RelWithDebugInfo")
endif(INTERNAL_ADD_POSTFIX_EXECUTABLE_NAMES)
