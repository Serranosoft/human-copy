const API_URL = process.env.WORDPRESS_API_URL

async function fetchAPI(query = {}) {
    const headers = { 'Content-Type': 'application/json' }

    const res = await fetch(API_URL!, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            query,
        }),
    })

    const json = await res.json()
    if (json.errors) {
        console.error(json.errors)
        throw new Error('Failed to fetch API')
    }
    return json.data
}


export async function getPostBySlug(category: string, slug: string) {
  const data = await fetchAPI(
    `
    {
      post(id: "/${category}/${slug}", idType: SLUG) {
        title
        content
        slug
        featuredImage {
          node {
            sourceUrl
          }
        }
        author {
          node {
            name
            avatar {
              default
              url
            }
          }
        }
      }
    }
    `
  )

  return data?.post
}

export async function getAllSlugs() {
  const data = await fetchAPI(`
    {
      posts(first: 100) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)
  return data?.posts
}


export async function getAllPosts(category: string) {
  const data = await fetchAPI(
    
    `
    query NewQuery {
        posts(where: {categoryName: "${category}"}) {
          edges {
            node {
              id
              slug
              title
              excerpt
              featuredImage {
                node {
                  sourceUrl
                }
              }
            }
          }
        }
      }
    `
  );

  return data?.posts;
}