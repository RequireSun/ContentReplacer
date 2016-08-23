'use strict';

const original  = 'http://';
const processed = '//';
const readDir = 'test';

const rl = require('readline');
const fs = require('fs');
const path = require('path');

const curFile = path.basename(__filename);
const tarDir = path.resolve(__dirname, readDir);

const { fileCheckWrap } = require('./fileCheck');

fs.readdir(tarDir, (err, list) => {
	if (tarDir === __dirname) {
		list = list.filter(item => curFile !== item);
	}
	let promise = list.reduce((prev, cur, index, arr) => 
		prev.then(fileCheckWrap(path.resolve(tarDir, cur), original), fileCheckWrap(path.resolve(tarDir, cur), original))
	, Promise.resolve());

	promise.then(() => {
		cmd.close();
	});
});
