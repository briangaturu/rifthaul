import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
  tagTypes: ['auth'],
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (userLoginCredentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: userLoginCredentials,
      }),
    }),
    registerUser: builder.mutation({
      query: (userRegisterPayload) => ({
        url: 'auth/register',
        method: 'POST',
        body: userRegisterPayload,
      }),
    }),
    requestPasswordReset: builder.mutation({
      query: (email: string) => ({
        url: 'auth/password-reset',
        method: 'POST',
        body: { email },
      }),
    }),
    updatePassword: builder.mutation({
      query: ({ token, password }: { token: string; password: string }) => ({
        url: `auth/update/${token}`,
        method: 'PUT',
        body: { password },
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useRequestPasswordResetMutation,
  useUpdatePasswordMutation,
} = authApi;