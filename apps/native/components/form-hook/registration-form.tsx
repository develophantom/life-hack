import { SocialConnections } from '@/components/social-connections';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { useRouter } from 'expo-router';
import { fontStyles } from '@/lib/fonts';
import { authClient } from '@/lib/auth-client';
import * as React from 'react';
import { Pressable, TextInput, View, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Comprehensive validation schema with security rules
const registrationSchema = z.object({
	name: z
		.string()
		.min(2, 'Name must be at least 2 characters')
		.max(50, 'Name must be less than 50 characters')
		.regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
	email: z
		.string()
		.min(1, 'Email is required')
		.email('Please enter a valid email address')
		.max(255, 'Email is too long')
		.toLowerCase(),
	password: z
		.string()
		.min(8, 'Password must be at least 8 characters')
		.max(128, 'Password is too long')
		.regex(/^(?=.*[a-z])/, 'Password must contain at least one lowercase letter')
		.regex(/^(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
		.regex(/^(?=.*\d)/, 'Password must contain at least one number')
		.regex(/^(?=.*[@$!%*?&])/, 'Password must contain at least one special character (@$!%*?&)'),
	confirmPassword: z.string(),
	termsAccepted: z
		.boolean()
		.refine((val) => val === true, 'You must accept the terms and conditions'),
}).refine((data) => data.password === data.confirmPassword, {
	message: "Passwords don't match",
	path: ["confirmPassword"],
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

export function RegistrationForm() {
	const router = useRouter();
	const [isLoading, setIsLoading] = React.useState(false);
	const [showPassword, setShowPassword] = React.useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

	const passwordInputRef = React.useRef<TextInput>(null);
	const confirmPasswordInputRef = React.useRef<TextInput>(null);
	const termsCheckboxRef = React.useRef<TextInput>(null);

	const {
		control,
		handleSubmit,
		formState: { errors, isValid },
		watch,
		setError,
		clearErrors,
	} = useForm<RegistrationFormData>({
		resolver: zodResolver(registrationSchema),
		mode: 'onChange',
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
			termsAccepted: false,
		},
	});

	const password = watch('password');

	// Password strength calculation
	const getPasswordStrength = (password: string) => {
		let strength = 0;
		if (password.length >= 8) strength++;
		if (/[a-z]/.test(password)) strength++;
		if (/[A-Z]/.test(password)) strength++;
		if (/\d/.test(password)) strength++;
		if (/[@$!%*?&]/.test(password)) strength++;
		return strength;
	};

	const passwordStrength = getPasswordStrength(password);

	const getStrengthColor = (strength: number) => {
		if (strength <= 2) return 'text-red-500';
		if (strength <= 3) return 'text-yellow-500';
		return 'text-green-500';
	};

	const getStrengthText = (strength: number) => {
		if (strength <= 2) return 'Weak';
		if (strength <= 3) return 'Medium';
		return 'Strong';
	};

	function onEmailSubmitEditing() {
		passwordInputRef.current?.focus();
	}

	function onPasswordSubmitEditing() {
		confirmPasswordInputRef.current?.focus();
	}

	function onConfirmPasswordSubmitEditing() {
		termsCheckboxRef.current?.focus();
	}

	async function onSubmit(data: RegistrationFormData) {
		if (!isValid) return;

		setIsLoading(true);
		clearErrors();

		try {
			const result = await authClient.signUp.email({
				email: data.email,
				password: data.password,
				name: data.name,
			});

			if (result.error) {
				// Handle specific error cases
				if (result.error.message?.includes('email')) {
					setError('email', { message: 'This email is already registered' });
				} else if (result.error.message?.includes('password')) {
					setError('password', { message: 'Password does not meet requirements' });
				} else {
					Alert.alert('Registration Failed', result.error.message || 'An error occurred');
				}
				return;
			}

			// Success - navigate to onboarding or dashboard
			Alert.alert(
				'Registration Successful',
				'Welcome to Hack-Life! Please check your email to verify your account.',
				[
					{
						text: 'Continue',
						onPress: () => router.push('/onboarding'),
					},
				]
			);
		} catch (error) {
			console.error('Registration error:', error);
			Alert.alert(
				'Registration Failed',
				'An unexpected error occurred. Please try again.'
			);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<View className="gap-6">
			<Card className="bg-card border-border shadow-sm">
				<CardHeader>
					<CardTitle className="text-center text-xl sm:text-left text-card-foreground" style={fontStyles.black}>
						Create your account
					</CardTitle>
					<CardDescription className="text-center sm:text-left text-muted-foreground" style={fontStyles.regular}>
						Welcome! Please fill in the details to get started.
					</CardDescription>
				</CardHeader>
				<CardContent className="gap-6">
					<View className="gap-4">
						{/* Name Field */}
						<View className="gap-1.5">
							<Label htmlFor="name">Full Name</Label>
							<Controller
								control={control}
								name="name"
								render={({ field: { onChange, onBlur, value } }) => (
									<Input
										className={`text-foreground ${errors.name ? 'border-red-500' : ''}`}
										id="name"
										placeholder="John Doe"
										autoComplete="name"
										autoCapitalize="words"
										value={value}
										onChangeText={onChange}
										onBlur={onBlur}
										onSubmitEditing={onEmailSubmitEditing}
										returnKeyType="next"
									/>
								)}
							/>
							{errors.name && (
								<Text className="text-red-500 text-sm" style={fontStyles.regular}>
									{errors.name.message}
								</Text>
							)}
						</View>

						{/* Email Field */}
						<View className="gap-1.5">
							<Label htmlFor="email">Email</Label>
							<Controller
								control={control}
								name="email"
								render={({ field: { onChange, onBlur, value } }) => (
									<Input
										className={`text-foreground ${errors.email ? 'border-red-500' : ''}`}
										id="email"
										placeholder="john@example.com"
										keyboardType="email-address"
										autoComplete="email"
										autoCapitalize="none"
										value={value}
										onChangeText={onChange}
										onBlur={onBlur}
										onSubmitEditing={onEmailSubmitEditing}
										returnKeyType="next"
									/>
								)}
							/>
							{errors.email && (
								<Text className="text-red-500 text-sm" style={fontStyles.regular}>
									{errors.email.message}
								</Text>
							)}
						</View>

						{/* Password Field */}
						<View className="gap-1.5">
							<View className="flex-row items-center justify-between">
								<Label htmlFor="password">Password</Label>
								<Pressable onPress={() => setShowPassword(!showPassword)}>
									<Text className="text-primary text-sm" style={fontStyles.regular}>
										{showPassword ? 'Hide' : 'Show'}
									</Text>
								</Pressable>
							</View>
							<Controller
								control={control}
								name="password"
								render={({ field: { onChange, onBlur, value } }) => (
									<Input
										className={`text-foreground ${errors.password ? 'border-red-500' : ''}`}
										ref={passwordInputRef}
										id="password"
										placeholder="Enter your password"
										secureTextEntry={!showPassword}
										autoComplete="new-password"
										value={value}
										onChangeText={onChange}
										onBlur={onBlur}
										onSubmitEditing={onPasswordSubmitEditing}
										returnKeyType="next"
									/>
								)}
							/>
							{password && (
								<View className="gap-1">
									<View className="flex-row items-center gap-2">
										<View className="flex-1 h-2 bg-gray-200 rounded-full">
											<View
												className={`h-2 rounded-full transition-all ${passwordStrength <= 2 ? 'bg-red-500' :
													passwordStrength <= 3 ? 'bg-yellow-500' : 'bg-green-500'
													}`}
												style={{ width: `${(passwordStrength / 5) * 100}%` }}
											/>
										</View>
										<Text className={`text-sm ${getStrengthColor(passwordStrength)}`} style={fontStyles.regular}>
											{getStrengthText(passwordStrength)}
										</Text>
									</View>
								</View>
							)}
							{errors.password && (
								<Text className="text-red-500 text-sm" style={fontStyles.regular}>
									{errors.password.message}
								</Text>
							)}
						</View>

						{/* Confirm Password Field */}
						<View className="gap-1.5">
							<View className="flex-row items-center justify-between">
								<Label htmlFor="confirmPassword">Confirm Password</Label>
								<Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
									<Text className="text-primary text-sm" style={fontStyles.regular}>
										{showConfirmPassword ? 'Hide' : 'Show'}
									</Text>
								</Pressable>
							</View>
							<Controller
								control={control}
								name="confirmPassword"
								render={({ field: { onChange, onBlur, value } }) => (
									<Input
										className={`text-foreground ${errors.confirmPassword ? 'border-red-500' : ''}`}
										ref={confirmPasswordInputRef}
										id="confirmPassword"
										placeholder="Confirm your password"
										secureTextEntry={!showConfirmPassword}
										autoComplete="new-password"
										value={value}
										onChangeText={onChange}
										onBlur={onBlur}
										onSubmitEditing={onConfirmPasswordSubmitEditing}
										returnKeyType="next"
									/>
								)}
							/>
							{errors.confirmPassword && (
								<Text className="text-red-500 text-sm" style={fontStyles.regular}>
									{errors.confirmPassword.message}
								</Text>
							)}
						</View>

						{/* Terms and Conditions */}
						<View className="gap-1.5">
							<Controller
								control={control}
								name="termsAccepted"
								render={({ field: { onChange, value } }) => (
									<Pressable
										className="flex-row items-start gap-3"
										onPress={() => onChange(!value)}
									>
										<View className={`w-5 h-5 border-2 rounded mt-0.5 ${value ? 'bg-primary border-primary' : 'border-gray-300'
											}`}>
											{value && (
												<Text className="text-white text-xs text-center leading-5">✓</Text>
											)}
										</View>
										<View className="flex-1">
											<Text className="text-sm text-muted-foreground" style={fontStyles.regular}>
												I agree to the{' '}
												<Text className="text-primary underline">Terms of Service</Text>
												{' '}and{' '}
												<Text className="text-primary underline">Privacy Policy</Text>
											</Text>
										</View>
									</Pressable>
								)}
							/>
							{errors.termsAccepted && (
								<Text className="text-red-500 text-sm" style={fontStyles.regular}>
									{errors.termsAccepted.message}
								</Text>
							)}
						</View>

						{/* Submit Button */}
						<Button
							className={`w-full ${isValid && !isLoading ? 'bg-primary' : 'bg-gray-400'}`}
							onPress={handleSubmit(onSubmit)}
							disabled={!isValid || isLoading}
						>
							<Text className="text-primary-foreground" style={fontStyles.bold}>
								{isLoading ? 'Creating Account...' : 'Create Account'}
							</Text>
						</Button>
					</View>

					<Text className="text-center text-sm text-muted-foreground" style={fontStyles.regular}>
						Already have an account?{' '}
						<Pressable
							onPress={() => {
								router.push('/login');
							}}>
							<Text className="text-sm underline underline-offset-4 text-primary" style={fontStyles.bold}>
								Sign in
							</Text>
						</Pressable>
					</Text>

					<View className="flex-row items-center">
						<Separator className="flex-1" />
						<Text className="text-muted-foreground px-4 text-sm" style={fontStyles.regular}>or</Text>
						<Separator className="flex-1" />
					</View>

					<SocialConnections />
				</CardContent>
			</Card>
		</View>
	);
}
