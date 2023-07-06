const aws = require("aws-sdk");
aws.config.update({
  accessKeyId: "AKIA3VH5X5YSX3KUF4DS ",
  secretAccessKey: "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",
  region: "us-east-2",
});

let uploadFile = (file, id) => {
  return new Promise(function (resolve, reject) {
    let s3 = new aws.S3({ apiVersion: "2006-03-01" });
    var params = {
      Bucket: "testdevphotos",
      Key: id.toString()+ "/" + file.originalname,
    };

    s3.headObject(params, function (err, data) {

      if (!err) {
        // If file exists, return its link
        console.log(
          "File exists. Link: " //+ s3.getUri("getObject", params)
        );
        console.log(`https://${params.Bucket}.s3.amazonaws.com/${params.Key}`);
        return resolve(`https://${params.Bucket}.s3.amazonaws.com/${params.Key}`);
      } else {
        // If file does not exist, upload the file
        // var file = file;
        var uploadParams = {
          Bucket: "testdevphotos",
          // ACL: "public-read",
          Key: id.toString()+ "/" + file.originalname,
          Body: file.buffer,
        };
        s3.upload(uploadParams, function (err, data) {
          if (!err) {
            console.log(
              "File uploaded successfully. Link: " +
                JSON.stringify(data.Location)
            );
            return resolve(data.Location);
          } else {
            console.log("File upload failed. Error: " + err);
          }
        });
      }
    });
  });
};


module.exports = { uploadFile };
