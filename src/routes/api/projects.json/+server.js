import { json } from '@sveltejs/kit';

export async function GET() {
    const allPostFiles = import.meta.glob('../../projects/**/*.md')
    const iterablePostFiles = Object.entries(allPostFiles)
  
    const allPosts = await Promise.all(
      iterablePostFiles.map(async ([path, resolver]) => {
        const { metadata } = await resolver()
        const postPath = path.slice(5, -9)
      
        return {
          meta: metadata,
          path: postPath
        }
      })
    )
    
    const sortedPosts = allPosts.sort((a, b) => {
      return new Date(b.meta.date) - new Date(a.meta.date)
    })
  
    return json(sortedPosts)
  }