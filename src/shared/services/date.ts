export function formatDate(dateStr: string | undefined | null): string {
	// Проверяем на валидность входных данных
	if (!dateStr || dateStr === 'undefined' || dateStr === 'null' || dateStr === '') {
		return 'N/A'
	}

	// Преобразуем строку в объект Date
	const dateObj = new Date(dateStr)

	// Проверяем на валидность даты
	if (isNaN(dateObj.getTime())) {
		return 'Invalid Date'
	}

	// Форматируем в нужный вид, например, "08.11.2024 20:26"
	const day = dateObj.getDate().toString().padStart(2, '0')
	const month = (dateObj.getMonth() + 1).toString().padStart(2, '0')
	const year = dateObj.getFullYear()
	const hours = dateObj.getHours().toString().padStart(2, '0')
	const minutes = dateObj.getMinutes().toString().padStart(2, '0')

	return `${day}.${month}.${year} ${hours}:${minutes}`
}
