import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const mainAPI = createApi({
  reducerPath: "mainAPI",
  baseQuery: fetchBaseQuery(
    { baseUrl: "http://localhost:8080/api/users/"
    }),
  endpoints: (builder) => ({

    //User requests
    getUsers: builder.query({
      query: () => ``,
    }),

    addUser: builder.mutation({
      query: (user) => ({
        url: ``,
        method: "POST",
        body: user,      
      }),
    }),

    logUser: builder.mutation({
      query: (user) => ({
        url: ``,
        method: "POST",
        body: user,      
      }),
    }),

    putUser: builder.mutation({
      query: (user) => ({
        url: `${user.id}`,
        method: "PUT",
        body: user,    
      }),
    }),

    //Album requests
   getAlbums: builder.query({
      query: () => `albums/`,
    }),

    addAlbum: builder.mutation({
      query: (album) => ({
        url: `albums/`,
        method: "POST",
        body: album,      
      }),
    }),

    putAlbum: builder.mutation({
      query: (album) => ({
        url: `albums/${album.id}`,
        method: "PUT",
        body: album,      
      }),
    }),

    //Lamina requests
    getLaminas: builder.query({
      query: (album) => `albums/${album.id}/laminas/`,
    }),

    addLamina: builder.mutation({
      query: (lamina, album) => ({
        url: `albums/${album.id}/laminas/`,
        method: "POST",
        body: lamina,      
      }),
    }),

    putLamina: builder.mutation({
      query: (lamina) => ({
        url: `albums/laminas/${lamina.laminaid}`,
        method: "PUT",
        body: lamina,
      }),
    }),

    //Notify requests
    getNotifys: builder.query({
      query: () => `notifys/`,
    }),

    addNotify: builder.mutation({
      query: (notify) => ({
        url: `notifys/`,
        method: "POST",
        body: notify,      
      }),
    }),

    putNotify: builder.mutation({
      query: (notify) => ({
        url: `notifys/${notify.id}`,
        method: "PUT",
        body: notify,      
      }),
    }),

    //Tokenn requests
    getTokens: builder.query({
      query: () => `tokens/`,
    }),

    addToken: builder.mutation({
      query: (token) => ({
        url: `tokens/`,
        method: "POST",
        body: token,      
      }),
    }),

    putToken: builder.mutation({
      query: (token) => ({
        url: `tokens/${token.id}`,
        method: "PUT",
        body: token,      
      }),
    }),

  }),
});
export const {
  useGetUsersQuery,
  useAddUserMutation,
  useLogUserMutation,
  usePutUserMutation,
  useGetAlbumsQuery,
  useAddAlbumMutation,
  usePutAlbumMutation,
  useGetLaminasQuery,
  useAddLaminaMutation,
  usePutLaminaMutation,
  useGetNotifysQuery,
  useAddNotifyMutation,
  usePutNotifyMutation,
  useGetTokensQuery,
  useAddTokenMutation,
  usePutTokenMutation,
} = mainAPI;
