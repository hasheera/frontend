import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import AuthAxios from '@utils/api/authAxios';
import getExceptionPayload from '@utils/api/getExecptionPayload';
import type { RootState } from '../index';

export type dashboardState = {
  dashboard: {
    loaded: boolean;
    data: any
  },
  dashboardBatchType: string,
};

export const getDashboardData = createAsyncThunk(
  'dashboardData',
  async (arg: any, { rejectWithValue }) => {
    const { id, directDate, startDate, endDate } = arg
    try {
      const response = await AuthAxios.get(`/oga/dashboard?shop_id=${id}${
        directDate
          ? `&direct_date=${directDate}`
          : `${startDate ? `&date_from=${startDate}` : ""}${
              endDate ? `&date_to=${endDate}` : ""
            }`
      }`);

      return response.data;
    } catch (ex) {
      return rejectWithValue(getExceptionPayload(ex));
    }
  },
);

export const initialState: dashboardState = {
  dashboard: {
    loaded: false,
    data: null
  },
  dashboardBatchType: "today",
};

export const dashboardSlice = createSlice({
  name: 'dashboardData',
  initialState,
  reducers: {
    setDashboardData: (state, action: PayloadAction<dashboardState['dashboard']>) => {
      state.dashboard.loaded = true;
      state.dashboard.data = action.payload;
    },
    changeDashboardBatchType: (state, action: PayloadAction<dashboardState['dashboardBatchType']>) => {
      state.dashboardBatchType = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getDashboardData.pending, state => {
        state.dashboard.loaded = false;
      })
      .addCase(getDashboardData.fulfilled, (state, { payload }) => {
        state.dashboard.loaded = true;
        state.dashboard.data = payload.data;
      });
  },
});

export const { setDashboardData, changeDashboardBatchType } = dashboardSlice.actions;

export const dashboardData = (state: RootState) => state.dashboard;

export default dashboardSlice.reducer;