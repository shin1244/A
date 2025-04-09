import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useEffect, useState  } from 'react';
import { styles } from '../../style';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import axios from "axios"

interface Company {
  company_name: string;
  company_year: number;
  rating: number;
  company_logo: string;
  company_address: string;
  company_building: string;
}



function CompanyMain() {
  const [companies, setCompanies] = useState<Company[]>([]);

  const navigation = useNavigation();

  useEffect(() => {
    axios.get("http://14.53.217.16:3000/companies")
      .then(res => {setCompanies(res.data)})
      .catch(error => {
        console.log(error)
      })
      console.log(companies)
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
  const navigation = useNavigation();
  return (
    companies.map((company, index) => (
      <TouchableOpacity 
      key={index} 
      onPress={() => navigation.navigate('CompanyDetail', { companyId: company.id })}
      style={styles.CompanyList}>
        <Image source={{ uri: company.company_logo }} style={styles.logo} />
        
        <View style={styles.middleSection}>
          <Text style={styles.companyName}>{company.company_name}</Text>
          <View style={styles.ratingRow}>
            <Text style={styles.star}>⭐</Text>
            <Text style={styles.ratingText}>{company.rating}</Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoText}>{company.company_address}</Text>
          <Text style={styles.infoText}>{company.company_year}</Text>
          <Text style={styles.infoText}>{company.company_building}</Text>
        </View>
      </TouchableOpacity>
    ))
  );
};


export default CompanyMain;