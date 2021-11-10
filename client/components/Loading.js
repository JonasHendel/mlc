import MlcLoading from "./MlcLogo";
import {motion, useAnimation } from 'framer-motion'
import {useEffect} from 'react'

const Loading = () => {
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
    <div className="flex items-center justify-center h-screen">
      <MlcLoading animate={svg}/>
    </div>
  )
}

export default Loading
