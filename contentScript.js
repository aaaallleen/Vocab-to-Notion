
// Function to create and append a button element
// Function to create and append an image button element
function createButton() {
    const button = document.createElement("img");
    button.src = chrome.runtime.getURL("icons/send.png"); 
    button.alt = "Send to Notion";
    //css for the button layout
    button.style.cursor = "pointer";
    button.style.verticalAlign = "middle";
    button.style.border = "2px solid #a6a6a6";
    button.style.background = "#d1d1d1";
    button.style.borderRadius = "10%";
    button.style.border
    button.style.marginLeft = "10px";
    button.style.width = "30px";
    button.style.height = "30px";
    return button;
}
  

  
//   // Function to handle the button click event
//   // Function to extract vocabulary data from the Oxford Dictionary page
function extractDefinition(element) {
    const defElement = element.querySelector(".def");
    const disElement = element.querySelector(".dis-g");
    const def = defElement.textContent.trim();
    if(disElement){
        const dis = disElement.textContent.trim();
        const finaldef = dis+" " + def;
        return finaldef;
    }
    else{
        return def;
    }
}
function getWord() {
    const wordElement = document.querySelector(".headword");
    const word = wordElement.textContent.trim();
    const posElement = document.querySelector(".pos");
    const pos = posElement.textContent.trim();
    return {
        word : word,
        pos : pos
    }
} 
function getDate(){
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    // const monthAbbrv =  ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const date = year+"-"+month+"-"+day;
    return date;
}
function injectButtonIntoPage() {
    // Find all occurrences of the class "sense" on the page
    const SensElements = document.querySelectorAll(".sense");
    // Iterate through each "sense" element and add a button beside it
    
    SensElements.forEach((SensElement) => {
        const button = createButton();
        const defElement = SensElement.querySelector(".def");
        if(defElement){
            defElement.appendChild(button);
        }
        else{
        console.error("No definitions found");
        }
        const Word = getWord();
        Word.definition = extractDefinition(SensElement);
        Word.date = getDate();
        button.addEventListener("click", () => {
           chrome.runtime.sendMessage({action: "sendToNotion", data: Word }, (response)=>{
                if(response.success){
                    console.log(Word);
                    alert("Vocabulary sent to Notion successfully!");
                }
                else{
                    alert(response.error);
                }
            });
        });
    });
    
}

function executeOnDOMReady(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("readystatechange", () => {
        if (document.readyState === "interactive" || document.readyState === "complete") {
          callback();
        }
      });
    } else {
      callback();
    }
  }
  
executeOnDOMReady(() => {
    injectButtonIntoPage();
});

chrome.runtime.onMessage.addListener((message, sender)=>{
    console.log("coooooooooooooooooool");
    if(message.action == "show Alert"){
       alert("coooool");
    }
});