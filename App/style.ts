import {StyleSheet} from 'react-native';
import Constants from 'expo-constants';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: Constants.statusBarHeight,
    },
    CompanyList: {
      backgroundColor: "#5C5C60",
      marginBottom : 10,
      paddingVertical: 20,
      paddingHorizontal: 40,
      borderRadius: 15,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between"
    },
    companyText:{
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
    },
    title: {
      marginLeft: 10,
      fontSize: 30 ,
      fontWeight: "600",
    },
    searchInput: {
      flex: 1, // 추가: 검색창이 남은 공간을 채우도록 설정
      height: 40,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      paddingHorizontal: 10,
      marginLeft: 20, // 추가: 제목과의 간격 설정
      marginRight: 10
    },
    addButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
    },
    logo: {
      width:80, 
      height:80,
    }
  });