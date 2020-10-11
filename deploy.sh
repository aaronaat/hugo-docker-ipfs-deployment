#!/bin/bash
node get-hubble-content.js
node get-spitzer-content.js
hugo
export IPFS_DEPLOY_PINATA__API_KEY=
export IPFS_DEPLOY_PINATA__SECRET_API_KEY=
ipd -p pinata
