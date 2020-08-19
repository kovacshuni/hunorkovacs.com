# hunorkovacs.com

This is a personal, minimalistic HTML website about me. It was built for being deployed to Google App Engine as a very basic Go app. There is no back-end logic nor database below, it's just a few static pages and redirects.

Contains an animated comic book, built only with HTML5, CSS3 and small JavaScript, that part looks art-like and cool :)

[http://www.hunorkovacs.com](http://www.hunorkovacs.com)

## From scratch

* Install Go
* Install Google Cloud SDK
  - OS X: `brew cask install google-cloud-sdk`
* Install app-engine components: 
  - `gcloud components install app-engine-go`
* `gcloud init`, pay attention which account you sign in with.
* add `google-cloud-sdk/bin` to PATH in order for `dev_appserver.py` to work

* `gcloud projects create hunorkovacscom-123123`
* `gcloud config list`
* `gcloud app create`
* `gcloud app deploy app.yaml`

## Development

* Run local server: `dev_appserver.py .`
* Go to [localhost:8080](http://localhost:8080)

## Deploy to live

`gcloud app deploy app.yaml`
