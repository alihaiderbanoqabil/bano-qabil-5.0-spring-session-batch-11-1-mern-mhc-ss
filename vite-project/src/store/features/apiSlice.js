import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const ecommerceApi = createApi({
  reducerPath: "ecommerceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  endpoints: (build) => ({
    getUsers: build.query({
      query: (params = "") => `users${params}`,
    }),
    getUserById: build.query({
      query: (id) => `users/${id}`,
    }),

    createUser: build.mutation({
      query: (data) => ({
        url: `users`,
        method: "POST",
        body: data,
      }),
    }),
    updateUser: build.mutation({
      query: (data) => {
        const { id, ...payload } = data;
        return {
          url: `users/${id}`,
          method: "PUT",
          body: payload,
        };
      },
    }),
    deleteUser: build.mutation({
      query: (id) => {
        return {
          url: `users/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetUsersQuery,
  useLazyGetUsersQuery,
  useGetUserByIdQuery,
  useLazyGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = ecommerceApi;
