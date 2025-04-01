// https://corsproxy.io/?https://random-d.uk/api/v2/random XXX
// https://api.allorigins.win/raw?url=https://random-d.uk/api/v2/random
// new api from 26.03.2025 provided from ONF
// https://api.cors.lol/?url=https://random-d.uk/api/random

const header = document.getElementById("entry-sign");
const para = document.getElementById("profile-pic");
const btn = document.getElementById("happy-duck");

// function to get picture---------------------------------------------------------
async function fetchData(){
    try{
        // api.allorigins displays mixture of pics & gifs
        // Charlotte: can I get your feedback on this API set-up? to avoid cache I added new date/time to make it look like new request
        const randomPic = await fetch("https://api.cors.lol/?url=https://random-d.uk/api/random?time="+ new Date().getTime());
        if(!randomPic.ok) throw new Error(`Fetch Error: ${randomPic.status}`);
        const duckPic = await randomPic.json();

        return {duckPic};
    }catch (error){
        console.error("Error fetching data:", error.message);
        return {error: "Failed to load data"};
    }
    }

// event listener (click) with loading spinner -----------------------------------
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

    para.textContent = "";
    // appends pic in paragraph
    if(data.duckPic){
        const img = document.createElement("img");
        img.src = data.duckPic.url;
        img.alt = "Random-Duck-Picture";
        // removes def attributes
        img.onload = () => {
        img.removeAttribute("width");
        img.removeAttribute("height");
    };

        para.appendChild(img);
    // if pic has message attribute display as well
        if(data.duckPic.message){
        const attribute = document.createElement("p");
        attribute.textContent = data.duckPic.message;
        para.appendChild(attribute);
    }
    }else{
        para.textContent = "Failed to load image";
        }
    }catch(error){
        para.textContent = "Error loading image";
    }
});

// function: count clicks on button
// get element from DOM -> add event -> count


let count = 0;// counter (outside of scope)
const countElement = document.getElementById("counter"); // for count output
document.getElementById("happy-duck").addEventListener("click", function(event) {
        count ++;
        countElement.textContent = `Pic-Counter: ${count}`;
});
    
