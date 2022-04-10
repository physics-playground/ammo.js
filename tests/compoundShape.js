const test = require('ava');
const loadAmmo = require('./helpers/load-ammo.js');

// Initialize global Ammo once for all tests:
test.before(async (t) => loadAmmo());

test('compound shape', (t) => {
    const compoundShape = new Ammo.btCompoundShape();

    const transform = new Ammo.btTransform();
    transform.setIdentity();

    const vec = new Ammo.btVector3();
    const quat = new Ammo.btQuaternion();
    quat.setValue(0, 0, 0, 1);

    const margin = 0.01;
    const delta = 0.00001;

    // Create box shape
    vec.setValue(0.5, 0.75, 1.25);
    const boxShape1 = new Ammo.btBoxShape(vec);
    boxShape1.setMargin(margin);
    t.assert(Math.abs(boxShape1.getMargin() - margin) < delta, 'boxShape margin');
    vec.setValue(0, 0, 0);
    transform.setOrigin(vec);
    transform.setRotation(quat);
    compoundShape.addChildShape(transform, boxShape1);

    // Create sphere shape
    const sphereRadius = 0.3;
    const sphereShape = new Ammo.btSphereShape(sphereRadius);
    sphereShape.setMargin(margin);
    // Note: the sphere shape is different from the others, it always
    // returns its radius as the margin.
    t.assert(
        Math.abs(sphereShape.getMargin() - sphereRadius) < delta,
        'sphereShape margin must be equal to the radius',
    );
    vec.setValue(1, 0, 0);
    transform.setOrigin(vec);
    transform.setRotation(quat);
    compoundShape.addChildShape(transform, sphereShape);

    // Create cylinder shape
    vec.setValue(0.3, 0.4, 0.3);
    const cylinderShape = new Ammo.btCylinderShape(vec);
    cylinderShape.setMargin(margin);
    t.assert(Math.abs(cylinderShape.getMargin() - margin) < delta, 'cylinderShape margin');
    vec.setValue(-1, 0, 0);
    transform.setOrigin(vec);
    transform.setRotation(quat);
    compoundShape.addChildShape(transform, cylinderShape);

    // Create cone shape
    const coneShape = new Ammo.btConeShape(0.3, 0.5);
    vec.setValue(0, 1, 0);
    transform.setOrigin(vec);
    transform.setRotation(quat);
    compoundShape.addChildShape(transform, coneShape);

    // Create capsule shape
    const capsuleShape = new Ammo.btCapsuleShape(0.4, 0.5);
    capsuleShape.setMargin(margin);
    t.assert(Math.abs(capsuleShape.getMargin() - margin) < delta, 'capsuleShape margin');
    vec.setValue(0, -1, 0);
    transform.setOrigin(vec);
    transform.setRotation(quat);
    compoundShape.addChildShape(transform, capsuleShape);

    // Create convex hull shape
    const convexHullShape2 = new Ammo.btConvexHullShape();
    vec.setValue(1, 1, 1);
    convexHullShape2.addPoint(vec);
    vec.setValue(-1, 1, 1);
    convexHullShape2.addPoint(vec);
    vec.setValue(1, -1, 1);
    convexHullShape2.addPoint(vec);
    vec.setValue(0, 1, -1);
    convexHullShape2.addPoint(vec);
    vec.setValue(0, -2, -1);
    convexHullShape2.setMargin(margin);
    t.assert(Math.abs(convexHullShape2.getMargin() - margin) < delta, 'convexHullShape margin');
    transform.setOrigin(vec);
    transform.setRotation(quat);
    compoundShape.addChildShape(transform, convexHullShape2);

    compoundShape.setMargin(margin);
    t.assert(Math.abs(compoundShape.getMargin() - margin) < delta, 'compoundShape margin');

    // Test number of shapes
    t.is(compoundShape.getNumChildShapes(), 6, 'compoundShape.getNumChildShapes() should return 6');

    // Create convex hull with ShapeHull
    vec.setValue(0.5, 0.75, 1.25);
    const boxShape2 = new Ammo.btBoxShape(vec);
    boxShape2.setMargin(0);
    const shapeHull = new Ammo.btShapeHull(boxShape2);
    t.assert(shapeHull.buildHull(0), 'shapeHull.buildHull should return true');
    const convexHullShape = new Ammo.btConvexHullShape(shapeHull.getVertexPointer(), shapeHull.numVertices());
    t.is(convexHullShape.getNumVertices(), 8, 'convexHullShape.getNumVertices() should return 8');

    // Create rigid body
    vec.setValue(10, 5, 2);
    transform.setOrigin(vec);
    transform.setRotation(quat);
    const motionState = new Ammo.btDefaultMotionState(transform);
    const mass = 15;
    compoundShape.calculateLocalInertia(mass, vec);
    const rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, motionState, compoundShape, vec);
    const rigidBody = new Ammo.btRigidBody(rbInfo);

    // Set new motion state
    vec.setValue(-30, 50, -10);
    transform.setOrigin(vec);
    transform.setRotation(quat);
    const newMotionState = new Ammo.btDefaultMotionState(transform);
    rigidBody.setMotionState(newMotionState);

    // Destroy everything
    for (let shapeIndex = compoundShape.getNumChildShapes() - 1; shapeIndex >= 0; shapeIndex--) {
        const subShape = compoundShape.getChildShape(shapeIndex);
        compoundShape.removeChildShapeByIndex(shapeIndex);
        Ammo.destroy(subShape);
    }

    Ammo.destroy(rigidBody.getCollisionShape());
    Ammo.destroy(rigidBody.getMotionState());
    Ammo.destroy(motionState);
    Ammo.destroy(rigidBody);
    Ammo.destroy(rbInfo);
    Ammo.destroy(vec);
    Ammo.destroy(quat);
    Ammo.destroy(transform);
});
