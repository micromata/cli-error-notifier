import test from 'ava';
import errorNotifier from './error-notifier';

test('"wget unknown-host.xyz"', async t => {
	await t.throws(errorNotifier('wget unknown-host.xyz'));
});

test('"wget baumeister.io"', async t => {
	await t.notThrows(errorNotifier('wget baumeister.io'));
});
