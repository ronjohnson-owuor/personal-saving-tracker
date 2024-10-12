import { checkExistingLoan, giveLoan, payLoan, updateDB } from "./customqueries.js";
import connection from "./dbconnection.js";
import queries from "./queries.js";



export const getSavings =  async ()  => {
    try {
        const [result_array] =  await connection.query(queries.get_savings_progress);
        const result = result_array[0];
        return result;
    } catch (error) {
        return error;
    }
}


export const depositSaving = async (request) => {
    try {
        const { amount } = request.body;

        // Get current savings progress and total savings
        const { progress, total } = await getSavings();
        let newProgress = Number(progress) + Number(amount); // Calculate new progress

        // Check if the user has pending loans
        const [existingLoanRows] = await connection.query(checkExistingLoan());

        // If there is a pending loan
        if (existingLoanRows.length > 0 && existingLoanRows[0].pending_amount !== 0) {
            const pendingLoanAmount = Number(existingLoanRows[0].pending_amount);
            let currentBalance = 0;

            // If the deposit is greater than the pending loan amount
            if (amount > pendingLoanAmount) {
                const newAmountAfterLoanCut = Number(amount) - pendingLoanAmount; // Amount remaining after paying off the loan
                const [paymentResult] = await connection.query(payLoan(currentBalance)); // Set loan balance to 0 (fully paid)

                // Update savings: add remaining deposit to total savings
                const newTotal = Number(total) + newAmountAfterLoanCut;
                const [response] = await connection.query(updateDB(newProgress, newTotal));

                return {
                    message: `Deposit of ${amount} has been received. Your loan has been fully paid off, and you have been credited ${newAmountAfterLoanCut}.`,
                    response
                };
            }

            // If the deposit is less than or equal to the pending loan amount
            if (amount <= pendingLoanAmount) {
                currentBalance = pendingLoanAmount - amount; // Update the remaining loan balance
                const [paymentResult] = await connection.query(payLoan(currentBalance)); // Update loan balance

                return {
                    message: `Deposit of ${amount} has been used to settle your loan. Remaining loan balance: ${currentBalance}.`,
                    paymentResult
                };
            }
        }

        // If the user has no pending loans
        const newTotal = Number(total) + Number(amount);
        const [response] = await connection.query(updateDB(newProgress, newTotal));

        return {
            message: `Deposit of ${amount} has been received and added to your savings.`,
            response
        };

    } catch (error) {
        console.error("Error during deposit:", error);
        return { error: "An error occurred while processing the deposit." };
    }
};



export const borrowLoan = async (request) => {
    const { amount } = request.body;
    try {
        const [existingLoanRows] = await connection.query(checkExistingLoan());
        if ( existingLoanRows.length > 0) {
            if(existingLoanRows[0].pending_amount !== 0){
                return {
                    message: "You have an active  loan that you need to repay first.",
                    existingLoanRows
                };                
            }

        }
        var  amountPayable = Number(amount) + ((20/100) * amount);
        var totalLoans = existingLoanRows[0]?.total_borrowed ? Number(existingLoanRows[0]?.total_borrowed)+ Number(amount) : amount;
        const flag = existingLoanRows.length !== 0 ? 1 : 0;
        console.log(flag);
        const [newLoanResult] = await connection.query(giveLoan(amountPayable, totalLoans, 20,flag));
        return {
            message: "Loan granted successfully",
            amountGranted: amount,
            loanDetails: newLoanResult,
            existingLoanRows
        };
    } catch (error) {
        console.error("Error borrowing loan:", error);
        return {
            message: "An error occurred while processing the loan request",
            error: error.message
        };
    }
};


