const { exec } = require('child_process');
const { loopWhile } = require('deasync');

let done = false;
const gitLogArr = [];
const twoSha = [];

const toBeContinue = (data) => {
	console.log('toBeContinue data', data);
	done = true;
};
const getGitShaArr = (data) => gitLogArr.push(data);
const getSha = (str) => {
	const firstLine = str.split('\n')[0];
	return firstLine.split(' ')[0];
};
const getLastTwoSha = () => {
	if (gitLogArr.length < 2) return;
	const shaOne = getSha(gitLogArr.shift());
	const shaTwo = getSha(gitLogArr.shift());

	twoSha.push(shaOne, shaTwo);

	const diffFile = exec(`git diff ${twoSha[0]} ${twoSha[1]} --name-only`);
	diffFile.stdout.on('data', toBeContinue);
};

const gitSha = exec('git log --oneline');
gitSha.stdout.on('data', getGitShaArr);
gitSha.stdout.on('end', getLastTwoSha);

loopWhile(() => !done);
