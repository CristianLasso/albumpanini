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

  }),
});
export const {
  useGetAlbumsQuery,
  useAddAlbumMutation,
  usePutAlbumMutation,
  useGetLaminasQuery,
  useAddLaminaMutation,
  usePutLaminaMutation,
} = mainAPI;
