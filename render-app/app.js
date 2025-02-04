const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Endpoint שמחזיר את רשימת האפליקציות מ-Render
app.get('/api/render-apps', async (req, res) => {
    try {
        // קבלת ה-API Key מתוך משתני הסביבה
        const apiKey = process.env.RENDER_API_KEY;
        
        // קריאה ל-API של Render (החלף את הכתובת ב-URL הנכון של ה-API)
        const response = await axios.get('https://api.render.com/v1/apps', {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
            }
        });
        
        // מחזיר את רשימת האפליקציות
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching apps from Render:', error);
        res.status(500).json({ message: 'Failed to fetch apps' });
    }
});

// השרת יאזין על הפורט המבוקש
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
