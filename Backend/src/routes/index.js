const { Router } = require("express");
const router = Router()

router.get('/test', (req,res) =>{
    const data = {
        "name": "miguel",
        "website": "holamiguel.com"
    }
    res.json(data);
})

module.exports = router;