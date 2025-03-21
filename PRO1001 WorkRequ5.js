// https://corsproxy.io/?https://random-d.uk/api/v2/random 

const header = document.getElementById("entry-sign");
const para = document.getElementById("profile-pic");
const btn = document.getElementById("happy-duck");
// function to get picture-----------------------------------
async function fetchData(){
    try{
        const randomPic = await fetch("https://cors-anywhere.herokuapp.com/https://random-d.uk/api/v2/random ");
        if(!randomPic.ok) throw new Error(`Fetch Error: ${randomPic.status}`);
        const duckPic = await randomPic.json();

        return {duckPic};
    }catch (error){
        console.error("Error fetching data:", error.message);
        return {error: "Failed to load data"};
    }
    }
// event listener for click with loading spinner
btn.addEventListener("click", async () => {    
    // create span for spinner
    const spinner = document.createElement("span");
    spinner.classList.add("spinner");

     // empties paragraph
    para.textContent = "";
    para.appendChild(spinner); // adds span to paragraph
    try {

    const data = await fetchData();
    await new Promise(resolve => setTimeout(resolve,1000));
    
    if(data.duckPic){
        const img = document.createElement("img");
        img.src = data.duckPic.url;
        img.alt = "Random-Duck-Picture";

        para.appendChild(img);
    }else{
        para.textContent = "Failed to load image";
    }
    }
    catch(error){
        para.textContent = "Error loading image";
    }
})
    
