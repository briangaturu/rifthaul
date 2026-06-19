import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
  tagTypes: ['users', 'user', 'transporters', 'businesses'],
  endpoints: (builder) => ({
    getUserById: builder.query({
      query: (userId: number) => `users/${userId}`,
      providesTags: ["user"],
    }),
    getAllTransporters: builder.query({
      query: () => 'users/transporters',
      providesTags: ["transporters"],
    }),
    getAllBusinesses: builder.query({
      query: () => 'users/businesses',
      providesTags: ["businesses"],
    }),
    updateUserProfile: builder.mutation({
      query: ({ userId, ...patch }) => ({
        url: `users/${userId}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: ["user", "users"],
    }),
    updateUserProfileImage: builder.mutation({
      query: ({ userId, profileUrl }: { userId: number; profileUrl: string }) => ({
        url: `users/${userId}`,
        method: 'PUT',
        body: { profileUrl },
      }),
      invalidatesTags: ["user", "users"],
    }),
    deleteUserProfile: builder.mutation({
      query: (userId: number) => ({
        url: `users/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["user", "users"],
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useGetAllTransportersQuery,
  useGetAllBusinessesQuery,
  useUpdateUserProfileMutation,
  useUpdateUserProfileImageMutation,
  useDeleteUserProfileMutation,
} = userApi;