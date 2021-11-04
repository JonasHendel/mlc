module.exports = {
	purge: [],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			boxShadow: {
				even: '0 0 20px 4px rgb(125, 125, 125, 0.1 )',
			},
			zIndex: {
				9999: '999',
			},
			height: {
				'1px': '2px',
			},
			width: {
				'400px': '400px',
			},
			margin: {
				'-200': '-200px',
			},
			minHeight: {
				96: '24rem',
				10: '2.5rem',
				90: '90%',
			},
			maxHeight: {
				90: '90%',
			},
			backgroundColor: {
				primary: '#252525',
				secondary: '#404040',
				tertiary: 'rgba(0, 0, 0, 0.7)',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
