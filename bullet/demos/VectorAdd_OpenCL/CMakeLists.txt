if(BUILD_MINICL_OPENCL_DEMOS)
    subdirs(MiniCL)
endif()

if(BUILD_AMD_OPENCL_DEMOS)
    subdirs(AMD)
endif()

if(BUILD_NVIDIA_OPENCL_DEMOS)
    subdirs(NVidia)
endif()

if(APPLE)
    subdirs(Apple)
endif()
