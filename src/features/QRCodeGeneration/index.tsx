import { motion } from 'framer-motion'
import QRCode from 'react-qr-code'
import { QRProps } from './model'

export default function QRCodeGeneration({url}:QRProps) {
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.8 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.4 }}
			className='bg-white p-4 rounded-xl'
		>
			<QRCode 
				value={url} 
				size={200}
				style={{ height: "auto", maxWidth: "100%", width: "100%" }}
				viewBox={`0 0 200 200`}
			/>
		</motion.div>
	)
}