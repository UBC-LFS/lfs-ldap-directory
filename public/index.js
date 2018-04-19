/* global XMLHttpRequest, $ */

const generateTable = (staffList) => {
  const cleanStaffList = staffList.map(staff => ({
    firstName: staff.givenName,
    lastName: staff.sn,
    phone: Array.isArray(staff.telephoneNumber) ? staff.telephoneNumber[0] : staff.telephoneNumber,
    email: staff.mail,
    office: Array.isArray(staff.l) ? staff.l[0] : staff.l,
    title: staff.title
  }))
  const dataForTable = cleanStaffList.map(staff => (
    [
      staff.lastName,
      staff.firstName,
      staff.title,
      staff.email,
      staff.office,
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
      { title: 'Office', 'defaultContent': '' },
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
      console.log(staffList)
      generateTable(staffList)
    }
  }

  xhr.open('GET', 'http://localhost:10080/', true)
  xhr.send()
})
