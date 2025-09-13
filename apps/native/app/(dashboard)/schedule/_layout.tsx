import { Stack } from 'expo-router';

export default function ScheduleLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
				animation: 'slide_from_right',
			}}
		>
			<Stack.Screen name="index" />
			<Stack.Screen name="add-event" />
			<Stack.Screen name="edit-event/[id]" />
		</Stack>
	);
}
