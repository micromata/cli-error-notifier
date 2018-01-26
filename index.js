const execa = require('execa');
const notifier = require('node-notifier');

module.exports = (command, flags) => {
	flags = flags || {};

	const notifierOpts = {
		title: flags.t || flags.title || 'An error has occured',
		message: flags.m || flags.message || 'Check the terminal for more information',
		icon: flags.i || flags.icon || '',
		sound: flags.s || flags.sound || true
	};
	notifierOpts.sound = /mute/i.test(notifierOpts.sound) ? false : notifierOpts.sound;

	execa.shell(command, {env: {FORCE_COLOR: true}}).then(result => {
		console.log(result.stdout);
	}).catch(err => {
		console.log(err.stdout);
		notifier.notify(notifierOpts);
		process.exit(err.code);
	});
};
