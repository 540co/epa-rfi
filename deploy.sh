#!/bin/bash

if [ "$TRAVIS_PULL_REQUEST" = "false" ]; then
  if [ "$TRAVIS_BRANCH" = "develop" ]; then
    curl -k -X POST -d "api_key=$DEPLOY_KEY_DEV" "$DEPLOY_HOST_DEV/deploy/frontend.php"
  elif [ "$TRAVIS_BRANCH" = "master" ]; then
    curl -k -X POST -d "api_key=$DEPLOY_KEY_PROD" "$DEPLOY_HOST_PROD/deploy/frontend.php"
  fi
fi
