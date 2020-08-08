# redaxios

This super simple loader allows for loading of image, CSS, and JavaScript files, using the [Promise API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch), and fires a callback upon success or failure.

### Usage

```js
import loadx from 'loadx';

async function getUser() {
	await loadx.js('https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.min.js');

	// from here you can start using axios
	const user = await axios.get('/user?ID=12345');
}
```
