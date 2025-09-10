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
* (optional) add `google-cloud-sdk/bin` to PATH

## Initiate project from scratch

Only do this if you need to recreate the app in the cloud

* `gcloud projects create hunorkovacscom-123123`
* `gcloud config list`
* `gcloud app create`
* `gcloud app deploy app.yaml`

## Local development

* Run local server: `go run hunorkovacscom.go`
* Go to [localhost:8080](http://localhost:8080)

## Deploy to live

`gcloud app deploy app.yaml`
