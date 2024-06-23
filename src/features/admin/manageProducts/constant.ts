import { createContext } from 'react';

interface ProductContext {
    categoryList: CategoryState[]
}

export const ProductContext = createContext<ProductContext>({categoryList: []});
