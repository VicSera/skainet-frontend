export class TimeHelper {
    static dateToDateTime(inDate: Date) {
        let year = inDate.getFullYear();
        let month = inDate.getMonth();
        let day = inDate.getDate();

        let hour = inDate.getHours();
        let minute = inDate.getMinutes();
        let second = 0;

        let date = {
            year: year, month: month, day: day
        };
        let time = {
            hour: hour, minute: minute, second: second
        };

        let dateTime = {
            date: date, time: time
        };

        return dateTime;
    }

    static dateTimeToString(date, time) {
        let month = new String(date.month).padStart(2, '0');
        let day = new String(date.day).padStart(2, '0');

        let hour = new String(time.hour).padStart(2, '0');
        let minute = new String(time.minute).padStart(2, '0');
        let second = "00";

        // yyyy-mm-ddThh:mm:ss
        return `${date.year}-${month}-${day}T${hour}:${minute}:${second}`;
    }

    static stringToDateTime(dateTimeString: String) {
        // yyyy-mm-ddThh:mm:ss
        let year = Number(dateTimeString.substring(0, 4));
        let month = Number(dateTimeString.substring(5, 7));
        let day = Number(dateTimeString.substring(8, 10));

        let hour = Number(dateTimeString.substring(11, 13));
        let minute = Number(dateTimeString.substring(14, 16));
        let second = Number(dateTimeString.substring(18));

        let date = {
            year: year, month: month, day: day
        };
        let time = {
            hour: hour, minute: minute, second: second
        };

        let dateTime = {
            date: date, time: time
        };

        return dateTime;
    }

    static dateToString(date) {
        let month = new String(date.month).padStart(2, '0');
        let day = new String(date.day).padStart(2, '0');

        return `${date.year}-${month}-${day}`;
    }

    static timeToString(time) {
        let hour = new String(time.hour).padStart(2, '0');
        let minute = new String(time.minute).padStart(2, '0');

        return `${hour}:${minute}`;
    }
}
