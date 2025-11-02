import { gql } from "@apollo/client";

export const QUERY_VIDEO_ANIMETHEMES = gql`
  query ($id: [Int!]!) {  
    findAnimeByExternalSite(site: MAL, id: $id) {
      id
      animethemes {
        slug
        type
        song {
          id
          title
        }
        animethemeentries {
          videos {
            nodes {
              audio {
                id
                link
              }
              link
            }
            edges {
              node {
                basename
              }
            }
          }
        }
      }
    }
  }
`;