import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter()
	},
	onwarn: (warning, handler) => {
		console.log(warning.code)
		const ignoreWarnings = [
			'a11y-click-events-have-key-events',
			'a11y-label-has-associated-control',
			'a11y-no-onchange',
			'a11y-invalid-attribute',
			'a11y-no-noninteractive-element-interactions',
			'a11y-no-static-element-interactions',
		]
		if (ignoreWarnings.includes(warning.code)) return
		handler(warning)
	},
};

export default config;
