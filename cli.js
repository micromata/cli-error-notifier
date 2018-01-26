#!/usr/bin/env node
'use strict';
const meow = require('meow');
const logSymbols = require('log-symbols');
const updateNotifier = require('update-notifier');
const pkg = require('./package.json');

const errorNotifier = require('./error-notifier');

const cli = meow(`
	Usage
	  $ onerror <command> [options]

	Options
	  --title,   -t   The title of the notification
	  --message, -m   The message body of the notification
	  --icon,    -i   Can be any absolute path
	  --sound,   -s   Use "mute" to disable default sound notification

	Examples
	  $ onerror "wget unknown-host.xyz"
	  $ onerror "wget unknown-host.xyz" -s mute
	  $ onerror "wget unknown-host.xyz" -t Error -m "My error message"
	  $ onerror "wget unknown-host.xyz"  -s Glass -i https://cdn.rawgit.com/npm/logos/31945b5c/npm%20square/n-64.png
`, {
	alias: {
		h: 'help',
		v: 'version'
	},
	flags: {
		title: {
			type: 'string',
			alias: 't'
		},
		message: {
			type: 'string',
			alias: 'm'
		},
		icon: {
			type: 'string',
			alias: 'i'
		},
		sound: {
			type: 'string',
			alias: 's'
		}
	}
});

updateNotifier({pkg}).notify();

if (cli.input.length !== 1) {
	console.log(`\n${logSymbols.error} Invalid input. Please check the help below:`);
	cli.showHelp(2);
}

if (typeof cli.input[0] !== 'string') {
	console.log(`\n${logSymbols.error} Command needs to be a string, but got ${typeof cli.input[0]}. Please check the help below:`);
	cli.showHelp(2);
}

if (Object.keys(cli.flags).map(key => typeof cli.flags[key]).some(type => type === 'boolean')) {
	console.log(`\n${logSymbols.error} Wrong option(s) provided. Please check the help below:`);
	cli.showHelp(2);
}

errorNotifier(cli.input[0], cli.flags)
	.then(result => {
		console.log(result.stdout || result.stderr);
	})
	.catch(error => {
		console.log(error.stdout || error.stderr);
		process.exit(error.code);
	});
