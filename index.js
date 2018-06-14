const express = require('express')
const ldap = require('ldapjs')
const cors = require('cors')

const app = express()

app.use(cors({
  origin: 'http://www.landfood.ubc.ca'
}))

const client = ldap.createClient({
  url: 'ldap://ldap.ubc.ca',
  optionsSuccessStatus: 200
})

const opts = {
  filter: '(&(ou=Land and Food Systems, Faculty of)(|(title=Faculty)(title=Staff)))',
  scope: 'sub',
  attributes: ['cn', 'sn', 'mail', 'title', 'telephoneNumber', 'givenName', 'l']
}

const search = () => new Promise((resolve, reject) => {
  client.search('ou=people,o=ubc.ca', opts, (err, res) => {
    if (err) reject(err)
    const results = []
    res.on('searchEntry', entry => {
      const result = entry.object
      results.push(result)
    })
    res.on('end', result => {
      resolve(results)
    })
  })
})

const nocache = (req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
  res.header('Expires', '-1')
  res.header('Pragma', 'no-cache')
  next()
}

app.get('/lfsdir', nocache, (req, res) => {
  search().then(result => res.send(result))
})

app.listen(10080, () => console.log('App listening on port 10080!'))