import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import aboutUsApi from '@/api/aboutUs';

//redux thunk
export const searchAboutUs = createAsyncThunk(
    'users/searchAboutUs',
    async (params: baseSearchQuery): Promise<typeMetadataAboutUs> => {
        const { metadata } = await aboutUsApi.searchAboutUs(params);
        return metadata;
    }
)

export const getActiveAboutUs = createAsyncThunk(
    'users/getActiveAboutUs',
    async (): Promise<AboutUsState> => {
        const { metadata } = await aboutUsApi.getActiveAboutUs();
        return metadata;
    }
)

const initialState: state_reducer_manageAboutUs = {
    aboutUsList: [],
    loading: false,
    aboutUsSelected: null,
    pagination: {
        current: 1,
        pageSize: 10,
    },
    total: 0,
}

export const manageAboutUs = createSlice({
    name: 'manage_about_us',
    initialState,
    reducers: {
        setAboutUsSelected: (state, action: PayloadAction<AboutUsState | null>) => {
            state.aboutUsSelected = action.payload;
        },
        setAboutUsList: (state, action: PayloadAction<AboutUsState>) => {
            const {id, ...value} = action.payload;

            state.aboutUsList = state.aboutUsList.map((category: AboutUsState) => {
                if(category.id === id) {
                    category = {...category, ...value}
                }

                return category;
            })
        },
        deleteAboutUs: (state, action: PayloadAction<number>) => {
            const id = action.payload;

            const { current, pageSize } = state.pagination;

            const maxPage = Math.ceil(state.total / (pageSize || 10));
            if(maxPage === state.pagination.current && state.aboutUsList.length === 1 && Number(current) > 1) {
                state.pagination.current = Number(current) - 1
            }

            state.aboutUsList = state.aboutUsList.filter((aboutState: AboutUsState) => {
               return aboutState.id !== id;
            })
            state.total = state.total - 1;
        },
        addAboutUs: (state, action: PayloadAction<AboutUsState>) => {
            const { current, pageSize } = state.pagination;

            const maxPage = Math.ceil(state.total / (pageSize || 10));
            if(maxPage === state.pagination.current && state.aboutUsList.length === pageSize) {
                state.pagination.current = Number(current) + 1
            }

            state.aboutUsList = [{...action.payload}, ...state.aboutUsList]

            state.total = state.total + 1;
        },
        setPagination: (state, action: PayloadAction<basePagination>) => {
            state.pagination = { ...state.pagination, ...action.payload };
        }
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed

        builder.addCase(searchAboutUs.fulfilled, (state, action) => {
            const { count, rows } = action.payload;
            state.loading = false;
            state.total = count;
            state.aboutUsList =  rows.map((item, index) => ({ ...item, key: index }));
        }).addCase(searchAboutUs.pending, (state) => {
            state.total = 0;
            state.loading = true;
        }).addCase(searchAboutUs.rejected, (state) => {
            state.total = 0;
            state.loading = false;
        })


        builder.addCase(getActiveAboutUs.fulfilled, (state, action) => {
            state.aboutUsSelected = action.payload;
            state.loading = false;
        }).addCase(getActiveAboutUs.pending, (state) => {
            state.loading = true
        }).addCase(getActiveAboutUs.rejected, (state) => {
            state.loading = false;
        })

    },
})

// Action creators are generated for each case reducer function
export const { 
    setAboutUsSelected, 
    setAboutUsList, 
    deleteAboutUs, 
    addAboutUs, 
    setPagination,
} = manageAboutUs.actions
export default manageAboutUs.reducer