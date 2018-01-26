const execa = require('execa');

module.exports = (command, flags) => {
	flags = flags || {};

	execa.shell(command, {env: {FORCE_COLOR: true}}).then(result => {
		console.log(result.stdout);
	}).catch(err => {
		console.log(err.stdout);
		process.exit(err.code);
	});
};
