import dayjs from 'dayjs'
import { useEffect, useRef, useState } from 'react'

interface Transaction {
  id: string;
  address: string;
  coin: string;
  end_at: string;
  buy_price: number;
  status: string;
}

export const useSocket = (userId: string) => {
  const [data, setData] = useState<Transaction | null>(null);
  const [timer, setTimer] = useState<number | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const socket = useRef<WebSocket | null>(null);
  const SOCKET_URL = `wss://aptest.devmainops.store/ws/${userId}`;

  useEffect(() => {
    const socketInstance = new WebSocket(SOCKET_URL);

    socketInstance.onopen = () => {
      console.log('Подключено к WebSocket');

      // Отправка запроса на получение данных сразу после установления соединения
      const requestData = { type: 'get-data' };
      socketInstance.send(JSON.stringify(requestData));
      console.log('Отправлен запрос на получение данных:', requestData);
    };

    socketInstance.onmessage = (event) => {
      console.log('Получено сырьё сообщения:', event.data);
      let message;

      try {
        message = JSON.parse(event.data);
        console.log('Парсинг сообщения:', message);
      } catch (error) {
        console.error('Ошибка парсинга сообщения:', error);
        return; // Завершить выполнение, если парсинг не удался
      }

      console.log('Полученное сообщение:', message); // Логируем всё сообщение

      if (message && typeof message.id === 'string') {
        console.log('Получена транзакция:', message);

        const transaction: Transaction = message;
        setData(transaction);
        setStatus(transaction.status);

        const endTime = dayjs(transaction.end_at);
        const now = dayjs();
        const remainingTime = endTime.diff(now, 'second');

        console.log('Оставшееся время (в секундах):', remainingTime); // Логируем оставшееся время

        if (remainingTime > 0) {
          setTimer(remainingTime);
        } else {
          console.warn('Оставшееся время меньше или равно нулю:', remainingTime);
          setTimer(0); // Или можно оставить null, если это более логично
        }

        const connectData = { type: `user-connect/${transaction.id}` };
        socketInstance.send(JSON.stringify(connectData));
        console.log('Отправлено сообщение user-connect:', connectData);
      } else if (message && message.type && typeof message.type === 'string') {
        console.log('Тип сообщения:', message.type);

        if (message.type.startsWith('user-connect')) {
          console.log('Ответ от user-connect:', message);
        }
      } else {
        console.warn('Полученное сообщение не имеет действительного типа или ID:', message);
      }
    };

    socketInstance.onerror = (error) => {
      console.error('Ошибка WebSocket:', error);
    };

    socketInstance.onclose = () => {
      console.log('Соединение WebSocket закрыто');
    };

    socket.current = socketInstance;

    return () => {
      if (socket.current?.readyState === WebSocket.OPEN) {
        socket.current.close();
      }
    };
  }, [userId]);

  const handleCheckPayment = () => {
    if (socket.current) {
      if (data) {
        const checkPaymentData = { type: `check-payment/${userId}/${data.id}` };
        console.log('Отправляем сообщение для проверки платежа:', checkPaymentData);
        
        if (socket.current.readyState === WebSocket.OPEN) {
          socket.current.send(JSON.stringify(checkPaymentData));
        } else {
          console.warn('WebSocket не готов для отправки сообщения. Текущий статус:', socket.current.readyState);
        }
      } else {
        console.warn('Данные транзакции недоступны:', data);
      }
    }
  };

  return { data, status, timer, handleCheckPayment };
};
