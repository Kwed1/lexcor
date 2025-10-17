import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const useScrollToTop = () => {
	const { pathname } = useLocation()

	useEffect(() => {
		// Прокручиваем в начало страницы при изменении маршрута
		window.scrollTo(0, 0)
	}, [pathname])
}
