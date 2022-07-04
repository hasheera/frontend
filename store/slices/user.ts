import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import AuthAxios from '@utils/api/authAxios';
import getExceptionPayload from '@utils/api/getExecptionPayload';
import type { RootState } from '../index';

export type userState = {
  userLoaded: boolean;
  user: {
    user: {
      id: number;
      first_name: string;
      surname: string;
      username: string;
      image: string;
    };
  };
};

export const getUser = createAsyncThunk(
  'getUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await AuthAxios.get('/auth/user/index');

      return response.data;
    } catch (ex) {
      return rejectWithValue(getExceptionPayload(ex));
    }
  },
);

export const initialState: userState = {
  userLoaded: false,
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<userState['user']>) => {
      state.userLoaded = true;
      state.user = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getUser.pending, (state) => {
      state.userLoaded = false
    })
    .addCase(getUser.fulfilled, (state, { payload }) => {
      state.userLoaded = true
      state.user = payload.data
    })
  }
});

export const { setUser } = userSlice.actions;

export const userData = (state: RootState) => state.user;

export default userSlice.reducer;
