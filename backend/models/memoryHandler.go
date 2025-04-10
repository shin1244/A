package models

type memoryHandler struct {
	companyMap map[int]*Company
}

func (m *memoryHandler) GetCompanies() []*Company {
	list := []*Company{}
	for _, v := range m.companyMap {
		list = append(list, v)
	}
	return list
}

func (m *memoryHandler) AddCompany(company *Company) *Company {
	id := len(m.companyMap) + 1
	company.CompanyID = id
	m.companyMap[id] = company
	return company
}

func (m *memoryHandler) RemoveCompany(id int) bool {
	if _, ok := m.companyMap[id]; ok {
		delete(m.companyMap, id)
		return true
	} else {
		return false
	}
}

func (m *memoryHandler) Close() {

}

func (m *memoryHandler) GetCompany(id int) *Company {
	return m.companyMap[id]
}

func newMemoryHandler() DBHandler {
	m := &memoryHandler{}
	m.companyMap = make(map[int]*Company)
	return m
}
