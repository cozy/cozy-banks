set -e

echo 'Build www' && echo 'travis_fold:start:build_www\\r'
yarn build:mobile
echo 'travis_fold:end:build_www\\r'

echo 'Build apk' && echo 'travis_fold:start:build_apk\\r'
yarn mobile:clean
(cd src/targets/mobile && ../../../node_modules/.bin/cordova prepare android)
(cd src/targets/mobile && ../../../node_modules/.bin/cordova build android --release)
echo 'travis_fold:end:build_apk\\r'
