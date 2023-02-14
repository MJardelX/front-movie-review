import React, {createContext, useState} from 'react';
import { useNotification } from '../hooks';

export const SearchContext = createContext();


let timeoutId;
const debounce = (func, delay) => {
    return (...args) => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(null, args);
        }, delay)
    }
}


const SearchProvider = ({children}) => {
    const [searching, setSearching] = useState(false)
    const [results, setResults] = useState([])
    const [resultNotFound, setResultNotFound] = useState(false);

    const {updateNotification} = useNotification();


    const search = async (method, query, updaterFunc) =>{
        const {error, results} = await method(query)
        if(error) return updateNotification("error", error);

        if(!results.length) {
            setResults([]);
            updaterFunc && updaterFunc([]);
            return setResultNotFound(true);
        } 

        setResultNotFound(false)
        setResults(results);
        updaterFunc && updaterFunc([...results]);
    };

    const debounceFunc = debounce(search, 300);
    
    const handleSearch = (method, query, updaterFun) =>{
        setSearching(true);
        if(!query.trim()){
            updaterFun && updaterFun([])
            return resetSearch();
        }
        debounceFunc(method, query, updaterFun);

    }


    const resetSearch = () =>{
        setSearching(false);
        setResults([]);
        setResultNotFound(false);
    }

    return (
        <SearchContext.Provider value={{handleSearch, resetSearch, searching, results, resultNotFound}}>{children}</SearchContext.Provider>
    );
}

export default SearchProvider;
