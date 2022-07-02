import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import AuthAxios from '@utils/api/authAxios';
import getExceptionPayload from '@utils/api/getExecptionPayload';
import type { RootState } from '../index';

export type userState = {
  userLoaded: boolean;
  user:  {
    id: number;
  };
}

export const getUser = createAsyncThunk(
  "getUser",
  async(_, { rejectWithValue }) => {
    try {
      const response = await AuthAxios.get("/user");

      return response.data;
    } catch(ex) {
      return rejectWithValue(getExceptionPayload(ex))
    }
  }
);

export const initialState:userState = {
  userLoaded: false,
  user: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<userState["user"]>) => {
      state.userLoaded = true;
      state.user = action.payload
    }
  }
})

export const { setUser } = userSlice.actions;

export const userData = (state: RootState) => state.user;

export default userSlice.reducer;

