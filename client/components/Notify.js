import { X } from 'phosphor-react';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearNotify } from '../store/features/notifySlice';

const Notify = ({ msg }) => {
	const toast = useAnimation();

	const dispatch = useDispatch();

	const notify = useSelector((state) => state.notify);
	console.log('no', notify);

	const { success, error } = notify;

	// useEffect(() => {
	// 	const interval = setInterval(() => {
	// 		toast.start({
	// 			x: [0, 5, -5, 5, -5, 5, 0],
	// 			transition: {
	// 				duration: 0.5,
	// 			},
	// 		});
	// 	}, 10000);
	// 	return () => clearInterval(interval);
	// });

	console.log(error.length);

	return (
		<>
			{success.length > 0 && (
				<motion.div
					animate={{
						x: [0, 5, -5, 5, -5, 5, 0],
						transition: {
							duration: 0.5,
							repeat: Infinity,
							repeatDelay: 1,
						},
					}}
					className='bg-green-600 top-9 w-400px -ml-200 min-h-10 p-2 flex justify-center items-center rounded-md left-2/4  absolute'>
					<p className='text-center'>{success}</p>
					<span className='cursor-pointer absolute top-1 right-1'>
						<X weight='bold' size={17} onClick={() => dispatch(clearNotify())} />
					</span>
				</motion.div>
			)}
			{error.length > 0 && (
				<motion.div
					animate={{
						x: [0, 5, -5, 5, -5, 5, 0],
						transition: {
							duration: 0.5,
							repeat: Infinity,
							repeatDelay: 10,
						},
					}}
					className='bg-red-600 top-9 z-9999 w-400px -ml-200 min-h-10 p-2 flex justify-center items-center rounded-md left-2/4  absolute'>
					<p className='text-center'>{error}</p>
					<span className='cursor-pointer absolute top-1 right-1'>
						<X weight='bold' size={17} onClick={() => dispatch(clearNotify())} />
					</span>
				</motion.div>
			)}
		</>
	);
};

export default Notify;
