package handlers

import (
	"net/http"
	"tidy/backend/models"

	"github.com/gorilla/mux"
	"github.com/unrolled/render"
)

var rd *render.Render = render.New()

func MakeHandler() *CompanyHandler {
	r := mux.NewRouter()
	c := &CompanyHandler{
		Handler: r,
		db:      models.NewDBHandler(),
	}

	r.HandleFunc("/companies", c.getCompanyHandler).Methods("GET")
	r.HandleFunc("/companies", c.addCompanyHandler).Methods("POST")
	r.PathPrefix("/uploads/").Handler(http.StripPrefix("/uploads/", http.FileServer(http.Dir("uploads/"))))

	return c
}
