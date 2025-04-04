import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import CompanyStackNavigator from "./Company/CompanyStackNavigator";
import WorkerScreen from "./Worker/WorkerScreen";
import OutSourceScreen from "./OutSource/OutSourceScreen";

const TabStack = createBottomTabNavigator();

const TabStackScreen = () => {
    return (
        <TabStack.Navigator screenOptions={{headerShown: false}}>
            <TabStack.Screen name="시공사" component={CompanyStackNavigator} />
            <TabStack.Screen name="하도급" component={OutSourceScreen} />
            <TabStack.Screen name="근로자" component={WorkerScreen} />
            <TabStack.Screen name="프로필" component={WorkerScreen} />
        </TabStack.Navigator>
    )
}

export default TabStackScreen