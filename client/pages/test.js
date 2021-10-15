import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react/cjs/react.development';
import Loading from '../components/Loading';

const Test = () => {
	const plane1 = useAnimation();
	const plane2 = useAnimation();
	const plane3 = useAnimation();

	const svg = useAnimation();

	useEffect(() => {
		const interval = setInterval(() => {
			svg.start({ scale: [1, 0.9, 1], transition: { duration: 3 } });
			plane1.start({ x: [0, -20, 0, -20, 0], transition: { duration: 3 } });
			plane2.start({ x: [0, 20, 0, 20, 0], transition: { duration: 3 } });
			plane3.start({ y: [0, -20, 0, -20, 0], transition: { duration: 3 } });
		}, 3000);

		return () => clearInterval(interval);
	});

	return (
		<Loading/>
	);
};

export default Test;
