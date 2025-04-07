package models

import (
	"database/sql"
	"os"

	_ "github.com/go-sql-driver/mysql"
)

type sqlHandler struct {
	db *sql.DB
}

func (s *sqlHandler) GetCompanies() []*Company {
	companies := []*Company{}
	rows, err := s.db.Query("SELECT * FROM company_table")
	if err != nil {
		panic(err)
	}
	var temp string
	for rows.Next() {
		company := &Company{}
		err := rows.Scan(&company.CompanyID, &company.CompanyName, &company.CompanyYear, &company.Rating, &temp, &company.CompanyAddress, &company.CompanyBuilding)
		if err != nil {
			panic(err)
		}
		company.CompanyLogo = "http://211.114.210.110:3000/uploads/" + temp
		companies = append(companies, company)
	}

	return companies
}

func (s *sqlHandler) AddCompany(company *Company) *Company {
	rst, err := s.db.Exec(
		"INSERT INTO company_table (company_name, company_year, avgrating, company_logo, company_address, company_building) VALUES (?, ?, ?, ?, ?, ?)",
		company.CompanyName, company.CompanyYear, company.Rating, company.CompanyLogo, company.CompanyAddress, company.CompanyBuilding)
	if err != nil {
		panic(err)
	}

	id, _ := rst.LastInsertId()

	company.CompanyID = int(id)

	return company
}

func (s *sqlHandler) RemoveCompany(id int) bool {
	rst, err := s.db.Exec("DELETE FROM company WHERE company_id=?", id)
	if err != nil {
		panic(err)
	}
	cnt, _ := rst.RowsAffected()

	return cnt > 0
}

func (s *sqlHandler) Close() {
	s.db.Close()
}

func newMySqlHandler() DBHandler {
	dsn := os.Getenv("DB_DSN")
	database, err := sql.Open("mysql", dsn)
	if err != nil {
		panic(err)
	}
	return &sqlHandler{db: database}
}
