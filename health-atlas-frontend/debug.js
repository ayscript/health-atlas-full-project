// debug-api.js
const { Client } = require("@gradio/client");

async function checkApi() {
  // Use your correct Lightning AI URL here
  const client = await Client.connect("https://7860-01kcgzdekk9jdjmmgsnewbaq45.cloudspaces.litng.ai/");
  
  // This prints the EXACT inputs your app expects
  const api_info = await client.view_api();
  console.log(JSON.stringify(api_info, null, 2));
}

checkApi();