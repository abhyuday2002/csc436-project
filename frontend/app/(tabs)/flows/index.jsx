import {
	View,
	Text,
	SafeAreaView,
	FlatList,
	StyleSheet,
	Image,
	Dimensions,
} from "react-native"
import Styles from "../../../constants/Styles"
import Header from "../../../components/Header"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import Colors from "../../../constants/Colors"
import { useCallback, useState } from "react"
import PoseCard from "../../../components/flows/PoseCard"
import IconButton from "../../../components/basic/IconButton"
import Poses from "../../../temp/poses"
import Input from "../../../components/basic/Input"
import SearchBar from "../../../components/search/SearchBar"
import DraggableFlatList from "react-native-draggable-flatlist"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import VariationsSelect from "../../../components/flows/VariationsSelect"

/*
 * pose: {
 * 	 (defaults:)
 * 	 name
 * 	 image
 * 	 duration
 * 	 variations
 *
 * 	 (added:)
 * 	 id (order number)
 *
 */

const { width } = Dimensions.get("window")

export default function FlowCreatorTab() {
	const [sequence, setSequence] = useState([])
	const [currentPose, setCurrentPose] = useState(null)
	const [duration, setDuration] = useState(null)
	const [poses, setPoses] = useState(Poses)
	const [idCounter, setIdCounter] = useState(1)
	const filters = {
		Difficulty: {
			Beginner: false,
			Intermediate: false,
			Advanced: false,
		},
		Position: {
			Standing: false,
			Seated: false,
			Supine: false,
			Prone: false,
			"Arm Balance": false,
			Supported: false,
		},
		Posture: {
			"Back Bend": false,
			"Forward Bend": false,
			"Lateral Bend": false,
			Twist: false,
			Balance: false,
			Neutral: false,
		},
	}

	const updateDuration = () => {
		const updatedPose = { ...currentPose, duration: duration }
		const index = sequence.indexOf(currentPose)
		setCurrentPose(updatedPose)
		setSequence([
			...sequence.slice(0, index),
			updatedPose,
			...sequence.slice(index + 1),
		])
	}

	const updateVariation = (newPose) => {
		const updatedPose = { ...newPose, id: currentPose.id }
		const index = sequence.indexOf(currentPose)
		setCurrentPose(updatedPose)
		setSequence([
			...sequence.slice(0, index),
			updatedPose,
			...sequence.slice(index + 1),
		])
	}

	const handleSelect = (selectPose) => {
		setCurrentPose(selectPose)
		setDuration(selectPose.duration)
	}

	const handleDelete = (poseId) => {
		setSequence(sequence.filter((pose) => pose.id !== poseId))
		setCurrentPose(null)
	}

	const handleAdd = (pose) => {
		const newPose = { ...pose, id: idCounter }
		setSequence([...sequence, newPose])
		setCurrentPose(newPose)
		setDuration(pose.duration)
		setIdCounter(idCounter + 1)
	}

	const renderEditor = useCallback(
		() => (
			<>
				<Image source={currentPose.image} style={styles.editImage} />
				<View style={styles.editDetails}>
					<Text numberOfLines={1} style={styles.editHeader}>
						{currentPose.name}
					</Text>
					<Text style={styles.editDescription}>{currentPose.difficulty}</Text>
					<Input
						value={duration}
						onChangeText={setDuration}
						onEndEditing={updateDuration}
						inputMode="decimal"
						icon="clock-outline"
						slim
					/>
					<VariationsSelect pose={currentPose} updatePose={updateVariation} />
				</View>
				<IconButton
					name="trash-can-outline"
					onPress={() => handleDelete(currentPose.id)}
				/>
			</>
		),
		[currentPose]
	)

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<SafeAreaView style={Styles.container}>
				<View style={styles.header}>
					<Header title="Flow Maker" />
					<View style={styles.headerButtons}>
						<IconButton name="content-save" onPress={() => {}} />
						<IconButton name="menu" onPress={() => {}} />
					</View>
				</View>
				<View style={styles.editView}>
					{currentPose ? (
						renderEditor()
					) : (
						<Text style={styles.editPlaceholder}>
							Select a pose to add it to the flow.
						</Text>
					)}
				</View>
				<View style={styles.seqView}>
					<DraggableFlatList
						data={sequence}
						renderItem={({ item, getIndex, drag, isActive }) => (
							<PoseCard
								pose={item}
								onPress={handleSelect}
								isCurrent={item === currentPose}
								onLongPress={drag}
								index={getIndex() + 1}
								isActive={isActive}
							/>
						)}
						onDragEnd={({ data }) => setSequence(data)}
						keyExtractor={(item) => item.id}
						horizontal
						containerStyle={{ padding: 5, flex: 1 }}
						ItemSeparatorComponent={() => (
							<MaterialCommunityIcons
								name="arrow-right"
								size={24}
								style={styles.seqSeparator}
								color={Colors.border}
							/>
						)}
					/>
				</View>

				<View style={styles.addView}>
					<SearchBar
						filters={filters}
						defaultData={Poses}
						setData={setPoses}
						searchField="name"
					/>

					<FlatList
						data={poses}
						renderItem={({ item }) => (
							<PoseCard
								pose={item}
								size={width / 3}
								onPress={handleAdd}
								showName
							/>
						)}
						numColumns={3}
						contentContainerStyle={{ gap: 10 }}
						columnWrapperStyle={{ gap: 10 }}
					/>
				</View>
			</SafeAreaView>
		</GestureHandlerRootView>
	)
}

const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	headerButtons: {
		flexDirection: "row",
		paddingVertical: 20,
		gap: 10,
	},
	editView: {
		flex: 1.35,
		flexDirection: "row",
		backgroundColor: Colors.tintedBackground,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: Colors.border,
		overflow: "hidden",
		paddingRight: 5,
		gap: 5,
	},
	editPlaceholder: {
		...Styles.subheader,
		padding: 35,
		alignSelf: "center",
		textAlign: "center",
		color: Colors.inactiveUI,
	},
	editImage: {
		backgroundColor: Colors.background,
		flex: 0.75,
		height: "100%",
		resizeMode: "contain",
		justifyContent: "center",
		alignSelf: "center",
		borderRightWidth: 1,
		borderColor: Colors.border,
	},
	editDetails: {
		flex: 1,
		padding: 5,
	},
	editHeader: {
		...Styles.subheader,
		fontSize: 16,
	},
	editDescription: {
		...Styles.text,
		fontSize: 13,
		color: Colors.inactiveUI,
	},
	editInputs: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	seqView: {
		flex: 1,
		backgroundColor: Colors.tintedBackground,
		marginVertical: 10,
		borderRadius: 15,
		borderWidth: 1,
		borderColor: Colors.border,
	},
	seqFooter: {
		borderRadius: 10,
		borderWidth: 1,
		borderColor: Colors.border,
		overflow: "hidden",
		backgroundColor: Colors.background,
	},
	seqSeparator: {
		alignSelf: "center",
	},
	addView: {
		flex: 4,
	},
	addFilters: {
		flexDirection: "row",
	},
})
