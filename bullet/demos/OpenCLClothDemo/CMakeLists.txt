subdirs(MiniCL)

if(BUILD_INTEL_OPENCL_DEMOS)
    subdirs(Intel)
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
