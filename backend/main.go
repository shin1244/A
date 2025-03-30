package main

import (
	"fmt"
	"net/http"
	"tidy/backend/handlers"

	"github.com/rs/cors"
)

func main() {
	m := handlers.MakeHandler()
	corsHandler := cors.Default().Handler(m)

	fmt.Println("Started Server")
	err := http.ListenAndServe(":3000", corsHandler)
	if err != nil {
		panic(err)
	}
}
