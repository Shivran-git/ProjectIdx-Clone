import express from 'express';
import { pingCheck } from '../../controllers/pingController.js';
import projectRouter from './projects.js'
import { getDataFromFile } from '../../utils/getDataFromFile.js';

const router = express.Router();

router.use('/ping', pingCheck)

router.use('/projects', projectRouter );
router.post('/read', getDataFromFile )
export default router ;