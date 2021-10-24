import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

const Test = () => {
	const plane1 = useAnimation();
	const plane2 = useAnimation();
	const plane3 = useAnimation();

	// const svg = useAnimation();

	// svg.start({ scale: [1, 0.9, 1], transition: { duration: 3 } });

	// useEffect(() => {
	// 	const interval = setInterval(() => {
	// 		svg.start({ scale: [1, 0.9, 1], transition: { duration: 3 } });
	// 	}, 3000);

	// 	return () => clearInterval(interval);
	// });

	return (
		// <motion.div animate={{ scale: [1, 0.9, 1, 0.9, 1, 0.9, 1, 0.9, 1], transition: { duration: 3 } }}>
		<motion.div>
			<xml version='1.0' encoding='UTF-8' standalone='no' />
			<svg xmlns='http://www.w3.org/2000/svg' id='svg8' version='1.1' viewBox='0 0 117.5771 117.57711' height='250'>
				<g id='layer1' transform='translate(-39.395921,-94.217282)'>
					<g id='g5318' transform='matrix(0.20630511,0.00705532,-0.00705532,0.20630511,125.50023,28.152284)' strokeWidth='1.36719'>
						<ellipse id='circle4657' cy='636.64795' cx='-107.1429' fill='#312e80' fillOpacity='1' strokeWidth='1.36719' rx='249.99994' ry='250' />
						<path
							id='path4659'
							d='m 142.85704,636.64796 c 0,-50.15918 -14.76953,-96.86621 -40.20019,-136.01074 0,0 -14.261714,20.83398 -11.582027,34.22558 2.677734,13.39356 18.413077,14.41602 16.796867,24.24024 -1.61621,9.82422 -13.223625,-2.81153 -27.511708,23.0791 -14.287106,25.89258 -7.140623,61.61719 13.392575,64.29102 20.534173,2.67187 49.104483,-9.8252 49.104483,-9.8252 z'
							fill='#4aa158'
							fillOpacity='1'
							strokeWidth='1.36719'
						/>
						<path
							id='path4661'
							d='m -41.488621,395.3589 c 29.098626,7.89843 56.087877,20.92187 79.938457,38.03808 0,0 -28.9882739,-4.78125 -39.9697165,5.03711 -10.9804665,9.82129 -26.9951105,33.03907 -39.9697165,0 -12.972653,-33.03711 9.76e-4,-43.07519 9.76e-4,-43.07519 z'
							fill='#4aa158'
							fillOpacity='1'
							strokeWidth='1.36719'
						/>
						<path
							id='path4663'
							d='m -295.11258,471.82276 c 45.81835,-52.21191 113.04294,-85.1748 187.96968,-85.1748 0,0 -16.96093,10.26953 15.181635,27.67969 32.143547,17.41211 17.410152,25.44629 10.713865,30.80371 -6.695311,5.35742 -18.309566,-10.71387 -25.8955,-21.42676 -7.58691,-10.71582 -40.16796,-27.23144 -65.16991,-18.30078 -25.00097,8.93066 -46.42479,15.52734 -42.85643,23.83594 3.56738,8.30664 46.42479,-7.75879 62.49608,-6.87012 16.07128,0.89062 10.71386,10.70996 -4.46192,22.31836 -15.17773,11.6084 -16.96679,25.89258 -0.89453,34.82031 16.07031,8.93164 35.70898,9.8252 40.1787,4.46875 4.4668,-5.35742 -8.03613,-40.17871 22.322264,-25.00195 30.35839,15.17676 55.359361,24.1123 30.35839,46.43066 -25.001946,22.31641 -53.571274,47.3252 -54.465804,61.60547 -0.89453,14.28223 8.93164,25.89844 3.57422,26.78711 -5.35743,0.88867 -10.27442,-5.80176 -13.84375,-10.71582 -3.56738,-4.91113 -20.08886,-6.69434 -28.12402,-3.57227 -8.03613,3.12207 -23.21679,15.17676 -14.73242,26.78516 8.48535,11.61035 20.08301,6.24609 31.69336,11.60449 11.60839,5.35742 22.43358,25.74707 20.21093,30.35547 -2.22266,4.60645 -12.11816,-1.22656 -20.21093,-16.96191 -8.09473,-15.73731 -23.27637,-5.35742 -33.958,-8.03614 -10.68262,-2.67773 -18.71875,-4.46289 -29.43359,-23.21386 -10.71484,-18.74903 -32.89745,-23.9961 -41.9619,-34.82031 -25.96582,-31.00586 -24.1084,-54.46387 -29.46484,-65.17774 -5.35742,-10.7168 -19.22558,-28.22266 -19.22558,-28.22266 z'
							fill='#4aa158'
							fillOpacity='1'
							strokeWidth='1.36719'
						/>
						<path
							id='path4665'
							d='m -83.036462,640.22023 c 0,0 26.786126,2.67382 40.178701,14.28418 13.392575,11.60839 15.181637,16.07519 35.7158115,20.53808 20.5341745,4.46094 29.4648365,16.06543 16.0712852,38.38965 -13.3925749,22.32129 -37.5038967,58.03711 -49.1083867,68.75195 -11.603512,10.71582 -25.890618,19.64356 -31.248039,37.5 -5.356444,17.85449 -7.145506,28.5625 4.46289,35.71094 0,0 -6.246093,15.18066 -20.533198,-4.46289 -14.288082,-19.64551 -2.679687,-42.85645 0,-56.25 2.677733,-13.3916 9.819333,-53.56641 5.355467,-63.39258 -4.460936,-9.82324 -25.000969,-16.07519 -30.358389,-36.60742 -5.35742,-20.5332 4.01855,-60.49219 29.463858,-54.46191 z'
							fill='#4aa158'
							fillOpacity='1'
							strokeWidth='1.36719'
						/>
					</g>
					<path
						d='m 69.841061,124.28619 c -0.150302,0.89788 -1.033209,2.29175 -2.680638,4.20619 l -4.181309,4.859 -1.38597,15.99749 -0.01588,0.15486 c -0.05054,0.24475 -0.141968,0.45229 -0.274323,0.62206 l -1.429766,1.83389 c -0.135748,0.17412 -0.281548,0.26943 -0.437012,0.28562 -0.232784,0.0243 -0.356461,-0.1225 -0.371322,-0.43854 l -0.868441,-12.89747 -4.964423,5.76903 c -0.441302,3.60862 -0.710026,5.64307 -0.778878,5.87907 -0.06916,0.23707 -0.171937,0.43779 -0.308292,0.60163 l -1.472162,1.7689 c -0.139703,0.16786 -0.281111,0.25937 -0.423864,0.27424 -0.183256,0.0191 -0.282272,-0.10664 -0.29722,-0.37587 l -0.08115,-6.55477 -2.627619,-2.83331 c -0.10282,-0.10287 -0.105382,-0.28618 -0.0084,-0.54919 0.07113,-0.19289 0.168446,-0.35689 0.29198,-0.4924 l 1.311164,-1.45034 c 0.120941,-0.13265 0.241908,-0.20883 0.363172,-0.22873 0.121399,-0.0199 1.063366,0.25572 2.878616,0.84408 l 4.790943,-5.40593 -5.675579,-3.46676 c -0.11054,-0.0598 -0.123039,-0.20511 -0.0381,-0.43543 0.05637,-0.15287 0.137991,-0.28525 0.244878,-0.39744 l 1.129511,-1.18548 c 0.104908,-0.11011 0.212266,-0.1766 0.322287,-0.19964 0.03139,-0.006 0.05318,-0.006 0.06523,6.7e-4 l 8.582925,0.45815 4.061253,-4.58256 c 1.60335,-1.80917 2.762021,-2.77963 3.511947,-2.9486 0.277072,-0.0624 0.48727,-0.0121 0.630805,0.15215 0.144526,0.16531 0.190117,0.40996 0.135689,0.7351 z'
						id='path6'
						fill='#ffffff'
						fillOpacity='1'
						stroke='none'
					/>
					<path
						d='m 132.04053,125.48647 c 0.66873,0.26518 1.61785,1.22026 2.89288,2.92541 l 3.35201,4.48277 8.66124,1.47613 0.0671,0.0135 c 0.11108,0.0437 0.21566,0.12347 0.31397,0.23955 l 1.06718,1.2601 c 0.1018,0.12022 0.17571,0.25216 0.22161,0.39606 0.0693,0.21717 0.0439,0.33931 -0.0767,0.36522 l -6.20269,1.66785 4.47342,5.98249 c 2.00703,-0.0659 3.05125,-0.0729 3.18152,-0.0229 0.13026,0.05 0.25568,0.15184 0.37664,0.30576 l 1.31714,1.67632 c 0.1261,0.16044 0.22113,0.34078 0.28515,0.54148 0.0829,0.25979 0.0709,0.43386 -0.0369,0.521 l -3.14242,1.95924 -0.68703,6.39011 c -0.0262,0.28925 -0.14769,0.39469 -0.36424,0.31443 -0.15952,-0.0587 -0.31027,-0.19482 -0.45134,-0.40614 l -1.48507,-2.20609 c -0.13429,-0.20123 -0.22746,-0.42819 -0.27966,-0.68023 -0.0518,-0.25033 -0.13969,-2.29327 -0.25388,-5.82352 l -4.59385,-6.47512 -2.45755,11.58139 c -0.0562,0.2989 -0.20668,0.40412 -0.45116,0.3135 -0.16309,-0.0606 -0.30539,-0.19385 -0.42653,-0.3995 l -1.26051,-2.13998 c -0.11528,-0.1957 -0.18265,-0.41502 -0.20238,-0.65734 -0.005,-0.0688 -0.004,-0.11843 0.004,-0.14861 l 0.66293,-14.37209 -3.39639,-4.78728 c -1.28693,-1.81394 -1.9152,-3.05115 -1.93165,-3.76212 -0.006,-0.25628 0.0689,-0.43292 0.22363,-0.53143 0.15361,-0.0978 0.35316,-0.0976 0.59936,10e-6 z'
						id='path6-6'
						fill='#ffffff'
						fillOpacity='1'
						stroke='none'
					/>
					<path
						d='m 98.864513,113.87018 c -0.863006,-0.45153 -1.170149,-1.35114 -0.945431,-2.64602 l 0.49188,-2.83438 -10.822045,-3.4223 -0.07659,-0.0255 c -0.0959,-0.0461 -0.130293,-0.0963 -0.103435,-0.15063 l 0.28167,-0.56921 c 0.02593,-0.0525 0.106101,-0.0972 0.240315,-0.13443 0.200835,-0.0556 0.400026,-0.0659 0.598348,-0.0307 l 10.337389,1.70707 0.384527,-2.21575 c -2.401195,-0.54377 -3.620975,-0.82892 -3.722027,-0.86961 -0.100777,-0.0406 -0.144037,-0.0849 -0.130009,-0.13296 l 0.147293,-0.50415 c 0.01355,-0.0465 0.0803,-0.0863 0.200014,-0.11948 0.153601,-0.0426 0.329492,-0.0535 0.528178,-0.0329 l 5.080333,0.6263 5.28333,-0.35964 c 0.2091,-0.0156 0.39163,0.004 0.54808,0.0575 0.11561,0.0399 0.17499,0.0838 0.17791,0.13162 l 0.0441,0.52317 c 0.003,0.0495 -0.0523,0.092 -0.16609,0.12751 -0.11402,0.0356 -1.4351,0.25552 -3.99995,0.66566 l -0.13237,2.23836 11.1903,-1.078 c 0.22309,-0.024 0.43629,-6.3e-4 0.64015,0.0696 0.1364,0.0471 0.21233,0.0987 0.22752,0.15483 l 0.16481,0.60953 c 0.0161,0.0582 -0.0342,0.10808 -0.14989,0.14959 -0.0333,0.0118 -0.0631,0.019 -0.0895,0.0215 l -12.14034,2.72794 -0.16965,2.86884 c -0.0776,1.31164 -0.597,2.1817 -1.56566,2.55321 -0.36003,0.13809 -0.7626,0.1973 -1.2057,0.17708 -0.442458,-0.0202 -0.825436,-0.11503 -1.147513,-0.28354 z'
						id='path6-6-6'
						fill='#ffffff'
						fillOpacity='1'
						stroke='none'
					/>
				</g>
			</svg>
		</motion.div>
	);
};

export default Test;
