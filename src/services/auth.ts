import { BaseResponse, api } from './index';

export type LoginReq = {
  username: string;
  password: string;
  preLogin?: boolean;
};

export enum AccountType {
  TR = 'tr',
  COMPANY_ADMIN = 'companyAdmin',
  MULTIPLE_ADMIN = 'multipleAdmin',
  DESIGNATED_ADMIN = 'designatedAdmin',
}

type TR = {
  bossId: string;
  lastNameEn: string;
  lastNameCn: string;
  givenNameEn: string;
  givenNameCn: string;
};

type CompanyAdmin = {
  bossId: string;
  adminLastNameEn: string;
  adminLastNameCn: string;
  adminGivenNameEn: string;
  adminGivenNameCn: string;
};

export type LoginRsp = {
  accessToken: string;
  refreshToken: string;
  userInfo: {
    accountType: AccountType;
    [AccountType.TR]?: TR[];
    [AccountType.COMPANY_ADMIN]?: CompanyAdmin[];
    [AccountType.MULTIPLE_ADMIN]?: CompanyAdmin[];
    [AccountType.DESIGNATED_ADMIN]?: CompanyAdmin[];
  };
};

export type SsoLoginReq = {
  sso: string;
  refreshTokenUrl: string;
  expiresOn: string;
};

const curriedUrl = (suffix: string) => `/auth${suffix}`;

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    authLogin: builder.mutation<LoginRsp, LoginReq>({
      query: (body) => ({
        url: curriedUrl('/login'),
        method: 'POST',
        body,
      }),
      transformResponse: (response: BaseResponse<LoginRsp>) => response.data,
    }),
    authRefresh: builder.mutation<LoginRsp, void>({
      query: () => ({
        url: curriedUrl('/refresh'),
        method: 'POST',
      }),
      transformResponse: (response: BaseResponse<LoginRsp>) => response.data,
    }),
    authLogout: builder.mutation<void, void>({
      query: () => ({
        url: curriedUrl('/logout'),
        method: 'POST',
      }),
      transformResponse: (response: BaseResponse<void>) => response.data,
    }),
    ssoLogin: builder.mutation<LoginRsp, SsoLoginReq>({
      query: (body) => ({
        url: curriedUrl('/sso-login'),
        method: 'POST',
        body,
      }),
      transformResponse: (response: BaseResponse<LoginRsp>) => response.data,
    }),
    authSign: builder.query<string, string>({
      query: (targetId) => ({
        url: curriedUrl('/signature'),
        method: 'POST',
        body: {
          targetId,
        },
      }),
      transformResponse: (response: BaseResponse<string>) => response.data,
    }),
  }),
});

export const {
  useAuthLoginMutation,
  useAuthRefreshMutation,
  useAuthLogoutMutation,
  useSsoLoginMutation,
  useAuthSignQuery,
  useLazyAuthSignQuery,
} = authApi;
