const baseUrl="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdowns=document.querySelectorAll(".dropdown select");
let btn=document.querySelector("form button");
let fromCurr=document.querySelector(".from select");
let toCurr=document.querySelector(".to select");
let msg=document.querySelector(".msg");
for(select of dropdowns){
    for(currCode in countryList){
        let newOptions=document.createElement("option");
        newOptions.innerText=currCode;
        newOptions.value=currCode;
        if(select.name==="from" && currCode==="USD"){
            newOptions.selected= "selected" ;
        }
        if(select.name==="to" && currCode==="INR"){
            newOptions.selected= "selected" ;
        }
        select.append(newOptions);
    }
    select.addEventListener("change",(evt)=>{
       updateFlag(evt.target);
    });
}
const updateExchangeRate=async()=>{
    let amount=document.querySelector("form input");
    let amtValue=amount.value;
    
    if(amtValue==="" || amtValue<1)
    {
       amtValue=1;
       amount.value="1"; 
    }
    const URL=`${baseUrl}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response=await fetch(URL);
    let data= await response.json();
    let rate=(data[toCurr.value.toLowerCase()]);
    let finalAmount=amtValue*rate;
    msg.innerText=`${amtValue} ${fromCurr.value} = ${finalAmount}${toCurr.value}`;

}
const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}
btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
   
})
window.addEventListener("load",()=>{
    updateExchangeRate();
})
 

