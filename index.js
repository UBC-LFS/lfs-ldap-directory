const express = require('express')
const ldap = require('ldapjs')

const app = express()

const client = ldap.createClient({
  url: 'ldap://ldap.ubc.ca'
})

const opts = {
  filter: '(ou=Land and Food Systems, Faculty of)',
  scope: 'sub',
  attributes: ['cn', 'sn', 'mail', 'title', 'telephoneNumber', 'givenName']
}

const search = new Promise((resolve, reject) => {
  client.search('ou=people,o=ubc.ca', opts, (err, res) => {
    if (err) reject(err)
    const results = []
    res.on('searchEntry', entry => {
      const result = entry.object
      results.push(result)
    })
    res.on('end', (result) => {
      resolve(results)
    })
  })
})

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.get('/', (req, res) => {
  search.then(result => res.send(result))
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
