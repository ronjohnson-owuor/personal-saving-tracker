import { trimPrices } from "./utilities.js";

//get each element from the html 
const target_dom = document.getElementById('target');
const progress_dom = document.getElementById('progress');
const total_dom = document.getElementById('total_saved');
const progress_bar = document.getElementById('progress_bar');
const remaining = document.getElementById('remaining');
// update them uyusing the api

const fetchStats = async () => {
    const res = await axios.post('/api/get-general-stats');
    const {target,progress,total} = res.data;
    target_dom.textContent = `🎯 ${ trimPrices(target)}`;
    progress_dom.textContent = `⌛ ${ trimPrices(progress)}`;
    total_dom.textContent = `💰 ${ trimPrices(total)}`;
    remaining.textContent = `ksh. ${ trimPrices(target - total)} remaining `;
    updateProgressBar(target,progress);

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

    if(percentage >= 100){
        progress_bar.style.background= `lime`;
        progress_bar.style.width= `${100}%`;       
}

}



// deposit money
var amount = document.getElementById("deposit");
var deposit_form = document.getElementById('deposit_form');
deposit_form.addEventListener('submit',(e) =>depositMoney(e));
const depositMoney = async (e) =>{
    e.preventDefault();
    // if there is loan

    //  if there is no loan
    const {message} = await axios.post("/api/deposit",{amount: amount.value});
    console.log(await message);
    var confirm_reload = confirm("reload  with new current financial data");
    if(confirm_reload){
        window.location.reload();
        return;
    }
}


// borrow loans
const loanInput = document.getElementById('loan_input');
const loanForm = document.getElementById('loan_form');
const borrowLoan = (e) => {
    e.preventDefault();
    var consent = confirm('you are about to borrow a Loan');
    if(!consent){
        return;
    }
    var loan_amount = loanInput.value;
    alert(`you borrowed: ${loan_amount}`);
}
loanForm.addEventListener('submit',(e)=>borrowLoan(e));