import router from './base/base.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const baseDir = path.dirname(__dirname);

/* 
This is where routes to all the pages in the app are created
*/
router.get("/", (req, res) => {
    res.sendFile(path.join(baseDir, '/pages/home/home.html'));
});

export default router;
