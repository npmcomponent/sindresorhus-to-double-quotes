#!/usr/bin/env node
'use strict';
var fs = require('fs');
var toDoubleQuotes = require('./to-double-quotes');
var input = process.argv.slice(2);

if (process.argv.indexOf('-h') !== -1 || process.argv.indexOf('--help') !== -1) {
	console.log('to-double-quotes src/*.txt');
	console.log('or');
	console.log('cat input.txt | to-double-quotes > output.txt');
	return;
}

if (process.argv.indexOf('-v') !== -1 || process.argv.indexOf('--version') !== -1) {
	console.log(require('./package').version);
	return;
}

if (input.length > 0) {
	input.forEach(function (filename) {
		fs.readFile(filename, 'utf8', function (err, data) {
			if (err) {
				throw error;
			}

			fs.writeFile(filename, toDoubleQuotes(data), function (err) {
				if (err) {
					throw err;
				}

				console.log(filename);
			});
		});
	});

	return;
}

var stdin = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', function (data) {
	stdin += data;
});
process.stdin.on('end', function () {
	process.stdout.write(toDoubleQuotes(stdin));
});
