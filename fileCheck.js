'use strict';

const rl = require('readline');
const fs = require('fs');

const fileCheck = (filename, original) => new Promise((resolve, reject) => {
	const rlObj = rl.createInterface({
		input: fs.createReadStream(filename),
	});

	const originalRegExp = new RegExp(original);

	let lineNumber = 0;
	rlObj.on('line', line => {
		++lineNumber;
		if (originalRegExp.test(line)) {
			console.log(`\x1b[33m\x1b[44m${lineNumber}\t\x1b[0m${line.trim().replace(original, `\x1b[41m${original}\x1b[0m`)}`);
		}
	});

	rlObj.on('close', () => {
		const cmd = rl.createInterface({
		    input : process.stdin,
		    output: process.stdout,
		});

		cmd.question(`是否修改 \x1b[30m\x1b[47m${filename}\x1b[0m 的内容?`, answer => {
			console.log('答案是', answer);
			cmd.close();
			resolve();
		});
	});
});
/**
 * 包裹函数, 调用时传入目标文件名, 将返回一个可以返回检查相应文件的 promise 的函数用于在 promise 链中调用
 * @param filename 希望检查的函数
 * @return function 调用这个函数可以生成一个检查对应文件的 promise
 */
const fileCheckWrap = (filename, original) => data => fileCheck(filename, original);

module.exports = { fileCheck, fileCheckWrap };