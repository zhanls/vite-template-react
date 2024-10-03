import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import { RootState } from '@/store';
import { clearToken, setToken } from "@/store/authSlice";
import { LoginRsp } from "./auth";

// create a new mutex
const mutex = new Mutex();
export const baseUrl = import.meta.env.DEV ? '/api' : import.meta.env.VITE_API_URL;

export type BaseResponse<T> = {
  status: number; // 响应编码
  message: string; // 响应信息描述
  data: T; // 泛型T
};

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState, endpoint }) => {
    if (endpoint !== 'ssoLogin') {
      const auth = (getState() as RootState)?.auth;
      const token = endpoint !== 'authRefresh' ? auth?.accessToken : auth.refreshToken;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
    }
    if (import.meta.env.VITE_APIM_KEY) {
      headers.set('Ocp-Apim-Subscription-Key', import.meta.env.VITE_APIM_KEY);
    }
    return headers;
  },
  validateStatus: (response, responseBody) => {
    return response.status === 200 && responseBody?.status === 200;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401 && api.endpoint !== 'authRefresh') {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const token = (api.getState() as RootState).auth.refreshToken;
        const refreshResult = await fetchBaseQuery({
          baseUrl: `${baseUrl}/refresh`,
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Ocp-Apim-Subscription-Key': import.meta.env.VITE_APIM_KEY
          },
          validateStatus: (response, responseBody) => response.status === 200 && responseBody?.status === 200,
        })(args, api, extraOptions);
        const refreshData = refreshResult.data as BaseResponse<LoginRsp> | undefined
        if (refreshData) {
          api.dispatch(setToken(refreshData.data));
          // retry the initial query
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(clearToken());
          const errorData = refreshResult?.error?.data as BaseResponse<void>;
          window.location.assign(`/login?${errorData.status}`);
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
