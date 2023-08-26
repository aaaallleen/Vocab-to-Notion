


chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
    if(message.action == "sendToNotion"){
        const messageDt = message.data;
        addToNotionDatabase(messageDt)
        .then((response) => {
            sendResponse({ success: true, data: response });
        })
        .catch((error) => {
            sendResponse({ success: false, error: error.message });
        });
    return true;
  }
});

function retrieveInfo() {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(["KEY", "DATABASE_ID"], function(data) {
        if (chrome.runtime.lastError) {
          console.log("Error reading data from local storage:", chrome.runtime.lastError.message);
          reject(chrome.runtime.lastError.message);
          return;
        }
        
        const KEY = "secret_"+data.KEY;
        const ID = data.DATABASE_ID;
        resolve({ KEY: KEY, ID: ID });
      });
    });
  }
  
async function addToNotionDatabase(data){
    try{
        let NOTION_API_KEY, NOTION_DATABASE_ID;
        try{
            const { KEY, ID } = await retrieveInfo();
            NOTION_API_KEY = KEY;
            NOTION_DATABASE_ID = ID;
        }catch(error){
            console.error("Error retrieving info from local storage:", error.message);
        }
        
        const { Client } = require('@notionhq/client');
        const notion = new Client({ auth: NOTION_API_KEY });
        if(data.pos){
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
            return response;
        }
        else{
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
                                "content": data.def,
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
                            "plain_text": data.def,
                            "href": null
                            }
                        ]
                    }
                },
            });
            return response;
        }  
    }catch(error){
        throw new Error(`Failed to add to Notion database: ${error.message}`);
    }
}