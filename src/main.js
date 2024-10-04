const axios = require('axios');
const docBaseGetAndPost = require('./docBaseGetAndPost');
const fridayAndBusinessDayCheck = require('./fridayAndBusinessDayCheck');

async function bussinessdayCheckAndDocBaseManagement() {
  const today = new Date();

  if (await fridayAndBusinessDayCheck(today) === true) {
    console.log('本日は営業日で金曜日です。');
    await docBaseGetAndPost(today);
  } else {
    console.log('本日は対象の曜日ではありません。');
    return;
  }
}

bussinessdayCheckAndDocBaseManagement();
