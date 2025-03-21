// https://corsproxy.io/?https://random-d.uk/api/v2/random 

async function fetchData(){
    try{
        const randomPic = await fetch("https://corsproxy.io/?https://random-d.uk/api/v2/random");
        if(!randomPic.ok) throw new Error(`Fetch Error: ${randomPic.status}`);
        const duckPic = await randomPic.json();

        return {duckPic};
    }catch (error){
        console.error("Error fetching data:", error.message);
        return {error: "Failed to load data"};
    }
    }