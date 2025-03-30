package models

type Company struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Year  int    `json:"year"`
	Image []byte `json:"image"`
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
