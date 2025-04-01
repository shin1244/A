package handlers

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
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

	company.CompanyName = r.FormValue("company_name")
	companyYear, err := strconv.Atoi(r.FormValue("company_year"))
	if err != nil {
		http.Error(w, "잘못된 연도 형식", http.StatusBadRequest)
		return
	}
	company.CompanyYear = companyYear

	// 파일 처리
	file, header, err := r.FormFile("company_logo")
	if err != nil {
		http.Error(w, "파일 받기 실패", http.StatusBadRequest)
		return
	}
	defer file.Close()

	ext := filepath.Ext(header.Filename)
	fileName := "company_logo" + ext

	// 파일을 디스크에 저장 (uploads 폴더에 저장)
	dst, err := os.Create(filepath.Join("./uploads", fileName))
	if err != nil {
		fmt.Println(err)
		http.Error(w, "파일 저장 실패", http.StatusInternalServerError)
		return
	}
	defer dst.Close()

	_, err = io.Copy(dst, file)
	if err != nil {
		fmt.Println(err)
		http.Error(w, "파일 복사 실패", http.StatusInternalServerError)
		return
	}

	fmt.Println("파일 제작 완료")

	rd.JSON(w, http.StatusCreated, c.db.AddCompany(&company))
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
