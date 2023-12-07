/**
 * @public
 * @typedef Attributes
 * @type {{[name: string]: string | boolean}}
 */

/**
 * @typedef BodylessMethod
 * @type {(url: string, options?: {[name: string]: string | boolean}) => Promise<HTMLElement>}
 */

/**
 * @typedef BodylessParentMethod
 * @type {(url: string, parent?: HTMLElement, options?: {[name: string]: string | boolean}) => Promise<HTMLElement>}
 */

/**
 * @typedef Cache
 * @type {{[attrsStr: string]: HTMLElement }}
 */

/** */
export default (function () {
	/** @private @type {Cache} */
	const cache = {};

	/** @public @type {BodylessMethod} */
	loadx.js = (url, options = {}) => loadx('script', document.body, { src: url, ...options });

	/** @public @type {BodylessMethod} */
	loadx.css = (url, options = {}) => loadx('link', document.head, { type: 'text/css', rel: 'stylesheet', href: url, ...options });

	/** @public @type {BodylessParentMethod} */
	loadx.img = (url, parent, options = {}) => loadx('img', getParent(parent), { src: url, ...options });

	/**
	 * Load different file types
	 * @public
	 * @param {string} tag
	 * @param {HTMLElement | null} parent
	 * @param {Attributes} attrs
	 * @returns {Promise<HTMLElement>}
	 */
	function loadx(tag, parent, attrs) {
		return new Promise(function (resolve, reject) {
			if (parent === null || !(parent instanceof HTMLElement)) {
				return reject(new Error('Parent not found.'));
			}

			const cachedResult = getCachedResult(attrs);

			if (cachedResult !== null) {
				return resolve(cachedResult);
			}

			let element = document.createElement(tag);

			element.onload = function () {
				resolve(element);
				setCacheResult(attrs, element);
			};

			element.onerror = function (oError) {
				// @ts-ignore
				reject(new URIError('The asset ' + oError.target.src + " didn't load correctly."));
			};

			Object.keys(attrs).forEach((key) => {
				element[key] = attrs[key];
			});

			parent.appendChild(element);
		});
	}

	/**
	 * Get cached result
	 * @private
	 * @param {Attributes} attrs
	 * @returns {HTMLElement | null}
	 */
	function getCachedResult(attrs) {
		const attrsStr = JSON.stringify(attrs);

		const cacheValue = cache[attrsStr];
		if (typeof cacheValue !== 'undefined') {
			return cacheValue;
		}

		return null;
	}

	/**
	 * Set cache result
	 * @private
	 * @param {Attributes} attrs
	 * @param {HTMLElement} element
	 * @returns {void}
	 */
	function setCacheResult(attrs, element) {
		const attrsStr = JSON.stringify(attrs);

		cache[attrsStr] = element;
	}

	/**
	 * Get parent container
	 * @private
	 * @param {HTMLElement | undefined} parent
	 * @returns {HTMLElement | null}
	 */
	function getParent(parent) {
		if (parent === undefined) {
			return document.body;
		}

		return parent;
	}

	return loadx;
})();
