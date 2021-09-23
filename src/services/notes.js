import axios from 'axios';


const url = '/api/notes'

const getAll =()=>{
    const request = axios.get(url)
    const nonExisting = {
        id: 10000,
        content: 'This note is not saved to server',
        date: '2019-05-30T17:30:31.098Z',
        important: true,
    }
    return request.then(response => response.data.concat(nonExisting))
}

const create= newObject =>{
    const request = axios.post(url, newObject)
    return request.then(response=> response.data)
}

const update =(id, newObject)=>{
    const request= axios.put(`${url}/${id}`, newObject)
    return request.then(response=> response.data)
}

export default {
    getAll, create, update
}