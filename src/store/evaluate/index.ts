import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import lodash from "lodash";
import EvaluateApi from "@/api/evaluate";

//redux thunk
export const getListEvaluate = createAsyncThunk(
  "comment/get_list_evaluate",
  async (params: any): Promise<metadataListEvaluated> => {
    const { metadata } = await EvaluateApi.getListEvaluate(params);
    return metadata;
  }
);

const initialState: state_reducer_evaluate = {
  evaluateList: [],
  loading: true,
  pagination: {
    current: 1,
    pageSize: 10,
  },
  total: 0,
  totalReview: 0, 
  countStar: []
};

export const manageEvaluateSlice = createSlice({
  name: "manage_evaluate",
  initialState,
  reducers: {
    pushEvaluateList: (state, action: PayloadAction<EvaluateState[]>) => {
      const clonePushComment = lodash.cloneDeep(action.payload);

      state.evaluateList = [
        ...state.evaluateList,
        ...clonePushComment,
      ];

      return state;
    },
    setPagination: (state, action: PayloadAction<basePagination>) => {
      state.pagination = action.payload;

      return state;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(getListEvaluate.fulfilled, (state, action) => {
        const { count, rows, countReview, countStar } = action.payload;
        state = {
          ...state,
          loading: false,
          total: count,
          totalReview: countReview,
          evaluateList: rows.map((item) => item),
          countStar: countStar.reverse(),
        };

        return state;
      })
      .addCase(getListEvaluate.pending, (state) => {
        state = { ...state, total: 0, loading: true };

        return state;
      })
      .addCase(getListEvaluate.rejected, (state) => {
        state = { ...state, total: 0, loading: false };

        return state;
      });
  },
});

// Action creators are generated for each case reducer function
export const {
  pushEvaluateList,
  setPagination,
} = manageEvaluateSlice.actions;
export default manageEvaluateSlice.reducer;
