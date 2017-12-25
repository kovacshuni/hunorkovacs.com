package hunorkovacscom

import (
    "net/http"
)

func init() {
    http.HandleFunc("/", handler)
}

func handler(w http.ResponseWriter, r *http.Request) {
}
