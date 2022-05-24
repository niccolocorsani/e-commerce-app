#! /bin/bash


sudo gem install cocoapods
brew install ios-deploy

npm install @capacitor/core
npm install --save --legacy-peer-deps
npm install @ionic-native/core --save

ionic capacitor add ios

npm install jetifier
npx jetify

npx cap sync ios

npx cap init

ionic capacitor copy ios

ionic capacitor open ios



