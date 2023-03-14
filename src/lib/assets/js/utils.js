
// h/t connor rothschild (again :)
export function dateFormat(date) {
    const parsed = new Date(date);
    const month = parsed.toLocaleString("en-GB", { month: "long" });
    const year = parsed.getUTCFullYear();

    return `${month} ${year}`;
};

export function titleFormat(title) {
    return `${title} | Sebastian Lammers`;
};

export function maxByKey(data, key, variable) {
    var result;
    return (result = Object.values(
        data.reduce((acc, cur) => {
            // track current key
            var k = cur[key];
            // if no entry, put this one in
            if (!acc[k]) acc[k] = cur;
            else {
                // if the last accumulated value is LESS than the current one
                if (acc[k][variable] < cur[variable]) {
                    // add the current as the new value in acc for this "key"
                    acc[k][variable] = cur[variable];
                }
            }
            return acc;
        }, {})
    ));
};