const execa = require('execa');
const notifier = require('node-notifier');

module.exports = (command, opts) => {
	opts = opts || {};

	const notifierOpts = {
		title: opts.t || opts.title || 'An error has occured',
		message: opts.m || opts.message || 'Check the terminal for more information',
		icon: opts.i || opts.icon || '',
		sound: opts.s || opts.sound || true
	};
	notifierOpts.sound = /mute/i.test(notifierOpts.sound) ? false : notifierOpts.sound;

	return new Promise((resolve, reject) => {
		execa.shell(command, {env: {FORCE_COLOR: true}})
			.then(result => resolve(result))
			.catch(err => notifier.notify(notifierOpts, () => reject(err)));
	});
};
