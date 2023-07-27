// Listen for messages from the popup
//temp holder for API_KEY and DATABASE_ID
// const { Client } = require('@notionhq/client');
// import { Client } from '@notionhq/client';
// const notion = new Client({ auth: process.env.NOTION_API_KEY });
chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
    console.log("Message Received");
    if(message.action == "sendToNotion"){
        const messageDt = message.data;
        console.log(messageDt);
        addToNotionDatabase(messageDt)
        .then((response) => {
            sendResponse({ success: true, data: response });
        })
        .catch((error) => {
            console.error("Error adding to Notion database:", error);
            sendResponse({ success: false, error: error.message });
        });
    // Important: Return true to indicate that the sendResponse will be sent asynchronously.
    return true;
  }
});
async function addToNotionDatabase(data){
    try{
        const { Client } = require('@notionhq/client');
        const notion = new Client({ auth: NOTION_API_KEY });
        const response = await notion.pages.create({
            parent: { 
                "type" : "database_id",
                "database_id": NOTION_DATABASE_ID 
            },
            properties: {
            "Word": {
                    "title": [
                        {
                            "type": "text",
                            "text":{
                                "content": data.word
                            },
                        },
                    ],
                },
                "Pos": {
                    "select" :{
                        "name": data.pos
                    }
                },
                "Added Date": {
                    "date":{
                        "start" : data.date,
                        "end" : null
                    }
                },
                "Definition": {
                    "rich_text": [
                        {
                        "type": "text",
                        "text": {
                            "content": data.definition,
                            "link": null
                        },
                        "annotations": {
                            "bold": false,
                            "italic": false,
                            "strikethrough": false,
                            "underline": false,
                            "code": false,
                            "color": "default"
                        },
                        "plain_text": data.definition,
                        "href": null
                        }
                    ]
                }
            },
        });
        console.log(response);
        return response;
    }catch(error){
        throw new Error(`Failed to add to Notion database: ${error.message}`);
    }
}