const btnSearch = document.getElementById("btnSearch");
const btnClear = document.getElementById("btnClear");

function searchRecommendation() {
  const input = document.getElementById("travelInput").value.toLowerCase();
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  fetch("travel_recommendation.json")
    .then((response) => response.json())
    .then((data) => {
      const countries = data.countries.map((x) => x.cities);
      const temples = data.temples;
      const beaches = data.beaches;
      const city = [];
      const cityD = [];
      const cityPic = [];
      const temple = [];
      const templeD = [];
      const templePic = [];
      const beach = [];
      const beachD = [];
      const beachPic = [];

      let cityInfo = {};
      let templeInfo = {};
      let beachInfo = {};

      const recommendation = data.countries.find(
        (item) => item.name.toLowerCase() === input
      );

      for (c of countries) {
        for (d of c) {
          city.push(d.name);
          cityD.push(d.description);
          cityPic.push(d.imageUrl);
        }
      }
      for (t of temples) {
        temple.push(t.name);
        templeD.push(t.description);
        templePic.push(t.imageUrl);
      }
      for (b of beaches) {
        beach.push(b.name);
        beachD.push(b.description);
        beachPic.push(b.imageUrl);
      }
      cityInfo = city.map((name, i) => ({
        name,
        description: cityD[i],
        imageUrl: cityPic[i],
      }));
      templeInfo = temple.map((name, i) => ({
        name,
        description: templeD[i],
        imageUrl: templePic[i],
      }));

      beachInfo = beach.map((name, i) => ({
        name,
        description: beachD[i],
        imageUrl: beachPic[i],
      }));

      const cityResults = cityInfo
        .filter(
          (spot) =>
            spot.name.toLowerCase().includes(input) ||
            spot.description.toLowerCase().includes(input)
        )
        .map((spot) => ({
          ...spot,
          imageUrl: spot.imageUrl,
        }));
      const templeResults = templeInfo.filter(
        (spot) =>
          spot.name.toLowerCase().includes(input) ||
          spot.description.toLowerCase().includes(input)
      );
      const beachResults = beachInfo.filter(
        (spot) =>
          spot.name.toLowerCase().includes(input) ||
          spot.description.toLowerCase().includes(input)
      );

      console.log(cityResults);
      console.log(templeResults);
      console.log(beachResults);

      if (templeResults) {
        const tname = templeResults.map((t) => t.name);
        const tdetail = templeResults.map((t) => t.description);
        const tpic = templeResults.map((t) => t.imageUrl);

        resultDiv.innerHTML += tname
          .map(
            (n, i) =>
              `<h2>${n}</h2><p><strong>Description:</strong> ${tdetail[i]}</p> <img src="${tpic[i]}"/>`
          )
          .join("");
      }
      if (beachResults) {
        const bname = beachResults.map((b) => b.name);
        const bdetail = beachResults.map((b) => b.description);
        const bpic = beachResults.map((b) => b.imageUrl);

        resultDiv.innerHTML += bname
          .map(
            (n, i) =>
              `<h2>${n}</h2><p><strong>Description:</strong> ${bdetail[i]}</p> <img src="${bpic[i]}"/>`
          )
          .join("");
      }
      if (cityResults) {
        const name = cityResults.map((x) => x.name);
        const detail = cityResults.map((x) => x.description);
        const pic = cityResults.map((x) => x.imageUrl);

        resultDiv.innerHTML += name
          .map(
            (n, i) =>
              `<h2>${n}</h2><p><strong>Description:</strong> ${detail[i]}</p> <img src="${pic[i]}"/>`
          )
          .join("");

        // console.log(name[0]);
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
