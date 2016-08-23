'use strict';

const original  = 'http://';
const processed = 'https://';

const originalRegExp = new RegExp(original);

const rl = require('readline');
const fs = require('fs');
const path = require('path');

const curFile = path.basename(__filename);

const cmd = rl.createInterface({
    input : process.stdin,
    output: process.stdout,
});

const fileCheck = (callback, filename) => {
	const rlObj = rl.createInterface({
		input: fs.createReadStream(filename),
	});
	console.log(1);
	let lineNumber = 0;
	rlObj.on('line', line => {
		++lineNumber;
		if (originalRegExp.test(line)) {
			console.log(`\x1b[33m\x1b[44m${lineNumber}\t\x1b[0m${line.trim().replace(original, `\x1b[41m${original}\x1b[0m`)}`);
		}
	});
	rlObj.on('close', () => {
		cmd.question(`是否修改 \x1b[42m${filename}\x1b[0m 的内容?`, answer => {
			console.log('答案是', answer);
			callback();
		});
	});
}

const fileList = fs.readdir('.', (err, list) => {
	list.filter(item => curFile !== item).reduce((prev, cur, index, arr) => {
		// return prev.then(fileCheck(cur), fileCheck(cur));
		return fileCheck(prev, cur);
	}, Promise.resolve());
});


// const rlObj = rl.createInterface({
// 	// input: fs.createReadStream('新建文本文档.txt'),
// 	input: fs.createReadStream('index_v3.shtml'),
// });

// rlObj.on('line', line => {
// 	if (originalRegExp.test(line)) {
// 		console.log(line.trim().replace(original, '\x1b[41m' + original + '\x1b[0m'));
// 	}
// });
