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
import { Pressable, type TextInput, View, Alert } from 'react-native';

export function SignInForm() {
   const router = useRouter()
   const [email, setEmail] = React.useState('');
   const [password, setPassword] = React.useState('');
   const [isLoading, setIsLoading] = React.useState(false);

   const passwordInputRef = React.useRef<TextInput>(null);

   function onEmailSubmitEditing() {
      passwordInputRef.current?.focus();
   }

   async function onSubmit() {
      if (!email || !password) {
         Alert.alert('Error', 'Please fill in all fields');
         return;
      }

      setIsLoading(true);

      try {
         const result = await authClient.signIn.email({
            email: email,
            password: password,
         });

         if (result.error) {
            if (result.error.message?.includes('email') || result.error.message?.includes('user')) {
               Alert.alert('Login Failed', 'Invalid email or user not found');
            } else if (result.error.message?.includes('password') || result.error.message?.includes('credentials')) {
               Alert.alert('Login Failed', 'Invalid password');
            } else if (result.error.message?.includes('verified') || result.error.message?.includes('verification')) {
               Alert.alert(
                  'Account Not Verified',
                  'Please check your email and verify your account before logging in.',
                  [{ text: 'OK' }]
               );
            } else {
               Alert.alert('Login Failed', result.error.message || 'An error occurred');
            }
            return;
         }

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
         Alert.alert('Login Failed', 'An unexpected error occurred. Please try again.');
      } finally {
         setIsLoading(false);
      }
   }

   return (
      <View className="gap-6">
         <Card className="bg-card border-border shadow-sm">
            <CardHeader>
               <CardTitle className="text-center text-xl sm:text-left text-card-foreground" style={fontStyles.black}>Sign in to your app</CardTitle>
               <CardDescription className="text-center sm:text-left text-muted-foreground" style={fontStyles.regular}>
                  Welcome back! Please sign in to continue
               </CardDescription>
            </CardHeader>
            <CardContent className="gap-6">
               <View className="gap-6">
                  <View className="gap-1.5">
                     <Label htmlFor="email">Email</Label>
                     <Input
                        className="text-foreground"
                        id="email"
                        placeholder="m@example.com"
                        keyboardType="email-address"
                        autoComplete="email"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                        onSubmitEditing={onEmailSubmitEditing}
                        returnKeyType="next"
                        submitBehavior="submit"
                     />
                  </View>
                  <View className="gap-1.5">
                     <View className="flex-row items-center">
                        <Label htmlFor="password">Password</Label>
                        <Button
                           variant="link"
                           size="sm"
                           className="web:h-fit ml-auto h-4 px-1 py-0 sm:h-4"
                           onPress={() => {
                              Alert.alert(
                                 'Reset Password',
                                 'Enter your email address and we\'ll send you a link to reset your password.',
                                 [
                                    { text: 'Cancel', style: 'cancel' },
                                    { text: 'Send Reset Link', onPress: () => console.log('Send password reset email') },
                                 ]
                              );
                           }}>
                           <Text className="font-normal leading-4 text-primary" style={fontStyles.regular}>Forgot your password?</Text>
                        </Button>
                     </View>
                     <Input
                        className="text-foreground"
                        ref={passwordInputRef}
                        id="password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        returnKeyType="send"
                        onSubmitEditing={onSubmit}
                     />
                  </View>
                  <Button
                     className={`w-full ${email && password && !isLoading ? 'bg-primary' : 'bg-gray-400'}`}
                     onPress={onSubmit}
                     disabled={!email || !password || isLoading}
                  >
                     <Text className="text-primary-foreground" style={fontStyles.bold}>
                        {isLoading ? 'Signing in...' : 'Continue'}
                     </Text>
                  </Button>
               </View>
               <Text className="text-center text-sm text-muted-foreground" style={fontStyles.regular}>
                  Don&apos;t have an account?{' '}
                  <Pressable
                     onPress={() => {
                        // TODO: Navigate to sign up screen
                        router.push('/register');
                     }}>
                     <Text className="text-sm underline underline-offset-4 text-primary" style={fontStyles.bold}>Sign up</Text>
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
