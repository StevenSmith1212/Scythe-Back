const Jimp = require('jimp');
const JSzip = require('jszip');
const fileSave = require("file-saver");
const zip = new JSzip();
const fs = requires('fs'); 

const testFile = './test1.png'

// taking the origin image 



// document.getElementById(/*ElementID */'fileInput').addEventListener('change', function (event) {
//     const file = event.target.files[0]; // Get the selected file

//     //
//     if (file) {
//         const imageFile = new Image();
//         imageFile.src = URL.createObjectURL(file);
//         imageFile.onload = function () {
//             console.log("Image captured");
//         };

//         console.log("Image File:", imageFile);
//     } else {
//         console.error("No File Selected");
//     }
// });

// Load the image
Jimp.read(testFile)
    .then(image => {
        //Converts all of the files
        const gifOutput = "./output.gif"
        const pngOutput = "./output.png"
        const jpgOutput = './output.jpg';

        image.writeAsync(pngOutput);
        image.writeAsync(gifOutput);
        image.writeAsync(jpgOutput);

        zip.file(gifOutput)
        zip.file(pngOutput)
        zip.file(jpgOutput)

        zip.generateAsync({ type: "blob" })
            .then(content => {
                saveAs(content, "myZip.zip");
                console.log("Zipped");
                return 
            })
            .catch(error => {
                console.error('Error:', error)
            });

        return  // change the output format as neeed

    })
    .then(() => console.log("Image Conversion Successful"))
    .catch(err => console.error("Error:", err));
