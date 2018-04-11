const assert = require('assert')
const ldap = require('ldapjs')
const client = ldap.createClient({
  url: 'ldap://ldap.ubc.ca'
})

const opts = {
  filter: '(&(ou=Land and Food Systems, Faculty of)(title=Staff))',
  scope: 'sub'
}

client.search('ou=people,o=ubc.ca', opts, (err, res) => {
  assert.ifError(err)
  res.on('searchEntry', (entry) => {
    const result = JSON.stringify(entry.object)
    console.log(result)
  })
})
