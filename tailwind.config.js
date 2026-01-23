import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './node_modules/@selemondev/svelte-marquee/dist/*.svelte'
  ],
  theme: {
		extend: {
			keyframes: {
				'marquee-left': {
					from: { transform: 'translateX(0)' },
					to: { transform: 'translateX(calc(-100% - var(--gap)))' }
				},
				'marquee-up': {
					from: { transform: 'translateY(0)' },
					to: { transform: 'translateY(calc(-100% - var(--gap)))' }
				},
				'marquee': {
					from: { transform: "translateX(0)" },
					to: { transform: "translateX(calc(-100% - var(--gap)))" },
				},
				"marquee-vertical": {
					from: { transform: "translateY(0)" },
					to: { transform: "translateY(calc(-100% - var(--gap)))" },
				},
			},
			animation: {
				'marquee-left': 'marquee-left var(--duration, 40s) linear infinite',
				'marquee-up': 'marquee-up var(--duration, 40s) linear infinite',
				'marquee': "marquee var(--duration) linear infinite",
				'marquee-vertical': "marquee-vertical var(--duration) linear infinite",
			}
		}
	},
	plugins: [animate]
}