const massUploadToS3 = (S3, directory, files)=>{
 const fs = require('fs'),
       os = require('os'),
       uploadFileToS3 = require('./uploadFileToS3'),
       { env } = require('./config');
 return new Promise( async (resolve,reject) => {
  try{
   //first read how many files are in the directory
   if (!files){
    //provide verbosity for running in development mode
    if (env==='dev'){ console.log("Development Mode: No files will actually be uploaded!"); }
    console.log("Pulling files to process from directory.");
    files = fs.readdirSync(directory);
    console.log(`Processing ${files.length} file${files.length===1 ? ``:`s`}`);
   }else if(files && files.length===0){
    console.log("Upload Complete!");
    return resolve();
   }
   //process a maximum in parallel based on the number of cpus or the least of files to process
   let splitThreads = Math.min( os.cpus().length, files.length);
   let multithread = [];
   //start at a positive countdown so as files are removed, we still maintain the pointer
   for ( let i=splitThreads; i--; ){
    //track the thread and invoke it
    multithread.push( uploadFileToS3(S3,directory,files[i]) );
    //remove the file from the files array
    files.splice(i,1);
   }
   await Promise.all(multithread);
   return massUploadToS3(S3, directory, files);
  }catch(e){
   console.error("Main Error: ", e);
   return reject();
  }
 });
};

module.exports = massUploadToS3;