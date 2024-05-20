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
                primary: '#485841',
                background: '#E4DED1',
                footer: '#A59070',
                button: '#A9CC99',
                recipeCard: '#F5E1C5'
            },
            fontFamily: {
                Ultra: [
                    'Ultra-Regular', defaultTheme.fontFamily.Ultra
                ]
            }
        },
        
    },
}