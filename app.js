const express = require("express");
var fs = require("fs");

const app = express();
const port = 9000;
const AdmZip = require("adm-zip");
var uploadDir = fs.readdirSync(__dirname + "/upload");

app.get("/", (req, res) => {
  const zip = new AdmZip();

  for (var i = 0; i < uploadDir.length; i++) {
    zip.addLocalFile(__dirname + "/upload/" + uploadDir[i]);
  }

  const downloadName = `Download_file.zip`;

  const data = zip.toBuffer();

  //   save zip file in root directory
  zip.writeZip(__dirname + "/" + downloadName);

  // code to download zip file

  res.set("Content-Type", "application/octet-stream");
  res.set("Content-Disposition", `attachment; filename=${downloadName}`);
  res.set("Content-Length", data.length);
  res.send(data);
});

app.listen(port, () => console.log(`Server started on port ${port}`));
