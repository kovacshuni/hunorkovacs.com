package hunorkovacscom

import (
    "net/http"
		"html/template"
)

func init() {
    http.HandleFunc("/", handler)
}

func handler(w http.ResponseWriter, r *http.Request) {
		t, _ := template.ParseFiles("hunorkovacscom/akkastreams.html")
		t.Execute(w, nil)
		// http.Redirect(w, r, "https://www.youtube.com/watch?v=HY0K_X_WWRo", http.StatusMovedPermanently)
}
