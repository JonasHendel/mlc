module.exports = {
	purge: [],
	darkMode: false, // or 'media' or 'class'
	theme: {
    extend: {
      boxShadow: {
        even: '0 0 20px 4px rgb(125, 125, 125, 0.1 )',
      },
			zIndex: {
				9999: '9999',
			},
      height:{
        '1px': '2px',
      },
			minHeight: {
				96: '24rem',
        10: '2.5rem'
			},
			backgroundColor: {
				primary: '#252525',
        secondary: '#404040'
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
