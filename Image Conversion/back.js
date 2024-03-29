const Jimp = require('jimp');
const JSZip = require("JSzip");
const fileSave = require("file-saver");
const fs = require('fs');



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
Jimp.read(testFile) // This will be the file that is caught by the User upload
    .then(image => {
        const zipAdd = "/zipped";

        //creates a foler if there isn't a foler
        try {
            if (!fs.existsSync(zipAdd)) {
                fs.mkdirSync(zipAdd)
            }
        } catch (err) {
            console.error(err);
        }

        //Converts all of the files
        const gifOutput = "./zipped/output_gif.gif"
        const pngOutput = "./zipped/output_png.png"
        const jpgOutput = './zipped/output_jpg.jpg';

        //writes the converted images into a folder
        image.writeAsync(pngOutput);
        image.writeAsync(gifOutput);
        image.writeAsync(jpgOutput);


        const zip = new JSZip();
        var outputFolder = zip.folder("images");

        outputFolder.file("gifOutput", imgData, {base64: true});
        outputFolder.file("pngOutput", imgData, {base64: true});
        outputFolder.file("jpgOutput", imgData, {base64: true});

        zip.generateAsync({ type: "blob" })
            .then(function (content) {
                // see FileSaver.js
                saveAs(content, "example.zip");
            });


        return  // change the output format as neeed

    })
    .then(() => console.log("Image Conversion Successful"))
    .catch(err => console.error("Error:", err));
