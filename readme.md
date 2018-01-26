[![npm version](https://img.shields.io/npm/v/cli-error-notifier.svg?style=flat)](https://www.npmjs.org/package/cli-error-notifier)
[![Build Status](https://travis-ci.org/micromata/cli-error-notifier.svg?branch=master)](https://travis-ci.org/micromata/cli-error-notifier)
[![Coverage](https://codecov.io/gh/micromata/cli-error-notifier/badge.svg?branch=master)](https://codecov.io/gh/micromata/cli-error-notifier?branch=master)
[![devDependency Status](https://david-dm.org/micromata/cli-error-notifier/dev-status.svg)](https://david-dm.org/micromata/cli-error-notifier#info=devDependencies)
[![Dependency Status](https://david-dm.org/micromata/cli-error-notifier/status.svg)](https://david-dm.org/micromata/cli-error-notifier#info=Dependencies)

# cli-error-notifier

> Send native desktop notifications when CLI apps fail

This little CLI comes in handy when writing build scripts.

Let’s imagine you have setup the following npm script for linting your JavaScript files:

```json
{
  "scripts": {
    "eslint": "eslint build src",
  }
}
```

With using cli-error-notifier you can simply get a desktop notification just when the linting fails:

```json
{
  "scripts": {
    "eslint": "onerror \"eslint build src\"",
  }
}
```

This is especially useful for watching files while developing. You could use it in conjunction with [onchange](https://github.com/Qard/onchange) like in the following example:

```json
{
  "scripts": {
    "eslint": "eslint build src",
    "eslint:fix": "npm run eslint --silent -- --fix",
    "eslint:watch": "onchange \"src/**/*.js\" -- onerror \"npm run eslint --silent\""
  }
}
```

It also works flawlessly together with [npm-run-all](https://github.com/mysticatea/npm-run-all).

## Install

```
$ npm install --global cli-error-notifier
```

*It requires Node.js (v4 or greater).*

## Usage

```bash
$ onerror --help

  Send native desktop notifications when CLI apps fail

  Usage
    $ onerror <command> [options]

  Options
    --title,   -t   The title of the notification
    --message, -m   The message body of the notification
    --icon,    -i   Can be any absolute path
    --sound,   -s   Use "mute" to disable default sound notification

    Options are passed to the node-notifier CLI.
    See https://github.com/mikaelbr/node-notifier-cli#usage

    Detailed info about defaults can be found here:
    https://github.com/mikaelbr/node-notifier#all-notification-options-with-their-defaults

  Examples
    $ onerror "wget unknown-host.xyz"
    $ onerror "wget unknown-host.xyz" -s mute
    $ onerror "wget unknown-host.xyz" -t Error -m "My error message"
    $ onerror "wget unknown-host.xyz"  -s Glass -i https://cdn.rawgit.com/npm/logos/31945b5c/npm%20square/n-64.png
```

## Cross platform compatibility
This is using the brilliant [node-notifier](https://github.com/mikaelbr/node-notifier) and therefore should work with Notification Center for macOS, notify-osd/libnotify-bin for Linux, Toasters for Windows 8/10, or taskbar Balloons for earlier Windows versions. Growl is used if none of these requirements are met.

## License

MIT © [Michael Kühnel](https://micromata.de)
