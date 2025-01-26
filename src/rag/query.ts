import { Index as UpstashIndex } from '@upstash/vector'

// Initialize Upstash Vector client

// INFO: This is a great local index, but you can add a namespace
// to separate data between different users.

// Example: index.namespace('user_1234').query({ ... })
const index = new UpstashIndex({
  url: process.env.UPSTASH_VECTOR_REST_URL as string,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN as string,
})

type MovieMetadata = {
  title?: string
  year?: string
  genre?: string
  director?: string
  actors?: string
  rating?: string
  votes?: string
  revenue?: string
  metascore?: string
}

export const queryMovies = async (
  query: string,
  filters?: Partial<MovieMetadata>,
  topK: number = 5
) => {
  // Build filter string if filters provided
  // let filterStr = ''
  // if (filters) {
  //   const filterParts = Object.entries(filters)
  //     .filter(([_, value]) => value !== undefined)
  //     .map(([key, value]) => `${key}='${value}'`)

  //   if (filterParts.length > 0) {
  //     filterStr = filterParts.join(' AND ')
  //   }
  // }

  // Query the vector store
  const results = await index.query({
    data: query,
    topK,
    // TODO: Bring back the filter after we build the tool
    // filter: filterStr || undefined,
    // The two lines below are included so that the AI can see the data
    // associated with the results. If they aren't included, the AI won't
    // be able to see the data associated with the results, which will
    // make it challenging for the AI to draw similaries.
    includeMetadata: true,
    includeData: true,
  })

  return results
}
