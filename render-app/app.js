// const express = require('express');
// const axios = require('axios');
// require('dotenv').config();

// const app = express();
// const port = process.env.PORT || 3000;

// // Endpoint שמחזיר את רשימת האפליקציות מ-Render
// app.get('/api/render-apps', async (req, res) => {
//     try {
//         // קבלת ה-API Key מתוך משתני הסביבה
//         const apiKey = process.env.RENDER_API_KEY;
        
//         // קריאה ל-API של Render (החלף את הכתובת ב-URL הנכון של ה-API)
//         const response = await axios.get('https://api.render.com/v1/apps', {
//             headers: {
//                 'Authorization': `Bearer ${apiKey}`,
//             }
//         });
        
//         // מחזיר את רשימת האפליקציות
//         res.json(response.data);
//     } catch (error) {
//         console.error('Error fetching apps from Render:', error);
//         res.status(500).json({ message: 'Failed to fetch apps' });
//     }
// });

// // השרת יאזין על הפורט המבוקש
// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });


// // // // ייבוא של הספרייה
// // // import renderApi from '@api/render-api';

// // // // פונקציה לגישה ל-Render API
// // // const fetchRenderData = async () => {
// // //   try {
// // //     // אוטנטיקציה עם ה-API Key שלך
// // //     renderApi.auth('rnd_v55BuGfAR7LCHZMJ3eKuGJ0ndTgK');

// // //     // קריאה לשירותי Render
// // //     const { data } = await renderApi.listServices({
// // //       includePreviews: 'true', 
// // //       limit: '20'
// // //     });

// // //     // הדפסת התוצאה
// // //     console.log(data);
// // //   } catch (err) {
// // //     console.error('Error fetching Render data:', err);
// // //   }
// // // };

// // // // קריאה לפונקציה
// // // fetchRenderData();
// // import express from 'express';
// // import renderApi from '@api/render-api';

// // const app = express();

// // // הגדרת נתיב שיקרא ל-Render API
// // app.get('/fetch-render-data', async (req, res) => {
// //   try {
// //     // אוטנטיקציה עם ה-API Key של Render
// //     renderApi.auth('rnd_v55BuGfAR7LCHZMJ3eKuGJ0ndTgK');
    
// //     // שליחת קריאה ל-Render API לקבלת מידע על השירותים
// //     const { data } = await renderApi.listServices({
// //       includePreviews: 'true',
// //       limit: '20' // מגבלה של 20 שירותים
// //     });
    
// //     // מחזירים את התוכן שקיבלנו מה-API בתגובה
// //     res.json(data);
// //   } catch (err) {
// //     // במקרה של שגיאה, מחזירים שגיאה ללקוח
// //     console.error('Error fetching Render data:', err);
// //     res.status(500).send('Error fetching Render data');
// //   }
// // });

// // // הגדרת פורט והפעלת השרת
// // const PORT = process.env.PORT || 3000;
// // app.listen(PORT, () => {
// //   console.log(`Server is running on port ${PORT}`);
// // });


import renderApi from '@api/render-api';

renderApi.auth('rnd_v55BuGfAR7LCHZMJ3eKuGJ0ndTgK');
renderApi.listServices({ includePreviews: 'true', limit: '20'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));