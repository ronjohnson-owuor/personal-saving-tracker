import { trimPrices } from "./utilities.js";

//get each element from the html 
const target = document.getElementById('target');
const progress = document.getElementById('progress');
const total = document.getElementById('total_saved');
const progress_bar = document.getElementById('progress_bar');
// update them uyusing the api

const fetchStats = async () => {
    const res = await axios.post('/api/get-general-stats');
    console.log(res.data);
    const data = res.data;
    target.textContent = `🎯 ${ trimPrices(data.target)}`;
    progress.textContent = `⌛ ${ trimPrices(data.progress)}`;
    total.textContent = `💰 ${ trimPrices(data.total)}`;

    updateProgressBar(data.target,data.progress);

}
fetchStats();

const updateProgressBar = (target,progress) => {
    const percentage = ((progress/target)*100);
    // LOW
    if(percentage < 50){
        progress_bar.style.background= `red`;
        if(percentage == 0){
            progress_bar.style.width= `${1}%`;
        }else{
            progress_bar.style.width= `${percentage}%`;
        }
        
    }

    // MEDIUM
    if(percentage >= 50 && percentage < 80){
            progress_bar.style.width= `${percentage}%`;   
            progress_bar.style.background= `yellow`;     
    }

    // HIGH
    if(percentage >= 80){
            progress_bar.style.background= `lime`;
            progress_bar.style.width= `${percentage}%`;       
    }

}