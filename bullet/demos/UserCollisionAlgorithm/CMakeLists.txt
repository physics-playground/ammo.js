# This is basically the overall name of the project in Visual Studio this is the name of the Solution File

# For every executable you have with a main method you should have an add_executable line below.
# For every add executable line you should list every .cpp and .h file you have associated with that executable.

# You shouldn't have to modify anything below this line
########################################################

include_directories(
        ${BULLET_PHYSICS_SOURCE_DIR}/src ${BULLET_PHYSICS_SOURCE_DIR}/demos/OpenGL
)

link_libraries(
        OpenGLSupport BulletDynamics BulletCollision LinearMath ${GLUT_glut_LIBRARY} ${OPENGL_gl_LIBRARY} ${OPENGL_glu_LIBRARY}
)

if(WIN32)
    add_executable(AppUserCollisionAlgorithm
            UserCollisionAlgorithm.cpp
            ${BULLET_PHYSICS_SOURCE_DIR}/build/bullet.rc
            )
else()
    add_executable(AppUserCollisionAlgorithm
            UserCollisionAlgorithm.cpp
            )
endif()

if(INTERNAL_ADD_POSTFIX_EXECUTABLE_NAMES)
    set_target_properties(AppUserCollisionAlgorithm PROPERTIES DEBUG_POSTFIX "_Debug")
    set_target_properties(AppUserCollisionAlgorithm PROPERTIES MINSIZEREL_POSTFIX "_MinsizeRel")
    set_target_properties(AppUserCollisionAlgorithm PROPERTIES RELWITHDEBINFO_POSTFIX "_RelWithDebugInfo")
endif(INTERNAL_ADD_POSTFIX_EXECUTABLE_NAMES)
