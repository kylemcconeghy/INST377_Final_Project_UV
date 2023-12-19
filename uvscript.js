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
        return 'Low UV - SPF 15';
    } else if (uvIndex > 2 && uvIndex <= 4){
        return 'Moderate UV - SPF 30';
    } else if (uvIndex > 4 && uvIndex <= 6){
        return 'High UV - SPF 30+';
    } else if (uvIndex > 6 && uvIndex <= 10){
        return 'Very High UV- SPF 50';
    } else {
        return 'Extreme UV - SPF 50+';
    }
}