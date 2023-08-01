const ELEMENTS = {
  SIDEBAR: ".sidebar",
  CLOSE_BTN: "#btn",
  HOME_BTN: "Home",
  SETTINGS_BTN: "Settings",
  CONTACT_BTN: "Contacts",
  CANCEL_BTN: "cancelButton",
  CANCEL_BTN2: "cancelButton2",
  SET_KEY_BTN: "setKEY",
  SET_ID_BTN: "setID",
  CLR_BTN: "clearKEYID",
  SBMT_KEY_BTN: "submitKEYButton",
  SBMT_ID_BTN: "submitIDButton",
  ATTR_BTN:"Attributes",
};

document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.querySelector(ELEMENTS.SIDEBAR);
  const closeBtn = document.querySelector(ELEMENTS.CLOSE_BTN);
  const homeBtn = document.getElementById(ELEMENTS.HOME_BTN);
  const settingsBtn = document.getElementById(ELEMENTS.SETTINGS_BTN);
  const contactBtn = document.getElementById(ELEMENTS.CONTACT_BTN);
  const cancelBtn = document.getElementById(ELEMENTS.CANCEL_BTN);
  const cancelBtn2 = document.getElementById(ELEMENTS.CANCEL_BTN2);
  const setKEYBtn = document.getElementById(ELEMENTS.SET_KEY_BTN);
  const setIDBtn = document.getElementById(ELEMENTS.SET_ID_BTN);
  const clrBtn = document.getElementById(ELEMENTS.CLR_BTN);
  const submitKEYButton = document.getElementById(ELEMENTS.SBMT_KEY_BTN);
  const submitIDButton = document.getElementById(ELEMENTS.SBMT_ID_BTN);
  const attrButton = document.getElementById(ELEMENTS.ATTR_BTN);

  document.addEventListener("click", function (event) {
    if (!event.target.closest(ELEMENTS.SIDEBAR) && sidebar.classList.contains("open")) {
      sidebar.classList.remove("open");
    }
  });

  closeBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    menuBtnChange();
  });

  function menuBtnChange() {
    if (sidebar.classList.contains("open")) {
      closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    } else {
      closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
    }
  }
  attrButton.addEventListener("click", () => {
    showPage("page4");
  });
  homeBtn.addEventListener("click", () => {
    showPage("page1");
  });

  settingsBtn.addEventListener("click", () => {
    showPage("page2");
  });

  contactBtn.addEventListener("click", () => {
    showPage("page3");
  });

  cancelBtn.addEventListener("click", () => {
    showPage("page2");
  });

  cancelBtn2.addEventListener("click", () => {
    showPage("page2");
  });

  setIDBtn.addEventListener("click", function () {
    showPage("setIDPage");
    
  });

  setKEYBtn.addEventListener("click", function () {
    showPage("setKeyPage");
    renderIDKEY();
  });

  clrBtn.addEventListener("click", function () {
    chrome.storage.local.clear(function () {
      if (chrome.runtime.lastError) {
        console.error("Error clearing data from local storage:", chrome.runtime.lastError);
        return;
      }
      console.log("Data cleared from local storage.");
    });
    renderIDKEY();
  });
  submitIDButton.addEventListener("click", function () {
      checkvalid("IDform");
  });
  submitKEYButton.addEventListener("click", function () {
      checkvalid("KEYform");
  });
  renderIDKEY();
});

function mixdata(data) {
const firstEightDigits = data.slice(0, 8);
return `${firstEightDigits}**************************`;
}

function retrieveInfo() {
return new Promise((resolve, reject) => {
  chrome.storage.local.get(["KEY", "DATABASE_ID"], function (data) {
  if (chrome.runtime.lastError) {
      console.log("Error reading data from local storage:", chrome.runtime.lastError.message);
      reject(chrome.runtime.lastError.message);
      return;
  }
  const KEY = data.KEY;
  const ID = data.DATABASE_ID;
  resolve({ KEY: KEY, ID: ID });
  });
});
}

function renderIDKEY() {
retrieveInfo()
  .then((data) => {
  const id_txt = document.getElementById("cur_ID");
  const key_txt = document.getElementById("cur_KEY");
  let KEY = "";
  let ID = "";
  if (data.KEY) {
      KEY = "secret_" + mixdata(data.KEY);
  }
  if (data.ID) {
      ID = mixdata(data.ID);
  }
  id_txt.textContent = `Current DATABASE_ID: ${ID}`;
  key_txt.textContent = `Current NOTION_API_KEY: ${KEY}`;
  })
  .catch((error) => {
  console.error("Error:", error);
  });
}

function showPage(pageId) {
console.log(pageId);
const pages = document.querySelectorAll(".content > div");
pages.forEach((page) => {
  page.classList.add("hidden");
});
const selectedPage = document.getElementById(pageId);
selectedPage.classList.remove("hidden");
}

function checkvalid(formID){
  form = document.getElementById(formID);
  if(form.checkValidity()){
    if(formID == "IDform"){
      const IDField =document.getElementById("IDField");
      const IDvalue = IDField.value;
      if(IDvalue.length != 32){
        alert("Invalid ID");
        return;
      }
      else{
        setData(formID);
        return;
      }
    }
    else if(formID == "KEYform"){
      setData(formID);
      return;
    }    
  }
  else{
    form.reportValidity();
    return;
  }
}
function setData(tag){
  if(tag == "IDform"){
      const IDField =document.getElementById("IDField");
      const IDvalue = IDField.value;
      IDField.value = "";
      const dataToSave = {
          DATABASE_ID: IDvalue,
      };
      chrome.storage.local.set(dataToSave, function () {
          console.log("ID Data saved");
          renderIDKEY();
          showPage("page2");
      });
      return;
  }
  else if(tag == "KEYform"){  
      const KeyField = document.getElementById("KeyField");
      const KeyValue = KeyField.value.substring(7);
      KeyField.value = "";
      const dataToSave = {
          KEY: KeyValue
      }
      chrome.storage.local.set(dataToSave, function () {
          console.log("Key Data saved");
          renderIDKEY();
          showPage("page2");
      });
      return;
  }
}

