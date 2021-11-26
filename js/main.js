var searchInput=document.getElementById("search")
var regionName=document.getElementById("regionName")
var currentNum=document.getElementById("currentNum")
var currentIcon=document.getElementById("currentIcon");
var custom=document.getElementById("custom")
var todayHeader=document.getElementById("todayHeader")
var day1NumMax=document.getElementById("day1NumMax")
var day1NumMin=document.getElementById("day1NumMin")
var day1Custom=document.getElementById("day1Custom")
var day1Icon=document.getElementById("day1Icon")
var day1Header=document.getElementById("day1Header")

var day2NumMax=document.getElementById("day2NumMax")
var day2NumMin=document.getElementById("day2NumMin")
var day2Custom=document.getElementById("day2Custom")
var day2Icon=document.getElementById("day2Icon")
var day2Header=document.getElementById("day2Header")

searchInput.addEventListener("keyup",getLocation)


async function getLocation(){
  var response= await fetch( `http://api.weatherapi.com/v1/search.json?key=bad57eb1139947ba810214449210909&q=${searchInput.value}`)
  var searchCity=await  response.json();

   for(var i=0; i<searchCity.length;i++) 
{
       if(searchCity[i].name.toLowerCase().startsWith(searchInput.value.toLowerCase()))
       {
     await displayWeather(searchInput.value);
     await current(searchInput.value)
     await getForecast(searchInput.value)

      }
}
  
}
async function displayWeather(loctionName){
 var response= await fetch( `http://api.weatherapi.com/v1/current.json?key=bad57eb1139947ba810214449210909&q=${loctionName}`)
  var response1= await response.json();

  regionName.innerHTML=`${response1.location.name}`
  currentNum.innerHTML=`${response1.current.temp_c}&deg C`
  currentIcon.innerHTML=`<img src="https:${response1.current.condition.icon}" alt width="90" >`

  custom.innerHTML=`${response1.current.condition.text} `

}
var date;
var date1;
var date2;
 async function current(location1){

var response= await fetch(`http://api.weatherapi.com/v1/forecast.json?key=bad57eb1139947ba810214449210909&q=${location1}&days=3`)
var response1=await response.json();
date= await response1.forecast.forecastday[0].date;

getDay(date);
}

async function getDay(datestr,locale){
var dates=new Date(datestr);
var day=dates.toLocaleDateString(locale,{weekday:'long'});
todayHeader.innerHTML=day

}

async function getForecast(location2){
  var response= await fetch(`http://api.weatherapi.com/v1/forecast.json?key=bad57eb1139947ba810214449210909&q=${location2}&&days=3`)
  var response1=await response.json();
  day1Icon.innerHTML=`<img src="https:${response1.forecast.forecastday[1].day.condition.icon}" alt width="90" >`
 var maxTemp=response1.forecast.forecastday[1].day.maxtemp_c;

 day1NumMax.innerHTML=`${maxTemp}&deg C`

  var minTemp=response1.forecast.forecastday[1].day.mintemp_c;
  day1NumMin.innerHTML=`${minTemp}&deg C`
  day1Custom.innerHTML=`${response1.forecast.forecastday[1].day.condition.text}`
 date1= response1.forecast.forecastday[1].date;
 getDay1(date1);

 day2Icon.innerHTML=`<img src="https:${response1.forecast.forecastday[2].day.condition.icon}" alt width="90" >`
 var maxTemp1=response1.forecast.forecastday[2].day.maxtemp_c;

 day2NumMax.innerHTML=`${maxTemp1}&deg C`

  var minTemp1=response1.forecast.forecastday[2].day.mintemp_c;
  day2NumMin.innerHTML=`${minTemp1}&deg C`
  day2Custom.innerHTML=`${response1.forecast.forecastday[2].day.condition.text}`
 date2= response1.forecast.forecastday[2].date;
 getDay2(date2);


}


async function getDay1(datestr,locale){
var dates=new Date(datestr);
var day=dates.toLocaleDateString(locale,{weekday:'long'});
day1Header.innerHTML=day

}
async function getDay2(datestr,locale){
  var dates=new Date(datestr);
  var day=dates.toLocaleDateString(locale,{weekday:'long'});
  day2Header.innerHTML=day
  
  }



  first();
  async function first(){
    var firstLoc="cairo";
  var response= await fetch( `http://api.weatherapi.com/v1/current.json?key=bad57eb1139947ba810214449210909&q=${firstLoc}`)
  var response1= await response.json();

  regionName.innerHTML=`${response1.location.name}`
  currentNum.innerHTML=`${response1.current.temp_c}&deg C`
  currentIcon.innerHTML=`<img src="https:${response1.current.condition.icon}" alt width="90" >`

  custom.innerHTML=`${response1.current.condition.text} `
current(firstLoc);
getForecast(firstLoc);

}