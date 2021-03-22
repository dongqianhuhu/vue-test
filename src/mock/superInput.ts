const mockData = {
  title: 'Example Title',
  members: [
    { id: 'e1', name: 'LeBron James', avatar: 'lightblue' },
    { id: 'e2', name: 'Kevin Durant', avatar: 'lightgreen' },
    { id: 'e3', name: 'Giannis Antetokounmpo', avatar: 'lightcoral' }
  ]
}

/** */
export const getData = (a: any) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockData)
    }, 50)
  })
}
