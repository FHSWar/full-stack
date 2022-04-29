const fs = require('fs');

const str = 'post-script可以在git pull之后触发';
console.log(str, 'again');

fs.readFile('./test.js', 'utf8', (err, data) => {
	if (err) {
		return console.log(err);
	}
	const result = data.replace(/tetstes/g, 'replacement');

	fs.writeFile('./test2.js', result, 'utf8', (e) => {
		if (e) return console.log(e);
	});
});