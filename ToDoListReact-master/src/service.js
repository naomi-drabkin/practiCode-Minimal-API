import axios from 'axios';

const apiUrl = "http://localhost:5120"

export default {
  getTasks: async () => {
    const result = await axios.get(`${apiUrl}/api/items`)    
    return result.data;
  },

  addTask: async(name)=>{
    const currentSecond = new Date().getSeconds();

    console.log('addTask', name)
    const result = await axios.post(`${apiUrl}/api/items`,{id:currentSecond,name:name, isComplete:false})    
    return result.data;
  },

  setCompleted: async(id, isComplete)=>{
    console.log('setCompleted', {id, isComplete})
    const result = await axios.put(`${apiUrl}/api/items/${id}`,{id,isComplete})    
    return result.data;
  },

  deleteTask:async(id)=>{
    console.log('deleteTask')
    const result = await axios.delete(`${apiUrl}/api/items/${id}`)    
    return result.data;
  }
};
