#s3BulkUpload

> An asyncronous node program to upload a ton of media to an S3 bucket.
> Tested with over 300k images.

> Contact @MichaelLargent with any feedback.

## Setup

```bash
# Install dependencies (only 1 aws-sdk)
npm i

# Conduct a dry run to see what would be uploaded
npm run test

# Actually upload files to S3
npm run live
```