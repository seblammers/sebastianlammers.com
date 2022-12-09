
// h/t connor rothschild (again :)
export function dateFormat(date) {
    const parsed = new Date(date);
    const month = parsed.toLocaleString("en-GB", { month: "long" });
    const year = parsed.getUTCFullYear();

    return `${month} ${year}`;
};