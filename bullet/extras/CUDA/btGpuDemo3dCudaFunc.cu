/*
Bullet Continuous Collision Detection and Physics Library, http://bulletphysics.org
Copyright (C) 2006, 2007 Sony Computer Entertainment Inc.

This software is provided 'as-is', without any express or implied warranty.
In no event will the authors be held liable for any damages arising from the use of this software.
Permission is granted to anyone to use this software for any purpose,
including commercial applications, and to alter it and redistribute it freely,
subject to the following restrictions:

1. The origin of this software must not be misrepresented; you must not claim that you wrote the original software. If you use this software in a product, an acknowledgment in the product documentation would be appreciated but is not required.
2. Altered source versions must be plainly marked as such, and must not be misrepresented as being the original software.
3. This notice may not be removed or altered from any source distribution.
*/

#include <cstdlib>
#include <cstdio>
#include <string.h>

#include "../../extras/CUDA/cutil_math.h"
#include "math_constants.h"

#include <vector_types.h>

//----------------------------------------------------------------------------------------

#include "../../extras/CUDA/btCudaDefines.h"

//----------------------------------------------------------------------------------------

#include "../../src/BulletMultiThreaded/btGpuUtilsSharedDefs.h"
#include "../../demos/Gpu3dDemo/btGpuDemo3dSharedTypes.h"
#include "../../demos/Gpu3dDemo/btGpuDemo3dSharedDefs.h"

//----------------------------------------------------------------------------------------

texture<float4, 1, cudaReadModeElementType> posTex;

//----------------------------------------------------------------------------------------

#include "../../demos/Gpu3dDemo/btGpuDemo3dSharedCode.h"

//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------

