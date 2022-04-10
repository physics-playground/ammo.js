const { resolve } = require('path');
var shell = require('shelljs');

async function loadAmmo(options) {
  const { AMMO_PATH } = process.env;
  const path = AMMO_PATH ? resolve(shell.pwd().toString(), AMMO_PATH) : '../../bin/ammo.js';
  const Ammo = require(path);
  return Ammo(options);
}

module.exports = loadAmmo;
