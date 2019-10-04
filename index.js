const AWS = require('aws-sdk'),
      massUploadToS3 = require('./massUploadToS3'),
      {
       accessKeyId, secretAccessKey, region,
       Bucket, StorageClass, ACL,
       localDirToUpload
      } = require('./config');

//sanity check
if (!accessKeyId || accessKeyId===''){ throw "Missing AWS accessKeyId from config.js"; }
if (!secretAccessKey || secretAccessKey===''){ throw "Missing AWS secretAccessKey from config.js"; }
if (!region || region===''){ throw "Missing AWS region from config.js"; }
if (!Bucket || Bucket===''){ throw "Missing AWS Bucket from config.js"; }
if (!StorageClass || StorageClass===''){ throw "Missing AWS StorageClass from config.js"; }
if (!ACL || ACL===''){ throw "Missing AWS File Access Levels 'ACL' from config.js"; }
if (!localDirToUpload || localDirToUpload===''){ throw "Missing Local directory path of files to upload 'localDirToUpload' from config.js"; }

AWS.config.update({
 accessKeyId,
 secretAccessKey,
 region
});
const S3 = new AWS.S3();

massUploadToS3(S3, localDirToUpload);