import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const mainAPI = createApi({
  reducerPath: "mainAPI",
  baseQuery: fetchBaseQuery(
    { baseUrl: "http://localhost:8000/api/users/"
    }),
  endpoints: (builder) => ({
   
    getAlbums: builder.query({
      query: () => `album/`,
    }),

    postAlbum: builder.mutation({
      query: (album) => ({
        url: "album",
        method: "POST",
        body: album,      
      }),
    }),
  }),
});
export const {
    useGetAlbumsQuery,
    usePostAlbumMutation
    
} = mainAPI;
