const btnSearch = document.getElementById("btnSearch");
const btnClear = document.getElementById("btnClear");



function searchRecommendation() {
  const input = document.getElementById("travelInput").value.toLowerCase();
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  fetch("travel_recommendation.json")
    .then((response) => response.json())
    .then((data) => {
      const recommendation = data.countries.find(
        (item) => item.name.toLowerCase() === input
      );

      console.log(
        recommendation.cities.forEach((element) => {
          console.log(element.name);
          item = element.name;
        })
      );

      if (recommendation) {
        const name = recommendation.cities.map((x) => x.name);
        const detail = recommendation.cities.map((x) => x.description);
        const pic = recommendation.cities.map((x) => x.imageUrl);
        resultDiv.innerHTML += name
          .map(
            (n, i) =>
              `<h2>${n}</h2><p><strong>Description:</strong> ${detail[i]}</p> <img src="${pic[i]}"/>`
          )
          .join("");

        console.log(name[0]);
        let timeZone;
        let location = name[0];
        switch (location) {
          case "Sydney, Australia":
            timeZone = "Australia/Sydney";
            break;
          case "Melbourne, Australia":
            timeZone = "Australia/Melbourne"; // New addition
            break;
          case "Tokyo, Japan":
            timeZone = "Asia/Tokyo";
            break;
          case "Rio de Janeiro, Brazil":
            timeZone = "America/Sao_Paulo";
            break;
          case "Angkor Wat, Cambodia":
            timeZone = "Asia/Phnom_Penh";
            break;
          case "Taj Mahal, India":
            timeZone = "Asia/Kolkata";
            break;
          case "Bora Bora, French Polynesia":
            timeZone = "Pacific/Tahiti";
            break;
          case "Copacabana Beach, Brazil":
            timeZone = "America/Sao_Paulo";
            break;
          case "Kyoto, Japan":
            timeZone = "Asia/Tokyo";
            break;
          default:
            console.error("Unknown location:", location);
            return "Invalid location";
        }
        let currentTime = new Date().toLocaleTimeString("en-US", { timeZone });
        resultDiv.innerHTML += `<h2>${currentTime} in ${location}</h2>`;
      } else {
        resultDiv.innerHTML = "No recommendations sorry";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      resultDiv.innerHTML = "An error occurred while fetching data.";
    });
}

function clearRecommendation() {
  document.getElementById("travelInput").value = "";
  console.log("CLeared Out");
}

btnClear.addEventListener("click", clearRecommendation);
btnSearch.addEventListener("click", searchRecommendation);
