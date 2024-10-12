import { updateDB } from "./customqueries.js";
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


export const  depositSaving = async (request) => {
    try{
        const {amount} = request.body;
        const {progress,total} = await getSavings();
        var  newProgress = Number(progress) + Number(amount);
        var newTotal = Number(total) + Number(amount);
        console.log(newProgress,newTotal);
        const [response]  = await connection.query(updateDB(newProgress,newTotal));
        return {message:`deposit of ${amount} has been received `,response};

    }catch(error){
        return error;
    }
}


