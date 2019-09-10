module.exports = (opts, error) => {
	const errorRegExp = /\${error}/g;
	// TODO: Implement error handling
	const errorHandler = new Function('error', `return eval(${JSON.stringify(opts.e || opts.error || 'error.toString()')})`); // eslint-disable-line no-new-func
	const errorReplace = (str) => (error) ? str.replace(errorRegExp, errorHandler(error)) : str;
	const notifierOpts = {
		title: errorReplace(opts.t || opts.title || 'An error has occured'),
		message: errorReplace(opts.m || opts.message || 'Check the terminal for more information'),
		icon: opts.i || opts.icon || '',
		sound: opts.s || opts.sound || true,
		// Defective since Windows 10 1903 Update
		// https://github.com/mikaelbr/node-notifier/issues/277
		// `true` is just for testing purpose - should be removed from production code
		wait: true
	};
	notifierOpts.sound = /mute/i.test(notifierOpts.sound) ? false : notifierOpts.sound;

	return notifierOpts;
};
