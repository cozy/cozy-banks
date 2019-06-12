#!/bin/bash
# This script is used to add ssh key

set -e

yarn secrets:decrypt
eval "$(ssh-agent -s)"
chmod 600 ./scripts/decrypted/id_rsa
ssh-add ./scripts/decrypted/id_rsa
