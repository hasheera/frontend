import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import AuthAxios from '@utils/api/authAxios';
import getExceptionPayload from '@utils/api/getExecptionPayload';
import Cookies from 'js-cookie';
import type { RootState } from '../index';

export type cartsState = {
  cartsLoaded: boolean;
  carts:  {
    cart_items: [];
  };
}

export const getOpenCart = createAsyncThunk(
    "openCarts",
    async(id, { rejectWithValue }) => {
      try {
        const response = await AuthAxios.get(`/oga/cart/open/${id}`);
  
        return response.data;
      } catch(ex) {
        return rejectWithValue(getExceptionPayload(ex))
      }
    }
  );
// }

export const initialState:cartsState = {
  cartsLoaded: false,
  carts: null
}

export const cartsSlice = createSlice({
  name: 'carts',
  initialState,
  reducers: {
    setOpenCart: (state, action: PayloadAction<cartsState["carts"]>) => {
      state.cartsLoaded = true;
      state.carts = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(getOpenCart.pending, (state) => {
      state.cartsLoaded = false
    })
    .addCase(getOpenCart.fulfilled, (state, { payload }) => {
      state.cartsLoaded = true
      state.carts = payload.data
    })
  }
})

export const { setOpenCart } = cartsSlice.actions;

export const cartsData = (state: RootState) => state.carts;

export default cartsSlice.reducer;

