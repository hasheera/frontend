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
  topSellingData: {
    loaded: boolean;
    data: any;
  },
  batchType: string;
  singleProduct: {
    id: number;
    product_id: number;
    category_id: number;
    shop_product_images: any;
    cost_price: number;
    sell_price: number;
    stock_count: number;
    restock_alert: number;
    shop: { id: number };
    product: { name: string };
    product_unit: { id: number; photo: string | null; name: string };
    expired_date: Date;
    loaded: boolean;
  };
  categories: { loaded: boolean; data: { id: number; name: string; }[] | null };
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
  async (id: string | number, { rejectWithValue }) => {
    try {
      const response = await AuthAxios.get(`/oga/shop/product/index/${id}`);
      return response.data;

    } catch (ex) {
      return rejectWithValue(getExceptionPayload(ex));
    }
  },
);

export const getTopSellingData = createAsyncThunk(
  'getTopSellingData',
  async (id: string | number, { rejectWithValue }) => {
    try {
      const response = await AuthAxios.get(`oga/shop/product/top-selling?shop_id=${id}`);
      return response.data;

    } catch (ex) {
      return rejectWithValue(getExceptionPayload(ex));
    }
  },
);

export const deleteProduct = createAsyncThunk(
  'deleteProduct',
  async (arg: { id: string | number; shopId: string | number }, { rejectWithValue }) => {
    const { id, shopId } = arg;
    try {
      const response = await AuthAxios.delete(`/oga/shop/product/delete/${id}?shop_id=${shopId}`);
      return response;

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
  topSellingData: {
    loaded: false,
    data: null
  },
  batchType: "checkout",
  singleProduct: {
    id: null,
    product_id: null,
    category_id: null,
    cost_price: null,
    sell_price: null,
    shop_product_images: null,
    stock_count: null,
    restock_alert: null,
    shop: { id: null },
    product: { name: null },
    product_unit: { id: null, photo: null, name: null },
    expired_date: null,
    loaded: false,
  },
  categories: { loaded: false, data: null },
};

export const shopsSlice = createSlice({
  name: 'shops',
  initialState,
  reducers: {
    setVendorShops: (
      state,
      action: PayloadAction<shopsState["vendorShops"]>,
    ) => {
      state.vendorShops.loaded = true;
      state.vendorShops.shops = action.payload;
    },
    setSingleShop: (state, action: PayloadAction<shopsState["singleShop"]>) => {
      state.singleShop.loaded = true;
      state.singleShop.selectedShop = action.payload
    },
    setTopSellingData: (state, action: PayloadAction<shopsState["topSellingData"]>) => {
      state.topSellingData.loaded = true;
      state.topSellingData.data = action.payload
    },
    setBatchType: (state, action: PayloadAction<shopsState["batchType"]>) => {
      state.batchType = action.payload
    },
    setSingleProduct: (state, action: PayloadAction<shopsState["singleProduct"]>) => {
      state.singleProduct = { ...action.payload, loaded: true }
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
      })
      .addCase(getSingleShop.pending, state => {
        state.singleShop.loaded = false
      })
      .addCase(getSingleShop.fulfilled, (state, { payload }) => {
        state.singleShop.loaded = true
        state.singleShop.shopData = payload.data
      })
      .addCase(getTopSellingData.fulfilled, (state, { payload }) => {
        state.topSellingData.loaded = true
        state.topSellingData.data = payload.data
      })
  },
});

export const {
  setVendorShops,
  setSingleShop,
  setTopSellingData,
  setBatchType,
  setSingleProduct
} = shopsSlice.actions;

export const shopsData = (state: RootState) => state.shops;

export default shopsSlice.reducer;
