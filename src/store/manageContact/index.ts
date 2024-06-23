import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import contactApi from '@/api/contact';

//redux thunk
export const searchContact = createAsyncThunk(
    'users/manage_contact',
    async (params: baseSearchQuery): Promise<typeMetadataContact> => {
        const { metadata } = await contactApi.searchContact(params);
        return metadata;
    }
)

const initialState: state_reducer_manageContact = {
    contactList: [],
    loading: true,
    contactSelected: null,
    pagination: {
        current: 1,
        pageSize: 10,
    },
    total: 0,
}

export const manageContact = createSlice({
    name: 'manage_contact',
    initialState,
    reducers: {
        setContactSelected: (state, action: PayloadAction<ContactState | null>) => {
            state.contactSelected = action.payload;
        },
        updateRecordList: (state, action: PayloadAction<number>) => {
            const id = action.payload;
            console.log("🚀 ~ id:", id)

            state.contactList = state.contactList.map((contact: ContactState) => {
                if (contact.id === id) {
                    contact = { ...contact, is_read: '1' }
                }

                return contact;
            })
        },
        deleteContact: (state, action: PayloadAction<number>) => {
            const id = action.payload;

            const { current, pageSize } = state.pagination;

            const maxPage = Math.ceil(state.total / (pageSize || 10));
            if (maxPage === state.pagination.current && state.contactList.length === 1 && Number(current) > 1) {
                state.pagination.current = Number(current) - 1
            }

            state.contactList = state.contactList.filter((category: ContactState) => {
                return category.id !== id;
            })
            state.total = state.total - 1;
        },
        setPagination: (state, action: PayloadAction<basePagination>) => {
            state.pagination = { ...state.pagination, ...action.payload };
        }
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed

        builder.addCase(searchContact.fulfilled, (state, action) => {
            const { count, rows } = action.payload;
            state = { ...state, loading: false, total: count, contactList: rows.map((item, index) => ({ ...item, key: index })) }

            return state;
        }).addCase(searchContact.pending, (state) => {
            state = { ...state, total: 0, loading: true }

            return state;
        }).addCase(searchContact.rejected, (state) => {
            state = { ...state, total: 0, loading: false }

            return state;
        })

    },
})

// Action creators are generated for each case reducer function
export const {
    setContactSelected,
    deleteContact,
    updateRecordList,
    setPagination
} = manageContact.actions
export default manageContact.reducer