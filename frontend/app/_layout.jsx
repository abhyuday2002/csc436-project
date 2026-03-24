import { useCallback, useEffect, useState } from "react"
import { UserContext } from "../context/UserContext"
import { ThemeProvider } from "@react-navigation/native"
import { Theme } from "../constants/Styles"
import { Stack } from "expo-router"
import * as SecureStore from "expo-secure-store"
import * as SplashScreen from "expo-splash-screen"
import { useFonts } from "expo-font"
import {
	Inter_400Regular,
	Inter_600SemiBold,
	Inter_800ExtraBold,
} from "@expo-google-fonts/inter"

// Keeps splash screen visible while fetching user details
SplashScreen.preventAutoHideAsync()

export default function App() {
	const [user, setUser] = useState(null)
	const [fontLoaded, fontError] = useFonts({
		Inter_400Regular,
		Inter_600SemiBold,
		Inter_800ExtraBold,
	})

	/** 
	useEffect(() => {
		async function getUserFromStorage() {
			try {
				let storedUser = await SecureStore.getItemAsync("user")
				if (storedUser !== null) {
					setUser(JSON.parse(storedUser))
				}
			} catch (e) {
				console.warn(e)
			} finally {
				setAppIsReady(true)
			}
		}

		getUserFromStorage()
	}, [])
	*/
	useEffect(() => {
		if (fontLoaded || fontError) {
			SplashScreen.hideAsync()
		}
	}, [fontLoaded, fontError])

	if (!fontLoaded && !fontError) {
		return null
	}

	// const onLayoutRootView = useCallback(async () => {
	// 	if (appIsReady) {
	// 		await SplashScreen.hideAsync()
	// 	}
	// }, [appIsReady])

	// if (!appIsReady) {
	// 	return null
	// }

	return (
		<ThemeProvider value={Theme}>
			<UserContext.Provider value={{ user: user, setUser: setUser }}>
				<Stack>
					<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
					<Stack.Screen name="(auth)" options={{ headerShown: false }} />
				</Stack>
			</UserContext.Provider>
		</ThemeProvider>
	)
}
