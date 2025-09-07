import Tabicons from "@/components/tabicons";
import { icons } from "@/constants/icons";
import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#0f0d23",
          marginHorizontal: 15,
          borderRadius: 50,
          height: 50,
          marginBottom: 36,
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#0f0d23",
          position: "absolute",
        },
        tabBarItemStyle: {
          justifyContent: "center",
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <Tabicons focused={focused} icon={icons.home} title="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="Search"
        options={{
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <Tabicons focused={focused} icon={icons.search} title="Search" />
          ),
        }}
      />
      <Tabs.Screen
        name="Bookmark"
        options={{
          title: "Save",
          tabBarIcon: ({ focused }) => (
            <Tabicons focused={focused} icon={icons.save} title="Save" />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <Tabicons focused={focused} icon={icons.person} title="Profile" />
          ),
        }}
      />
    </Tabs>
  );
}
