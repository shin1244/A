package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"tidy/backend/models"
)

type CompanyHandler struct {
	http.Handler
	db models.DBHandler
}

func (c *CompanyHandler) getCompanyHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("회사 리스트 요청 받음")
	rd.JSON(w, http.StatusOK, c.db.GetCompanies())
}

func (c *CompanyHandler) addCompanyHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("회사 추가 요청 받음")
	var company models.Company

	err := json.NewDecoder(r.Body).Decode(&company)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	rd.JSON(w, http.StatusCreated, c.db.AddCompany(&company))
}
