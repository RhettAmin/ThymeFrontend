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
                background: '#E4DED1',
                primary: '#485841',
                footer: '#A59070'
            },
            fontFamily: {
                'ultra': 'Ultra'
            }
        },
      },
}