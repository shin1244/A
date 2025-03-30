package handlers

import (
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

	return c
}
