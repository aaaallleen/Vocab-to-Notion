
// Function to create and append a button element
// Function to create and append an image button element
console.log("Script running");
function createButton() {
    const button = document.createElement("img");
    button.src = chrome.runtime.getURL("assets/send.png"); 
    button.alt = "Send to Notion";
    //css for the button layout
    button.style.cursor = "pointer";
    button.style.verticalAlign = "middle";
    button.style.border = "2px solid #a6a6a6";
    button.style.background = "#ccc";
    button.style.borderRadius = "10%";
    button.style.border
    button.style.marginLeft = "10px";
    button.style.width = "30px";
    button.style.height = "30px";
    return button;
}
  

  
//   // Function to handle the button click event
function handleButtonClick(button, vocabularyData) {
    // Send the vocabulary data to the background script
    chrome.runtime.sendMessage({ action: "sendToNotion", data: vocabularyData }, (response) => {
    //   if (response.success) {
    //     alert("Vocabulary sent to Notion successfully!");
    //   } else {
    //     alert("Error sending vocabulary to Notion. Please try again later.");
    //   }
    });
}
  
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
function injectButtonIntoPage() {
    // Find all occurrences of the class "sense" on the page
    const SensElements = document.querySelectorAll(".sense");
    console.log("There are", SensElements.length, "definitions");
    // Iterate through each "sense" element and add a button beside it
    const Word = getWord();
    SensElements.forEach((SensElement) => {
        const button = createButton();
        const defElement = SensElement.querySelector(".def");
        if(defElement){
            defElement.appendChild(button);
        }
        else{
        console.error("No definitions found");
        }
        const definition = extractDefinition(SensElement);
        Word.definition = definition;
        console.log(Word);
        button.addEventListener("click", () => {
        handleButtonClick(button, Word);
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
  
  // Call the function with your code as the argument
executeOnDOMReady(() => {
    console.log("DOM fully loaded.");
    injectButtonIntoPage();
});

  