import { jsFile, cssFile, imgFile } from './fixtures/examples';

import loadx from '../src/index';

describe('loadx', () => {
	describe('loadx.js()', () => {
		it('should load a js file', async () => {
			const url = window.URL.createObjectURL(jsFile);
			const req = loadx.js(url);

			expect(req).toBeInstanceOf(Promise);

			const element = await req;

			expect(element.tagName).toBe('SCRIPT');
			expect(element.getAttribute('src')).toBe(url);
			expect(window.test).toBe(1);
		});

		it('should return a rejected promise for 404 responses', async () => {
			const req = loadx.js('/foo.js');

			expect(req).toBeInstanceOf(Promise);

			const spy = jasmine.createSpy();
			await req.catch(spy);
			expect(spy).toHaveBeenCalledTimes(1);
			expect(spy).toHaveBeenCalledWith(
				jasmine.objectContaining({
					message: `The asset ${window.location.origin}/foo.js didn't load correctly.`
				})
			);
		});
	});

	describe('loadx.css()', () => {
		it('should load a css file', async () => {
			const url = window.URL.createObjectURL(cssFile);
			const req = loadx.css(url);

			expect(req).toBeInstanceOf(Promise);

			const element = await req;

			expect(element.tagName).toBe('LINK');
			expect(element.getAttribute('type')).toBe('text/css');
			expect(element.getAttribute('rel')).toBe('stylesheet');
			expect(element.getAttribute('href')).toBe(url);
		});

		it('should return a rejected promise for 404 responses', async () => {
			const req = loadx.js('/foo.css');

			expect(req).toBeInstanceOf(Promise);

			const spy = jasmine.createSpy();
			await req.catch(spy);
			expect(spy).toHaveBeenCalledTimes(1);
			expect(spy).toHaveBeenCalledWith(
				jasmine.objectContaining({
					message: `The asset ${window.location.origin}/foo.css didn't load correctly.`
				})
			);
		});
	});

	describe('loadx.img()', () => {
		it('should load a img file', async () => {
			const req = loadx.img(imgFile);

			expect(req).toBeInstanceOf(Promise);

			const element = await req;

			expect(element.tagName).toBe('IMG');
			expect(element.getAttribute('src')).toBe(imgFile);
		});

		it('should return a rejected promise for 404 responses', async () => {
			const req = loadx.img('/foo.png');

			expect(req).toBeInstanceOf(Promise);

			const spy = jasmine.createSpy();
			await req.catch(spy);
			expect(spy).toHaveBeenCalledTimes(1);
			expect(spy).toHaveBeenCalledWith(
				jasmine.objectContaining({
					message: `The asset ${window.location.origin}/foo.png didn't load correctly.`
				})
			);
		});
	});
});
