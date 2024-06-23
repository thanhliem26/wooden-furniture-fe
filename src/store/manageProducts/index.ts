import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import productApi from '@/api/product';

//redux thunk
export const searchProduct = createAsyncThunk(
    'users/searchProduct',
    async (params: baseSearchQuery): Promise<typeMetadataProduct> => {
        const { metadata } = await productApi.searchProducts(params);
        return metadata;
    }
)

const initialState: state_reducer_manageProducts = {
    productList: [],
    loading: true,
    productSelected: null,
    pagination: {
        current: 1,
        pageSize: 10,
    },
    total: 0,
}

export const manageProductSlice = createSlice({
    name: 'manage_products',
    initialState,
    reducers: {
        pushListProduct: (state, action: PayloadAction<ProductState[]>) => {
            state.productList = [...state.productList, ...action.payload];
        },
        setProductSelected: (state, action: PayloadAction<ProductState | null>) => {
            state.productSelected = action.payload;
        },
        setProductList: (state, action: PayloadAction<ProductStateEdit>) => {
            const {id, ...value} = action.payload;

            state.productList = state.productList.map((category: ProductState) => {
                if(category.id === id) {
                    category = {...category, ...value}
                }

                return category;
            })
        },
        deleteProduct: (state, action: PayloadAction<number>) => {
            const id = action.payload;

            const { current, pageSize } = state.pagination;

            const maxPage = Math.ceil(state.total / (pageSize || 10));
            if(maxPage === state.pagination.current && state.productList.length === 1 && Number(current) > 1) {
                state.pagination.current = Number(current) - 1
            }

            state.productList = state.productList.filter((category: CategoryState) => {
               return category.id !== id;
            })
            state.total = state.total - 1;
        },
        addProduct: (state, action: PayloadAction<ProductState>) => {
            const { current, pageSize } = state.pagination;

            const maxPage = Math.ceil(state.total / (pageSize || 10));
            if(maxPage === state.pagination.current && state.productList.length === pageSize) {
                state.pagination.current = Number(current) + 1
            }

            state.productList = [...state.productList, {...action.payload, key: action.payload.id}]

            state.total = state.total + 1;
        },
        setPagination: (state, action: PayloadAction<basePagination>) => {
            state.pagination = { ...state.pagination, ...action.payload };
        }
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed

        builder.addCase(searchProduct.fulfilled, (state, action) => {
            const { count, rows } = action.payload;
            state = { ...state, loading: false, total: count, productList: rows.map((item, index) => ({ ...item, key: index })) }

            return state;
        }).addCase(searchProduct.pending, (state) => {
            state = { ...state, total: 0, loading: true }

            return state;
        }).addCase(searchProduct.rejected, (state) => {
            state = { ...state, total: 0, loading: false }

            return state;
        })

    },
})

// Action creators are generated for each case reducer function
export const { 
    setProductSelected, 
    setProductList, 
    deleteProduct, 
    addProduct, 
    setPagination,
    pushListProduct,
} = manageProductSlice.actions
export default manageProductSlice.reducer