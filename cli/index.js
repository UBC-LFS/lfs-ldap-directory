/* global XMLHttpRequest, $ */

const generateTable = (staffList) => {
  const cleanStaffList = staffList.map(staff => ({
    firstName: staff.givenName,
    lastName: staff.sn,
    phone: staff.telephoneNumber,
    email: staff.mail,
    title: staff.title
  }))
  const dataForTable = cleanStaffList.map(staff => (
    [
      staff.lastName,
      staff.firstName,
      staff.title,
      staff.email,
      staff.phone
    ]
  ))
  $('#staffList').DataTable({
    data: dataForTable,
    columns: [
      { title: 'Last Name', 'defaultContent': '' },
      { title: 'First Name', 'defaultContent': '' },
      { title: 'Title', 'defaultContent': '' },
      { title: 'Email', 'defaultContent': '' },
      { title: 'Phone', 'defaultContent': '' }
    ],
    'pageLength': 100
  })
}

document.addEventListener('DOMContentLoaded', function ($) {
  const xhr = new XMLHttpRequest()

  xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      const staffList = JSON.parse(xhr.responseText)
      console.log(staffList.filter(x => x.givenName === 'Azin'))
      generateTable(staffList)
    }
  }

  xhr.open('GET', 'http://localhost:3000/', true)
  xhr.send()
})
