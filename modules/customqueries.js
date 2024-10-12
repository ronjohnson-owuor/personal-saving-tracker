
// when user deposits to the account and he has no loan
export const updateDB  = (newamount,total) => {
    return `UPDATE savings
    SET progress = ${newamount}, total = ${total}
    WHERE id = 1`;
}


