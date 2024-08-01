const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0NyLzdIN2t3dUxmYmowc0Q3bFh1dmF6QllKM09vWEo5ZVYxRHJlM0FrUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0lCQmppR1ZMaXB2dmFQYnpYdmFzaEpzZzRRMi9KOEVQRlZoUjU5K2NBND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvUHdyUVVHQnNaWGlYbzlKVzNoRjd3YzcyZ2FRQUZOOGpKQlVseGQ3TkZjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ4cWNxRFZCNzB3ZGN4elprdzY4bEoyYWNZNWFrMkxRWTEwMTYwOXRnU2tnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVQcEFFcFlkNWlxN2lrV2U1NXFoSTRERjlwNEhVVzB6SmRNTWt5b1hRSFU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1JcmhYNHlUbG44NXd5aW1ZTGJxazZTNXlwQmtjTU1PdEpVT3FtOWNpbDQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUp0eHV0OEdTc3FmVkg0TG0rQksvWEZvc3UwWjIxOHhhaVpFQkhod3cyTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSHZoSmUvd3IxYUJlczU2S2RFbnB3Q1JsaUVuMjNGRW9uc1ZtMTlzRHdIZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNXK2xlSzROZmcybEJacHllL0hPYS8wWXNXT2Rza3JrRGdVWUszUFBSb1RnSzVObU1XME4zbncrYXEzemcyS3RuZEhJSHNZT2I2em5aTnVwdk1PRWlnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MzcsImFkdlNlY3JldEtleSI6IkRyNG91aVJLVGNVRldXdUtOQS80TzI1L3ZZOGQ1TjVHdUtrd1duaTZtVUk9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiOTIzMjE4NjM3MTAxQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjhCQjY2OUVFNjExNzhCODk1M0Y0MDEwMTUzRjc0Q0MwIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjI0OTg0MTZ9LHsia2V5Ijp7InJlbW90ZUppZCI6IjkyMzIxODYzNzEwMUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJFRTA0NDIwMzE2NkNEMTVGQzQ5MzM0RjI0NTE4OUMyNiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzIyNDk4NDE2fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJ0NGxrcXZRX1RqV3VOU2Nua1dFMXJRIiwicGhvbmVJZCI6ImE5MzA1YzI5LTQ1MzctNDM4My05YzhiLTkyODA3YzgwNTlhOCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5Ym9SZnpYb1FSQklMOUwvNjZvL1FBQ2Y0WGM9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUXdPQ3k4OW93S3VWUUtIMFFHQ3c1VGtPOGxZPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlMyVFlES0s4IiwibWUiOnsiaWQiOiI5MjMyMTg2MzcxMDE6OTVAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi2YXYqNi02LEifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ1B1VzA1Z0NFT0g2ckxVR0dBTWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImxMbDBUeTJ6c0psRzVXellxUTdZSzNsT1E0UGI0Q0dQRUM0bEdQdkdQQUE9IiwiYWNjb3VudFNpZ25hdHVyZSI6IklFVGdxZlY2YUpIU2dodmNYV3Bla3Y1aEY2SmVxNXBZK2Q1M1BiZlhOVDh2Yis2cWtOWVEvY1lpVVg3NHB4M0ZGY3lDbnNmV3JkazBaaXd1TkswdkRRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ6OUN5eU1qZWUrZ3p1N0pXakowaWE1a0s2em9RdXk4SFYvYytVN3lqMTRwU21TRWhrU2ZXSFlmb2k2M1A1NW92SHRCSm12d0htQW4xVklYU05qdW5nQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjkyMzIxODYzNzEwMTo5NUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJaUzVkRTh0czdDWlJ1VnMyS2tPMkN0NVRrT0QyK0FoanhBdUpSajd4andBIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIyNDk4NDE0LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUFSaSJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "keithkeizzah",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " keithkeizzah",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || '𝐀𝐋𝐏𝐇𝐀-𝐌𝐃',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/0c351a67f1dffd1f34cf5.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
