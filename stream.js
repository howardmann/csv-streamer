// EXAMPLE 5. STREAM READ AND WRITE DATA USING PIPE SHORTHAND
var fs = require('fs');
var readStream = fs.createReadStream('./read/input.csv');
var writeStream = fs.createWriteStream('./write/output.csv');
var csv = require('csv-parser');
var axios = require('axios');

readStream
  .pipe(csv())
  .on('data', function(data){
    let path = data.path;
    let prefix = "ROOTURL"
    let url = prefix + path;
    axios.get(url)
      .then(function(resp){
        let statusCode = resp.status;
        let msg = `${url},${statusCode}\n`;
        console.log(msg);
        writeStream.write(msg);
      })
      .catch(err => {
        let statusCode = err.response.status;
        let msg = `${url},${statusCode}\n`;
        console.log(msg);
        writeStream.write(msg);
      })
  })
  .on('end', function(){
    console.log('ended');
  })

