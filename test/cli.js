import test from 'ava';
import execa from 'execa';
import isSemver from 'is-semver';

test('"Unknown command"', async t => {
	const result = await t.throwsAsync(execa('./cli.js', ['Hej']));
	t.is(result.code, 127);
	t.regex(result.stderr, /Hej:.+not found/);
});

test('"Command which fails with an exit code other than 0"', async t => {
	const result = await t.throwsAsync(execa('./cli.js', ['tar']));
	t.is(result.stdout, '');
	t.not(result.code, 0);
	t.regex(result.stderr, /tar:.+must specify one of/i);
});

test('"Command which exits properly with exit code 0"', async t => {
	await t.notThrowsAsync(execa('./cli.js', ['echo Hej']));
	const result = await execa('./cli.js', ['echo Hej']);
	t.is(result.stdout, 'Hej');
	t.is(result.code, 0);
	t.is(result.stderr, '');
});

test('"No input given"', async t => {
	const result = await t.throwsAsync(execa('./cli.js', []));
	t.is(result.code, 2);
	t.regex(result.stdout, /Invalid input. Please check the help below:/);
	t.regex(result.stdout, /Usage/);
});

test('"To much input"', async t => {
	const result = await t.throwsAsync(execa('./cli.js', ['Hu', 'Ha']));
	t.is(result.code, 2);
	t.regex(result.stdout, /Invalid input. Please check the help below:/);
	t.regex(result.stdout, /Usage/);
});

test('"wrong options"', async t => {
	const result = await t.throwsAsync(execa('./cli.js', ['echo Hej', '-p']));
	t.is(result.code, 2);
	t.regex(result.stdout, /Wrong option\(s\) provided. Please check the help below:/);
	t.regex(result.stdout, /Usage/);
});

test('"Show version number via flag"', async t => {
	await t.notThrowsAsync(execa('./cli.js', ['--version']));
	const result = await execa('./cli.js', ['--version']);
	t.true(isSemver(result.stdout));
	t.is(result.code, 0);
	t.is(result.stderr, '');
});

test('"Show version number via alias"', async t => {
	await t.notThrowsAsync(execa('./cli.js', ['-v']));
	const result = await execa('./cli.js', ['-v']);
	t.true(isSemver(result.stdout));
	t.is(result.code, 0);
	t.is(result.stderr, '');
});

test('"Show help via flag"', async t => {
	await t.notThrowsAsync(execa('./cli.js', ['--help']));
	const result = await execa('./cli.js', ['--help']);
	t.regex(result.stdout, /^\n {2}Sends native desktop notifications/m);
	t.is(result.code, 0);
	t.is(result.stderr, '');
});

test('"Show help via alias"', async t => {
	await t.notThrowsAsync(execa('./cli.js', ['-h']));
	const result = await execa('./cli.js', ['-h']);
	t.regex(result.stdout, /^\n {2}Sends native desktop notifications/m);
	t.is(result.code, 0);
	t.is(result.stderr, '');
});
