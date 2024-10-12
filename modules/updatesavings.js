import connection from "./dbconnection.js";
import queries from "./queries.js";


export const getSavings =  async ()  => {
    try {
        const [result_array] =  await connection.query(queries.get_savings_progress);
        const result = result_array[0];
        console.log(result.id);
        // update the dom
    } catch (error) {
        console.error("error retrieving the user: " + error);
    }
}
