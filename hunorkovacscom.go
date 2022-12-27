package main

import (
    "log"
    "net/http"
    "os"
)

func main() {
    http.HandleFunc("/", handler)
    http.HandleFunc("/somethingspecial123", handler)
	http.HandleFunc("/THEVASTATLANTIC", handler)
	http.HandleFunc("/HUNORIIKOVACSPFA", handler)

    port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Printf("Listening on port %s", port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatal(err)
	}
}

func handler(w http.ResponseWriter, r *http.Request) {
    w.WriteHeader(http.StatusOK)
}
