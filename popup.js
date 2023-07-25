// import { getActiveTabURL } from "./utils.js";

// const addNewBookmark = (bookmarks, bookmark) => {
//   const bookmarkTitleElement = document.createElement("div");
//   const controlsElement = document.createElement("div");
//   const newBookmarkElement = document.createElement("div");

//   bookmarkTitleElement.textContent = bookmark.desc;
//   bookmarkTitleElement.className = "bookmark-title";
//   controlsElement.className = "bookmark-controls";

//   setBookmarkAttributes("play", onPlay, controlsElement);
//   setBookmarkAttributes("delete", onDelete, controlsElement);

//   newBookmarkElement.id = "bookmark-" + bookmark.time;
//   newBookmarkElement.className = "bookmark";
//   newBookmarkElement.setAttribute("timestamp", bookmark.time);

//   newBookmarkElement.appendChild(bookmarkTitleElement);
//   newBookmarkElement.appendChild(controlsElement);
//   bookmarks.appendChild(newBookmarkElement);
// };

// const viewBookmarks = (currentBookmarks=[]) => {
//   const bookmarksElement = document.getElementById("bookmarks");
//   bookmarksElement.innerHTML = "";

//   if (currentBookmarks.length > 0) {
//     for (let i = 0; i < currentBookmarks.length; i++) {
//       const bookmark = currentBookmarks[i];
//       addNewBookmark(bookmarksElement, bookmark);
//     }
//   } else {
//     bookmarksElement.innerHTML = '<i class="row">No bookmarks to show</i>';
//   }

//   return;
// };

// const onPlay = async e => {
//   const bookmarkTime = e.target.parentNode.parentNode.getAttribute("timestamp");
//   const activeTab = await getActiveTabURL();

//   chrome.tabs.sendMessage(activeTab.id, {
//     type: "PLAY",
//     value: bookmarkTime,
//   });
// };

// const onDelete = async e => {
//   const activeTab = await getActiveTabURL();
//   const bookmarkTime = e.target.parentNode.parentNode.getAttribute("timestamp");
//   const bookmarkElementToDelete = document.getElementById(
//     "bookmark-" + bookmarkTime
//   );

//   bookmarkElementToDelete.parentNode.removeChild(bookmarkElementToDelete);

//   chrome.tabs.sendMessage(activeTab.id, {
//     type: "DELETE",
//     value: bookmarkTime,
//   }, viewBookmarks);
// };

// const setBookmarkAttributes =  (src, eventListener, controlParentElement) => {
//   const controlElement = document.createElement("img");

//   controlElement.src = "assets/" + src + ".png";
//   controlElement.title = src;
//   controlElement.addEventListener("click", eventListener);
//   controlParentElement.appendChild(controlElement);
// };

// document.addEventListener("DOMContentLoaded", async () => {
//   const activeTab = await getActiveTabURL();
//   const queryParameters = activeTab.url.split("?")[1];
//   const urlParameters = new URLSearchParams(queryParameters);

//   const currentVideo = urlParameters.get("v");

//   if (activeTab.url.includes("youtube.com/watch") && currentVideo) {
//     chrome.storage.sync.get([currentVideo], (data) => {
//       const currentVideoBookmarks = data[currentVideo] ? JSON.parse(data[currentVideo]) : [];

//       viewBookmarks(currentVideoBookmarks);
//     });
//   } else {
//     const container = document.getElementsByClassName("container")[0];

//     container.innerHTML = '<div class="title">This is not a youtube video page.</div>';
//   }
// });
document.addEventListener("DOMContentLoaded", () => {
    // Attach an event listener to the form submission
    document.getElementById("vocabForm").addEventListener("submit", sendVocabularyData);
  });
  
  function sendVocabularyData(event) {
    event.preventDefault();
  
    // Get the word and definition from the form
    const wordInput = document.getElementById("word");
    const definitionInput = document.getElementById("definition");
  
    const word = wordInput.value.trim();
    const definition = definitionInput.value.trim();
  
    // Check if word and definition are not empty
    if (word === "" || definition === "") {
      alert("Please enter both word and definition.");
      return;
    }
  
    // Prepare the vocabulary data object
    const vocabularyData = {
      word: word,
      definition: definition
    };
  
    // Send the vocabulary data to the background script
    chrome.runtime.sendMessage({ action: "sendToNotion", data: vocabularyData }, (response) => {
      if (response.success) {
        alert("Vocabulary sent to Notion successfully!");
        // Optionally, you can clear the form after successful submission
        wordInput.value = "";
        definitionInput.value = "";
      } else {
        alert("Error sending vocabulary to Notion. Please try again later.");
      }
    });
  }
  