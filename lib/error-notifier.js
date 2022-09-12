const execa = require('execa');
const notifier = require('node-notifier');

const notifierOptions = require('./notifier-options');

module.exports = (command, options) => {
	options = options || {};

	return new Promise((resolve, reject) => {
		const execaPending = execa.shell(command, {env: {FORCE_COLOR: true}});
		execaPending.stdout.pipe(process.stdout);
		execaPending.stderr.pipe(process.stderr);
		return execaPending
			.then((result) => resolve(result))
			.catch((error) =>
				notifier.notify(notifierOptions(options), () => reject(error)),
			);
	});
};
