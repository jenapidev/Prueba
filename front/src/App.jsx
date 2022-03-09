import { useEffect, useState } from 'react'
import { Table, InputGroup, FormControl } from 'react-bootstrap'
import axios from "axios"
import './App.scss'

export const App = (props) => {
    const [data, setData] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [inputTimeOut, setInputTimeOut] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleGetAndLoadData = async (fileName=null) => {
        try {
            const response = await axios.get('http://localhost:3001/files/data', { params: { fileName }})
            setData(response.data)
            setLoading(false)
        } catch (e) {
            alert("Error al traer la data")
        }

    }

    useEffect(() => {
        handleGetAndLoadData()
    }, [])

    const handleInputChange = (e) => {
        const { value } = e.target
        setInputValue(value)
        setLoading(true)
        clearTimeout(inputTimeOut)
        setInputTimeOut(setTimeout(() => {
            handleGetAndLoadData(value)
        }, 400))

        
    }

    return (
        <div className="table-container">
            <InputGroup.Text>
                <FormControl value={inputValue} onChange={handleInputChange}/>
            </InputGroup.Text>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                    <th>File Name</th>
                    <th>Text</th>
                    <th>Number</th>
                    <th>Hex</th>
                    </tr>
                </thead>
                {!loading &&
                    <tbody>
                        {
                            data.map((file) => {
                                return file.lines.map(line => {
                                    return (<tr>
                                        <td>
                                            {file.file}
                                        </td>
                                        <td>
                                            {line.text}
                                        </td>
                                        <td>
                                            {line.number}
                                        </td>
                                        <td>
                                            {line.hex}
                                        </td>
                                    </tr>)
                                })
                            })
                        }
                    </tbody>
                }
            </Table>
            {loading &&
                <div className="loader-container">
                    <div className="lds-ring">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            }
        </div>
    )
}