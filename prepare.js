const path = require('path');
const shell = require('shelljs');

const babel = path.join(__dirname, 'node_modules', '.bin', 'babel');
const args = [
    '--ignore tests,__tests__,test.js,stories/,story.jsx',
    '--plugins "transform-runtime"',
    './src --out-dir ./dist',
    '--copy-files',
].join(' ');

const command = `${babel} ${args}`;

shell.exec(command);
