
import { createContext, ReactNode, useContext, useRef } from 'react'
import { matchPath, useLocation, useNavigate } from 'react-router-dom'
import { useSignIn } from '../api/auth/auth'
import GetCoinsApi from '../entities/Admin/api/GetCoins'
import { useGetWallet } from '../shared/services/api/get-wallet/get-wallet'
import { useCoinStore } from '../shared/store/CoinsStore'
import { useTokenStore } from '../shared/store/TokenStore'
import Footer from '../shared/ui/footer'
import Header from '../shared/ui/header'
const NavContext = createContext<NavContextType | undefined>(undefined)


interface NavContextType {
	getWallet: () => void
}

export interface idInterface {
	token: string,
}

export const useNecessary = () => {
	const context = useContext(NavContext)

	if (context === undefined) {
		throw new Error('useNecessary must be used within a NavPanelProvider')
	}
	return context
}

interface NavPanelProviderInt {
	children: ReactNode
}
interface Decoded {
	exp:number,
	role:string,
	id:string,
	sub:string,
	user_id:number
}


export const NavPanelProvider = ({ children }: NavPanelProviderInt) => {
	const location = useLocation()
	const {signIn} = useSignIn()
	const navigate = useNavigate()
	const {getWallet, getWalletAddress} = useGetWallet()
	const {setToken, setRole} = useTokenStore()
	const {setCoins} = useCoinStore()
	const {GetCoins} = GetCoinsApi()
	const authRef = useRef(false)
	const GetCoinRequest = async () => {
		const res = await GetCoins('')
		if (res?.data) setCoins(res?.data)
	}


	const isTransactionPage = matchPath("/transaction/:id", location.pathname);

	return (
		<>
			<NavContext.Provider value={{getWallet}}>
				  {location.pathname !== '/wallet' && location.pathname !== '/admin' && location.pathname !== '/payment' && !isTransactionPage && !location.pathname.startsWith('/set-password') && <Header/>}
					{children}
					{!location.pathname.startsWith('/set-password') && location.pathname !== '/payment' && !isTransactionPage && '/transaction/:id' && <Footer/>}
			</NavContext.Provider>
		</>
	)
}