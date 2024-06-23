import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

//reducer
import userReducer from './user/index';
import manageUserReducer from './manageUser';
import manageCategoryReducer from './manageCategories';
import manageProductReducer from './manageProducts';
import orderUser from './orderUser';
import manageCommentReducer from './comments';
import manageNewsReducer from './manageNews';
import manageContactReducer from './manageContact';
import aboutUsReducer from './aboutUs';
import evaluateReducer from './evaluate';

export const store = configureStore({
  reducer: {
    user: userReducer,
    order: orderUser,
    manageUser: manageUserReducer,
    manageCategory: manageCategoryReducer,
    manageProduct: manageProductReducer,
    comments: manageCommentReducer,
    manageNews: manageNewsReducer,
    manageContact: manageContactReducer,
    aboutUs: aboutUsReducer,
    evaluate: evaluateReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

//dispatch async thunk
export const useAppDispatch = () => useDispatch<AppDispatch>()
//get state async thunk
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
