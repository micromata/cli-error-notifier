import {execa} from 'execa';
import nodeNotifier from 'node-notifier';
import notifierOptions from './notifier-options.js';

const errorNotifier = (command, options) => {
	options = options || {};

	return new Promise((resolve, reject) => {
		const execaPending = execa(command, {
			shell: true,
			env: {FORCE_COLOR: true},
		});
		execaPending.stdout.pipe(process.stdout);
		execaPending.stderr.pipe(process.stderr);
		execaPending
			.then((result) => resolve(result))
			.catch((error) =>
				nodeNotifier.notify(notifierOptions(options), () => reject(error)),
			);
	});
};

export default errorNotifier;
