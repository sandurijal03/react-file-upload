import express, { response } from 'express';
import fileUpload from 'express-fileupload';

const app = express();

const startServer = async () => {
  try {
    app.use(fileUpload());

    app.post('/upload', (req, res, next) => {
      if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
      }

      const file = req.files.file;

      file.mv(`${__dirname}/../client/public/uploads/${file.name}`, (err) => {
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        }
        return res.json({
          fileName: file.name,
          filePath: `/uploads/${file.name}`,
        });
      });
    });

    const port = process.env.PORT || 3001;
    app.listen(port, () => console.log(`listening to server on port ${port}`));
  } catch (err) {
    console.log(err);
  }
};

startServer();
