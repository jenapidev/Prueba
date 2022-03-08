import { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import axios from "axios"
import './App.scss'

export const App = (props) => {
    const [data, setData] = useState([])
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/files/data')
                setData(response.data)
            } catch (e) {
                alert("Error al traer la data")
            }
        }
        getData()
    }, [])

    console.log(data)

    return (
        <div className="table-container">
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                    <th>File Name</th>
                    <th>Text</th>
                    <th>Number</th>
                    <th>Hex</th>
                    </tr>
                </thead>
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
            </Table>
        </div>
    )
}