import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, StatusBar, TouchableOpacity, Animated } from 'react-native';
import { router } from 'expo-router';
import {
	ArrowLeftIcon,
	CalendarIcon,
	PlusIcon,
	ClockIcon,
	MapPinIcon,
	FileTextIcon,
	UsersIcon,
	MoreHorizontalIcon
} from 'lucide-react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Container } from '@/components/container';

interface Event {
	id: string;
	title: string;
	startTime: string;
	endTime: string;
	description?: string;
	location?: string;
	type: 'work' | 'meeting' | 'break' | 'travel' | 'personal';
	color: string;
	attendees?: string[];
	attachments?: string[];
	agenda?: string[];
}

const mockEvents: Event[] = [
	{
		id: '1',
		title: 'Morning Workout',
		startTime: '06:00',
		endTime: '07:00',
		description: 'Gym session',
		type: 'personal',
		color: '#10B981',
	},
	{
		id: '2',
		title: 'Project X',
		startTime: '09:00',
		endTime: '11:00',
		description: 'Just work',
		type: 'work',
		color: '#8B5CF6',
		attendees: ['Team Alpha'],
	},
	{
		id: '3',
		title: 'Client Call',
		startTime: '11:30',
		endTime: '12:00',
		description: 'Quick check-in',
		type: 'meeting',
		color: '#3B82F6',
		attendees: ['Client A'],
	},
	{
		id: '4',
		title: 'Road',
		startTime: '12:00',
		endTime: '13:00',
		location: '116 New Montgomery St #700, San Francisco, CA 94105',
		type: 'travel',
		color: '#6B7280',
	},
	{
		id: '5',
		title: 'Team Meeting',
		startTime: '13:00',
		endTime: '15:00',
		type: 'meeting',
		color: '#3B82F6',
		agenda: ['Last updates', 'Weekly plan', 'Role distribution'],
		attachments: ['Jun-8_commute.pptx'],
		attendees: ['John Doe', 'Jane Smith', 'Mike Johnson'],
	},
	{
		id: '6',
		title: 'Lunch break',
		startTime: '15:00',
		endTime: '16:00',
		type: 'break',
		color: '#F59E0B',
	},
	{
		id: '7',
		title: 'Design Review',
		startTime: '16:00',
		endTime: '17:00',
		description: 'UI/UX review session',
		type: 'work',
		color: '#8B5CF6',
		attendees: ['Design Team'],
	},
	{
		id: '8',
		title: 'Evening Reading',
		startTime: '20:00',
		endTime: '21:00',
		description: 'Personal development time',
		type: 'personal',
		color: '#10B981',
	},
	{
		id: '9',
		title: 'Late Night Work',
		startTime: '22:00',
		endTime: '24:00',
		description: 'Catch up on emails',
		type: 'work',
		color: '#8B5CF6',
	},
	{
		id: '10',
		title: 'Early Morning Prep',
		startTime: '25:00',
		endTime: '26:00',
		description: 'Prepare for tomorrow',
		type: 'work',
		color: '#8B5CF6',
	},
];

// Expanded hourly timeline with more hours for better daily planning
const HOURS = [
	'00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00',
	'10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00',
	'20:00', '21:00', '22:00', '23:00', '24:00', '25:00', '26:00', '27:00', '28:00', '29:00',
	'30:00', '31:00', '32:00', '33:00', '34:00', '35:00', '36:00', '37:00', '38:00', '39:00',
	'40:00', '41:00', '42:00', '43:00', '44:00', '45:00', '46:00', '47:00'
];

export default function ScheduleScreen() {
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [events] = useState<Event[]>(mockEvents);
	const [pressedEvent, setPressedEvent] = useState<string | null>(null);
	const [pressedButton, setPressedButton] = useState(false);
	const scrollViewRef = useRef<ScrollView>(null);

	// Auto-scroll to current time on component mount
	useEffect(() => {
		const now = new Date();
		const currentHour = now.getHours();
		const currentMinute = now.getMinutes();

		// Calculate position for current time (scrolling to show current hour)
		const currentTimePosition = (currentHour * 60 + currentMinute) * 0.75;
		const scrollOffset = Math.max(0, currentTimePosition - 200); // Offset to show current time nicely

		// Scroll to current time after a short delay to ensure layout is ready
		setTimeout(() => {
			scrollViewRef.current?.scrollTo({
				y: scrollOffset,
				animated: true,
			});
		}, 100);
	}, []);

	const getEventPosition = (event: Event, eventIndex: number) => {
		const startHour = parseInt(event.startTime.split(':')[0]);
		const endHour = parseInt(event.endTime.split(':')[0]);
		const startMinute = parseInt(event.startTime.split(':')[1]);
		const endMinute = parseInt(event.endTime.split(':')[1]);

		// Calculate position from midnight (00:00)
		const startPosition = startHour * 60 + startMinute;
		const duration = (endHour - startHour) * 60 + (endMinute - startMinute);

		// Find overlapping events and calculate vertical offset
		let verticalOffset = 0;
		for (let i = 0; i < eventIndex; i++) {
			const otherEvent = events[i];
			const otherStartHour = parseInt(otherEvent.startTime.split(':')[0]);
			const otherEndHour = parseInt(otherEvent.endTime.split(':')[0]);
			const otherStartMinute = parseInt(otherEvent.startTime.split(':')[1]);
			const otherEndMinute = parseInt(otherEvent.endTime.split(':')[1]);

			const otherStartPosition = otherStartHour * 60 + otherStartMinute;
			const otherDuration = (otherEndHour - otherStartHour) * 60 + (otherEndMinute - otherStartMinute);
			const otherEndPosition = otherStartPosition + otherDuration;

			const eventEndPosition = startPosition + duration;

			// Check if events overlap
			if (startPosition < otherEndPosition && eventEndPosition > otherStartPosition) {
				verticalOffset += 8; // Small vertical offset for overlapping events
			}
		}

		return {
			top: startPosition * 0.75 + verticalOffset, // Add vertical offset for overlaps
			height: Math.max(duration * 0.75, 60), // Minimum height for readability
		};
	};

	const formatDate = (date: Date) => {
		return date.toLocaleDateString('en-US', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	};

	return (
		<Container>
			<StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

			{/* Header */}
			<View className="px-6 pt-4 pb-8 bg-background">
				<View className="flex-row items-center justify-between mb-8">
					<TouchableOpacity
						onPress={() => router.back()}
						className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
						style={{
							shadowColor: '#000',
							shadowOffset: { width: 0, height: 1 },
							shadowOpacity: 0.1,
							shadowRadius: 2,
							elevation: 2,
						}}
					>
						<Icon as={ArrowLeftIcon} className="text-gray-600" size={20} />
					</TouchableOpacity>

					<View className="items-center">
						<Text className="text-gray-900 text-2xl font-bold">Daily Schedule</Text>
						<Text className="text-gray-500 text-base mt-1">{formatDate(selectedDate)}</Text>
					</View>

					<TouchableOpacity
						onPress={() => router.push('/schedule/add-event')}
						className="w-10 h-10 rounded-full bg-gray-800 items-center justify-center"
						style={{
							shadowColor: '#000',
							shadowOffset: { width: 0, height: 2 },
							shadowOpacity: 0.2,
							shadowRadius: 4,
							elevation: 4,
						}}
					>
						<Icon as={PlusIcon} className="text-white" size={20} />
					</TouchableOpacity>
				</View>
			</View>

			<ScrollView
				ref={scrollViewRef}
				className="flex-1"
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 100 }}
			>
				<View className="px-6">
					{/* Timeline Container */}
					<View className="flex-row">
						{/* Time Column */}
						<View className="w-20 mr-6">
							{HOURS.map((hour, index) => (
								<View key={hour} className="h-16 items-center justify-center">
									<Text className="text-gray-500 text-sm font-medium">
										{hour}
									</Text>
								</View>
							))}
						</View>

						{/* Events Column */}
						<View className="flex-1 relative" style={{ height: HOURS.length * 64 }}>
							{/* Timeline Lines */}
							{HOURS.map((hour, index) => (
								<View
									key={`line-${hour}`}
									className="absolute left-0 right-0 h-px bg-gray-200"
									style={{ top: index * 64 }}
								/>
							))}

							{/* Current Time Indicator */}
							{(() => {
								const now = new Date();
								const currentHour = now.getHours();
								const currentMinute = now.getMinutes();
								const currentTimePosition = (currentHour * 60 + currentMinute) * 0.75;

								return (
									<View
										className="absolute left-0 right-0 h-0.5 bg-red-500 z-10"
										style={{ top: currentTimePosition }}
									>
										<View className="absolute -left-2 -top-1 w-4 h-4 bg-red-500 rounded-full" />
									</View>
								);
							})()}

							{/* Events */}
							{events.map((event, eventIndex) => {
								const position = getEventPosition(event, eventIndex);

								return (
									<TouchableOpacity
										key={event.id}
										className={`absolute left-0 right-0 bg-white rounded-2xl p-4 border border-gray-100 ${pressedEvent === event.id ? 'scale-98' : 'scale-100'
											}`}
										style={{
											top: position.top,
											height: Math.max(position.height, 60),
											shadowColor: '#000',
											shadowOffset: { width: 0, height: 2 },
											shadowOpacity: pressedEvent === event.id ? 0.12 : 0.08,
											shadowRadius: pressedEvent === event.id ? 12 : 8,
											elevation: pressedEvent === event.id ? 4 : 3,
										}}
										onPress={() => router.push(`/schedule/edit-event/${event.id}`)}
										onPressIn={() => setPressedEvent(event.id)}
										onPressOut={() => setPressedEvent(null)}
									>
										<View className="flex-row items-start justify-between mb-3">
											<View className="flex-row items-center gap-3 flex-1">
												<View
													className="w-3 h-3 rounded-full"
													style={{ backgroundColor: event.color }}
												/>
												<Text className="text-gray-900 font-semibold text-base flex-1">
													{event.title}
												</Text>
											</View>
											<View className="flex-row items-center gap-2">
												<Text className="text-gray-500 text-sm">
													{event.startTime} – {event.endTime}
												</Text>
												<TouchableOpacity>
													<Icon as={MoreHorizontalIcon} className="text-gray-400" size={16} />
												</TouchableOpacity>
											</View>
										</View>

										{/* Event Details */}
										<View className="space-y-2">
											{event.description && (
												<Text className="text-gray-600 text-sm">
													{event.description}
												</Text>
											)}

											{event.location && (
												<View className="flex-row items-center gap-2">
													<Icon as={MapPinIcon} className="text-gray-400" size={14} />
													<Text className="text-gray-600 text-sm flex-1">
														{event.location}
													</Text>
												</View>
											)}

											{event.agenda && event.agenda.length > 0 && (
												<View className="space-y-1">
													{event.agenda.map((item, index) => (
														<View key={index} className="flex-row items-center gap-2">
															<View className="w-1 h-1 bg-gray-400 rounded-full" />
															<Text className="text-gray-600 text-sm">
																{item}
															</Text>
														</View>
													))}
												</View>
											)}

											{event.attendees && event.attendees.length > 0 && (
												<View className="flex-row items-center gap-2">
													<Icon as={UsersIcon} className="text-gray-400" size={14} />
													<Text className="text-gray-600 text-sm">
														{event.attendees.length} attendees
													</Text>
												</View>
											)}

											{event.attachments && event.attachments.length > 0 && (
												<View className="flex-row items-center gap-2">
													<Icon as={FileTextIcon} className="text-gray-400" size={14} />
													<Text className="text-gray-600 text-sm">
														{event.attachments[0]}
													</Text>
												</View>
											)}
										</View>
									</TouchableOpacity>
								);
							})}
						</View>
					</View>

					{/* Add Event Button */}
					<View className="mt-12 mb-8">
						<TouchableOpacity
							className={`w-full bg-gray-800 rounded-2xl py-4 flex-row items-center justify-center ${pressedButton ? 'scale-98' : 'scale-100'
								}`}
							onPress={() => router.push('/schedule/add-event')}
							onPressIn={() => setPressedButton(true)}
							onPressOut={() => setPressedButton(false)}
							style={{
								shadowColor: '#000',
								shadowOffset: { width: 0, height: pressedButton ? 2 : 4 },
								shadowOpacity: pressedButton ? 0.2 : 0.15,
								shadowRadius: pressedButton ? 6 : 8,
								elevation: pressedButton ? 4 : 6,
							}}
						>
							<Icon as={PlusIcon} className="text-white" size={20} />
							<Text className="text-white font-semibold text-lg ml-3">Add New Event</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</Container>
	);
}
