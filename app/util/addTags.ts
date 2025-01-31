export const addTags = (tags: string | string[], searchTags: string[]) => {
  if (typeof tags === 'string') {
    if (!searchTags.some(searchTag => searchTag.startsWith(tags))) {
      searchTags.push(tags)
      addTags(tags.split(' '), searchTags)
    }
  } else tags.forEach(tag => !searchTags.some(searchTag => searchTag.startsWith(tag)) ? searchTags.push(tag) : null)
}