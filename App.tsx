import AppNavigator from "./app/navigation/AppNavigator";

export let PASSWORD = "2+0+4+0";
export let USERNAME = "Jane Doe";
export let LOCATION = "Seattle";

export default function App() {
  return <AppNavigator />;
}

export const setPassword = (newPass: string) => {
  PASSWORD = newPass;
};

export const setUsername = (newName: string) => {
  USERNAME = newName;
};

export const setLocation = (newLocation: string) => {
  LOCATION = newLocation;
};
