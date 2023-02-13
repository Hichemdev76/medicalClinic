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
  tagTypes: ["User", "Users", "ArchivedUsers"],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `users/${id}`,
      providesTags: ["User"],
    }),
    getUsers: build.query({
      query: () => "users/all",
      providesTags: ["Users"],
    }),
    getArchivedUsers: build.query({
      query: () => "users/archives",
      providesTags: ["ArchivedUsers"],
    }),
  }),
});

export const { useGetUserQuery, useGetUsersQuery, useGetArchivedUsersQuery } = api;
