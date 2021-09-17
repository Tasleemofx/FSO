import axios from "axios";

const url = 'http://localhost:3001/contacts';
const getAll=()=>{
    const request = axios.get(url)
    return request.then(response=> response.data)
}

const create=(object)=>{
    const request = axios.post(url, object)
    return request.then(response=> response.data)
}

const update=(id, updatedItem)=>{
    const request = axios.put(`${url}/${id}`, updatedItem)
    return request.then(response=> response.data)
}
const deleteOne=(id)=>{
    const request = axios.delete(`${url}/${id}`)
    return request.then(response=>response)
}

export default {
    getAll, create, update, deleteOne
}