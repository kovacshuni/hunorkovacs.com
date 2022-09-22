# hunorkovacs.com

This is a minimalistic, personal HTML website. 

[http://www.hunorkovacs.com](http://www.hunorkovacs.com)

## Install dependencies

* Install Go
* Install Google Cloud SDK
  - OS X: `brew cask install google-cloud-sdk`
* Install app-engine components: 
  - `gcloud components install app-engine-go`
* `gcloud init`, pay attention which account you sign in with.
* add `google-cloud-sdk/bin` to PATH
* Install Python 2, dev_appserver.py still requires it
  - `brew install pyenv`
  - `pyenv install 2.7.18`
* Set Python2 for your workspace
  - `pyenv local 2.7.18`

## Initiate project from scratch

Only do this if you need to recreate the app in the cloud

* `gcloud projects create hunorkovacscom-123123`
* `gcloud config list`
* `gcloud app create`
* `gcloud app deploy app.yaml`

## Local development

You need `google-cloud-sdk/bin` in your PATH in order for `dev_appserver.py` to work

* Run local server: `python2 /opt/homebrew/Caskroom/google-cloud-sdk/latest/google-cloud-sdk/bin/dev_appserver.py .`
* Go to [localhost:8080](http://localhost:8080)

## Deploy to live

`gcloud app deploy app.yaml`
