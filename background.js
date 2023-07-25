// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("receive Message");
    if (message.action === "sendToNotion") {
        const vocabularyData = message.data;
        console.log("Vocabulary data:", vocabularyData);
        sendVocabularyToNotion(vocabularyData);
    }
  });
  
  // Function to send vocabulary data to Notion
  function sendVocabularyToNotion(vocabularyData) {
    // Make API call to Notion using fetch or any other method
    // Replace API_ENDPOINT and NOTION_ACCESS_TOKEN with your actual endpoint and access token
    const API_ENDPOINT = "https://api.notion.com";
    const NOTION_ACCESS_TOKEN = "YOUR_NOTION_ACCESS_TOKEN";
  
    fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${NOTION_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parent: {
          database_id: "YOUR_DATABASE_ID", // Replace with the actual Notion database ID where you want to add the vocabularies
        },
        properties: {
          title: {
            title: [
              {
                text: {
                  content: vocabularyData.word,
                },
              },
            ],
          },
          definition: {
            rich_text: [
              {
                text: {
                  content: vocabularyData.definition,
                },
              },
            ],
          },
        },
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Vocabulary sent to Notion:", data);
      // Optionally, notify the user that the vocabulary was sent successfully
      // For example, you could use chrome.notifications to show a notification
    })
    .catch((error) => {
      console.error("Error sending vocabulary to Notion:", error);
      // Optionally, notify the user about the error
    });
  }
  