import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const state = getState();
      const token = state.global.token;
      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  reducerPath: "adminApi",
  tagTypes: ["User", "Users", "ArchivedUsers", "Service", "Services", "Leave"],
  endpoints: (build) => ({
    addUser: build.mutation({
      query: (body) => ({
        url: "/addUser",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Users"],
    }),
    getUser: build.query({
      query: (id) => `users/${id}`,
      providesTags: ["User"],
    }),
    getAllUsers: build.query({
      query: () => `users/`,
      providesTags: ["Users"],
    }),
    getUsers: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "users/all",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Users"],
    }),
    getArchivedUsers: build.query({
      query: () => "users/archives",
      providesTags: ["ArchivedUsers"],
    }),
    updateUser: build.mutation({
      query: ({ updates, id }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: updates,
      }),
      invalidatesTags: ["User", "ArchivedUsers", "Service","Users"],
    }),
    getService: build.query({
      query: (name) => ({
        url: `/services/${name}`,
        method: "GET",
      }),
      providesTags: ["Service"],
    }),
    getAllService: build.query({
      query: () => `/services`,
      providesTags: ["Services"],
    }),
    addService: build.mutation({
      query: (body) => ({
        url: "/services",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Service", "Services", "Users"],
    }),
    updateService: build.mutation({
      query: ( updateBody ) => ({
        url: `/services/update`,
        method: "PATCH",
        body: updateBody,
      }),
      invalidatesTags: ["Services","Service", "User","Users"],
    }),
    addLeave: build.mutation({
      query: (body) => ({
        url: "/leaves",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Leaves"],
    }),
    updateLeave: build.mutation({
      query: ({ id, updateBody }) => ({
        url: `/leaves/${id}`,
        method: "PATCH",
        body: updateBody,
      }),
      invalidatesTags: ["Leaves", "Leave", "User"],
    }),
    getAllLeaves: build.query({
      query: () => "/leaves",
      providesTags: ["Leaves"],
    }),
    getLeave: build.query({
      query: (id) => ({
        url: `/Leaves/${id}`,
        method: "GET",
      }),
      providesTags: ["Leave"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetUsersQuery,
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useGetArchivedUsersQuery,
  useAddServiceMutation,
  useGetAllServiceQuery,
  useGetServiceQuery,
  useAddLeaveMutation,
  useGetAllLeavesQuery,
  useGetLeaveQuery,
  useUpdateLeaveMutation,
  useAddUserMutation,
  useUpdateServiceMutation
} = api;
