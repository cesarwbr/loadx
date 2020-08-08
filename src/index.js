/**
 * @public
 * @typedef Attributes
 * @type {{[name: string]: string | boolean}}
 */

/**
 * @typedef BodylessMethod
 * @type {(url: string) => Promise<HTMLElement>}
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
	loadx.js = (url) => loadx('script', 'body', { src: url });

	/** @public @type {BodylessMethod} */
	loadx.css = (url) => loadx('link', 'head', { type: 'text/css', rel: 'stylesheet', href: url });

	/** @public @type {BodylessMethod} */
	loadx.img = (url) => loadx('img', 'body', { src: url });

	/**
	 * Load different file types
	 * @public
	 * @param {string} tag
	 * @param {string} parent
	 * @param {Attributes} attrs
	 * @returns {Promise<HTMLElement>}
	 */
	function loadx(tag, parent, attrs) {
		return new Promise(function (resolve, reject) {
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

			document[parent].appendChild(element);
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

	return loadx;
})();
