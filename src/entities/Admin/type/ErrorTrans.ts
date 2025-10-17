export interface ErrorTransInt {
	id:string,
	date: string,
	buyer: string,
	seller: string,
	coins: string,
	read: boolean;
	price: string,
	buyer_commission_paid: boolean,
	seller_commission_paid: boolean,
	buyer_coin_transferred_to_bot: boolean,
	seller_coin_transferred_to_bot: boolean,
	bot_send_money_to_seller: boolean,
	bot_send_money_to_buyer: boolean,
	error_message: string,
	type: string
	buyer_link: string,
  seller_link: string
}