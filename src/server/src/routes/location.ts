/** source/routes/posts.ts */
import express from 'express';
import controller from '../controllers/location';
const router = express.Router();

router.get('/location', controller.getPosts);
router.get('/details', controller.getPost);

export = router;