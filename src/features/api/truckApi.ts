import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const truckApi = createApi({
  reducerPath: 'truckApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any)?.auth?.token;
      if (token) headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['trucks', 'truck', 'myTrucks'],
  endpoints: (builder) => ({
    createTruck: builder.mutation({
      query: (truckPayload) => ({
        url: 'trucks',
        method: 'POST',
        body: truckPayload,
      }),
      invalidatesTags: ["trucks", "myTrucks"],
    }),
    getAllTrucks: builder.query({
      query: (location?: string) => location ? `trucks?location=${location}` : 'trucks',
      providesTags: ["trucks"],
    }),
    getMyTrucks: builder.query({
      query: () => 'trucks/mine',
      providesTags: ["myTrucks"],
    }),
    getTruckById: builder.query({
      query: (truckId: number) => `trucks/${truckId}`,
      providesTags: ["truck"],
    }),
    updateTruck: builder.mutation({
      query: ({ truckId, ...patch }) => ({
        url: `trucks/${truckId}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: ["truck", "trucks", "myTrucks"],
    }),
    updateTruckStatus: builder.mutation({
      query: ({ truckId, status }: { truckId: number; status: string }) => ({
        url: `trucks/${truckId}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ["truck", "trucks", "myTrucks"],
    }),
    deleteTruck: builder.mutation({
      query: (truckId: number) => ({
        url: `trucks/${truckId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["trucks", "myTrucks"],
    }),
  }),
});

export const {
  useCreateTruckMutation,
  useGetAllTrucksQuery,
  useGetMyTrucksQuery,
  useGetTruckByIdQuery,
  useUpdateTruckMutation,
  useUpdateTruckStatusMutation,
  useDeleteTruckMutation,
} = truckApi;