
const axios = require('axios');

require('dotenv').config({})



const handler = async (event) => {

  const {media, time} = event.queryStringParameters

  let m = media;
  let t = time;

  const apiKey = process.env.API_KEY

  try {    

   const { data } = await axios.get(`https://api.themoviedb.org/3/trending/${m}/${t}?api_key=${apiKey}`)

    return {
      statusCode: 200,
      header: {
        "Access-Control-Allow-Origin": "no-cors"
      },
      body: JSON.stringify(data)
    }

  } catch (error) {

    return {
      statusCode: 500,
      header: {
        "Access-Control-Allow-Origin": "no-cors"
      },
      body: JSON.stringify({
        error: error.message
      })
    }

  }

}

module.exports = { handler }
