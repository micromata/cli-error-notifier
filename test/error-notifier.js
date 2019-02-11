import test from 'ava';
import errorNotifier from '../lib/error-notifier';

test('"Unknown command"', async t => {
	const result = await t.throwsAsync(errorNotifier('Hej'));
	t.is(result.stdout, '');
	t.is(result.code, 127);
	t.regex(result.stderr, /Hej:.+not found/);
});

test('"Command which fails with an exit code other than 0"', async t => {
	const result = await t.throwsAsync(errorNotifier('tar'));
	t.is(result.stdout, '');
	t.not(result.code, 0);
	t.regex(result.stderr, /tar:.+must specify one of/i);
});

test('"Command which exits properly with exit code 0"', async t => {
	await t.notThrowsAsync(errorNotifier('echo Hej'));
	const result = await errorNotifier('echo Hej');
	t.is(result.stdout, 'Hej');
	t.is(result.code, 0);
	t.is(result.stderr, '');
});
