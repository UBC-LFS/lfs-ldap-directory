'use strict';

/* global XMLHttpRequest, jQuery */

jQuery(document).ready(function ($) {
  var generateTable = function generateTable(staffList) {
    var cleanStaffList = staffList.map(function (staff) {
      return {
        firstName: staff.givenName,
        lastName: staff.sn,
        phone: Array.isArray(staff.telephoneNumber) ? staff.telephoneNumber.join('<br>') : staff.telephoneNumber,
        email: Array.isArray(staff.mail) ? staff.mail : [staff.mail],
        office: Array.isArray(staff.l) ? staff.l.join('<br>') : staff.l,
        title: staff.title
      };
    });
    var dataForTable = cleanStaffList.map(function (staff) {
      var email = function email(staff) {
        return staff.email.map(email => '<a href=\'mailto:' + email + '\'>' + email + '</a><br>');
      };
      return [staff.lastName, staff.firstName, staff.title, email(staff), staff.office, staff.phone];
    });
    $('#staffList').DataTable({
      data: dataForTable,
      columns: [{ title: 'Last Name', 'defaultContent': '' }, { title: 'First Name', 'defaultContent': '' }, { title: 'Title', 'defaultContent': '' }, { title: 'Email', 'defaultContent': '' }, { title: 'Office', 'defaultContent': '' }, { title: 'Phone', 'defaultContent': '' }],
      'pageLength': 100
    });
  };
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      var staffList = JSON.parse(xhr.responseText);
      console.log(staffList);
      generateTable(staffList);
    }
  };

  xhr.open('GET', 'https://prod-lc01-pub.landfood.ubc.ca/lfsdir', true);
  xhr.send();
});