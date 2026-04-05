module.exports = {
	root: true,
	extends: ['eslint:recommended', 'plugin:svelte/recommended', 'prettier'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte']
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	rules: {
		// Variables prefixed with _ are intentionally unused
		'no-unused-vars': ['error', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
		// {@html} is used intentionally on this personal site with trusted content
		'svelte/no-at-html-tags': 'warn',
		// Suppresses Svelte compiler warnings (e.g. ...rest in $props() for non-custom-elements)
		'svelte/valid-compile': ['error', { ignoreWarnings: true }]
	}
};
