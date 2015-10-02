package hunorkovacscom

import (
    "net/http"
		// "html/template"
)

func init() {
    http.HandleFunc("/", handler)
}

func handler(w http.ResponseWriter, r *http.Request) {
		// t, _ := template.ParseFiles("hunorkovacscom/reactivestreams.html")
		// t.Execute(w, nil)
		http.Redirect(w, r, "https://www.youtube.com/watch?v=TZ4aSx7T3r8", http.StatusMovedPermanently)
}
