import request from 'request'

export default {
  getContributions (user) {
    return new Promise((resolve) => {
      const requestUrl = 'https://github.com/users/' + user + '/contributions'
      request.get(requestUrl, (err, res, body) => {
        if (err) {
          console.error(err)
        }
        const contributions = body.match(/data-count="[0-9]+"/g)
        const colors = body.match(/#[a-z0-9]+/g)
        const response = []
        for (let i = 0; i < contributions.length; i++) {
          // row.push({count: parseInt(contributions[i].substr(12), 10), color: colors[i]})
          // if (row.length === 7) {
          //   response.push(row)
          //   row = []
          // } else if (i === contributions.length - 1) {
          //   response.push(row)
          // }
          response.push({count: parseInt(contributions[i].substr(12), 10), color: colors[i]})
        }
        resolve(response)
      })
    })
  }
}
