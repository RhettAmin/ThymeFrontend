const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
    important: true,
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
                background: '#E7F3DC',
                header: '#C2E1A9',
                footer: '#ECD1AD',
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