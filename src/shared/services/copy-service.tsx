

export function CopyService(link:string) {
		if (navigator.clipboard) {
			navigator.clipboard.writeText(link).then(() => {
				console.log('The link was copied')
			}).catch((error) => {
				console.log('The link was not copied');
			})
		} else {
			const textarea = document.createElement('textarea')
			textarea.value = link
			document.body.appendChild(textarea)
			textarea.select()
			try {
				document.execCommand('copy')
				console.log('The link was copied');
			} catch (error) {
				console.log('The link was not copied');
			}
			document.body.removeChild(textarea)
		}
		setTimeout(() => console.log(123), 2000)
}