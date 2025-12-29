import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: 'rgb(var(--c-brand) / <alpha-value>)',
                'brand-light': 'rgb(var(--c-brand-light) / <alpha-value>)',
                accent: 'rgb(var(--c-accent) / <alpha-value>)',
                bg: 'rgb(var(--c-bg) / <alpha-value>)',
                surface: 'rgb(var(--c-surface) / <alpha-value>)',
                text: 'rgb(var(--c-text) / <alpha-value>)',
                'text-sub': 'rgb(var(--c-text-sub) / <alpha-value>)',
                border: 'rgb(var(--c-border) / <alpha-value>)',
                'card-bg': 'rgb(var(--c-card-bg) / <alpha-value>)',
            }
        },
    },
    plugins: [
        typography,
    ],
}
