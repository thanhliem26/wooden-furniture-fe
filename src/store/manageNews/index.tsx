import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import newsApi from '@/api/news';

//redux thunk
export const searchNews = createAsyncThunk(
    'users/searchNews',
    async (params: baseSearchQuery): Promise<typeMetadataNews> => {
        const { metadata } = await newsApi.searchNews(params);
        return metadata;
    }
)

const initialState: state_reducer_manageNews = {
    newsList: [],
    loading: true,
    newsSelected: null,
    pagination: {
        current: 1,
        pageSize: 10,
    },
    total: 0,
}

export const manageNewsSlice = createSlice({
    name: 'manage_news',
    initialState,
    reducers: {
        setNewsSelected: (state, action: PayloadAction<NewsState | null>) => {
            state.newsSelected = action.payload;
        },
        setNewsList: (state, action: PayloadAction<NewsState>) => {
            const { id, ...value } = action.payload;

            state.newsList = state.newsList.map((news: NewsState) => {
                if (news.id === id) {
                    news = { ...news, ...value }
                }

                return news;
            })
        },
        deleteNews: (state, action: PayloadAction<number>) => {
            const id = action.payload;

            const { current, pageSize } = state.pagination;

            const maxPage = Math.ceil(state.total / (pageSize || 10));
            if (maxPage === state.pagination.current && state.newsList.length === 1 && Number(current) > 1) {
                state.pagination.current = Number(current) - 1
            }

            state.newsList = state.newsList.filter((category: NewsState) => {
                return category.id !== id;
            })
            state.total = state.total - 1;
        },
        addNews: (state, action: PayloadAction<NewsState>) => {
            const { current, pageSize } = state.pagination;

            const maxPage = Math.ceil(state.total / (pageSize || 10));
            if (maxPage === state.pagination.current && state.newsList.length === pageSize) {
                state.pagination.current = Number(current) + 1
            }

            state.newsList = [...state.newsList, { ...action.payload}]

            state.total = state.total + 1;
        },
        pushListNews: (state, action: PayloadAction<NewsState[]>) => {
            state.newsList = [...state.newsList,  ...action.payload]

            return state;
        },
        setPagination: (state, action: PayloadAction<basePagination>) => {
            state.pagination = { ...state.pagination, ...action.payload };
        }
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed

        builder.addCase(searchNews.fulfilled, (state, action) => {
            // const { count, rows } = action.payload;
            // state = { ...state, loading: false, total: count, newsList: rows.map((item, index) => ({ ...item, key: index })) }

            return state;
        }).addCase(searchNews.pending, (state) => {
            state = { ...state, total: 0, loading: true }

            return state;
        }).addCase(searchNews.rejected, (state) => {
            state = { ...state, total: 0, loading: false }

            return state;
        })

    },
})

// Action creators are generated for each case reducer function
export const {
    setNewsSelected,
    setNewsList,
    deleteNews,
    addNews,
    setPagination,
    pushListNews
} = manageNewsSlice.actions
export default manageNewsSlice.reducer