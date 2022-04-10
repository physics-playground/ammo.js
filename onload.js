/**
 * `ammo.js` JavaScript Binding for Bullet Physics
 * Copyright (c) 2011 ammo.js contributors
 *
 * Bullet Continuous Collision Detection and Physics Library
 * Copyright (c) 2003-2006 Erwin Coumans  http://continuousphysics.com/Bullet/
 *
 * This software is provided 'as-is', without any express or implied
 * warranty.  In no event will the authors be held liable for any damages
 * arising from the use of this software.
 */

Module['CONTACT_ADDED_CALLBACK_SIGNATURE'] = 'iiiiiiii';
Module['CONTACT_DESTROYED_CALLBACK_SIGNATURE'] = 'ii';
Module['CONTACT_PROCESSED_CALLBACK_SIGNATURE'] = 'iiii';
Module['INTERNAL_TICK_CALLBACK_SIGNATURE'] = 'vif';

// Reassign global Ammo to the loaded module:
this['Ammo'] = Module;
