export function dateToText(date: Date) {
    let dateDate = date.toString();
    let month = dateDate.slice(8, 11);

    if (month === "Jan") {
        month = "1";
    }
    if (month === "Feb") {
        month = "2";
    }
    if (month === "Mar") {
        month = "3";
    }
    if (month === "Apr") {
        month = "4";
    }
    if (month === "May") {
        month = "5";
    }
    if (month === "Jun") {
        month = "6";
    }
    if (month === "Jul") {
        month = "7";
    }
    if (month === "Aug") {
        month = "8";
    }
    if (month === "Sep") {
        month = "9";
    }
    if (month === "Oct") {
        month = "10";
    }
    if (month === "Nov") {
        month = "11";
    }
    if (month === "Des") {
        month = "12";
    }
    return date.toString().slice(12, 16) + "," + month + "," + date.toString().slice(5, 7);
}

export function dateToText2(date: Date) {
    let dateDate = date.toString();
    let month = dateDate.slice(4, 7);
    if (month === "Jan") {
        month = "1";
    }
    if (month === "Feb") {
        month = "2";
    }
    if (month === "Mar") {
        month = "3";
    }
    if (month === "Apr") {
        month = "4";
    }
    if (month === "May") {
        month = "5";
    }
    if (month === "Jun") {
        month = "6";
    }
    if (month === "Jul") {
        month = "7";
    }
    if (month === "Aug") {
        month = "8";
    }
    if (month === "Sep") {
        month = "9";
    }
    if (month === "Oct") {
        month = "10";
    }
    if (month === "Nov") {
        month = "11";
    }
    if (month === "Des") {
        month = "12";
    }
    return date.toString().slice(11, 15) + "," + month + "," + date.toString().slice(8, 10);

}

export function findDatesBetween(startDate: string, endDate: string) {
    const allDates: string[] = [];
    const sD = new Date(startDate);
    const eD = new Date(endDate);

    sD.setDate(sD.getDate() + 1);
    eD.setDate(eD.getDate() + 1);
    allDates.push(dateToText2(sD));
    while (sD.toString() !== eD.toString()) {
        sD.setDate(sD.getDate() + 1);
        allDates.push(dateToText2(sD))
    }
    return allDates;
}

export function validateDates(startDate: Date, endDate: Date, bookedDatesSec: number[]) {
    const startDateDate = new Date(startDate);
    const endDateDate = new Date(endDate);

    if (Date.parse(startDate.toString()) > Date.parse(endDate.toString())) {
        return false
    }

    while (startDateDate.toString() !== endDateDate.toString()) {
        startDateDate.setDate(startDateDate.getDate() + 1);
        const sec = Date.parse(startDateDate.toString());
        if (bookedDatesSec.includes(sec)) {
            return false;
        }
    }
    return true;
}

export function getStartDate(startDate: Date) {
    const startDateDate = new Date(startDate);
}