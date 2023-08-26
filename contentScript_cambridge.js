class Word {
    constructor(word, date, def, pos = "") {
      this.word = word;
      this.date = date;
      this.def = def;
      this.pos = pos;
    }
}
class VocabularyExtension {
    constructor() {
      this.initialize();
    }
    initialize() {
      this.injectButtonIntoPage();
      document.addEventListener("DOMContentLoaded", () => {
         chrome.runtime.onMessage.addListener(this.handleMessage.bind(this));
    });
    }
    injectButtonIntoPage() {
        try{
            const entryElements = document.getElementsByClassName("pr entry-body__el");
            if (entryElements.length === 0) {
                throw new Error("No elements found.");
            }
            for(let i = 0; i < entryElements.length; i++){
                const entryElement = entryElements[i];
                const defElements = entryElement.querySelectorAll(".ddef_h");
                defElements.forEach((defElement)=>{
                    if(defElement){
                        const button = this.createButton();
                        defElement.appendChild(button);
                        button.addEventListener("click",()=>{
                            const word = new Word(
                                this.getWord(entryElement),
                                this.getDate(),
                                this.extractDefinition(defElement),
                                this.getPos(entryElement)
                            );
                            chrome.runtime.sendMessage(
                                { action: "sendToNotion", data: word },
                                (response) => {
                                    if (response.success) {
                                        alert("Vocabulary sent to Notion successfully!");
                                    } else {
                                        alert(response.error);
                                    }
                                }
                            );
                        });
                    }   else{
                        throw new Error("No definitions found!");
                    }
                });
            }
        }
        catch (error){
            console.error(error.message);
        }
    }
    createButton() {
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
    extractDefinition(element){
        const divElement = element.querySelector(".def.ddef_d.db"); 
        if (divElement) {
            return divElement.textContent.trim();
          } else {
            console.error("Definition Element not found.");
          }
    }
    getPos(element){
        const spanElement = element.querySelector("span.pos.dpos");
        if (spanElement) {
            const pos = spanElement.textContent;
            return pos;
        } 
        else {
            console.error("POS Element not found.");
        }
    }
    getWord(element){
        const spanElement = element.querySelector("span.hw.dhw");
        if (spanElement) {
            const word = spanElement.textContent;
            return word; 
        } else {
            console.error("Word Element not found.");
        }
    }
    getDate() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
        const day = currentDate.getDate().toString().padStart(2, "0");
        return `${year}-${month}-${day}`;
    }
}
const vocabExtension = new VocabularyExtension();