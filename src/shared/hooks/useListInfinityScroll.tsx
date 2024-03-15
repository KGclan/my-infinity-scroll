import { useEffect, useMemo, useRef, useState } from 'react';
import { ALL_DATA_COUNT, LIMIT } from '../constants';

interface UseListInfinityScroll<T> {
    getData: (page: number) => Promise<T[]>;
}

interface OutputData<T> {
    data: T[];
    setData: React.Dispatch<React.SetStateAction<T[]>>;
    loader: JSX.Element;
}

function useListInfinityScroll<T>({ getData }: UseListInfinityScroll<T>): OutputData<T> {
    const [data, setData] = useState<T[]>([]);
    const botElRef = useRef<HTMLDivElement>(null);
    const refObserver = useRef<IntersectionObserver | null>(null);

    const lastDataIsLoaded = data.length >= ALL_DATA_COUNT;

    const loader = useMemo(() => {
        return <div ref={botElRef}>{lastDataIsLoaded ? '' : 'LOADING...'}</div>;
    }, [lastDataIsLoaded]);

    useEffect(() => {
        refObserver.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !lastDataIsLoaded) {
                const nextPage = (data.length / LIMIT) + 1;

                getData(nextPage)
                    .then((responseData) => setData((prev) => [...prev, ...responseData]))
                    .catch((e) => console.log(e));
            }
        });

        refObserver.current.observe(botElRef.current as HTMLDivElement);
        return () => {
            refObserver.current?.unobserve(botElRef.current as HTMLDivElement);
        };
    }, [botElRef, data.length, getData, lastDataIsLoaded, setData]);

    return { data, setData, loader };
}

export default useListInfinityScroll;