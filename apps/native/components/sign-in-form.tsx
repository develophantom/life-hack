import { SocialConnections } from '@/components/social-connections';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
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
import { AlertCircleIcon, CheckCircle2Icon, MailIcon } from 'lucide-react-native';
import * as React from 'react';
import { Pressable, type TextInput, View } from 'react-native';

export function SignInForm() {
   const router = useRouter()
   const [email, setEmail] = React.useState('');
   const [password, setPassword] = React.useState('');
   const [isLoading, setIsLoading] = React.useState(false);
   const [alert, setAlert] = React.useState<{
      type: 'success' | 'error' | 'info';
      title: string;
      description: string;
   } | null>(null);

   const passwordInputRef = React.useRef<TextInput>(null);

   function onEmailSubmitEditing() {
      passwordInputRef.current?.focus();
   }

   async function onSubmit() {
      if (!email || !password) {
         setAlert({
            type: 'error',
            title: 'Missing Information',
            description: 'Please fill in all fields to continue.'
         });
         return;
      }

      setIsLoading(true);
      setAlert(null); // Clear any existing alerts

      try {
         const result = await authClient.signIn.email({
            email: email,
            password: password,
         });

         if (result.error) {
            if (result.error.message?.includes('email') || result.error.message?.includes('user')) {
               setAlert({
                  type: 'error',
                  title: 'Login Failed',
                  description: 'Invalid email or user not found. Please check your email address.'
               });
            } else if (result.error.message?.includes('password') || result.error.message?.includes('credentials')) {
               setAlert({
                  type: 'error',
                  title: 'Login Failed',
                  description: 'Invalid password. Please check your password and try again.'
               });
            } else if (result.error.message?.includes('verified') || result.error.message?.includes('verification')) {
               setAlert({
                  type: 'info',
                  title: 'Account Not Verified',
                  description: 'Please check your email and verify your account before logging in.'
               });
            } else {
               setAlert({
                  type: 'error',
                  title: 'Login Failed',
                  description: result.error.message || 'An error occurred during login. Please try again.'
               });
            }
            return;
         }

         setAlert({
            type: 'success',
            title: 'Welcome Back!',
            description: 'You have successfully signed in to Hack-Life!'
         });

         // Navigate to dashboard after a short delay
         setTimeout(() => {
            router.push('/(dashboard)');
         }, 1500);

      } catch (error) {
         console.error('Login error:', error);
         setAlert({
            type: 'error',
            title: 'Login Failed',
            description: 'An unexpected error occurred. Please try again.'
         });
      } finally {
         setIsLoading(false);
      }
   }

   return (
      <View className="gap-6">
         {/* Alert Messages */}
         {alert && (
            <Alert
               icon={alert.type === 'success' ? CheckCircle2Icon : alert.type === 'info' ? MailIcon : AlertCircleIcon}
               variant={alert.type === 'error' ? 'destructive' : 'default'}
            >
               <AlertTitle>{alert.title}</AlertTitle>
               <AlertDescription>{alert.description}</AlertDescription>
            </Alert>
         )}

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
                              setAlert({
                                 type: 'info',
                                 title: 'Password Reset',
                                 description: 'Password reset functionality will be implemented soon. Please contact support for assistance.'
                              });
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
