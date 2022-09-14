[![npm version](https://img.shields.io/npm/v/cli-error-notifier.svg?style=flat)](https://www.npmjs.org/package/cli-error-notifier)
[![Coverage](https://codecov.io/gh/micromata/cli-error-notifier/badge.svg?branch=master)](https://codecov.io/gh/micromata/cli-error-notifier?branch=master)

# cli-error-notifier

> Sends native desktop notifications if CLI apps fail

*Technically: if a command exits with an exit code other than `0`*

## Install

To use it in your project:
```
$ npm install --save-dev cli-error-notifier
```

To use it globally:
```
$ npm install --global cli-error-notifier
```

*It requires Node.js (v4 or greater).*

## General usage

```
$ onerror --help

  Sends native desktop notifications if CLI apps fail

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
```

## Usage with npm scripts

This little CLI comes in handy when writing build scripts.

Let’s imagine you have setup the following npm script for linting your JavaScript files:

```json
{
  "scripts": {
    "eslint": "eslint src",
  }
}
```

With using cli-error-notifier a desktop notification can be generated at the moment the linting fails:

```json
{
  "scripts": {
    "eslint": "onerror \"eslint src\"",
  }
}
```

This is especially useful for watching files while developing. You could use it in conjunction with [onchange](https://github.com/Qard/onchange) like in the following example:

```json
{
  "scripts": {
    "eslint": "eslint src",
    "eslint:fix": "npm run eslint --silent -- --fix",
    "eslint:watch": "onchange \"src/**/*.js\" -- onerror \"npm run eslint --silent\""
  }
}
```

It also works flawlessly together with [npm-run-all](https://github.com/mysticatea/npm-run-all).

## Cross platform compatibility
cli-error-notifier uses the brilliant [node-notifier](https://github.com/mikaelbr/node-notifier) and therefore should work with Notification Center for macOS, notify-osd/libnotify-bin for Linux, Toasters for Windows 8/10, or taskbar Balloons for earlier Windows versions. Growl is used if none of these requirements are met.

## Related

* [onchange](https://github.com/Qard/onchange) - Watch files and folders and run a command when anything is changed.
* [npm-run-all](https://github.com/mysticatea/npm-run-all) - CLI tool to run multiple npm-scripts in parallel or serial.


## License

MIT © [Michael Kühnel](https://micromata.de)
