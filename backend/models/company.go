package models

type Company struct {
	CompanyID   int     `json:"company_id"`
	CompanyName string  `json:"company_name"`
	CompanyYear int     `json:"company_year"`
	Rating      float32 `json:"rating"`
	CompanyLogo []byte  `json:"company_logo"`
}

type DBHandler interface {
	GetCompanies() []*Company
	AddCompany(company *Company) *Company
	RemoveCompany(id int) bool
	Close()
}

func NewDBHandler() DBHandler {
	return newMySqlHandler()
}
