import test from 'ava';
import m from '.';

test('command', t => {
	t.is(m('unicorns'), undefined);
});
