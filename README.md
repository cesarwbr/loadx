# loadx [![npm](https://img.shields.io/npm/v/loadx.svg?style=flat)](https://www.npmjs.org/package/loadx) ![CI](https://github.com/cesarwbr/loadx/workflows/CI/badge.svg)

> Simple asset loader that allows loading of image, CSS, and JavaScript files, using the [Promise API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch), and fires a callback upon success or failure.

- 🚚 Load **JS**, **CSS** or **Image**
- 🚀 Cache results
- ⏳️ Works beautifully with promise and async/await
- 📦️ Just **400 bytes** of gzipped ES3

## Install

```sh
$ npm install --save loadx
```

### Usage

```js
import loadx from 'loadx';

async function getUser() {
	// loading a JavaScript resource
	await loadx.js('https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.min.js');

	// from here you can start using axios normally
	const user = await axios.get('/user?ID=12345');

	// you can do the same thing with CSS
	await loadx.css('https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css');

	// and with image and receive the element
	const imageElement = await loadx.img('https://picsum.photos/200/300');
}

getUser();
```

### License

[Apache-2.0](https://github.com/cesarwbr/loadx/blob/master/LICENSE) © [Cesar William](https://www.cesarwilliam.com)
