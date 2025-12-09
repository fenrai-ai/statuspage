/** @type {import('tailwindcss').Config} */
const fenraiTheme = {
	primary: '#9c7bff',
	'primary-content': '#050505',
	secondary: '#8d9bff',
	'secondary-content': '#050505',
	accent: '#ff6ad5',
	neutral: '#1b1b1f',
	'base-100': '#0a0a0d',
	'base-200': '#050505',
	'base-300': '#111112',
	info: '#8de4ff',
	success: '#10b981',
	warning: '#fbbf24',
	error: '#fb7185'
};

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,svelte,ts}', './index.html'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				heading: ['Urbanist', 'Inter', 'sans-serif']
			},
			boxShadow: {
				glow: '0px 20px 45px rgba(117, 105, 255, 0.25)'
			},
			backgroundImage: {
				'fenrai-radial':
					'radial-gradient(circle at 20% 0%, rgba(156,123,255,0.2), transparent 55%)'
			},
			colors: {
				'fenrai-bg': '#050505',
				'fenrai-card': '#0f0f12'
			}
		}
	},
	/* eslint @typescript-eslint/no-require-imports: "off" */
	plugins: [require('daisyui')],
	daisyui: {
		logs: false,
		themes: [
			{
				fenrai: fenraiTheme
			},
			'dark'
		]
	}
};
