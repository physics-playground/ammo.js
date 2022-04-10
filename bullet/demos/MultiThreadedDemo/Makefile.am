noinst_PROGRAMS=MultiThreadedDemo

MultiThreadedDemo_SOURCES=MultiThreadedDemo.cpp MultiThreadedDemo.h main.cpp
MultiThreadedDemo_CXXFLAGS=-I@top_builddir@/src -I@top_builddir@/demos/OpenGL -I@top_builddir@/extras  $(CXXFLAGS)
MultiThreadedDemo_LDADD=-L../OpenGL -L../../extras  -L../../src  -lbulletmultithreaded -lbulletopenglsupport -lbulletdynamics -lbulletcollision -lbulletmath @opengl_LIBS@ -lpthread
