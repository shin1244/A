import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useEffect, useState  } from 'react';
import { styles } from '../../style';
import { useNavigation } from '@react-navigation/native';
import { Float } from 'react-native/Libraries/Types/CodegenTypes';
import { Ionicons } from '@expo/vector-icons';
import axios from "axios"

interface Company {
  company_name: string;
  company_year: number;
  rating: Float;
  company_logo: Blob;
}

function CompanyMain() {
  const [companies, setCompanies] = useState<Company[]>([]);

  const navigation = useNavigation();

  useEffect(() => {
    axios.get("http://222.101.3.77:3000/companies")
      .then(res => {setCompanies(res.data)})
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView>
      <CompanyList companies={companies} />
      </ScrollView>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('CompanyAdd')}
      >
        <Ionicons name="add-circle" size={50} color="blue" />
      </TouchableOpacity>
    </View>
  );
}

const CompanyList = ({ companies }: { companies: Company[] }) => {
  console.log(companies)
  return (
    companies.map((company, index) => (
      <TouchableOpacity
        key={index}
        style={styles.CompanyList}
      >
        <Text style={styles.companyText}>{company.company_name}</Text>
        <Text style={styles.companyText}>{company.company_year}</Text>
        <Text style={styles.companyText}>{company.rating}</Text>
      </TouchableOpacity>
    ))
  );
};

export default CompanyMain;