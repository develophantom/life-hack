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

// Login validation schema
const loginSchema = z.object({
	email: z
		.string()
		.min(1, 'Email is required')
		.email('Please enter a valid email address')
		.max(255, 'Email is too long')
		.toLowerCase(),
	password: z
		.string()
		.min(1, 'Password is required')
		.max(128, 'Password is too long'),
	rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
	const router = useRouter();
	const [isLoading, setIsLoading] = React.useState(false);
	const [showPassword, setShowPassword] = React.useState(false);

	const passwordInputRef = React.useRef<TextInput>(null);

	const {
		control,
		handleSubmit,
		formState: { errors, isValid },
		setError,
		clearErrors,
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		mode: 'onChange',
		defaultValues: {
			email: '',
			password: '',
			rememberMe: false,
		},
	});

	function onEmailSubmitEditing() {
		passwordInputRef.current?.focus();
	}

	async function onSubmit(data: LoginFormData) {
		if (!isValid) return;

		setIsLoading(true);
		clearErrors();

		try {
			const result = await authClient.signIn.email({
				email: data.email,
				password: data.password,
				rememberMe: data.rememberMe,
			});

			if (result.error) {
				// Handle specific error cases
				if (result.error.message?.includes('email') || result.error.message?.includes('user')) {
					setError('email', { message: 'Invalid email or user not found' });
				} else if (result.error.message?.includes('password') || result.error.message?.includes('credentials')) {
					setError('password', { message: 'Invalid password' });
				} else if (result.error.message?.includes('verified') || result.error.message?.includes('verification')) {
					Alert.alert(
						'Account Not Verified',
						'Please check your email and verify your account before logging in.',
						[
							{
								text: 'Resend Verification',
								onPress: () => {
									// TODO: Implement resend verification
									console.log('Resend verification email');
								},
							},
							{ text: 'OK' },
						]
					);
				} else {
					Alert.alert('Login Failed', result.error.message || 'An error occurred');
				}
				return;
			}

			// Success - navigate to dashboard
			Alert.alert(
				'Login Successful',
				'Welcome back to Hack-Life!',
				[
					{
						text: 'Continue',
						onPress: () => router.push('/(dashboard)'),
					},
				]
			);
		} catch (error) {
			console.error('Login error:', error);
			Alert.alert(
				'Login Failed',
				'An unexpected error occurred. Please try again.'
			);
		} finally {
			setIsLoading(false);
		}
	}

	function handleForgotPassword() {
		Alert.alert(
			'Reset Password',
			'Enter your email address and we\'ll send you a link to reset your password.',
			[
				{
					text: 'Cancel',
					style: 'cancel',
				},
				{
					text: 'Send Reset Link',
					onPress: () => {
						// TODO: Implement password reset
						console.log('Send password reset email');
					},
				},
			]
		);
	}

	return (
		<View className="gap-6">
			<Card className="bg-card border-border shadow-sm">
				<CardHeader>
					<CardTitle className="text-center text-xl sm:text-left text-card-foreground" style={fontStyles.black}>
						Welcome back
					</CardTitle>
					<CardDescription className="text-center sm:text-left text-muted-foreground" style={fontStyles.regular}>
						Sign in to your account to continue.
					</CardDescription>
				</CardHeader>
				<CardContent className="gap-6">
					<View className="gap-4">
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
								<Pressable onPress={handleForgotPassword}>
									<Text className="text-primary text-sm" style={fontStyles.regular}>
										Forgot password?
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
										autoComplete="current-password"
										value={value}
										onChangeText={onChange}
										onBlur={onBlur}
										returnKeyType="done"
									/>
								)}
							/>
							<View className="flex-row items-center justify-between">
								{errors.password && (
									<Text className="text-red-500 text-sm" style={fontStyles.regular}>
										{errors.password.message}
									</Text>
								)}
								<Pressable onPress={() => setShowPassword(!showPassword)}>
									<Text className="text-primary text-sm" style={fontStyles.regular}>
										{showPassword ? 'Hide' : 'Show'}
									</Text>
								</Pressable>
							</View>
						</View>

						{/* Remember Me Checkbox */}
						<View className="gap-1.5">
							<Controller
								control={control}
								name="rememberMe"
								render={({ field: { onChange, value } }) => (
									<Pressable
										className="flex-row items-center gap-3"
										onPress={() => onChange(!value)}
									>
										<View className={`w-5 h-5 border-2 rounded ${value ? 'bg-primary border-primary' : 'border-gray-300'
											}`}>
											{value && (
												<Text className="text-white text-xs text-center leading-5">✓</Text>
											)}
										</View>
										<Text className="text-sm text-muted-foreground" style={fontStyles.regular}>
											Remember me for 30 days
										</Text>
									</Pressable>
								)}
							/>
						</View>

						{/* Submit Button */}
						<Button
							className={`w-full ${isValid && !isLoading ? 'bg-primary' : 'bg-gray-400'}`}
							onPress={handleSubmit(onSubmit)}
							disabled={!isValid || isLoading}
						>
							<Text className="text-primary-foreground" style={fontStyles.bold}>
								{isLoading ? 'Signing in...' : 'Sign In'}
							</Text>
						</Button>
					</View>

					<Text className="text-center text-sm text-muted-foreground" style={fontStyles.regular}>
						Don't have an account?{' '}
						<Pressable
							onPress={() => {
								router.push('/register');
							}}>
							<Text className="text-sm underline underline-offset-4 text-primary" style={fontStyles.bold}>
								Sign up
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
