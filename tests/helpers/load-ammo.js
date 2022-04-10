const { resolve } = require('path');

async function loadAmmo(options) {
  const { AMMO_PATH, PWD } = process.env;
  const path = AMMO_PATH ? resolve(PWD, AMMO_PATH) : '../../bin/ammo.js';
  const Ammo = require(path);
  return Ammo(options);
}

module.exports = loadAmmo;
