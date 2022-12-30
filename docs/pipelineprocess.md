# Pipeline process
### *This is a represention of the steps of the CI/CD pipeline from pushing the code to Github until the app is available*

1- commit some changes on github this will trigger deployment pipeline

2- first step of pipeline is build (2jobs in parallel)
* pipeline try to build back-end by
    * install correct version of node.js
    * install app dependencies by using cache if exists or download them
    * call build script
    * call test script
* pipeline try to build front-end by 
    * install correct version of node.js
    * install app dependencies by using cache if exists or download them
    * call build script
    * call test script

3- approval step 
* this step requires build step to complect successfully to activate

4- deploying step 
* this step requires approval step to be truthly to launch
* pipeline ty to 
    * install correct version of node
    * install & configure aws cli
    * install & configure eb cli
    * build back-end 
    * build front-end
    * deploy fornt-end
    * deploy back-end