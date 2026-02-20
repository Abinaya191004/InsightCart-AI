const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadImage, getImage } = require('../controllers/image.controller');

// store file in memory and stream into GridFS
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.single('file'), uploadImage);
router.get('/:id', getImage);

module.exports = router;
