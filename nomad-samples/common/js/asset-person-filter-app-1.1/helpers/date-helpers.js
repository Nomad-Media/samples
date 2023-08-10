/**
 *
 */
export function todayToInputDate() {
    const today = new Date();

    const todayYear = today.getFullYear();
    const todayMonth = (today.getMonth() + 1).toString().padStart(2, "0").slice(-2);
    const todayDay = today.getDate().toString().padStart(2, "0").slice(-2);

    const inputDateValue = `${todayYear}-${todayMonth}-${todayDay}`;

    return inputDateValue;
}

/**
 *
 */
export function yesterdayToInputDate() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const yesterdayYear = yesterday.getFullYear();
    const yesterdayMonth = (yesterday.getMonth() + 1).toString().padStart(2, "0").slice(-2);
    const yesterdayDay = yesterday.getDate().toString().padStart(2, "0").slice(-2);

    const inputDateValue = `${yesterdayYear}-${yesterdayMonth}-${yesterdayDay}`;

    return inputDateValue;
}

/**
 *
 * @param {string} value
 * @returns
 */
export function inputDateValueToDateTime(value, hours = 0, minutes = 0, seconds = 0, ms = 0) {
    // 2021-10-15
    // 0123456789
    const y = parseInt(value.substr(0, 4));
    const m = parseInt(value.substr(5, 2)) - 1;
    const d = parseInt(value.substr(8, 2));

    const date = new Date(y, m, d, hours, minutes, seconds, ms);

    return date;
}

/**
 *
 * @param {*} date
 *
 * @returns Date string as mm/dd/yy hh:mm:ss am
 */
export function dateTotoLocaleDateTimeString(date) {
    const dateOptions = { year: "numeric", month: "numeric", day: "numeric" };
    const timeOptions = { hour: "numeric", minute: "numeric", second: "numeric" };

    const dateString = date.toLocaleDateString("en-US", dateOptions);
    const timeString = date.toLocaleTimeString("en-US", timeOptions);

    return `${dateString} ${timeString}`;
}
