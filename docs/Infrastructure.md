# Infrastructure 

### **What services (from AWS) your project needs to run?** 

* it is a bad practice to use aws root account so we need some control of permissions , this lead us to first service `IAM` service . so make iam user for aws-cli to deploy the app
* `RDS` service to host our postgres db
* `Elasticbeanstalk` service to host our back-end app
* `S3` service to host our front-end app
* `CirclieCi` it is't from aws but it impotant for automate and creation of pipeline deployment process