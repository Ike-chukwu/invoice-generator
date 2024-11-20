export function generateCode() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const chars = letters + numbers;
    let code = "#";

    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        code += chars[randomIndex];
    }

    return code;
}





export function addDays(date: string, paymentTerm: number) {
    const newDate = new Date(date);
    let adder;
    if (paymentTerm == 1) {
        adder = 1
    } else if (paymentTerm === 2) {
        adder = 7
    } else if (paymentTerm === 3) {
        adder = 14
    } else if (paymentTerm === 4) {
        adder = 21
    }
    adder && newDate.setDate(newDate.getDate() + adder);
    return newDate;
}