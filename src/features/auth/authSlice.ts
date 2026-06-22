import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  userId: number | null;
  email: string | null;
  userType: 'business' | 'transporter' | 'admin' | null;
}

const storedAuth = localStorage.getItem('riftHaulAuth');
const initialState: AuthState = storedAuth
  ? (JSON.parse(storedAuth) as AuthState)
  : { token: null, userId: null, email: null, userType: null };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.userType = action.payload.userType;
      localStorage.setItem('riftHaulAuth', JSON.stringify(state));
    },
    logout: (state) => {
      state.token = null;
      state.userId = null;
      state.email = null;
      state.userType = null;
      localStorage.removeItem('riftHaulAuth');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;