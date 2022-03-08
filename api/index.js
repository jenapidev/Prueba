const express = require('express')
const axios = require('axios')
const { options, baseUrl } = require('./utils')
const { getFileData } = require('./parseFunction')

const app = express()

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
        console.error(e.message)
        response.send('<h3>Hubo un error al traer la informacion</h3>')

    }
})

const PORT = 3001
module.exports = app.listen(PORT, () => {
    console.log(`The server is ready and running on port: ${PORT}`)
})