import React, { useState } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { TextInput, TouchableOpacity } from "react-native";
import { styles } from '../style';
import CompanyStackNavigator from "./Company/CompanyStackNavigator";
import WorkerScreen from "./Worker/WorkerScreen";
import OutSourceScreen from "./OutSource/OutSourceScreen";

const TabStack = createBottomTabNavigator();

const TabStackScreen = () => {
    const [searchText, setSearchText] = useState('');
    return (
        <TabStack.Navigator screenOptions={{
            headerTitleStyle: {fontSize:30},
            headerRight: () => <TextInput
            style={styles.searchInput}
            placeholder="검색"
            value={searchText}
            onChangeText={setSearchText}
        />
        }}>
            <TabStack.Screen name="시공사" component={CompanyStackNavigator} />
            <TabStack.Screen name="하도급" component={OutSourceScreen} />
            <TabStack.Screen name="근로자" component={WorkerScreen} />
        </TabStack.Navigator>
    )
}

export default TabStackScreen