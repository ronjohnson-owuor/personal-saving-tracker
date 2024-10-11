var router = require("./base/base");
var path = require('path');
const baseDir = path.dirname(__dirname);

/* 
this is where routes to all the pages in the app are created
*/
router.get("/",(req,res)=>{
    res.sendFile(path.join(baseDir,'/pages/home/home.html'));
});

module.exports = router;