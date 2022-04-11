#include "btBulletDynamicsCommon.h"
#include "BulletCollision/CollisionDispatch/btGhostObject.h"
#include "BulletCollision/CollisionShapes/btConvexPolyhedron.h"
#include "BulletCollision/CollisionShapes/btHeightfieldTerrainShape.h"
#include "BulletCollision/CollisionShapes/btShapeHull.h"
#include "BulletDynamics/Character/btKinematicCharacterController.h"
#include "BulletSoftBody/btDefaultSoftBodySolver.h"
#include "BulletSoftBody/btSoftBody.h"
#include "BulletSoftBody/btSoftBodyHelpers.h"
#include "BulletSoftBody/btSoftBodyRigidBodyCollisionConfiguration.h"
#include "BulletSoftBody/btSoftRigidDynamicsWorld.h"
#include "BulletCollision/Gimpact/btGImpactCollisionAlgorithm.h"
#include "BulletCollision/Gimpact/btGImpactShape.h"

// Web IDL doesn't seem to support C++ templates so this is the best we
// can do, see https://stackoverflow.com/q/42517010
typedef btAlignedObjectArray<btVector3> btVector3Array;
typedef btAlignedObjectArray<btFace> btFaceArray;
typedef btAlignedObjectArray<int> btIntArray;
typedef btAlignedObjectArray<btIndexedMesh> btIndexedMeshArray;
typedef btAlignedObjectArray<const btCollisionObject*> btConstCollisionObjectArray;
typedef btAlignedObjectArray<btScalar> btScalarArray;
