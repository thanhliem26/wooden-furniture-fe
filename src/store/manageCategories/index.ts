import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import categoryApi from '@/api/category';

//redux thunk
export const searchCategory = createAsyncThunk(
    'users/searchCategory',
    async (params: baseSearchQuery): Promise<typeMetadataCategory> => {
        const { metadata } = await categoryApi.searchCategory(params);
        return metadata;
    }
)

const initialState: state_reducer_manageCategories = {
    categoryList: [],
    loading: true,
    categorySelected: null,
    pagination: {
        current: 1,
        pageSize: 10,
    },
    total: 0,
}

export const manageCategorySlice = createSlice({
    name: 'manage_categories',
    initialState,
    reducers: {
        setCategorySelected: (state, action: PayloadAction<CategoryState | null>) => {
            state.categorySelected = action.payload;
        },
        setCategoryList: (state, action: PayloadAction<CategoryStateEdit>) => {
            const { id, ...value } = action.payload;

            state.categoryList = state.categoryList.map((category: CategoryState) => {
                if (category.id === id) {
                    category = { ...category, ...value }
                }

                return category;
            })
        },
        deleteCategory: (state, action: PayloadAction<number>) => {
            const id = action.payload;

            const { current, pageSize } = state.pagination;

            const maxPage = Math.ceil(state.total / (pageSize || 10));
            if (maxPage === state.pagination.current && state.categoryList.length === 1 && Number(current) > 1) {
                state.pagination.current = Number(current) - 1
            }

            state.categoryList = state.categoryList.filter((category: CategoryState) => {
                return category.id !== id;
            })
            state.total = state.total - 1;
        },
        addCategory: (state, action: PayloadAction<CategoryState>) => {
            const { current, pageSize } = state.pagination;

            const maxPage = Math.ceil(state.total / (pageSize || 10));
            if (maxPage === state.pagination.current && state.categoryList.length === pageSize) {
                state.pagination.current = Number(current) + 1
            }

            state.categoryList = [...state.categoryList, { ...action.payload, key: action.payload.id }]

            state.total = state.total + 1;
        },
        setPagination: (state, action: PayloadAction<basePagination>) => {
            state.pagination = { ...state.pagination, ...action.payload };
        }
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed

        builder.addCase(searchCategory.fulfilled, (state, action) => {
            const { count, rows } = action.payload;
            state = { ...state, loading: false, total: count, categoryList: rows.map((item, index) => ({ ...item, key: index })) }

            return state;
        }).addCase(searchCategory.pending, (state) => {
            state = { ...state, total: 0, loading: true }

            return state;
        }).addCase(searchCategory.rejected, (state) => {
            state = { ...state, total: 0, loading: false }

            return state;
        })

    },
})

// Action creators are generated for each case reducer function
export const {
    setCategorySelected,
    setCategoryList,
    deleteCategory,
    addCategory,
    setPagination
} = manageCategorySlice.actions
export default manageCategorySlice.reducer