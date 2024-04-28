const base_url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";


const dropdowns = document.querySelectorAll(".dropdown select");

const from_currency = document.getElementById("from")
const to_currency = document.getElementById("to");

const display_result = document.getElementById("show_result");

for(let select_item of dropdowns){
      // console.log(select_item);
      for(let currency_code in countryList){
            let currency_code_list = document.createElement("option");
            currency_code_list.innerText = currency_code;
            currency_code_list.value = currency_code;
            if(currency_code === "NPR" && select_item.name === "from"){
                  currency_code_list.selected = "selected";
            }
            else if(currency_code === "USD" && select_item.name === "to"){
                  currency_code_list.selected = "selected";
            }
            select_item.append(currency_code_list)

      }

      select_item.addEventListener("change", (e)=>{
            updateFlag(e.target);
      })    
}

const updateFlag = (element) =>{
      // console.log(element)
      let currency_code = element.value;
      // console.log(currency_code)

      let country_code = countryList[currency_code];
      // console.log(country_code)

      let new_image_src = `https://flagsapi.com/${country_code}/flat/32.png`
      let image = element.parentElement.querySelector("img")
      image.src = new_image_src;
}


const calculateValue = async() =>{

      const input = document.querySelector(".amount_input input");
      let amount = input.value;

      if(amount < 0){
            input.value = 1;
            amount = 1;
      }

      const URL = (`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from_currency.value.toLowerCase()}.json`)

      let res = await fetch(URL);
      // console.log(res)
      let data = await res.json();
      // console.log(data)
      let rate = data[from_currency.value.toLowerCase()][to_currency.value.toLowerCase()];
      // console.log(rate)

      let final_amount = amount * rate;


      display_result.innerText = `${amount} ${from_currency.value} = ${final_amount} ${to_currency.value}`;

}




document.querySelector(".button_container button").addEventListener("click", (e)=>{
      e.preventDefault();
      calculateValue();
})



