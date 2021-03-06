/**
 * @vitest-environment happy-dom
 */

import { config, mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import ElementPlus from 'element-plus';
import { describe, expect, it, vi } from 'vitest';
import Avatar from '@/components/layout/components/header-title.vue';

config.global.stubs['use-icon'] = () => ('mock');

describe('Avatar', () => {
	it('should render', () => {
		const wrapper = mount(Avatar, {
			global: {
				plugins: [
					createTestingPinia({
						createSpy: vi.fn
					}),
					ElementPlus
				]
			}
		});
		expect(wrapper.find('header').exists()).toBeTruthy();
	});
});
