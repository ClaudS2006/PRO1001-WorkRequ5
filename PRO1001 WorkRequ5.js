// https://corsproxy.io/?https://random-d.uk/api/v2/random 

const header = document.getElementById("entry-sign");
const para = document.getElementById("profile-pic");
const btn = document.getElementById("happy-duck");

async function fetchData(){
    try{
        const randomPic = await fetch("https://random-d.uk/api/v2/random");
        if(!randomPic.ok) throw new Error(`Fetch Error: ${randomPic.status}`);
        const duckPic = await randomPic.json();

        return {duckPic};
    }catch (error){
        console.error("Error fetching data:", error.message);
        return {error: "Failed to load data"};
    }
    }

btn.addEventListener("click", async () => {
    const data = await fetchData();
    if(data.duckPic){
        const img = document.createElement("img");
        img.src = data.duckPic.url;
        img.alt = "Random-Duck-Picture";

        para.appendChild(img);
    }else{
        para.textContent = "Failed to load image";
    }
})
    
