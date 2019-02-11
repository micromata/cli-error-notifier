const execa = require('execa');
const notifier = require('node-notifier');

const notifierOptions = require('./notifier-options');

module.exports = (command, opts) => {
	opts = opts || {};

	return new Promise((resolve, reject) => {
		execa.shell(command, {env: {FORCE_COLOR: true}})
			.then(result => resolve(result))
			.catch(error => notifier.notify(notifierOptions(opts), () => reject(error)));
	});
};
