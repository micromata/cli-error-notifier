#!/usr/bin/env node

import fs from 'node:fs/promises';
import meow from 'meow';
import logSymbols from 'log-symbols';
import updateNotifier from 'update-notifier';

import errorNotifier from './lib/error-notifier.js';

const packageJson = JSON.parse(await fs.readFile('package.json'));
const cli = meow(
	`
	Usage
	  $ onerror <command> [options]

	Options
	  --title,   -t   Sets the title of the notification.
	                  Default: "An error has occured"
	  --message, -m   Sets the message body of the notification.
	                  Default: "Check the terminal for more information"
	  --icon,    -i   Sets an icon. Can be any absolute path.
	  --sound,   -s   Defines which sound to use.
	                  Use "mute" to disable default sound notification.
	                  Options: Mute, Basso, Blow, Bottle, Frog, Funk, Glass, Hero,
	                           Morse, Ping, Pop, Purr, Sosumi, Submarine, Tink
	                  Default: Bottle
	  --version  -v   Displays the version number.
	  --help     -h   Displays the help.

	Examples
	  $ onerror "wget unknown-host.xyz"
	  $ onerror "wget unknown-host.xyz" -s mute
	  $ onerror "wget unknown-host.xyz" -t Error -m "My error message"
	  $ onerror "wget unknown-host.xyz"  -s Glass -i https://cdn.rawgit.com/npm/logos/31945b5c/npm%20square/n-64.png
`,
	{
		importMeta: import.meta,
		alias: {
			h: 'help',
			v: 'version',
		},
		flags: {
			title: {
				type: 'string',
				alias: 't',
			},
			message: {
				type: 'string',
				alias: 'm',
			},
			icon: {
				type: 'string',
				alias: 'i',
			},
			sound: {
				type: 'string',
				alias: 's',
			},
		},
	},
);

updateNotifier({pkg: packageJson}).notify();

if (cli.input.length === 0 && cli.flags.v === true) {
	cli.showVersion();
}

if (cli.input.length === 0 && cli.flags.h === true) {
	cli.showHelp(0);
}

if (cli.input.length !== 1) {
	console.log(
		`\n${logSymbols.error} Invalid input. Please check the help below:`,
	);
	cli.showHelp();
}

if (
	Object.keys(cli.flags)
		.map((key) => typeof cli.flags[key])
		.includes('boolean')
) {
	console.log(
		`\n${logSymbols.error} Wrong option(s) provided. Please check the help below:`,
	);
	cli.showHelp();
}

try {
	await errorNotifier(cli.input[0], cli.flags);
} catch (error) {
	process.exit(error.exitCode);
}
