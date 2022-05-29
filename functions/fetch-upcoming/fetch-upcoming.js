// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const axios = require('axios');

require('dotenv/config')

const handler = async (event) => {


  const apiKey = process.env.API_KEY

  try {

    const { data } = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`)

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
