const uploadFileToS3 = (S3Instance,directory,file)=>{
 const fs = require('fs'),
       fileTypeMapping = require('./filetypeMapping'),
       {env, filterFileTypes, Bucket, ACL, StorageClass} = require('./config');
 return new Promise( async(resolve,reject)=>{
  // console.log(`Uploading ${file}`);
  let fileType = ( file.slice(file.lastIndexOf('.')+1, file.length) ).toLowerCase();
  //if filterFileTypes is not a blank array and the filetype is not allowed, skip it
  if ( filterFileTypes.length>0 && !filterFileTypes.includes(fileType) ){
   console.log(`Skipping File Upload for ${file}.`);
   return resolve();
  }
  //process dev mode
  if (env==='dev'){
   console.log(`File to upload: ${file}`);
   return resolve();
  }
  let ContentType = (fileTypeMapping[fileType] ? fileTypeMapping[fileType] : 'application/octet-stream' );
  let Body = fs.createReadStream(directory + file);
  S3Instance.upload({
   Bucket,
   ContentType,
   CacheControl: 'max-age=31104000',
   ACL,
   StorageClass,
   Key: file,
   Body
  }, async(err,data)=>{
   if (err) {
    console.error(`File Upload Error [${file}]:`, err);
    return reject();
   }
   console.log(`File Uploaded Successfully ${file}`);
   return resolve();
  });
 });
};

module.exports = uploadFileToS3;