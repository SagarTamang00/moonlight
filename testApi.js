const axios = require('axios');

axios.post('http://localhost:5000/api/auth/forgot-password', {
    email: 'genzeysonam@gmail.com'
}).then(res => {
    console.log("Success:", res.data);
}).catch(err => {
    console.log("Error:", err.response ? err.response.data : err.message);
});
