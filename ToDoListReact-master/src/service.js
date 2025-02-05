// import axios from 'axios';

// const apiUrl = process.env.VARIABLE_NAME;

// export default {
//   getTasks: async () => {
//     const result = await axios.get(`${apiUrl}/api/items`)    
//     return result.data;
//   },

//   addTask: async(name)=>{
//     const currentSecond = new Date().getSeconds();

//     console.log('addTask', name)
//     const result = await axios.post(`${apiUrl}/api/items`,{id:currentSecond,name:name, isComplete:false})    
//     return result.data;
//   },

//   setCompleted: async(id, isComplete)=>{
//     console.log('setCompleted', {id, isComplete})
//     const result = await axios.put(`${apiUrl}/api/items/${id}`,{id,isComplete})    
//     return result.data;
//   },

//   deleteTask:async(id)=>{
//     console.log('deleteTask')
//     const result = await axios.delete(`${apiUrl}/api/items/${id}`)    
//     return result.data;
//   }

  
// };
import axios from 'axios';

// הגדרת כתובת ה-API כ-default
const apiUrl = process.env.REACT_APP_VARIABLE_NAME; // אם יש לך משתנה סביבה כזה
axios.defaults.baseURL = apiUrl;  // נגדיר את baseURL כ-default

// הוספת Interceptor לתפיסת שגיאות ב-Response
axios.interceptors.response.use(
  (response) => {
    // אם הכל בסדר, מחזירים את ה-response כרגיל
    return response;
  },
  (error) => {
    // אם יש שגיאה, רושמים אותה ללוג
    console.error('Error response from API:', error);
    
    // מחזירים את השגיאה כדי שהקוד יוכל להתמודד איתה
    return Promise.reject(error);
  }
);
/*
axios.defaults.baseURL =process.env.REACT_APP_API_URL;


axios.defaults.headers.post['Content-Type'] = 'application/json';


axios.interceptors.response.use(
    response => response,
    error => {
      console.error('API Error:', error.response ? error.response.data : error.message);
      return Promise.reject(error); 
    }
  );

export default axios;
*/ 
export default {
  getTasks: async () => {
    const result = await axios.get(`/api/items`);  // לא צריך לכתוב את ה-baseUrl כי הוא כבר הוגדר
    return result.data;
  },

  addTask: async (name) => {
    const currentSecond = new Date().getSeconds();

    console.log('addTask', name);
    const result = await axios.post(`/api/items`, {/*id: currentSecond,*/ Name: name, IsComplete: false});
    return result.data;
  },

  setCompleted: async (id, isComplete) => {
    console.log('setCompleted', { id, isComplete });
    const result = await axios.put(`/api/items/${id}?iscomplete=${isComplete}`, { id, isComplete });
    return result.data;
  },

  deleteTask: async (id) => {
    console.log('deleteTask');
    const result = await axios.delete(`/api/items/${id}`);
    return result.data;
  }
};
