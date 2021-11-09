# Credentials

All credentials are encrypted in an archive file in
`scripts/encrypted.tar.gz.enc`.

## Create encrypted file

```sh
tar zcvf scripts/decrypted.tar.gz scripts/decrypted/
travis encrypt-file scripts/decrypted.tar.gz scripts/encrypted.tar.gz.enc -p
```

You should save `key` and `iv` variables on pass.

```sh
pass Gangsters/cozy-banks/ENCRYPTED_KEY
pass Gangsters/cozy-banks/ENCRYPTED_IV
```

## Decrypt file

```sh
export ENCRYPTED_KEY=`pass Gangsters/cozy-banks/ENCRYPTED_KEY`
export ENCRYPTED_IV=`pass Gangsters/cozy-banks/ENCRYPTED_IV`
yarn secrets:decrypt
```

## Update encrypt file

If you want to update the credentials, you should update folder
`./scripts/decrypted` and launch these commands:

```sh
export ENCRYPTED_KEY=`pass Gangsters/cozy-banks/ENCRYPTED_KEY`
export ENCRYPTED_IV=`pass Gangsters/cozy-banks/ENCRYPTED_IV`
yarn secrets:encrypt
```
