import { json } from '@sveltejs/kit';

export async function GET({ url }) {
  const allFiles = import.meta.glob('./*.json', { eager: true })
  const iterableFiles = Object.entries(allFiles)

  const dataNames = iterableFiles.map(row => {
    
    // keep the path around e.g. "./anscombe.json"
    //const path = row[0]
    // extract the slug e.g. "anscombe"
    const slug = row[0].slice(2, -5)
    // extract the data
    const data = row[1].default

    return {
      [slug]: data  // put the data under its slug
    } 
  })
  
  // get the requested name via the url
  const param = url.searchParams.get('name');
  // check if the requested name is available 
  // (if it is it will have an index that IS NOT -1)
  const index = dataNames.findIndex(x => x[param]);
  
  if (index !== -1) {

    const data = dataNames[index][param];

    return json(data)
  }
  
  return new Response('I think you messed up, sorry. Make sure you type in the correct ?name=')
  }