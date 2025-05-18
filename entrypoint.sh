#!/bin/bash 
yarn 
yarn knex migrate:latest
yarn build 
yarn start 