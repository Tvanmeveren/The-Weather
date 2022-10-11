let APIKey = "9f6459ed410f686e06391e59ec430845"
let today = moment().format("M/D/YYYY")


let searchedInput = document.getElementById("cityInput")
let searched = ""
let searchButton = document.getElementById("searchButton")
let sameDayURL = ""


searchButton.addEventListener("click", function () {

   searched = searchedInput.value

   sameDayURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searched + "&appid=" + APIKey + "&units=imperial"

   console.log(searched)

   
   let history= JSON.parse(localStorage.getItem("cities"))
   history.push(searched)
   localStorage.setItem("cities", JSON.stringify(history))

   setWeather()
   displaySearches()
})

function setWeather() {
   

   fetch(sameDayURL)
      .then(function (response2) {
         return response2.json()
      })
      .then(function (dailyWeather) {

         let todayTemp = dailyWeather.main.temp
         let todayHumidity = dailyWeather.main.humidity
         let todayWind = dailyWeather.wind.speed
         
         

         

         let chosenCity = document.getElementById("chosenCity")
         let currentTemp = document.getElementById("currentTemp")
         let currentHumidity = document.getElementById("currentHumidity")
         let currentWind = document.getElementById("currentWind")
         
         chosenCity.textContent = searched + " " + today
         currentTemp.textContent = todayTemp
         currentHumidity.textContent = todayHumidity
         currentWind.textContent = todayWind
         
         


      })

   

   let getLatLongURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + searched + "&limit=1&appid=" + APIKey

   fetch(getLatLongURL)
      .then(function (response) {
         return response.json()
      })
      .then(function (latLong) {

         let cityLat = latLong[0].lat
         let cityLong = latLong[0].lon
         let FiveDayURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + cityLat + "&lon=" + cityLong + "&appid=" + APIKey + "&units=imperial"

         fetch(FiveDayURL)
            .then(function (response3) {
               return response3.json()
            })
            .then(function (fiveDay) {
               console.log(fiveDay)

               //day one
               let one = moment().add(1, "d").format("M/D/YYYY")
               let oneTemp = fiveDay.list[10].main.temp
               let oneHumidity = fiveDay.list[10].main.humidity
               let oneWind = fiveDay.list[10].wind.speed
              
               
               

               //day two
               let two = moment().add(2, "d").format("M/D/YYYY")
               let twoTemp = fiveDay.list[15].main.temp
               let twoHumidity = fiveDay.list[15].main.humidity
               let twoWind = fiveDay.list[15].wind.speed
             
               
               

               //day three
               let three = moment().add(3, "d").format("M/D/YYYY")
               let threeTemp = fiveDay.list[20].main.temp
               let threeHumidity = fiveDay.list[20].main.humidity
               let threeWind = fiveDay.list[20].wind.speed
              
               
              

               //day four
               let four = moment().add(4, "d").format("M/D/YYYY")
               let fourTemp = fiveDay.list[25].main.temp
               let fourHumidity = fiveDay.list[25].main.humidity
               let fourWind = fiveDay.list[25].wind.speed
              
               
               

               //day five
               let five = moment().add(5, "d").format("M/D/YYYY")
               let fiveTemp = fiveDay.list[30].main.temp
               let fiveHumidity = fiveDay.list[30].main.humidity
               let fiveWind = fiveDay.list[30].wind.speed
               
               

               //display the five day forcast

               //day one
               let forcastDayOne = document.getElementById("date1")
               let OneDayTemp = document.getElementById("temp1")
               let OneDayHumidity = document.getElementById("humid1")
               let OneDayWind = document.getElementById("wind1")
              
               forcastDayOne.textContent = one
               OneDayTemp.textContent = oneTemp
               OneDayHumidity.textContent = oneHumidity
               OneDayWind.textContent = oneWind
              
               

               //day two
               let forcastDayTwo = document.getElementById("date2")
               let TwoDayTemp = document.getElementById("temp2")
               let TwoDayHumidity = document.getElementById("humid2")
               let TwoDayWind = document.getElementById("wind2")
              
               forcastDayTwo.textContent = two
               TwoDayTemp.textContent = twoTemp
               TwoDayHumidity.textContent = twoHumidity
               TwoDayWind.textContent = twoWind
               
               
               //day three
               let forcastDayThree = document.getElementById("date3")
               let ThreeDayTemp = document.getElementById("temp3")
               let ThreeDayHumidity = document.getElementById("humid3")
               let ThreeDayWind = document.getElementById("wind3")
               
               forcastDayThree.textContent = three
               ThreeDayTemp.textContent = threeTemp
               ThreeDayHumidity.textContent = threeHumidity
               ThreeDayWind.textContent = threeWind
               
              

               //day four
               let forcastDayFour = document.getElementById("date4")
               let fourDayTemp = document.getElementById("temp4")
               let fourDayHumidity = document.getElementById("humid4")
               let fourDayWind = document.getElementById("wind4")
              
               forcastDayFour.textContent = four
               fourDayTemp.textContent = fourTemp
               fourDayHumidity.textContent = fourHumidity
               fourDayWind.textContent = fourWind
               
              

               //day five
               let forcastDayFive = document.getElementById("date5")
               let fiveDayTemp = document.getElementById("temp5")
               let fiveDayHumidity = document.getElementById("humid5")
               let fiveDayWind = document.getElementById("wind5")
               
               forcastDayFive.textContent = five
               fiveDayTemp.textContent = fiveTemp
               fiveDayHumidity.textContent = fiveHumidity
               fiveDayWind.textContent = fiveWind
               
               

            })
      })
}


// search history is loaded 
function onLoad(){
 
   let history = JSON.parse(localStorage.getItem("cities"))
   if (history === null){
      history=[]
      localStorage.setItem("cities", JSON.stringify(history))
   }else {  
      displaySearches()
   }}

onLoad()

function displaySearches(){

   let history = JSON.parse(localStorage.getItem("cities"))
   console.log(history)

   let historyDiv = document.getElementById("recentSearches")

   //clears history 
   while (historyDiv.firstChild) {
      historyDiv.removeChild(historyDiv.firstChild);
  }
  
  //Loads the history to the page
   for(let i=history.length-1; i>=0; i--){
      let button = document.createElement("button")
      button.innerHTML=history[i]
      historyDiv.appendChild(button)

      button.addEventListener("click", function(e) {
         searched=e.target.innerHTML

         sameDayURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searched + "&appid=" + APIKey + "&units=imperial"

         console.log(searched)
         setWeather()
      } )
   }
}
