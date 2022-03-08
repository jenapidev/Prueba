const express = require('express')
const axios = require('axios')
const cors = require('cors')
const { options, baseUrl } = require('./utils')
const { getFileData } = require('./parseFunction')

const app = express()

const corsOpts = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
    ],
  
    allowedHeaders: [
      'Content-Type',
    ],
};

app.use(cors(corsOpts));

const handleError = (response, msg="Hubo un error al consignar la data") => {
    response.status(500)
    response.send(msg)
}

app.get('/files/data', async (request, response) => {
    try {
        const result = await axios({...options, url: `${baseUrl}/secret/files`});
        let finalData = []
        const { files } = result.data
        for (const file of files) {
            const parsedFile = await getFileData(file)
            if (parsedFile) {
                finalData.push(parsedFile)
            }
        }
        response.json(finalData)
    } catch (e) {
        handleError(e.message)
    }
})

app.get('/files/list', async (request, response) => {
    try {
        const result = await axios({...options, url: `${baseUrl}/secret/files`})
        response.json(result.data)
    } catch (e) {
        handleError(e.message)
    }
})




const PORT = 3001
module.exports = app.listen(PORT, () => {
    console.log(`The server is ready and running on port: ${PORT}`)
})