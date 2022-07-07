import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import AuthAxios from '@utils/api/authAxios';
import getExceptionPayload from '@utils/api/getExecptionPayload';
import type { RootState } from '../index';

export type cartsState = {
  cartsLoaded: boolean;
  carts: {
    cart_items: [];
  };
  transactionSales: {
    loaded: boolean;
    data: any;
  }
};

export const getOpenCart = createAsyncThunk(
  'openCarts',
  async (id: number | string, { rejectWithValue }) => {
    try {
      const response = await AuthAxios.get(`/oga/cart/open/${id}`);

      return response.data;
    } catch (ex) {
      return rejectWithValue(getExceptionPayload(ex));
    }
  },
);

export const getTransactionSales = createAsyncThunk(
  'transactionSales',
  async (id, { rejectWithValue }) => {
    try {
      const response = await AuthAxios.get(`oga/order/index?shop_id=${id}`);

      return response.data;
    } catch (ex) {
      return rejectWithValue(getExceptionPayload(ex));
    }
  },
);

export const initialState: cartsState = {
  cartsLoaded: false,
  carts: null,
  transactionSales: {
    loaded: false,
    data: null
  }
};

export const cartsSlice = createSlice({
  name: 'carts',
  initialState,
  reducers: {
    setOpenCart: (state, action: PayloadAction<cartsState['carts']>) => {
      state.cartsLoaded = true;
      state.carts = action.payload;
    },
    setTransactionsSales: (state, action: PayloadAction<cartsState['transactionSales']>) => {
      state.transactionSales.loaded = true;
      state.transactionSales.data = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getOpenCart.pending, state => {
        state.cartsLoaded = false;
      })
      .addCase(getOpenCart.fulfilled, (state, { payload }) => {
        state.cartsLoaded = true;
        state.carts = payload.data;
      });
  },
});

export const { setOpenCart, setTransactionsSales } = cartsSlice.actions;

export const cartsData = (state: RootState) => state.carts;

export default cartsSlice.reducer;
