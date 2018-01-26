const chalk = require('chalk');

module.exports = (input, opts) => {
	opts = opts || {};

	console.log(chalk.white('------------- DEBUG OUTPUT -------------'));
	console.log(chalk.yellow('input:'));
	console.dir(input);
	console.log(chalk.yellow('opts:'));
	console.dir(opts);
	console.log(chalk.white('----------------------------------------'));
	console.log('');
};
