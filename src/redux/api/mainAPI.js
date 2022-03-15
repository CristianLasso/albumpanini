import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const mainAPI = createApi({
  reducerPath: "mainAPI",
  baseQuery: fetchBaseQuery(
    { baseUrl: "localhost:8080/api/users/"
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
  }),
});
export const {
    useAddAlbumMutation,
    useGetAlbumsQuery,
} = mainAPI;
