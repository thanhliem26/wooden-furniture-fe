import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import userApi from '@/api/user';

//redux thunk
export const fetchUserInfo = createAsyncThunk(
    'users/fetchMe',
    async (): Promise<UserState> => {
        const { metadata } = await userApi.getUserInfo();
        return metadata;
    }
)

interface user_reducer_state extends UserState{
    is_login?: boolean;
}

const initialState: user_reducer_state = {
    id: 0,
    fullName: '',
    email: '',
    address: '',
    dateOfBirth: '',
    phoneNumber: '',
    role_user: '',
    sex: '',
    deleteFlg: 0,
    avatar: '',
    avatar_support: '',
    is_login: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<UserState>) => {
            state = { ...state, ...action.payload }

            return state;
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
            state = { ...state, ...action.payload, is_login: true }

            return state;
        })
    },
})

// Action creators are generated for each case reducer function
export const { setUserInfo } = userSlice.actions
export default userSlice.reducer