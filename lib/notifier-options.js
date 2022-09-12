module.exports = (options) => {
	const notifierOptions = {
		title: options.t || options.title || 'An error has occured',
		message:
			options.m || options.message || 'Check the terminal for more information',
		icon: options.i || options.icon || '',
		sound: options.s || options.sound || true,
	};
	notifierOptions.sound = /mute/i.test(notifierOptions.sound)
		? false
		: notifierOptions.sound;

	return notifierOptions;
};
