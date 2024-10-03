import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AccountType, authApi, LoginRsp } from '@/api/services/auth';
import type { RootState } from './index';

const initialState: LoginRsp & { sso: string } = {
  accessToken: '',
  refreshToken: '',
  sso: '',
  userInfo: {
    accountType: AccountType.COMPANY_ADMIN,
    tr: [],
    companyAdmin: [],
    multipleAdmin: [],
    designatedAdmin: [],
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, { payload }: PayloadAction<LoginRsp>) {
      if (payload) {
        const { accessToken, refreshToken, userInfo } = payload;
        Object.assign(state, { accessToken, refreshToken });
        if (userInfo) {
          state.userInfo = userInfo;
        }
      }
    },
    clearToken: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.ssoLogin.matchFulfilled, (state, action) => {
        authSlice.caseReducers.setToken(Object.assign(state, action.meta.arg.originalArgs), action);
      })
      .addMatcher(authApi.endpoints.authRefresh.matchFulfilled, authSlice.caseReducers.setToken)
      .addMatcher(authApi.endpoints.authLogout.matchFulfilled, authSlice.caseReducers.clearToken);
  },
});

export const { setToken, clearToken } = authSlice.actions;
export const selectSsoToken = (state: RootState) => state.auth.sso;
export const selectToken = (state: RootState) => state.auth.accessToken;
export const selectUserInfo = (state: RootState) => state.auth.userInfo;
export const selectAccountType = (state: RootState) => state.auth.userInfo.accountType;
