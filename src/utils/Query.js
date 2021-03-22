class Query {
  static search () {
    const query = location.search.substr(1)
    const result = {}
    query.split('&').forEach(part => {
      const items = part.split('=')
      result[items[0]] = decodeURIComponent(items[1])
    })
    return result
  }

  static params2query (params) {
    let paramsList = []
    Object.keys(params).forEach(key => {
      if (key && params[key]) {
        paramsList.push(`${key}=${params[key]}`)
      }
    })
    if (paramsList.length) {
      return `?${paramsList.join('&')}`
    } else {
      return ''
    }
  }
}

export default Query
