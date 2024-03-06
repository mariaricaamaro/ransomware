const fs = require('fs');
const path = require('path');
const encryptor = require('file-encryptor');

const key = 'amaro';
const inputFolder = './Text';

fs.readdir(inputFolder, (err, files) => {
  if (err) {
    console.error('Error reading input folder:', err);
    return;
  }

  files.forEach(file => {
    const inputFilePath = path.join(inputFolder, file);
    const outputFilePath = path.join(inputFolder, `${file}_encrypted`);

    encryptor.encryptFile(inputFilePath, outputFilePath, key, function(err) {
      if (err) {
        console.error(`Encryption error for ${file}:`, err);
      } else {
        console.log(`Encryption complete for ${file}.`);

        fs.unlink(inputFilePath, (err) => {
          if (err) {
            console.error(`Error deleting ${file} after encryption:`, err);
          } else {
            console.log(`Deleted original file ${file} after encryption.`);
          }
        });
      }
    });
  });
});
