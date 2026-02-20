const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const conn = mongoose.connection.db;
    const bucket = new GridFSBucket(conn, { bucketName: 'images' });

    const uploadStream = bucket.openUploadStream(req.file.originalname, {
      contentType: req.file.mimetype,
    });

    uploadStream.on('error', (err) => {
      return res.status(500).json({ message: err.message });
    });

    uploadStream.on('finish', () => {
      const fileId = uploadStream.id && uploadStream.id.toString ? uploadStream.id.toString() : null;
      const filename = uploadStream.filename || req.file.originalname;
      return res.json({ fileId, filename });
    });

    // write the buffer and end the stream
    uploadStream.end(req.file.buffer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getImage = async (req, res) => {
  try {
    const { id } = req.params;
    const conn = mongoose.connection.db;
    const bucket = new GridFSBucket(conn, { bucketName: 'images' });

    const _id = new mongoose.Types.ObjectId(id);
    // Find file metadata first to set headers
    const filesColl = conn.collection('images.files');
    const fileDoc = await filesColl.findOne({ _id });
    if (!fileDoc) return res.status(404).json({ message: 'Image not found' });

    res.setHeader('Content-Type', fileDoc.contentType || 'application/octet-stream');
    if (fileDoc.filename) res.setHeader('Content-Disposition', `inline; filename="${fileDoc.filename}"`);

    const downloadStream = bucket.openDownloadStream(_id);
    downloadStream.on('error', (err) => {
      res.status(500).end();
    });
    downloadStream.pipe(res);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
