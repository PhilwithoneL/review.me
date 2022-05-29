// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const axios = require('axios');

require("dotenv").config();


const handler = async (event) => {

  const apiKey = process.env.API_KEY

  const { id } = event.queryStringParameters;


  try {
    
    const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`)

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }

    }
    catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: error.message
        })
  }
}
}

module.exports = { handler }
