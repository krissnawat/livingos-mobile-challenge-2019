/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import { createStackNavigator, createAppContainer } from "react-navigation";
import Weather from "./Weather";
import City from "./City";

const AppNavigator = createStackNavigator(
  {
    Weather: {
      screen: Weather
    },
    City: {
      screen: City
    }
  },
  {
    initialRouteName: "Weather"
  }
);
export default createAppContainer(AppNavigator);
