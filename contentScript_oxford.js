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
      const senseElements = document.querySelectorAll(".sense");
  
      senseElements.forEach((senseElement) => {
        
        const defElement = senseElement.querySelector(".def");
        if (defElement) {
            const button = this.createButton();
            defElement.appendChild(button);
            button.addEventListener("click", () => {
                const word = new Word(
                    this.getWord(),
                    this.getDate(),
                    this.extractDefinition(senseElement),
                    this.getPos()
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
        } else {
            console.error("No definitions found");
        }
      });
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
  
    extractDefinition(element) {
      const defElement = element.querySelector(".def");
      const disElement = element.querySelector(".dis-g");
      const def = defElement.textContent.trim();
  
      if (disElement) {
        const dis = disElement.textContent.trim();
        const finalDef = dis + " " + def;
        return finalDef;
      } else {
        return def;
      }
    }
  
    getWord() {
      const wordElement = document.querySelector(".headword");
      const word = wordElement.textContent.trim(); 
      return word;
    }
    getPos(){
        const posElement = document.querySelector(".pos");
        const pos = posElement.textContent.trim();
        return pos
    }
    getDate() {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
      const day = currentDate.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
  
    handleMessage(message, sender) {
      if (message.action === "showAlert") {
        alert("Alert on Handling Message");
      }
    }
  }
  
  // Create an instance of the VocabularyExtension class
  const vocabExtension = new VocabularyExtension();
  