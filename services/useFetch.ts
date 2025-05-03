

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, seterror] = useState<Error | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            seterror(null);

            const result = await fetchFunction();
            setData(result);

        } catch (err) {
            seterror(err instanceof Error ? err : new Error('An error occured'));
        } finally {
            setLoading(false);
        }
    }
    const reset = () => {
        setData(null);
        setLoading(false);
        seterror(null);
    }

    useEffect(() => {
        if(autoFetch) {
            fetchData();
        }
    }, []);

    return { data, loading, error, refetch: fetchData, reset };
}

export default useFetch;