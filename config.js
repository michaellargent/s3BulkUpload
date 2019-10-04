const config = {
 env: process.env.NODE_ENV === 'dev' ? 'dev' : 'prod',
 
 //make sure whichever IAM user has S3 write permissions
 accessKeyId: "",
 secretAccessKey: "",

 region: "us-west-1",
 Bucket: "",
 StorageClass: "Standard",
 ACL: "public-read",

 //be sure to add the trailing slash for a directory
 localDirToUpload: "",

 //allowable files to upload (this is useful if you have media mixed with other file types)
 //filterFileTypes: jpg, jpeg, png, gif, mp3, ogg, mp4, webm, pdf
 //defining it as a blank array "[]", will upload everything in the localDirToUpload
 filterFileTypes: ["jpg", "jpeg", "png", "gif" ]
};

module.exports = config;