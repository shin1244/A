package handlers

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"tidy/backend/models"

	"github.com/gorilla/mux"
)

type CompanyHandler struct {
	http.Handler
	db models.DBHandler
}

func (c *CompanyHandler) getCompaniesHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("회사 리스트 요청 받음")
	rd.JSON(w, http.StatusOK, c.db.GetCompanies())
}

func (c *CompanyHandler) getCompanyHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	idStr := vars["id"]
	fmt.Println(idStr)
	fmt.Println("회사 상세 페이지 요청 받음")
}

func (c *CompanyHandler) addCompanyHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("회사 추가 요청 받음")
	var company models.Company

	company.CompanyName = r.FormValue("company_name")
	company.CompanyAddress = r.FormValue("company_address")
	company.CompanyBuilding = r.FormValue("company_building")
	companyYear, err := strconv.Atoi(r.FormValue("company_year"))
	if err != nil {
		http.Error(w, "잘못된 연도 형식", http.StatusBadRequest)
		return
	}
	company.CompanyYear = companyYear

	fileName, err := saveCompanyLogo(r, company.CompanyName)
	if err != nil {
		http.Error(w, "잘못된 파일 형식", http.StatusBadRequest)
		return
	}
	company.CompanyLogo = fileName

	rd.JSON(w, http.StatusCreated, c.db.AddCompany(&company))
}

func saveCompanyLogo(r *http.Request, name string) (string, error) {
	file, header, err := r.FormFile("company_logo")
	if err != nil {
		return "", err
	}
	defer file.Close()

	ext := filepath.Ext(header.Filename)
	fileName := name + "_logo" + ext

	// 파일을 디스크에 저장 (uploads 폴더에 저장)
	dst, err := os.Create(filepath.Join("./uploads", fileName))
	if err != nil {
		return "", err
	}
	defer dst.Close()

	_, err = io.Copy(dst, file)
	if err != nil {
		return "", err
	}

	return fileName, nil
}

// func (c *CompanyHandler) addCompanyHandler(w http.ResponseWriter, r *http.Request) {
// 	fmt.Println("회사 추가 요청 받음")
// 	var company models.Company

// 	err := json.NewDecoder(r.Body).Decode(&company)
// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusBadRequest)
// 		return
// 	}
// 	fmt.Println("디코딩 성공")
// 	rd.JSON(w, http.StatusCreated, c.db.AddCompany(&company))
// }
