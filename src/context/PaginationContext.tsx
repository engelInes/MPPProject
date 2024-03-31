import {createContext} from 'react';
import { PaginationContextProps } from '../types/PaginationContextProps.types';
import { PaginationContextProviderType } from '../types/PaginationContextProviderType.types';
export const PaginationContext = createContext<PaginationContextProps | null>(null);

function PaginationContextProvider({
    paginationContext,
    children,
}: PaginationContextProviderType) {
    return (
        <PaginationContext.Provider value={paginationContext}>
            {children}
        </PaginationContext.Provider>
    );
}

export {PaginationContextProvider};
