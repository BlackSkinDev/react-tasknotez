
import Axios from 'axios'

const BASE_URL =process.env.MIX_REACT_APP_BASE_URL
;
export const getTaskLists =  async()=> {
    return await Axios.get(`${BASE_URL}/tasks`)
    .then(response=>{
            return response.data
     })
    .catch(err =>{
        return err.response.data
     })

}

export const storeNewTask =  async(data)=> {
    return await Axios.post(`${BASE_URL}/tasks`,data)
    .then(response=>{
        return response.data;
    })
    .catch(err =>{
        return err.response.data;
    })
}


export const updateTask =  async(data,id)=> {
    return await Axios.put(`${BASE_URL}/tasks/${id}`,data)
    .then(response=>{
        return response.data;
    })
    .catch(err =>{
        return err.response.data;
    })
}

