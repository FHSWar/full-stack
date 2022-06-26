import { setHook } from 'test/util';
import scheduler from 'node-schedule';

setHook();

jest.mock('node-schedule', () => ({
	scheduleJob: jest.fn()
}));

describe('scheduler', () => {
	it('should be called with upateLogger', () => {
		expect(scheduler.scheduleJob).toBeCalledWith(
			'upateLogger',
			'0 0 * * *',
			expect.any(Function)
		);
	});
});