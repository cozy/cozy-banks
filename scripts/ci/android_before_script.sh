#!/bin/bash
# This script is used to initialize android

set -e

yes | sdkmanager "platforms;android-27" # see https://github.com/travis-ci/travis-ci/issues/8874#issuecomment-350350607
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install nodejs
sudo apt-get install build-essential
yarn
yarn mobile:icon
yarn secrets:decrypt
ln -s ../../../scripts/decrypted/keys ./src/targets/mobile/keys
gem update --system
rvm install 2.6.0
gem install bundler
