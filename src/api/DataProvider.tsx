import React, { createContext, useContext, useState, ReactNode } from "react";
import { AxiosResponse } from "axios";

interface DataContextProps<T, E, U> {
    data: T | null;
    error: E | null;
    refetch: (props: U | null) => void;
}

interface FetcherMaker<T, U> {
    (props: U): Promise<AxiosResponse<T>>;
}

interface DataProviderProps<T, U> {
    fetcherMaker: FetcherMaker<T, U>;
    children: ReactNode;
}


const DataContext = createContext<DataContextProps<any, any, any> | null>(null);

export const useApiData = <T, E, U>() => {
    const context = useContext(DataContext);
    if (!context) throw new Error("useData must be used within a DataProvider");
    return context as DataContextProps<T, E, U>;
};

export const DataProvider: React.FC<DataProviderProps<any, any>> = ({ fetcherMaker, children }) => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<any>(null);

    const fetchData = async (props: any) => {
        try {
            const response = await fetcherMaker(props);
            setData(response.data);
        } catch (responseError) {
            setError(error);
        }
    };

    return (
        <DataContext.Provider value={{ data, error, refetch: fetchData }}>
            {children}
        </DataContext.Provider>
    );
};
