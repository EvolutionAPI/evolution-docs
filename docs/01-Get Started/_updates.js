export const updates = [
  {
    version: "1.7.0",
    description: "Added support to oficial WhatsApp integration, new update message endpoint, labels and more.",
    releaseDate: "2024-03-11",
    features: [
      "Added update message endpoint",
      "Add translate capabilities to QRMessages in CW",
      "Join in Group by Invite Code",
      "Read messages from whatsapp in chatwoot",
      "Add support to use use redis in cacheservice",
      "Add support for labels",
      "Command to clearcache from chatwoot inbox",
      "Whatsapp Cloud API Oficial support",
    ],
    fixes: [
      "Proxy configuration improvements",
      "Correction in sending lists",
      "Adjust in webhook_base64",
      "Correction in typebot text formatting",
      "Correction in chatwoot text formatting and render list message",
      "Only use a axios request to get file mimetype if necessary",
      "When possible use the original file extension",
      "When receiving a file from whatsapp, use the original filename in chatwoot if possible",
      "Remove message ids cache in chatwoot to use chatwoot's api itself",
      "Adjusts the quoted message, now has contextInfo in the message Raw",
      "Collecting responses with text or numbers in Typebot",
      "Added sendList endpoint to swagger documentation",
      "Implemented a function to synchronize message deletions on WhatsApp, automatically reflecting in Chatwoot.",
      "Improvement on numbers validation",
      "Fix polls in message sending",
      "Sending status message",
      "Message 'connection successfully' spamming",
      "Invalidate the conversation cache if reopen_conversation is false and the conversation was resolved",
      "Fix looping when deleting a message in chatwoot",
      "When receiving a file from whatsapp, use the original filename in chatwoot if possible",
      "Correction in the sendList Function",
      "Implement contact upsert in messaging-history.set",
      "Improve proxy error handling",
      "Refactor fetching participants for group in WhatsApp service",
      "Fixed problem where the typebot final keyword did not work",
      "Typebot's wait now pauses the flow and composing is defined by the delay_message parameter in set typebot",
      "Composing over 20s now loops until finished"
    ],
    integrations: [
      "Chatwoot: v3.5.2",
      "Typebot: v2.23.0"
    ],
    commits: "",
  },
  {
    version: "1.6.1",
    description: "This is a minor fix update. Version 1.6.1 introduces fixes for message handling, Typebot integration, media sharing, text formatting in Chatwoot, and instance management. It also adds customization options and resolves reconnection issues with MongoDB.",
    releaseDate: "2023-12-15",
    features: [
      "Added AWS SQS Integration",
      "Added support for new typebot API",
      "Added endpoint sendPresence",
      "New Instance Manager",
      "Added auto_create to the chatwoot set to create the inbox automatically or not",
      "Added reply, delete and message reaction in chatwoot v3.3.1"
    ],
    fixes: [
      "Fixed Lid Messages",
      "Fixed the pairing code",
      "Adjusts in typebot",
      "Fixed sending variables to typebot",
      "Fixed sending variables from typebot",
      "Options to disable docs and manager",
      "Correction sending s3/minio media to chatwoot and typebot",
      "Fixed chatwoot Bold, Italic and Underline formatting using Regex",
      "Include instance Id field in the instance configuration",
      "Fix the problem when disconnecting the instance and connecting again using mongodb",
      "Fixed the problem with typebot closing at the end of the flow, now this is optional with the TYPEBOT_KEEP_OPEN variable",
      "Added the sign_delimiter property to the Chatwoot configuration, allowing you to set a different delimiter for the signature. Default when not defined \n",
    ],
    integrations: [
      "Chatwoot: v3.3.1",
      "Typebot: v2.20.0"
    ],
    commits: "",
  }, {
    version: "1.6.0",
    description: "New Instance manager available on endpoint /manager and support for reply messages in Chatwoot, better error handling and more...",
    releaseDate: "2023-10-12",
    features: [
      "Adjusting function cleaningStoreFiles to remove itens from missing…",
      "Handle optional chaining for 'settings.msg_call', this change prevent…",
      "Handle erros in Typebot",
      "Add session creation for typebot service",
      "Add sendPresence",
      "Add Manager",
    ],
    fixes: [
      "Removed await from webhook when sending a message",
      "messages not received: error handling when updating contact",
      "workaround to manage param data as an array in mongodb",
      "chatwoot find",
      "only create if is paused",
      "size of group participants",
    ],
    integrations: [
      "Chatwoot: v3.3.1",
      "Typebot: v2.19.0"
    ],
    commits: "",
  },
  {
    version: "1.5.4",
    description: "Baileys logger typing issue resolved and resolved duplicated messages problems in Chatwoot",
    releaseDate: "2023-10-12",
    features: [
      
    ],
    fixes: [
    
    ],
    integrations: [

    ],
    commits: "",
  }
]

