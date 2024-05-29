const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
    content: [
        "./app/**/*.{js,jsx,ts,tsx}", 
        "./Components/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
        extend: {
            flex: {
                'small': '0.1 0.1 0%'
            },
            colors: {
                primary: '#48652d',
                background: '#e7f3dc',
                header: '#C2E1A9',
                footer: '#a98a5c',
                button: '#C2E1A9',
                recipeCard: '#E1E4B2'
            },
            fontFamily: {
                Ultra: [
                    'Ultra-Regular', defaultTheme.fontFamily.Ultra
                ]
            }
        },
        
    },
}