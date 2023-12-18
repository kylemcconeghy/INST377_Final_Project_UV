async function submitForm(event) {
    event.preventDefault();

    const latitude =document.getElementById('latitude').value;
    const longitude =document.getElementById('longitude').value;

    const apiKey= 'openuv-165a9rlqbc66kl-io';
    const apiUrl= `https://api.openuv.io/api/v1/uv?lat=${latitude}&lng=${longitude}`;

    try{
        const response= await fetch(apiUrl,{
            headers:{
                'x-access-token': apiKey,
            },
        });

        if (!response.ok){
            throw new Error('Failed to fetch UV Data');
        }

        const data=await response.json();

        const uvIndex= data.result.uv;
        const suggestedSpf= determineSuggestedSpf(uvIndex);

        window.location.href=`resultspage.html?latitude=${latitude}&longitude=${longitude}&uvIndex=${uvIndex}&suggestedSpf=${suggestedSpf}`;
    } catch (error){
        console.error(error);
    }

}

function determineSuggestedSpf(uvIndex){
    if (uvIndex >= 0 && uvIndex <= 2){
        return 'Low';
    } else if (uvIndex <=5){
        return 'Moderate';
    } else if (uvIndex <= 7){
        return 'High';
    } else if (uvIndex <= 10){
        return 'Very High';
    } else {
        return 'Extreme Index';
    }
}