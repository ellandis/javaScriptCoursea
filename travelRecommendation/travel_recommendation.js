const btnSearch = document.getElementById("btnSearch");
const btnClear = document.getElementById('btnClear');

function searchRecommendation(){
    const input = document.getElementById('travelInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    console.log(input);

    fetch('travel_recommendation.json')
    .then(response => response.json())
    .then(data => {
        const recommendation = data.countries.find(item => item.name.toLowerCase() === input);
        console.log(data.countries.citi);

        if(recommendation){
            const name = recommendation.name.join(',  ');
            const imageUrl = recommendation.imageUrl;
            const description = recommendation.description.join(', ');
            resultDiv.innerHTML += `<h2>${name}</h2>`;
            resultDiv.innerHTML += `<img src="${imageUrl}" alt="hjh">`;
            resultDiv.innerHTML += `<p><strong>Description:</strong> ${description}</p>`;
        }
        else{
            resultDiv.innerHTML = 'No recommendations sorry';
        }
    }).catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
    });
}

function clearRecommendation(){
    document.getElementById('travelInput').value = "";
    console.log('CLeared Out')
}

btnClear.addEventListener('click',clearRecommendation);
btnSearch.addEventListener('click',searchRecommendation);
