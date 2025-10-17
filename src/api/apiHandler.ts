// Используем Mock API вместо реального бэкенда
import useMockApi from './mockApiHandler'

const useApi = () => {
    return useMockApi()
}

export default useApi
