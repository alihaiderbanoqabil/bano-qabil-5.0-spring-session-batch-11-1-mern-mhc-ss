import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER_API_URL } from "../../constants";

const baseQuery = fetchBaseQuery({
  baseUrl: SERVER_API_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token =
      localStorage.getItem("token") || getState()?.auth?.token || null;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const ecommerceApi = createApi({
  reducerPath: "ecommerceApi",
  baseQuery,
  tagTypes: ["Auth", "User", "Product", "Category", "Order", "Media"],
  endpoints: (build) => ({
    register: build.mutation({
      query: (body) => ({
        url: "/api/auth/register",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),

    login: build.mutation({
      query: (credentials) => ({
        url: "/api/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),

    getMe: build.query({
      query: () => "/api/auth/me",
      providesTags: ["Auth"],
    }),

    verifyEmail: build.query({
      query: (token) => ({
        url: "/api/auth/verify-email",
        params: { token },
      }),
      providesTags: ["Auth"],
    }),

    createUserByAdmin: build.mutation({
      query: (body) => ({
        url: "/api/users",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    getUsers: build.query({
      query: () => "/api/users",
      providesTags: ["User"],
    }),

    getUserById: build.query({
      query: (id) => `/api/users/${id}`,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),

    updateUser: build.mutation({
      query: ({ id, ...body }) => ({
        url: `/api/users/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "User", id }],
    }),

    deleteUser: build.mutation({
      query: (id) => ({
        url: `/api/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    getProducts: build.query({
      query: (params = {}) => ({
        url: "/api/products",
        params,
      }),
      providesTags: ["Product"],
    }),

    getProductById: build.query({
      query: (id) => `/api/products/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),

    createProduct: build.mutation({
      query: (formData) => ({
        url: "/api/products",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),

    updateProduct: build.mutation({
      query: ({ id, formData }) => ({
        url: `/api/products/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Product", id }],
    }),

    deleteProduct: build.mutation({
      query: (id) => ({
        url: `/api/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    getCategories: build.query({
      query: () => "/api/categories",
      providesTags: ["Category"],
    }),

    getCategoryById: build.query({
      query: (id) => `/api/categories/${id}`,
      providesTags: (result, error, id) => [{ type: "Category", id }],
    }),

    createCategory: build.mutation({
      query: (formData) => ({
        url: "/api/categories",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Category"],
    }),

    updateCategory: build.mutation({
      query: ({ id, formData }) => ({
        url: `/api/categories/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Category", id }],
    }),

    deleteCategory: build.mutation({
      query: (id) => ({
        url: `/api/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),

    getOrders: build.query({
      query: (params = {}) => ({
        url: "/api/orders",
        params,
      }),
      providesTags: ["Order"],
    }),

    getOrderById: build.query({
      query: (id) => `/api/orders/${id}`,
      providesTags: (result, error, id) => [{ type: "Order", id }],
    }),

    createOrder: build.mutation({
      query: (body) => ({
        url: "/api/orders",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Order"],
    }),

    updateOrder: build.mutation({
      query: ({ id, ...body }) => ({
        url: `/api/orders/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Order", id }],
    }),

    deleteOrder: build.mutation({
      query: (id) => ({
        url: `/api/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Order"],
    }),

    uploadMedia: build.mutation({
      query: (formData) => ({
        url: "/api/media/upload",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Media"],
    }),

    uploadMultipleMedia: build.mutation({
      query: (formData) => ({
        url: "/api/media/upload-multiple",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Media"],
    }),

    updateMedia: build.mutation({
      query: ({ id, formData }) => ({
        url: `/api/media/upload/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Media"],
    }),

    deleteMedia: build.mutation({
      query: (id) => ({
        url: `/api/media/upload/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Media"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetMeQuery,
  useVerifyEmailQuery,
  useCreateUserByAdminMutation,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useUploadMediaMutation,
  useUploadMultipleMediaMutation,
  useUpdateMediaMutation,
  useDeleteMediaMutation,
} = ecommerceApi;
