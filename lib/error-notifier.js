const execa = require('execa');
const notifier = require('node-notifier');

const notifierOptions = require('./notifier-options');

const errorLiteral = 'error';

function errorLiteralPosition(str) {
	let index = str.indexOf(`\${${errorLiteral}`);
	let length = 0;

	if (index > -1) {
		index += 2;

		let open = 1;

		while (length < str.length - index) {
			const char = str.charAt(index + length);

			if (char === '{') {
				open++;
			} else if (char === '}') {
				open--;
			}

			if (open === 0) {
				break;
			}

			length++;
		}

		if (open > 0) {
			throw new TypeError('Missing brace for error literal!');
		}
	}

	return {index, length};
}

function errorLiteralReplace(err, msg) {
	let position;

	while ((position = errorLiteralPosition(msg)) && position.index > -1) {
		const lc = msg.substr(position.index, position.length);
		const fn = new Function(errorLiteral, `return ${lc}`); // eslint-disable-line no-new-func
		msg = msg.replace(`\${${lc}}`, fn(err));
	}

	return msg;
}

module.exports = (command, opts) => {
	opts = opts || {};

	return new Promise((resolve, reject) => {
		execa.shell(command, {env: {FORCE_COLOR: true}})
			.then(result => resolve(result))
			.catch(err => {
				const notifierOpts = notifierOptions(opts);
				notifierOpts.title = errorLiteralReplace(err, notifierOpts.title);
				notifierOpts.message = errorLiteralReplace(err, notifierOpts.message);

				return notifier.notify(notifierOpts, () => reject(err));
			});
	});
};
