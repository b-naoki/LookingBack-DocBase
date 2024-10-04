const axios = require('axios');

async function fridayAndBusinessDayCheck(date) {
    const year = date.getFullYear();
    
    // 日本の祝日を取得
    const response = await axios.get(`https://date.nager.at/Api/v2/PublicHolidays/${year}/JP`);
    const publicHolidays = response.data.map(holiday => new Date(holiday.date));

    const dayOfWeek = date.getDay();

    // 金曜日かどうかをチェック（0: 日曜日, 5: 金曜日）
    if (dayOfWeek !== 5) {
        console.log('金曜日ではありません');
        return false;
    }

    // 祝日かどうかをチェック（日付のみに基づく比較）
    const isHoliday = publicHolidays.some(holiday => 
        holiday.getFullYear() === date.getFullYear() &&
        holiday.getMonth() === date.getMonth() &&
        holiday.getDate() === date.getDate()
    );

    if (isHoliday) {
        console.log('祝日です');
        return false;
    }

    // 金曜日かつ営業日（祝日ではない）であれば true を返す
    return true;
}

module.exports = fridayAndBusinessDayCheck;
