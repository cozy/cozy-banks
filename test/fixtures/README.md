This fixtures contains bank operations linked to files.

It will create a directory in your Cozy.

```
Fichiers_de_démo/
├── Free mobile
│   ├── Demo_cozy-freemobile_15082017.pdf
│   └── Demo_cozy-freemobile_15092017.pdf
├── MAIF
│   └── Demo_cozy-Appel_cotisation_MAIF_2017.pdf
└── Partagé par Geneviève
    └── Bouygues Telecom
        ├── Demo_cozy-Bouygues_Telecom_30072017.pdf
        └── Demo_cozy-Bouygues_Telecom_30082017.pdf
```

Usage
=====

```
ACH import demo.json helpers/index.js
```

Other fixtures
==============

The reference file is `demo.json`. Other files should follow it.

`fixtures-l.json` and `fixtures-m.json` are there if you want to 
test performance issue https://github.com/cozy/cozy-banks/blob/master/docs/perfs.md

There are also more focused files that can be used to test specific usecases. See:

* [Matching service](matching-service/README.md)
* [Notifications service](notifications-service/README.md)
