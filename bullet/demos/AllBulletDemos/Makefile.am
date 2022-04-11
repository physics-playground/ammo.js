noinst_PROGRAMS=AllBulletDemo

AllBulletDemo_SOURCES=\
		      	../SoftDemo/SoftDemo.cpp \
			../ConstraintDemo/ConstraintDemo.cpp \
			../ForkLiftDemo/ForkLiftDemo.cpp \
			../RagdollDemo/RagdollDemo.cpp \
			../BasicDemo/BasicDemo.cpp \
			../CcdPhysicsDemo/CcdPhysicsDemo.cpp \
			../SliderConstraintDemo/SliderConstraintDemo.cpp \
			../ConcaveRaycastDemo/ConcaveRaycastDemo.cpp \
			../Raytracer/Raytracer.cpp \
			../BspDemo/BspDemo.cpp \
			../BspDemo/BspLoader.cpp \
			../BspDemo/BspConverter.cpp \
			../ConcaveConvexcastDemo/ConcaveConvexcastDemo.cpp \
			../ConvexDecompositionDemo/ConvexDecompositionDemo.cpp \
			../GimpactTestDemo/GimpactTestDemo.cpp \
			../GjkConvexCastDemo/LinearConvexCastDemo.cpp \
			../ConcaveDemo/ConcavePhysicsDemo.cpp \
			../DynamicControlDemo/MotorDemo.cpp \
			DemoEntries.cpp \
			DemoEntries.h\
			Main.cpp
AllBulletDemo_CXXFLAGS=\
		       	-I@top_builddir@/src \
		       	-I@top_builddir@/extras/GIMPACTUtils \
		       	-I@top_builddir@/extras/ConvexDecomposition \
		       	-I@top_builddir@/extras/HACD \
		       	-I@top_builddir@/extras \
			-I@top_builddir@/demos/OpenGL \
			-I@top_builddir@/demos/SoftDemo \
			$(CXXFLAGS)
AllBulletDemo_LDADD=-L../OpenGL -lbulletopenglsupport -L../../src -L../../extras -lgimpactutils -lconvexdecomposition -lHACD -lBulletSoftBody -lBulletDynamics -lBulletCollision -lLinearMath -lglui @opengl_LIBS@
