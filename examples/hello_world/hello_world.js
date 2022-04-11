/**
 * Adapted version of `HelloWorld.cpp` from Bullet Physics.
 *
 * Copyright (c) 2003-2007 Erwin Coumans https://bulletphysics.org
 */
Ammo().then((Ammo) => {
    function main() {
        const collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
        const dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration);
        const overlappingPairCache = new Ammo.btDbvtBroadphase();
        const solver = new Ammo.btSequentialImpulseConstraintSolver();
        const dynamicsWorld = new Ammo.btDiscreteDynamicsWorld(dispatcher, overlappingPairCache, solver, collisionConfiguration);
        dynamicsWorld.setGravity(new Ammo.btVector3(0, -10, 0));

        const groundShape = new Ammo.btBoxShape(new Ammo.btVector3(50, 50, 50));
        const bodies = [];
        const groundTransform = new Ammo.btTransform();

        groundTransform.setIdentity();
        groundTransform.setOrigin(new Ammo.btVector3(0, -56, 0));

        (function () {
            const mass = 0;
            const isDynamic = (mass !== 0);
            const localInertia = new Ammo.btVector3(0, 0, 0);

            if (isDynamic) { groundShape.calculateLocalInertia(mass, localInertia); }

            const myMotionState = new Ammo.btDefaultMotionState(groundTransform);
            const rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, myMotionState, groundShape, localInertia);
            const body = new Ammo.btRigidBody(rbInfo);

            dynamicsWorld.addRigidBody(body);
            bodies.push(body);
        }());

        (function () {
            const colShape = new Ammo.btSphereShape(1);
            const startTransform = new Ammo.btTransform();

            startTransform.setIdentity();

            const mass = 1;
            const isDynamic = (mass !== 0);
            const localInertia = new Ammo.btVector3(0, 0, 0);

            if (isDynamic) { colShape.calculateLocalInertia(mass, localInertia); }

            startTransform.setOrigin(new Ammo.btVector3(2, 10, 0));

            const myMotionState = new Ammo.btDefaultMotionState(startTransform);
            const rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, myMotionState, colShape, localInertia);
            const body = new Ammo.btRigidBody(rbInfo);

            dynamicsWorld.addRigidBody(body);
            bodies.push(body);
        }());

        const trans = new Ammo.btTransform(); // taking this out of the loop below us reduces the leaking

        for (let i = 0; i < 135; i++) {
            dynamicsWorld.stepSimulation(1 / 60, 10);

            bodies.forEach((body) => {
                if (body.getMotionState()) {
                    body.getMotionState().getWorldTransform(trans);
                    print(`world pos = ${[trans.getOrigin().x().toFixed(2), trans.getOrigin().y().toFixed(2), trans.getOrigin().z().toFixed(2)]}`);
                }
            });
        }

        // Delete objects we created through |new|. We just do a few of them here, but you should do them all if you are not shutting down ammo.js
        // we'll free the objects in reversed order as they were created via 'new' to avoid the 'dead' object links
        Ammo.destroy(dynamicsWorld);
        Ammo.destroy(solver);
        Ammo.destroy(overlappingPairCache);
        Ammo.destroy(dispatcher);
        Ammo.destroy(collisionConfiguration);

        print('ok.');
    }

    main();
});
