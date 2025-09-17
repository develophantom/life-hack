import React, { useState } from 'react';
import { View, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import {
	ArrowLeftIcon,
	CalendarIcon,
	ClockIcon,
	MapPinIcon,
	FileTextIcon,
	UsersIcon,
	SaveIcon,
	PlusIcon,
	XIcon,
	TrashIcon
} from 'lucide-react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Icon } from '@/components/ui/icon';
import { Container } from '@/components/container';
import { Card } from '@/components/ui/card';

const EVENT_TYPES = [
	{ id: 'work', name: 'Work', color: '#8B5CF6', icon: '💼' },
	{ id: 'meeting', name: 'Meeting', color: '#3B82F6', icon: '👥' },
	{ id: 'break', name: 'Break', color: '#F59E0B', icon: '☕' },
	{ id: 'travel', name: 'Travel', color: '#6B7280', icon: '🚗' },
	{ id: 'personal', name: 'Personal', color: '#10B981', icon: '👤' },
];

export default function EditEventScreen() {
	const { id } = useLocalSearchParams();

	// Mock data - in real app, fetch by id
	const [title, setTitle] = useState('Project X');
	const [startTime, setStartTime] = useState('09:00');
	const [endTime, setEndTime] = useState('11:00');
	const [description, setDescription] = useState('Just work');
	const [location, setLocation] = useState('');
	const [selectedType, setSelectedType] = useState('work');
	const [attendees, setAttendees] = useState<string[]>(['Team Alpha']);
	const [newAttendee, setNewAttendee] = useState('');
	const [agenda, setAgenda] = useState<string[]>([]);
	const [newAgendaItem, setNewAgendaItem] = useState('');

	const handleSave = () => {
		// TODO: Implement save logic
		console.log('Updating event:', {
			id,
			title,
			startTime,
			endTime,
			description,
			location,
			selectedType,
			attendees,
			agenda,
		});

		router.back();
	};

	const handleDelete = () => {
		// TODO: Implement delete logic
		console.log('Deleting event:', id);
		router.back();
	};

	const addAttendee = () => {
		if (newAttendee.trim() && !attendees.includes(newAttendee.trim())) {
			setAttendees([...attendees, newAttendee.trim()]);
			setNewAttendee('');
		}
	};

	const removeAttendee = (index: number) => {
		setAttendees(attendees.filter((_, i) => i !== index));
	};

	const addAgendaItem = () => {
		if (newAgendaItem.trim() && !agenda.includes(newAgendaItem.trim())) {
			setAgenda([...agenda, newAgendaItem.trim()]);
			setNewAgendaItem('');
		}
	};

	const removeAgendaItem = (index: number) => {
		setAgenda(agenda.filter((_, i) => i !== index));
	};

	return (
		<Container>
			<StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

			{/* Header */}
			<View className="px-6 pt-4 pb-6 bg-background">
				<View className="flex-row items-center justify-between mb-6">
					<TouchableOpacity
						onPress={() => router.back()}
						className="w-10 h-10 rounded-full bg-muted items-center justify-center"
					>
						<Icon as={ArrowLeftIcon} className="text-foreground" size={20} />
					</TouchableOpacity>

					<View className="items-center">
						<Text className="text-foreground text-xl font-bold">Edit Event</Text>
						<Text className="text-muted-foreground text-sm">Modify your event details</Text>
					</View>

					<TouchableOpacity
						onPress={handleDelete}
						className="w-10 h-10 rounded-full bg-destructive items-center justify-center"
					>
						<Icon as={TrashIcon} className="text-destructive-foreground" size={20} />
					</TouchableOpacity>
				</View>
			</View>

			<ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
				<View className="px-6 space-y-6">
					{/* Basic Information */}
					<Card className="p-6 bg-gradient-to-br from-chart-1/5 to-chart-2/5 border-chart-1/20">
						<View className="flex-row items-center gap-3 mb-4">
							<View className="w-12 h-12 rounded-2xl bg-chart-1/20 items-center justify-center">
								<Icon as={CalendarIcon} className="text-chart-1" size={24} />
							</View>
							<View className="flex-1">
								<Text className="text-foreground font-bold text-lg">Event Details</Text>
								<Text className="text-muted-foreground text-sm">Basic information about your event</Text>
							</View>
						</View>

						<View className="space-y-4">
							{/* Event Title */}
							<View>
								<Text className="text-foreground font-medium mb-2">Event Title</Text>
								<Input
									value={title}
									onChangeText={setTitle}
									placeholder="e.g., Team Meeting, Project Review"
									className="bg-background"
								/>
							</View>

							{/* Time Selection */}
							<View className="flex-row gap-4">
								<View className="flex-1">
									<Text className="text-foreground font-medium mb-2">Start Time</Text>
									<View className="relative">
										<Input
											value={startTime}
											onChangeText={setStartTime}
											placeholder="09:00"
											className="bg-background pl-10"
										/>
										<View className="absolute left-3 top-3">
											<Icon as={ClockIcon} className="text-muted-foreground" size={20} />
										</View>
									</View>
								</View>
								<View className="flex-1">
									<Text className="text-foreground font-medium mb-2">End Time</Text>
									<View className="relative">
										<Input
											value={endTime}
											onChangeText={setEndTime}
											placeholder="10:00"
											className="bg-background pl-10"
										/>
										<View className="absolute left-3 top-3">
											<Icon as={ClockIcon} className="text-muted-foreground" size={20} />
										</View>
									</View>
								</View>
							</View>

							{/* Description */}
							<View>
								<Text className="text-foreground font-medium mb-2">Description</Text>
								<Input
									value={description}
									onChangeText={setDescription}
									placeholder="Brief description of the event"
									multiline
									numberOfLines={3}
									className="bg-background min-h-[80px]"
								/>
							</View>

							{/* Location */}
							<View>
								<Text className="text-foreground font-medium mb-2">Location</Text>
								<View className="relative">
									<Input
										value={location}
										onChangeText={setLocation}
										placeholder="Office, Conference Room, or Address"
										className="bg-background pl-10"
									/>
									<View className="absolute left-3 top-3">
										<Icon as={MapPinIcon} className="text-muted-foreground" size={20} />
									</View>
								</View>
							</View>
						</View>
					</Card>

					{/* Event Type */}
					<Card className="p-6">
						<View className="flex-row items-center gap-3 mb-4">
							<View className="w-12 h-12 rounded-2xl bg-chart-3/20 items-center justify-center">
								<Icon as={CalendarIcon} className="text-chart-3" size={24} />
							</View>
							<View className="flex-1">
								<Text className="text-foreground font-bold text-lg">Event Type</Text>
								<Text className="text-muted-foreground text-sm">Categorize your event</Text>
							</View>
						</View>

						<View className="flex-row flex-wrap gap-3">
							{EVENT_TYPES.map((type) => (
								<TouchableOpacity
									key={type.id}
									onPress={() => setSelectedType(type.id)}
									className={`p-4 rounded-2xl border-2 ${selectedType === type.id
											? 'border-chart-1 bg-chart-1/10'
											: 'border-border bg-card'
										}`}
								>
									<View className="items-center space-y-2">
										<Text className="text-2xl">{type.icon}</Text>
										<Text className={`text-sm font-medium text-center ${selectedType === type.id ? 'text-chart-1' : 'text-card-foreground'
											}`}>
											{type.name}
										</Text>
									</View>
								</TouchableOpacity>
							))}
						</View>
					</Card>

					{/* Attendees */}
					<Card className="p-6 bg-gradient-to-br from-chart-4/5 to-chart-5/5 border-chart-4/20">
						<View className="flex-row items-center gap-3 mb-4">
							<View className="w-12 h-12 rounded-2xl bg-chart-4/20 items-center justify-center">
								<Icon as={UsersIcon} className="text-chart-4" size={24} />
							</View>
							<View className="flex-1">
								<Text className="text-foreground font-bold text-lg">Attendees</Text>
								<Text className="text-muted-foreground text-sm">Add people to your event</Text>
							</View>
						</View>

						<View className="space-y-4">
							{/* Add Attendee */}
							<View className="flex-row gap-2">
								<Input
									value={newAttendee}
									onChangeText={setNewAttendee}
									placeholder="Enter email or name"
									className="flex-1 bg-background"
								/>
								<Button onPress={addAttendee} className="bg-chart-4">
									<Icon as={PlusIcon} className="text-white" size={16} />
								</Button>
							</View>

							{/* Attendees List */}
							{attendees.length > 0 && (
								<View className="space-y-2">
									{attendees.map((attendee, index) => (
										<View key={index} className="flex-row items-center justify-between bg-background/50 rounded-xl p-3">
											<Text className="text-card-foreground font-medium">{attendee}</Text>
											<TouchableOpacity onPress={() => removeAttendee(index)}>
												<Icon as={XIcon} className="text-muted-foreground" size={16} />
											</TouchableOpacity>
										</View>
									))}
								</View>
							)}
						</View>
					</Card>

					{/* Agenda */}
					<Card className="p-6">
						<View className="flex-row items-center gap-3 mb-4">
							<View className="w-12 h-12 rounded-2xl bg-muted/50 items-center justify-center">
								<Icon as={FileTextIcon} className="text-muted-foreground" size={24} />
							</View>
							<View className="flex-1">
								<Text className="text-foreground font-bold text-lg">Agenda</Text>
								<Text className="text-muted-foreground text-sm">Add discussion points (optional)</Text>
							</View>
						</View>

						<View className="space-y-4">
							{/* Add Agenda Item */}
							<View className="flex-row gap-2">
								<Input
									value={newAgendaItem}
									onChangeText={setNewAgendaItem}
									placeholder="Add agenda item"
									className="flex-1 bg-background"
								/>
								<Button onPress={addAgendaItem} variant="outline">
									<Icon as={PlusIcon} className="text-foreground" size={16} />
								</Button>
							</View>

							{/* Agenda List */}
							{agenda.length > 0 && (
								<View className="space-y-2">
									{agenda.map((item, index) => (
										<View key={index} className="flex-row items-center justify-between bg-background/50 rounded-xl p-3">
											<View className="flex-row items-center gap-3">
												<View className="w-1 h-1 bg-chart-1 rounded-full" />
												<Text className="text-card-foreground font-medium">{item}</Text>
											</View>
											<TouchableOpacity onPress={() => removeAgendaItem(index)}>
												<Icon as={XIcon} className="text-muted-foreground" size={16} />
											</TouchableOpacity>
										</View>
									))}
								</View>
							)}
						</View>
					</Card>

					{/* Action Buttons */}
					<View className="flex-row gap-4 pb-8">
						<Button
							variant="outline"
							className="flex-1"
							onPress={() => router.back()}
						>
							<Text className="text-foreground font-semibold">Cancel</Text>
						</Button>
						<Button
							className="flex-1 bg-chart-1"
							onPress={handleSave}
						>
							<Icon as={SaveIcon} className="text-white" size={16} />
							<Text className="text-white font-semibold ml-2">Update Event</Text>
						</Button>
					</View>
				</View>
			</ScrollView>
		</Container>
	);
}
