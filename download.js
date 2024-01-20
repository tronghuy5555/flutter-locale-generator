const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const { GoogleSpreadsheet } = require('google-spreadsheet');

const TOKEN_PATH = 'token.json';
const GOOGLE_SERVICE_PATH = './config/google_service_account.json'
const SHEET_ID = ""
(async () => {
    // If modifying these scopes, delete token.json.
    const SCOPES = [
        // 'https://www.googleapis.com/auth/drive.readonly',
        // 'https://www.googleapis.com/auth/drive.metadata.readonly',
        // 'https://www.googleapis.com/auth/cloud-platform'
        'https://www.googleapis.com/auth/spreadsheets'
    ];// The file token.json stores the user's access and refresh tokens, and is
    // created automatically when the authorization flow completes for the first
    // time.
    const SHEET_ID_VO_DANH_EMAIL = "1WQuFc3JSuosC_sgnk7hdLSQLgUNdg0hE7lbz1A6AQyc";
    const SHEET_ID = "17Sv5uSbEfqVBWSYuSYCOrxepCbS6P5Ia";

    const googleServiceAccount = require(GOOGLE_SERVICE_PATH);
    const googleServiceAccountCompany = require(GOOGLE_SERVICE_PATH);

    // Initialize the sheet - doc ID is the long id in the sheets URL
    const doc = new GoogleSpreadsheet(SHEET_ID_VO_DANH_EMAIL);
    await doc.useServiceAccountAuth(googleServiceAccount);
    await doc.loadInfo();// loads document properties and worksheets
    console.log(doc.title);
    console.log(doc.spreadsheetId);
    // const auth = new google.auth.GoogleAuth({
    //     keyFile: './config/google_service_vo_danh_mail.json',
    //     scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    // });
    // const authClientObject = await auth.getClient();
    // google.options(authClientObject);
    // const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });
    // const readData = await googleSheetsInstance.spreadsheets.values.get({
    //     auth: auth, //auth object
    //     spreadsheetId: SHEET_ID_VO_DANH_EMAIL, // spreadsheet id
    //     range: ""
    // });
    // console.log(readData.data);
})();