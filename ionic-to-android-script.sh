#! /bin/bash



ng build || npm install @ionic-native/core --save # || esegue il secondo comando se il primo ha dato errore
ng build

npm install @capacitor/core
npm install --save --legacy-peer-deps
npm install @ionic-native/core --save

ionic capacitor add android

npm install jetifier
npx jetify

npx cap sync android

npx cap init

ionic capacitor copy android

ionic cap open android

cd android

#./gradlew genera l'apk, ma poi non funziona sul telefono
./gradlew  assembleRelease # per far funzionare questo comando è necessario
# che sia presente il file local.properties e che java sia installato correttamente.
# Per installare java correttamente guarda: https://www.azul.com/downloads/?package=jdk
# che scarica un software che setta tutto java per bene
#git add .
#git commit -m "Modified android"
#git push origin master
