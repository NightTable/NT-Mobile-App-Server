const aws = require("aws-sdk")
aws.config.update(
    {
        accessKeyId: "AKIA3VH5X5YSX3KUF4DS ",
        secretAccessKey: "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",
        region: "us-east-2"
    }
)

let uploadFile =  (file) => {
    return new Promise( function(resolve,reject) {
        
        let s3 = new aws.S3({ apiVersion: "2006-03-01" })
        var uploadParams = {
            // ACL: "public-read",
            Bucket: "testdevphotos",
            Key:  file.originalname, 
            Body: file.buffer
        }
    s3.upload(uploadParams,  function (err, data) {
            if (err) { 
                return reject({ "error": err }) 
            }
            console.log(" file uploaded succesfully ")
            return resolve(data.Location) 
        }
        )
    }
    )
}

module.exports = {uploadFile}