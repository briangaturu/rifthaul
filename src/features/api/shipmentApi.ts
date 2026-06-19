import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shipmentApi = createApi({
  reducerPath: 'shipmentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any)?.auth?.token;
      if (token) headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['shipments', 'shipment', 'openShipments', 'myShipments'],
  endpoints: (builder) => ({
    createShipment: builder.mutation({
      query: (shipmentPayload) => ({
        url: 'shipments',
        method: 'POST',
        body: shipmentPayload,
      }),
      invalidatesTags: ["shipments", "openShipments", "myShipments"],
    }),
    getAllShipments: builder.query({
      query: (search?: string) => search ? `shipments?search=${search}` : 'shipments',
      providesTags: ["shipments"],
    }),
    getOpenShipments: builder.query({
      query: () => 'shipments/open',
      providesTags: ["openShipments"],
    }),
    getMyShipments: builder.query({
      query: () => 'shipments/mine',
      providesTags: ["myShipments"],
    }),
    getShipmentById: builder.query({
      query: (shipmentId: number) => `shipments/${shipmentId}`,
      providesTags: ["shipment"],
    }),
    updateShipment: builder.mutation({
      query: ({ shipmentId, ...patch }) => ({
        url: `shipments/${shipmentId}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: ["shipment", "shipments", "myShipments"],
    }),
    updateShipmentStatus: builder.mutation({
      query: ({ shipmentId, status, transporterId, truckId }: { shipmentId: number; status: string; transporterId?: number; truckId?: number }) => ({
        url: `shipments/${shipmentId}/status`,
        method: 'PATCH',
        body: { status, transporterId, truckId },
      }),
      invalidatesTags: ["shipment", "shipments", "openShipments", "myShipments"],
    }),
    deleteShipment: builder.mutation({
      query: (shipmentId: number) => ({
        url: `shipments/${shipmentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["shipments", "openShipments", "myShipments"],
    }),
  }),
});

export const {
  useCreateShipmentMutation,
  useGetAllShipmentsQuery,
  useGetOpenShipmentsQuery,
  useGetMyShipmentsQuery,
  useGetShipmentByIdQuery,
  useUpdateShipmentMutation,
  useUpdateShipmentStatusMutation,
  useDeleteShipmentMutation,
} = shipmentApi;