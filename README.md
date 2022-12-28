# Web App AWS Hosting

## Features
* - Pipline using CircleCli
__________________________________________________________
## Infrastructure
* AWS RDS for the database
    ![db](./docs/images/aws-rds.png)
    
* AWS ElasticBeanstalk for the API
    ![eb](./docs/images/aws-eb.png)
    [Endpoint](http://storefront2-env.eba-v9zjpmhf.us-east-1.elasticbeanstalk.com/)
* AWS s3 for web hosting
    ![s3](./docs/images/aws-s3.png)
    [Endpoint](http://storefrontfront.s3-website-us-east-1.amazonaws.com/Orders)
    **note** after sign in or up go to home route and reload to refesh jwt
______________________________________________________
## Continuous Integration Pipeline with Github
*  pipeline file using config.yml  in ./.circleci folder

* screanshot of circleci projects

    ![cci-projects](./docs/images/cci-projects.png)

* screanshot of circleci deploying 

    ![cci-dp](./docs/images/cci-deploying.png)

* screanshot of circleci status in github

   ![cci-dp-status](./docs/images/cci-status.png)

* screanshot of environment variables in circleci 

    ![cci-env-ui](./docs/images/cci-env-ui.png)
* screanshot of environment variables in yml file 
    ![cci-env-yml](./docs/images/cci-env-yml.png)
    