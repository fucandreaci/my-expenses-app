import {useState} from 'react';

export const useService = <T, >(fetchFunction: () => Promise<T>) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    const [results, setResults] = useState<T>();

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const result = await fetchFunction();
            setResults(result);
        } catch (e) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    }

    return {
        isLoading,
        error,
        fetchData,
        results
    }
}
