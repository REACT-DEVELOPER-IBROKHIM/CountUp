import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem("x-auth-token") || null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, {payload: {token, user}}) => {
      state.user = user;
      state.token = token
      localStorage.setItem("x-auth-token", token)
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("x-auth-token")
    }
  },
});

export const { logout, loginUser } = authSlice.actions;
export default authSlice.reducer;