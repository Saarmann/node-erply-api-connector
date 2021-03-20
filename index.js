const axios = require('axios');
require('dotenv').config();

const clientCode = process.env.CLIENT_CODE;
const username = process.env.USER_NAME;
const password = process.env.PSW;
const url = `https://${clientCode}.erply.com/api/`;

const authenticate = async () => {
  const config = {
    url: url,
    method: 'POST',
    data: `clientCode=${clientCode}&username=${username}&password=${password}&request=verifyUser&sendContentType=1`,
  };

  try {
    const response = await axios(config);
    let sessionKey = response.data.records[0].sessionKey;
    return sessionKey;
  } catch (error) {
    console.log(error);
  }
};

const getSalesDocuments = async () => {
  const sessionKey = await authenticate();

  const dateFrom = "2021-03-15"
  const dateTo = "2021-03-17"

  const config = {
    url: url,
    method: 'POST',
    data: `clientCode=${clientCode}&sessionKey=${sessionKey}&request=getSalesDocuments&getRowsForAllInvoices=1&sendContentType=1&dateFrom=${dateFrom}&dateTo=${dateTo}&confirmed=1`,
  };

  try {
    const response = await axios(config);
    const responseData = response.data;
    console.log(responseData);
    // console.log(responseData.records[0].rows); // access to invoice rows
  } catch (error) {
    console.log(error);
  }
};

getSalesDocuments();
