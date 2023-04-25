export async function load({ fetch }) {
    const res = await fetch('/api/projects.json')
    let allProjects = await res.json()
  
    // only show posts that are finished
    allProjects = allProjects.filter(x => x.meta.draft === false);
  
    return {
      projects: allProjects
    }
  }
  