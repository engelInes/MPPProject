import React from 'react';
import {PaginationContextProps} from './PaginationContextProps.types';

export type PaginationContextProviderType = {
    paginationContext: PaginationContextProps;
    children: React.ReactNode;
};
