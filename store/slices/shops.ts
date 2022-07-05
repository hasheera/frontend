import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import AuthAxios from '@utils/api/authAxios';
import getExceptionPayload from '@utils/api/getExecptionPayload';
import type { RootState } from '../index';

export type shopsState = {
  vendorShops: {
    loaded: boolean;
    shops: any;
  };
  singleShop: {
    loaded: boolean;
    shopData: any;
    selectedShop: any
  };
  hasShop: boolean;
  hasShopRole: boolean;
};

export const getVendorShops = createAsyncThunk(
  'getVendorShops',
  async (_, { rejectWithValue }) => {
    try {
      const response = await AuthAxios.get('/oga/shop/user/index');

      return response.data.data;
    } catch (ex) {
      return rejectWithValue(getExceptionPayload(ex));
    }
  },
);

export const getSingleShop = createAsyncThunk(
  'getSingleShop',
  async (id, { rejectWithValue }) => {
    try {
      const response = await AuthAxios.get(`/oga/shop/product/index/${id}`);
      return response.data;

    } catch (ex) {
      return rejectWithValue(getExceptionPayload(ex));
    }
  },
);

export const initialState: shopsState = {
  vendorShops: {
    loaded: false,
    shops: null,
  },
  singleShop: {
    loaded: false,
    shopData: null,
    selectedShop: null
  },
  hasShop: false,
  hasShopRole: false,
};

export const shopsSlice = createSlice({
  name: 'shops',
  initialState,
  reducers: {
    setVendorShops: (
      state,
      action: PayloadAction<shopsState['vendorShops']>,
    ) => {
      state.vendorShops.loaded = true;
      state.vendorShops.shops = action.payload;
    },
    setSingleShop: (state, action: PayloadAction<shopsState['singleShop']>) => {
      state.singleShop.loaded = true;
      state.singleShop.selectedShop = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getVendorShops.pending, state => {
        state.vendorShops.loaded = false;
      })
      .addCase(getVendorShops.fulfilled, (state, { payload }) => {
        const sorted = payload.data.sort(
          (a: { id: number }, b: { id: number }) => a.id - b.id,
        );
        state.vendorShops.loaded = true;
        state.vendorShops.shops = sorted;
        if(payload.data.length) {
          state.hasShop = true
        }
        // const selected = sorted.find(
        //   (shop: { shop_id: number }) => shop.shop_id === Number(shopId)
        // );
      })
      .addCase(getSingleShop.pending, state => {
        state.singleShop.loaded = false
      })
      .addCase(getSingleShop.fulfilled, (state, { payload }) => {
        state.singleShop.loaded = true
        state.singleShop.shopData = payload.data
      })
  },
});

export const { setVendorShops, setSingleShop } = shopsSlice.actions;

export const shopsData = (state: RootState) => state.shops;

export default shopsSlice.reducer;
