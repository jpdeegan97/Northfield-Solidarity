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
                brand: 'var(--c-brand)',
                'brand-light': 'var(--c-brand-light)',
                accent: 'var(--c-accent)',
                bg: 'var(--c-bg)',
                surface: 'var(--c-surface)',
                text: 'var(--c-text)',
                'text-sub': 'var(--c-text-sub)',
                border: 'var(--c-border)',
                'card-bg': 'var(--c-card-bg)',
            }
        },
    },
    plugins: [
        typography,
    ],
}
