const path = require('path');
const shell = require('shelljs');
const chalk = require('chalk');
const log = require('npmlog');

const modulePath = path.resolve('./');
// eslint-disable-next-line import/no-dynamic-require
const packageJson = require(path.join(modulePath, 'package.json'));

shell.rm('-rf', 'dist');

const babel = path.join(__dirname, 'node_modules', '.bin', 'babel');
const args = [
    '--ignore tests,__tests__,test.js,stories/,story.jsx',
    '--plugins "transform-runtime"',
    './src --out-dir ./dist',
    '--copy-files',
].join(' ');

const command = `${babel} ${args}`;

shell.exec(command);
