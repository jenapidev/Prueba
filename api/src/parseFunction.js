const axios = require('axios')
const { options, baseUrl } = require('./utils')


const mapData = (el) => {
    return {
        text: el[1],
        number: parseInt(el[2]),
        hex: el[3],
    }
}

const getFileData = async (file) => {
    try {
        const dFile = await axios({...options, url: `${baseUrl}/secret/file/${file}`});
        const splitedLines = dFile.data.split("\n")
        let completeData = []
        if (splitedLines.length > 1) {
            const parsedData = splitedLines.map(el => {
                return el.split(',')
            })
            
            completeData = parsedData.filter((el, idx) => el.length === 4 && idx > 0)
        }
        const fPData ={
            file,
            lines: completeData.length > 0 ? completeData.map(mapData) : completeData
        }
        return fPData
    } catch (e) {
        //the file returns error and is skiped
        return null
    }
}

module.exports.getFileData = getFileData