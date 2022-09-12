import test from 'ava';
import notifierOptions from '../lib/notifier-options.js';

test('"Default options"', (t) => {
	const options = notifierOptions({});
	t.is(options.title, 'An error has occured');
	t.is(options.message, 'Check the terminal for more information');
	t.is(options.icon, '');
	t.true(options.sound);
});

test('"Flags are returned as notifier options"', (t) => {
	const options = notifierOptions({
		title: 'Title',
		message: 'Message',
		icon: 'Icon',
		sound: 'Sound',
	});
	t.is(options.title, 'Title');
	t.is(options.message, 'Message');
	t.is(options.icon, 'Icon');
	t.is(options.sound, 'Sound');
});

test('"Aliases are returned as notifier options"', (t) => {
	const options = notifierOptions({
		t: 'Title',
		m: 'Message',
		i: 'Icon',
		s: 'Sound',
	});
	t.is(options.title, 'Title');
	t.is(options.message, 'Message');
	t.is(options.icon, 'Icon');
	t.is(options.sound, 'Sound');
});

test('"Mute sound with lowercase value"', (t) => {
	const options = notifierOptions({sound: 'mute'});
	t.false(options.sound);
});

test('"Mute sound with uppercase value"', (t) => {
	const options = notifierOptions({sound: 'Mute'});
	t.false(options.sound);
});
