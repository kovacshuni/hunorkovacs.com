package main

import (
	"log"
	"net/http"
	"os"
)

func main() {
	// Serve static files
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))

	// Serve specific HTML pages
	http.HandleFunc("/", serveHome)
	http.HandleFunc("/THEVASTATLANTIC", serveVastAtlantic)
	http.HandleFunc("/HUNORIIKOVACSPFA", serveHunorPFA)
	http.HandleFunc("/snow", serveSnow)
	http.HandleFunc("/bmw", serveBMW)
	http.HandleFunc("/somethingspecial123", handler)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Printf("Listening on port %s", port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatal(err)
	}
}

func serveHome(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		http.NotFound(w, r)
		return
	}
	http.ServeFile(w, r, "index.html")
}

func serveVastAtlantic(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "thevastatlantic.html")
}

func serveHunorPFA(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "hunoriikovacspfa.html")
}

func serveSnow(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "snow.html")
}

func serveBMW(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "bmw-x3.html")
}

func handler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
}
