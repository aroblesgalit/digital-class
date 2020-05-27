const router = require("express").Router();

const appId = process.env.REACT_APP_ID;
const appKey = process.env.REACT_APP_KEY;



axios.get()
    .then(res => {
        console.log(res.data.schoolMatches);
        setSchools(res.data.schoolMatches);
    })
    .catch(err => {
        console.log(err)
    })

router.get(`https://api.schooldigger.com/v1.2/autocomplete/schools?q=${schoolQuery}&st=${state}&appID=${appId}&appKey=${appKey}`, function (req, res) {
    
});