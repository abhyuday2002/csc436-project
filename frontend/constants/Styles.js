import { StyleSheet } from "react-native"
import Colors from "./Colors"
import Fonts from "./Fonts"
import { DefaultTheme } from "@react-navigation/native"

// default styles for components
const Styles = StyleSheet.create({
	container: {
		flex: 1,
		marginHorizontal: 35,
	},
	text: {
		color: Colors.text,
		fontFamily: "Inter_400Regular", //Fonts.InterRegular,
		fontSize: 16,
	},
	header: {
		color: Colors.text,
		fontFamily: "Inter_800ExtraBold", //Fonts.InterExtraBold,
		fontSize: 28, // or 20 or 21   or 18 or 24
		paddingVertical: 15,
	},
	subheader: {
		color: Colors.text,
		fontFamily: "Inter_600SemiBold", //Fonts.InterSemiBold,
		fontSize: 18,
	},
	error: {
		backgroundColor: Colors.tintedBackground,
		padding: 12,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: Colors.error,
		color: Colors.error,
		fontFamily: "Inter_600SemiBold", //Fonts.InterSemiBold,
		fontSize: 16,
	},
	textInput: {
		paddingLeft: 5,
		color: Colors.text,
		fontSize: 16,
		width: "100%",
	},
	button: {
		backgroundColor: Colors.ui,
		borderWidth: 2,
		borderRadius: 10,
		borderColor: Colors.ui,
	},
	buttonText: {
		backgroundColor: Colors.ui,
		padding: 12,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: Colors.ui,
		overflow: "hidden",
		color: Colors.background,
		textAlign: "center",
		fontFamily: "Inter_600SemiBold", //Fonts.InterSemiBold,
		fontSize: 18,
	},
	buttonTextInverse: {
		backgroundColor: Colors.background,
		padding: 12,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: Colors.ui,
		overflow: "hidden",
		color: Colors.ui,
		textAlign: "center",
		fontFamily: "Inter_600SemiBold", // Fonts.InterSemiBold,
		fontSize: 18,
	},
	link: {
		fontFamily: "Inter_400Regular",
		fontSize: 16,
		color: Colors.activeUI,
	},
})

export default Styles

export const Theme = {
	...DefaultTheme,
	dark: false,
	colors: {
		primary: Colors.ui, // doesn't seem to be used anywhere?
		background: Colors.background,
		card: Colors.background, // background for tab bar
		text: Colors.text,
		border: Colors.background, // border color for tab bar
	},
	fonts: {
		regular: Styles.text,
		medium: { fontFamily: "Inter_600SemiBold" },
		bold: { fontFamily: "Inter_800ExtraBold" },
	},
}
