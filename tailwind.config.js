/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'h-xs': { 'raw': '(max-height: 580px)' },
        'sm': { 'raw': '(max-width: 376px)' }
      },
      colors: {
        // Темная тема в стиле крипто-биржи (Binance, Coinbase inspired)
        crypto: {
          // Backgrounds
          'bg-primary': '#0B0E11',      // Основной фон
          'bg-secondary': '#161A1E',    // Вторичный фон (карточки)
          'bg-tertiary': '#1E2329',     // Третичный фон (модалы)
          'bg-hover': '#2B3139',        // Hover состояние
          'bg-input': '#1A1E23',        // Input background

          // Borders
          'border-primary': '#2B3139',  // Основные границы
          'border-secondary': '#363D47', // Вторичные границы

          // Text
          'text-primary': '#EAECEF',    // Основной текст
          'text-secondary': '#B7BDC6',  // Вторичный текст
          'text-tertiary': '#848E9C',   // Третичный текст (hints)

          // Brand colors
          'brand-primary': '#FCD535',   // Желтый (Binance style)
          'brand-secondary': '#F0B90B', // Темно-желтый

          // Success/Buy
          'success': '#0ECB81',         // Зеленый (buy)
          'success-hover': '#0DB872',
          'success-bg': '#0ECB8115',    // Прозрачный зеленый для фона

          // Danger/Sell  
          'danger': '#F6465D',          // Красный (sell)
          'danger-hover': '#E8384F',
          'danger-bg': '#F6465D15',     // Прозрачный красный для фона

          // Info/Links
          'info': '#5E97FF',            // Синий
          'info-hover': '#4D85E8',
          'info-bg': '#5E97FF15',       // Прозрачный синий для фона

          // Warning
          'warning': '#F8B94B',         // Оранжевый
          'warning-hover': '#E6A83B',
          'warning-bg': '#F8B94B15',    // Прозрачный оранжевый для фона
        },
        // Старые цвета (для совместимости, можем удалить потом)
        myColor: {
          50: '#f1f1f3',
          100: '#737373',
          150: '#168ADD',
          200: '#1CC64C',
          250: "#168ADD7A",
          300: "#168ADD",
          350: "#DAECFA",
          450: "#A3A3A4",
          550: "#369CE5",
          650: '#1CC64CED',
          700: '#424242',
          750: "#45B1FF21",
          800: "#797979",
          850: '#369CE58A',
          900: "#EBEBEB8A",
          950: "#444444"
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #0B0E11 0%, #161A1E 100%)',
        'gradient-card': 'linear-gradient(135deg, #1E2329 0%, #161A1E 100%)',
      },
      boxShadow: {
        'crypto': '0 4px 12px rgba(0, 0, 0, 0.4)',
        'crypto-lg': '0 8px 24px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}