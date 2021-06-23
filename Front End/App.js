import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/screens/HomeScreen";
import Settings from "./src/screens/Settings";
import DetailedData from "./src/screens/DetailedData";
//import Regions from "./src/screens/Regions";
import Report from "./src/screens/Report";
import Search from "./src/screens/Search";
import FeatureRequest from "./src/screens/FeatureRequest";
import CityData from "./src/screens/CityData";

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Settings: Settings,
    DetailedData: DetailedData,
    Search: Search,
    //Regions: Regions,
    Report: Report,
    CityData: CityData,
    FeatureRequest: FeatureRequest,
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "App",
      headerShown: false,
    },
  }
);

export default createAppContainer(navigator);
