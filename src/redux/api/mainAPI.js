import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {useContext} from "react";
import AppContext from "../../context/AppContext";

const state = useContext(AppContext);

// Define a service using a base URL and expected endpoints
export const mainAPI = createApi({
  reducerPath: "mainAPI",
  baseQuery: fetchBaseQuery(
    { baseUrl: "http://localhost:8080/api/users/"+state.currentUser.id+"/"
    }),
  endpoints: (builder) => ({

    //Album requests
   getAlbums: builder.query({
      query: () => "albums/",
    }),

    addAlbum: builder.mutation({
      query: (album) => ({
        url: "albums/",
        method: "POST",
        body: album,      
      }),
    }),

    putAlbum: builder.mutation({
      query: (album) => ({
        url: "albums/"+album.id,
        method: "PUT",
        body: album,      
      }),
    }),

    //Lamina requests
    getLaminas: builder.query({
      query: () => "albums/"+state.currenAlbum.id+"/laminas/",
    }),

    addLamina: builder.mutation({
      query: (lamina) => ({
        url: "albums/"+state.currenAlbum.id+"/laminas/",
        method: "POST",
        body: lamina,      
      }),
    }),

    putLamina: builder.mutation({
      query: (lamina) => ({
        url: "albums/"+state.currenAlbum.id+"/laminas/"+lamina.id,
        method: "PUT",
        body: lamina,
      }),
    }),

    //Notify requests
    getNotifys: builder.query({
      query: () => "notifys/",
    }),

    addNotify: builder.mutation({
      query: (notify) => ({
        url: "notifys/",
        method: "POST",
        body: notify,      
      }),
    }),

    putNotify: builder.mutation({
      query: (notify) => ({
        url: "notifys/"+notify.id,
        method: "PUT",
        body: notify,      
      }),
    }),

    //Token requests
    getTokens: builder.query({
      query: () => "tokens/",
    }),

    addToken: builder.mutation({
      query: (token) => ({
        url: "tokens/",
        method: "POST",
        body: token,      
      }),
    }),

    putToken: builder.mutation({
      query: (token) => ({
        url: "tokens/"+token.id,
        method: "PUT",
        body: token,      
      }),
    }),

  }),
});
export const {
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
