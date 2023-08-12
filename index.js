const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express();

const filesFolder = path.join(__dirname, 'files');
if (!fs.existsSync(filesFolder)) {
  fs.mkdirSync(filesFolder);
}

// Endpoint to create a text file with the current timestamp
app.get("/createFile",(req,res) => {
      const timestamp = new Date()
      const currentDate = timestamp.getDate();
      const Month = timestamp.getMonth();
      const Year = timestamp.getFullYear();
      const Hrs = timestamp.getHours();
      const Min = timestamp.getMinutes();
      const filename = `${currentDate}-${Month+1}-${Year}-${Hrs}-${Min}.txt`;
      
      console.log(filename)

      fs.writeFile(`files/${filename}` ,timestamp.toISOString(),(err)=> {
          if(err){
            console.log(err)
            return res.status(500).send("Error Occured While Creating the File")
          }
          res.send("File Created Successfully")
      })
    
})


// Endpoint to retrieve all text files in the 'files' folder
app.get('/getAllFiles', (req, res) => {
   
    fs.readdir(filesFolder, (err, files) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error reading folder.');
      }
      res.json(files);
    });
  });


app.listen(8000,()=>{console.log(`The server is running`)})

