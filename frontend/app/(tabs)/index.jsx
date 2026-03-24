import { View, Text, SafeAreaView } from "react-native"
import Header from "../../components/Header"
import Styles from "../../constants/Styles"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { useContext } from "react"
import { UserContext } from "../../context/UserContext"
import Colors from "../../constants/Colors"

export default function HomeTab() {
	//const headerText = user ? "Welcome Back" : "Welcome to Flowsie"
	const user = useContext(UserContext).user

	if (!user) {
		;<>
			<Header title="Welcome" />
			<Text style={Styles.text}>***Message prompting sign in***</Text>
		</>
	}

	return (
		<SafeAreaView style={Styles.container}>
			<Header title="Home" />
			<View style={{ flexDirection: "row" }}>
				<MaterialCommunityIcons
					name="wrench-outline"
					size={20}
					color={Colors.text}
				/>
				<Text style={Styles.text}>This feature is under construction </Text>
				<MaterialCommunityIcons
					name="wrench-outline"
					size={20}
					color={Colors.text}
				/>
			</View>
		</SafeAreaView>
	)
}
