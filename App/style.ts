import {StyleSheet} from 'react-native';
import Constants from 'expo-constants';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: Constants.statusBarHeight,
    },
    CompanyList: {
      backgroundColor: "#8a8a8a",
      marginBottom: 10,
      padding: 20,
      borderRadius: 15,
      flexDirection: "row",
      alignItems: "center",
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
      flex: 1, 
      height: 40,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      paddingHorizontal: 10,
      marginLeft: 20, 
      marginRight: 10
    },
    addButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
    },
    logo: {
      width: 80,
      height: 80,
      borderRadius: 10,
      marginRight: 15,
    },

    middleSection: {
      flex: 1,
      justifyContent: "center",
    },
    
    companyName: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 5,
    },
    
    ratingRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    
    star: {
      fontSize: 16,
      marginRight: 4,
    },
    
    ratingText: {
      fontSize: 16,
      fontWeight: "500",
    },
    
    infoSection: {
      alignItems: "flex-end",
    },
    
    infoText: {
      fontSize: 14,
      fontWeight: "bold",
      marginBottom: 4,
    },
  });