#!/usr/bin/env node
'use strict';
const meow = require('meow');
const logSymbols = require('log-symbols');

const errorNotifier = require('../');

const cli = meow(`
	Usage
	  $ onerror <command> [options]

	Options
	  --title, -t    The title of the notification
	  --message, -m  The message body of the notification
	  --icon, -i     Can be any absolute path
	  --sound, -s;   Use none to disable default sound notification

	  Options are passed to the node-notifier CLI.
	  See https://github.com/mikaelbr/node-notifier-cli#usage

	  Detailed info about defaults can be found here:
	  https://github.com/mikaelbr/node-notifier#all-notification-options-with-their-defaults

	Examples
	  $ onerror "wget unknown-host.xyz"
	  $ onerror "wget unknown-host.xyz" -t Error -m "Something went wrong. Check the terminal."
	  $ onerror "wget unknown-host.xyz"  -s Glass -i https://cdn.rawgit.com/npm/logos/31945b5c/npm%20square/n-64.png
`, {
	alias: {
		h: 'help',
		v: 'version'
	},
	flags: {
		title: {
			type: 'string',
			alias: 't',
			default: 'An error occured'
		},
		message: {
			type: 'string',
			alias: 'm',
			default: 'Check your terminal for more information'
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

if (cli.input.length !== 1) {
	console.log(`\n${logSymbols.error} Invalid input. Please check the help below:`);
	cli.showHelp(2);
}

if (typeof cli.input[0] !== 'string') {
	console.log(`\n${logSymbols.error} Command needs to be a string, but got ${typeof cli.input[0]}. Please check the help below:`);
	cli.showHelp(2);
}

errorNotifier(cli.input[0], cli.flags);
