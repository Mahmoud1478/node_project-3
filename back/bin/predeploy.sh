npm run clear 
npm run build 
cp -r ./.npmrc ./package.json ./Procfile ./package-lock.json ./.elasticbeanstalk dist
# cd dist 
# zip -r Archive.zip .
# cd ..