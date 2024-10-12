export const trimPrices = (price) => {
    if(price < 1000){
        return price;
    }
    if(price >= 1000 && price < 1000000){
        return (price/1000)+" K";
    }  
    if(price > 1000000 && price < 1000000000){
        return (price/1000000)+" M";
    } 
}