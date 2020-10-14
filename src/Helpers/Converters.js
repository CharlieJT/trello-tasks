export const dateShortHandConverter = (unixTimestamp) =>{
    const a = new Date();
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const month = months[a.getMonth()];
    const days = ['Sun','Mon','Tue','Wed','Thur','Fri','Sat'];
    const day = days[a.getDay()];
    const date = a.getDate();
    const dayOfWeek = day + ' ' + date + ' ' + month;
    return dayOfWeek;
}


export const timeConverter = (unixTimestamp) => {
    const a = new Date();
    const hour = (a.getHours() < 10 ? '0' : '') + a.getHours();
    const minutes = (a.getMinutes() < 10 ? '0' : '') + a.getMinutes();
    return hour + ':' + minutes;
}

