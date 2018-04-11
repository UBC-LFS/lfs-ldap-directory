const express = require('express')
const assert = require('assert')
const ldap = require('ldapjs')

const app = express()

const client = ldap.createClient({
  url: 'ldap://ldap.ubc.ca'
})

const opts = {
  filter: '(&(ou=Land and Food Systems, Faculty of)(title=Staff))',
  scope: 'sub'
}

const search = new Promise((resolve, reject) => {
  client.search('ou=people,o=ubc.ca', opts, (err, res) => {
    if (err) reject(err)
    res.on('searchEntry', (entry) => {
      const result = JSON.stringify(entry.object)
      resolve(result)
    })
  })
})

app.get('/', (req, res) => {
  search.then(result => res.send(result))
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
