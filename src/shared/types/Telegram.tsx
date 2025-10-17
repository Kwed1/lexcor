export interface TelegramWebApp {
  close: () => void
  platform?: string
  setHeaderColor: (color: string) => void
  BackButton?: {
    show: () => void
    hide: () => void
    onClick: (callback: () => void) => void
    offClick: (callback: () => void) => void
  }
}