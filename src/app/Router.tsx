
import { Route, Routes } from 'react-router-dom'
import { NavPanelProvider } from '../context/necessary'
import Home from '../pages'
import Admin from '../pages/admin'
import CreateDeal from '../pages/createDeal'
import Myads from '../pages/myads'
import PasswordPage from '../pages/password'
import Payment from '../pages/payment'
import Successpage from '../pages/success'
import TradePage from '../pages/trades'
import Transactionpage from '../pages/transaction'
import UserInfopage from '../pages/userinfo'
import Walletpage from '../pages/wallet'
import { useScrollToTop } from '../shared/hooks/useScrollToTop'


export default function Router() {
	// Автоматически прокручиваем в начало при смене страницы
	useScrollToTop()
	return (
		<Routes>
			<Route path='/' element={
				<NavPanelProvider>
			   <Home/>
				 </NavPanelProvider>
				} />
			<Route path='/myads' element={
				<NavPanelProvider>
			   <Myads/>
				 </NavPanelProvider>
				} />
			<Route path='/success' element={
			   <Successpage/>
				} />
			<Route path='/wallet' element={
				<NavPanelProvider>
			   <Walletpage/>
				 </NavPanelProvider>
				} />
			<Route path='/admin' element={
				<NavPanelProvider>
			   <Admin/>
				 </NavPanelProvider>
				} />
			<Route path='/createDeal' element={
			   <CreateDeal/>
				} />
			<Route path='/trades/:id' element={
			   <TradePage/>
				} />
			<Route path='/userInfo/:id' element={
			   <UserInfopage/>
				} />
			<Route path='/payment' element={
				<NavPanelProvider>
			   <Payment/>
				</NavPanelProvider>
				} />
			<Route path='/set-password' element={
				<NavPanelProvider>
			   <PasswordPage/>
				 </NavPanelProvider>
				} />
			<Route path='/transaction/:id' element={
				<NavPanelProvider>
			   <Transactionpage/>
				</NavPanelProvider>
				} />
		</Routes>
	)
}