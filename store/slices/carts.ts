import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import AuthAxios from '@utils/api/authAxios';
import getExceptionPayload from '@utils/api/getExecptionPayload';
import type { RootState } from '../index';

export type cartsState = {
  cartsLoaded: boolean;
  carts: any;
  transactionSales: {
    loaded: boolean;
    data: any;
  };
  transactionExpenses: {
    loaded: boolean;
    data: any;
  };
};

export const addToCart = createAsyncThunk(
  'addToCart',
  async (
    params: {
      quantity: number;
      amount: number;
      shopProductId: string | number;
      content: string;
      shopId: string | number;
      cartLength: number;
      cartId: number;
      itemInCart: boolean;
      itemId?: number;
    },
    { rejectWithValue },
  ) => {
    const {
      quantity,
      amount,
      shopProductId,
      content,
      shopId,
      cartLength,
      cartId,
      itemInCart,
      itemId
    } = params;
    
    let query: string;
    try {
      if (cartLength) {
        if (itemInCart) {
          query = `?cart_id=${cartId}&shop_product_id=${shopProductId}&quantity=${quantity}&amount=${amount}&content=${content}`;
        } else {
          query = `?shop_id=${shopId}&cart_id=${cartId}&shop_product_id=${shopProductId}&quantity=${quantity}&amount=${amount}&content=${content}`;
        }
      }

      if (!cartLength) {
        query = `?shop_id=${shopId}&cart_item[0][shop_product_id]=${shopProductId}&cart_item[0][quantity]=${quantity}&cart_item[0][amount]=${amount}&content[0]=${content}`;
      }

      const newItem = `oga/${
        !cartLength ? 'cart' : 'cart-item'
      }/create${query}`;

      const updateItem = `oga/cart-item/update/${itemId}${query}`;
      const response = itemInCart
        ? await AuthAxios.put(updateItem)
        : await AuthAxios.post(newItem);

      return response.data;
    } catch (ex) {
      return rejectWithValue(getExceptionPayload(ex));
    }
  },
);

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
  async ({id, search }: { id: string | number, search?: string }, { rejectWithValue }) => {
    try {
      const response = await AuthAxios.get(`/oga/order/index?shop_id=${id}${search ? `&search=${search}` : ""}`);

      return response.data;
    } catch (ex) {
      return rejectWithValue(getExceptionPayload(ex));
    }
  },
);

export const getTransactionsExpenses = createAsyncThunk(
  'transactionExpenses',
  async (id: string | number, { rejectWithValue }) => {
    try {
      const response = await AuthAxios.get(
        `/oga/shop/expense/index?shop_id=${id}`,
      );

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
    data: null,
  },
  transactionExpenses: {
    loaded: false,
    data: null,
  },
};

export const cartsSlice = createSlice({
  name: 'carts',
  initialState,
  reducers: {
    setOpenCart: (state, action: PayloadAction<cartsState['carts']>) => {
      state.cartsLoaded = true;
      state.carts = action.payload;
    },
    setTransactionsSales: (
      state,
      action: PayloadAction<cartsState['transactionSales']>,
    ) => {
      state.transactionSales.loaded = true;
      state.transactionSales.data = action.payload;
    },
    setTransactionsExpenses: (
      state,
      action: PayloadAction<cartsState['transactionExpenses']>,
    ) => {
      state.transactionExpenses.loaded = true;
      state.transactionExpenses.data = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getOpenCart.pending, state => {
        state.cartsLoaded = false;
      })
      .addCase(getOpenCart.fulfilled, (state, { payload }) => {
        state.cartsLoaded = true;
        state.carts = payload.data;
      })
      .addCase(getTransactionSales.fulfilled, (state, { payload }) => {
        state.transactionSales.loaded = true;
        state.transactionSales.data = payload.data;
      })
      .addCase(getTransactionsExpenses.fulfilled, (state, { payload }) => {
        state.transactionExpenses.loaded = true;
        state.transactionExpenses.data = payload.data;
      });
  },
});

export const { setOpenCart, setTransactionsSales, setTransactionsExpenses } =
  cartsSlice.actions;

export const cartsData = (state: RootState) => state.carts;

export default cartsSlice.reducer;
