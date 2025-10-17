import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Router from './app/Router'
import { ErrorProvider, useError } from './context/errorContext'
import { MockDataProvider, useMockData } from './context/MockDataProvider'
import ErrorSnackbar from './shared/errorSnackbar'

function App() {
	const [viewportHeight, setViewportHeight] = useState(window.innerHeight)
	const [viewportWidth, setViewportWidth] = useState(window.innerWidth)
	const navigate = useNavigate()
	const haveHeader = true
	const activeTab = null

	interface TelegramWebApp {
		requestFullscreen: () => void
		close: () => void
		expand: () => void
	}

	return (
		<ErrorProvider>
			<MockDataProvider>
				{/* Весь экран со скроллом */}
				<div className="w-full min-h-screen bg-crypto-bg-primary flex justify-center items-start overflow-y-auto p-5">
					{/* Центрированный контейнер контента */}
					<div className="max-w-[430px] w-full min-h-screen flex flex-col pb-[100px]">
						<AppContext />
					</div>
				</div>
			</MockDataProvider>
		</ErrorProvider>
	)
}

export default App

const AppContext = () => {
	const { error, setError } = useError()
	const { isInitialized } = useMockData()

	if (!isInitialized) {
		return (
			<div className="w-full h-screen flex flex-col items-center justify-center bg-crypto-bg-primary">
				<div className="text-center">
					<div className="relative mb-8">
						{/* Анимированный спиннер с градиентом */}
						<div className="relative">
							<div className="animate-spin rounded-full h-20 w-20 border-4 border-crypto-border-primary border-t-crypto-brand-primary mx-auto"></div>
							<div className="absolute inset-0 flex items-center justify-center">
								<div className="w-8 h-8 bg-gradient-to-r from-crypto-brand-primary to-crypto-info rounded-full animate-pulse"></div>
							</div>
						</div>
						{/* Декоративные элементы */}
						<div className="absolute -top-2 -right-2 w-4 h-4 bg-crypto-success rounded-full animate-ping"></div>
						<div className="absolute -bottom-2 -left-2 w-3 h-3 bg-crypto-info rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
					</div>
					<h2 className="text-3xl font-bold text-crypto-text-primary mb-3">Initializing Application</h2>
					<p className="text-crypto-text-secondary mb-6 max-w-md">Setting up mock data and preparing your crypto trading experience...</p>
					<div className="flex justify-center space-x-2">
						<div className="w-3 h-3 bg-crypto-brand-primary rounded-full animate-bounce"></div>
						<div className="w-3 h-3 bg-crypto-info rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
						<div className="w-3 h-3 bg-crypto-success rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<>
			<Router />
			<ErrorSnackbar error={error} onClose={() => setError('')} />
		</>
	)
}
