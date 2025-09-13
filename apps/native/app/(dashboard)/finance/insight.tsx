import { View, Text, TextInput, TouchableOpacity, ScrollView, StatusBar, Animated } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { router } from 'expo-router'
import { ArrowLeftIcon, PlusIcon, MicIcon, SendIcon, SparklesIcon } from 'lucide-react-native'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { Container } from '@/components/container'

export default function Insight() {
	const [inputText, setInputText] = useState('')
	const [isRecording, setIsRecording] = useState(false)
	const [isTyping, setIsTyping] = useState(false)

	// Animation values
	const fadeAnim = useRef(new Animated.Value(0)).current
	const slideAnim = useRef(new Animated.Value(50)).current
	const pulseAnim = useRef(new Animated.Value(1)).current

	useEffect(() => {
		// Entrance animation
		Animated.parallel([
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 800,
				useNativeDriver: true,
			}),
			Animated.timing(slideAnim, {
				toValue: 0,
				duration: 800,
				useNativeDriver: true,
			}),
		]).start()
	}, [])

	useEffect(() => {
		if (isRecording) {
			// Pulse animation for recording
			Animated.loop(
				Animated.sequence([
					Animated.timing(pulseAnim, {
						toValue: 1.2,
						duration: 600,
						useNativeDriver: true,
					}),
					Animated.timing(pulseAnim, {
						toValue: 1,
						duration: 600,
						useNativeDriver: true,
					}),
				])
			).start()
		} else {
			pulseAnim.setValue(1)
		}
	}, [isRecording])

	const suggestedQuestions = [
		{
			id: '1',
			question: 'How much did I spend last month?',
			icon: '💰',
			category: 'Spending Analysis'
		},
		{
			id: '2',
			question: 'What categories did I spend the most on?',
			icon: '📊',
			category: 'Category Breakdown'
		},
		{
			id: '3',
			question: 'What\'s my current savings streak?',
			icon: '🔥',
			category: 'Savings Goals'
		},
		{
			id: '4',
			question: 'How much did I save last month?',
			icon: '💎',
			category: 'Savings Progress'
		}
	]

	const handleQuestionPress = (question: string) => {
		setInputText(question)
		setIsTyping(true)

		// Simulate typing animation
		setTimeout(() => {
			setIsTyping(false)
		}, 1000)
	}

	const handleSendMessage = () => {
		if (inputText.trim()) {
			setIsTyping(true)
			// TODO: Implement AI response logic
			console.log('Sending message:', inputText)

			// Simulate AI processing
			setTimeout(() => {
				setIsTyping(false)
				setInputText('')
			}, 2000)
		}
	}

	const toggleRecording = () => {
		setIsRecording(!isRecording)
		// TODO: Implement voice recording logic
	}

	return (
		<Container>
			<StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

			{/* Header */}
			<View className="px-6 pt-4 pb-6">
				<View className="flex-row items-center justify-between mb-6">
					<TouchableOpacity
						onPress={() => router.back()}
						className="w-10 h-10 rounded-full bg-muted items-center justify-center"
					>
						<Icon as={ArrowLeftIcon} className="text-foreground" size={20} />
					</TouchableOpacity>

					<View className="items-center">
						<Text className="text-foreground text-xl font-bold">Flowi</Text>
						<Text className="text-muted-foreground text-sm">Your AI Financial Assistant</Text>
					</View>

					<View className="w-10" />
				</View>
			</View>

			<ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
				<Animated.View
					className="px-6"
					style={{
						opacity: fadeAnim,
						transform: [{ translateY: slideAnim }],
					}}
				>
					{/* Welcome Section */}
					<View className="mb-8">
						<View className="flex-row items-center gap-2 mb-2">
							<Icon as={SparklesIcon} className="text-primary" size={24} />
							<Text className="text-foreground text-2xl font-bold">
								Ask me anything about your finances
							</Text>
						</View>
						<Text className="text-muted-foreground text-base leading-6">
							Get instant insights, analysis, and recommendations tailored to your financial situation.
						</Text>
					</View>

					{/* Suggested Questions */}
					<View className="mb-8">
						<Text className="text-foreground text-lg font-semibold mb-4">Suggested Questions</Text>
						<View className="space-y-3">
							{suggestedQuestions.map((item, index) => (
								<Animated.View
									key={item.id}
									style={{
										opacity: fadeAnim,
										transform: [
											{ translateY: slideAnim },
											{ scale: pulseAnim }
										],
									}}
								>
									<TouchableOpacity
										onPress={() => handleQuestionPress(item.question)}
										className="bg-card rounded-2xl p-4 shadow-sm border border-border/50 active:scale-95 transition-transform"
										style={{
											shadowColor: '#000',
											shadowOffset: { width: 0, height: 2 },
											shadowOpacity: 0.1,
											shadowRadius: 8,
											elevation: 3,
										}}
									>
										<View className="flex-row items-center gap-3">
											<View className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 items-center justify-center">
												<Text className="text-lg">{item.icon}</Text>
											</View>
											<View className="flex-1">
												<Text className="text-card-foreground font-medium text-base mb-1">
													{item.question}
												</Text>
												<Text className="text-muted-foreground text-sm">
													{item.category}
												</Text>
											</View>
										</View>
									</TouchableOpacity>
								</Animated.View>
							))}
						</View>
					</View>

					{/* Recent Insights */}
					<View className="mb-8">
						<Text className="text-foreground text-lg font-semibold mb-4">Recent Insights</Text>
						<View className="space-y-3">
							<View className="bg-gradient-to-r from-chart-1/10 to-chart-2/10 rounded-2xl p-4 border border-chart-1/20">
								<View className="flex-row items-start gap-3">
									<View className="w-8 h-8 rounded-full bg-chart-1 items-center justify-center">
										<Text className="text-white text-sm font-bold">📈</Text>
									</View>
									<View className="flex-1">
										<Text className="text-card-foreground font-semibold mb-1">
											Spending Trend Analysis
										</Text>
										<Text className="text-muted-foreground text-sm">
											Your spending decreased by 12% compared to last month. Great job on managing your expenses!
										</Text>
									</View>
								</View>
							</View>

							<View className="bg-gradient-to-r from-chart-3/10 to-chart-4/10 rounded-2xl p-4 border border-chart-3/20">
								<View className="flex-row items-start gap-3">
									<View className="w-8 h-8 rounded-full bg-chart-3 items-center justify-center">
										<Text className="text-white text-sm font-bold">🎯</Text>
									</View>
									<View className="flex-1">
										<Text className="text-card-foreground font-semibold mb-1">
											Budget Optimization
										</Text>
										<Text className="text-muted-foreground text-sm">
											You're 85% through your monthly budget. Consider reducing dining expenses to stay on track.
										</Text>
									</View>
								</View>
							</View>
						</View>
					</View>

					{/* Spacer for chat input */}
					<View className="h-24" />
				</Animated.View>
			</ScrollView>

			{/* Chat Input */}
			<View className="px-6 pb-8 pt-4 bg-background border-t border-border/50">
				<View className="flex-row items-center gap-3">
					{/* Plus Button */}
					<TouchableOpacity
						className="w-12 h-12 rounded-full bg-foreground items-center justify-center shadow-lg"
						style={{
							shadowColor: '#000',
							shadowOffset: { width: 0, height: 4 },
							shadowOpacity: 0.3,
							shadowRadius: 8,
							elevation: 8,
						}}
					>
						<Icon as={PlusIcon} className="text-background" size={20} />
					</TouchableOpacity>

					{/* Text Input */}
					<View className="flex-1 bg-muted rounded-full px-4 py-3">
						<TextInput
							value={inputText}
							onChangeText={setInputText}
							placeholder="Ask Flowi about money or your money"
							placeholderTextColor="#6B7280"
							className="text-foreground text-base"
							multiline
							maxLength={500}
						/>
					</View>

					{/* Send/Mic Button */}
					<Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
						<TouchableOpacity
							onPress={inputText.trim() ? handleSendMessage : toggleRecording}
							className={`w-12 h-12 rounded-full items-center justify-center shadow-lg ${inputText.trim() ? 'bg-primary' : 'bg-muted'
								}`}
							style={{
								shadowColor: '#000',
								shadowOffset: { width: 0, height: 4 },
								shadowOpacity: 0.3,
								shadowRadius: 8,
								elevation: 8,
							}}
						>
							<Icon
								as={inputText.trim() ? SendIcon : MicIcon}
								className={inputText.trim() ? 'text-primary-foreground' : 'text-muted-foreground'}
								size={20}
							/>
						</TouchableOpacity>
					</Animated.View>
				</View>

				{/* Recording Indicator */}
				{isRecording && (
					<Animated.View
						className="mt-3 flex-row items-center justify-center gap-2"
						style={{ opacity: fadeAnim }}
					>
						<Animated.View
							className="w-2 h-2 bg-red-500 rounded-full"
							style={{ transform: [{ scale: pulseAnim }] }}
						/>
						<Text className="text-muted-foreground text-sm">Listening...</Text>
					</Animated.View>
				)}

				{/* Typing Indicator */}
				{isTyping && (
					<Animated.View
						className="mt-3 flex-row items-center justify-center gap-2"
						style={{ opacity: fadeAnim }}
					>
						<View className="flex-row gap-1">
							<View className="w-1 h-1 bg-primary rounded-full animate-pulse" />
							<View className="w-1 h-1 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
							<View className="w-1 h-1 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
						</View>
						<Text className="text-muted-foreground text-sm">Flowi is thinking...</Text>
					</Animated.View>
				)}
			</View>
		</Container>
	)
}