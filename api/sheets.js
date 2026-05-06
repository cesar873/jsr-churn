const { google } = require('googleapis');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  try {
    const credentials = JSON.parse(process.env.GOOGLE_SHEETS_API_KEY);
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });
    const sheets = google.sheets({ version: 'v4', auth });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Churned Clients!A2:J',
    });
    res.status(200).json({ data: response.data.values || [] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
