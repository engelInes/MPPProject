import {createContext} from 'react';

import {BookContextType, ProviderType} from '../types/BookContextTypes.types';

export const BooksContext = createContext<BookContextType | null>(null);

function BooksContextProvider({bookContext, children}: ProviderType) {
    return (
        <BooksContext.Provider value={bookContext}>
            {children}
        </BooksContext.Provider>
    );
}

export {BooksContextProvider};
