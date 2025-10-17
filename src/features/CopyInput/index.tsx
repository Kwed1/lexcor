import { motion } from 'framer-motion'
import { useState } from 'react'
import { ReactComponent as Copy } from '../../assets/copy.svg'
import { CopyService } from '../../shared/services/copy-service'
import { CopyInput as CopyInputProps } from './model'

export default function CopyInput({ url }: CopyInputProps) {
	const [copied, setCopied] = useState(false)
	
	const HandleCopy = () => {
        CopyService(url)
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

    return (
        <div className="flex items-center space-x-2 px-4 rounded-xl bg-crypto-bg-secondary justify-between shadow-crypto border border-crypto-border-primary">
            <input
                type="text"
                value={url}
				disabled={true}
                className="border-none bg-transparent text-crypto-text-primary font-mono w-full"
            />
            <motion.button 
				className='h-[35px] w-[35px] flex justify-center items-center rounded-lg hover:bg-crypto-bg-hover transition-colors relative' 
				onClick={HandleCopy}
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
			>
                <Copy className='w-[17px] h-[17px] fill-crypto-text-secondary'/>
				{copied && (
					<motion.span
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0 }}
						className="absolute -top-8 bg-crypto-success text-white text-xs px-2 py-1 rounded"
					>
						Copied!
					</motion.span>
				)}
            </motion.button>
        </div>
    );
}