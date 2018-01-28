import test from 'ava';
import errorNotifier from '../lib/error-notifier';

test('"Unknown command"', async t => {
	const result = await t.throws(errorNotifier('Hej'));
	t.is(result.stdout, '');
	t.is(result.code, 127);
	t.regex(result.stderr, /Hej: command not found/);
});

test('"Command which exits with exit code other than 1"', async t => {
	const result = await t.throws(errorNotifier('tar'));
	t.is(result.stdout, '');
	t.is(result.code, 1);
	t.regex(result.stderr, /tar: Must specify one of -c, -r, -t, -u, -x/);
});

test('"Command which exits properly with exit code 0"', async t => {
	await t.notThrows(errorNotifier('echo Hej'));
	const result = await errorNotifier('echo Hej');
	t.is(result.stdout, 'Hej');
	t.is(result.code, 0);
	t.is(result.stderr, '');
});
