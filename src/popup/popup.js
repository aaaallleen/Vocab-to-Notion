function getDate(){
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  // const monthAbbrv =  ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  const date = year+"-"+month+"-"+day;
  console.log(date);
  return date;
}
function checkvalid(){
  form = document.getElementById("vocabForm");
  if(form.checkValidity()){
      senddata();
  }
  else{
    form.reportValidity();
  }
}
function senddata () {
    console.log("button click");
    try{
          console.log("click add");
          date = getDate();
          const wordElement = document.getElementById("word");
          const posElement = document.getElementById("pos");
          const defElement = document.getElementById("def");
          const word = wordElement.value;
          const pos = posElement.value;
          const def = defElement.value;
          const vocabform = document.getElementById("vocabForm");
          vocabform.reset();
          const Word = {
            word: word,
            definition: def,
            date: date
          }
          if(pos){
            Word.pos = pos.toLowerCase();
          }
          console.log(Word);
          chrome.runtime.sendMessage({action: "sendToNotion", data: Word }, (response)=>{
              if(response.success){
                  alert("Vocabulary sent to Notion successfully!");
              }
              else{
                  alert(response.error);
              }
          });
      }
      catch(error){
        console.log(error);
      }
}
document.addEventListener("DOMContentLoaded", function () {
    const settingsBtn = document.getElementById("settings");
    settingsBtn.addEventListener("click", function () {
        window.open("../dashboard/settings.html",'_blank');
    });
    const sendBtn = document.getElementById("sendButton");
    sendBtn.addEventListener("click", checkvalid);
});
