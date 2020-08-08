/**
 * @public
 * @typedef Attributes
 * @type {{[name: string]: string | boolean}}
 */

/**
 * @typedef BodylessMethod
 * @type {(url: string) => Promise<HTMLElement>}
 */

/** */
export default (function () {
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
			let element = document.createElement(tag);

			element.onload = function () {
				resolve(element);
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

	return loadx;
})();
