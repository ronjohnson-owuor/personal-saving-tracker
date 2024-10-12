
// when user deposits to the account and he has no loan
export const updateDB  = (newamount,total) => {
    return `UPDATE savings
    SET progress = ${newamount}, total = ${total}
    WHERE id = 1`;
}

export const checkExistingLoan = () => {
      return `SELECT * FROM loans WHERE id=1`;  
}

export const giveLoan = (pending_amount,total_borrowed,interest_rate,flag) =>{
    if(flag == 1){
        return `UPDATE loans SET pending_amount=${pending_amount},total_borrowed=${total_borrowed},interest_rate=${interest_rate} WHERE id=1`;
    }else{
        return `INSERT INTO loans (pending_amount,total_borrowed,interest_rate) VALUES (${pending_amount},${total_borrowed},${interest_rate})`;
    }
}

export const payLoan = (new_balance) => {
    return `UPDATE loans SET pending_amount = ${new_balance} WHERE id = 1`;
}


