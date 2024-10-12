import router from './base/base.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { getSavings } from '../modules/updatesavings.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const baseDir = path.dirname(__dirname);

/* 
This is where routes to all the pages in the app are created
*/
router.get("/", (req, res) => {
    res.sendFile(path.join(baseDir, '/pages/home/home.html'));
});

router.get("/get-product", async (req, res) => {
    await getSavings();
    res.send("Fetching progress data");
});

export default router;
