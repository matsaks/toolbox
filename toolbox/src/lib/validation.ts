export function validatePhoneNumber(phoneNumber: string) {
    const regEx = new RegExp('^[0-9]{8}$'); // Minimum 8 numbers
    return regEx.test(phoneNumber);
}

export function validateAddress(address: string) {
    const regEx = new RegExp('^[^0-9]+\\s\\d+$'); // Minimum 1 character, space, minimum 1 number
    //const regEx = new RegExp('^[^0-9]*$');
    return regEx.test(address);
}

export function validateZip(zip: string) {
    const regEx = new RegExp('^[0-9]{4}$'); // Minimum 4 numbers
    return regEx.test(zip);
}

export function validateCity(city: string) {
    const regEx = new RegExp('^[^0-9]*$'); // Minimum 1 character, no numbers
    return regEx.test(city);
}

export function validatePrice(price: string) {
    const regEx = new RegExp('^[0-9]{1,6}$'); // Minimum 1 number, maximum 6 numbers
    return regEx.test(price);
}

export function validateTitle(title: string) {
    const regEx = new RegExp('^.{4,40}$'); // Minimum 4 characters, maximum 20 characters
    return regEx.test(title);
}