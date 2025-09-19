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
import * as React from 'react';
import { Pressable, TextInput, View, Alert } from 'react-native';
import { authClient } from "@/lib/auth-client";

export function SignUpForm() {

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
         const result = await authClient.signUp.email({
            email: email,
            password: password,
            name: email.split('@')[0] // Use email prefix as name
         });

         if (result.error) {
            Alert.alert('Registration Failed', result.error.message || 'An error occurred');
            return;
         }

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
         Alert.alert('Registration Failed', 'An unexpected error occurred. Please try again.');
      } finally {
         setIsLoading(false);
      }
   }



   return (
      <View className="gap-6">
         <Card className="bg-card border-border shadow-sm">
            <CardHeader>
               <CardTitle className="text-center text-xl sm:text-left text-card-foreground" style={fontStyles.black}>Create your account</CardTitle>
               <CardDescription className="text-center sm:text-left text-muted-foreground" style={fontStyles.regular}>
                  Welcome! Please fill in the details to get started.
               </CardDescription>
            </CardHeader>
            <CardContent className="gap-6">
               <View className="gap-6">
                  <View className="gap-1.5">
                     <Label htmlFor="email">Email</Label>
                     <Input
                        className='text-foreground'
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
                     </View>
                     <Input
                        className='text-foreground'
                        ref={passwordInputRef}
                        id="password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        returnKeyType="send"
                        onSubmitEditing={onSubmit}
                        autoComplete="password"
                     />
                  </View>
                  <Button
                     className={`w-full ${email && password && !isLoading ? 'bg-primary' : 'bg-gray-400'}`}
                     onPress={onSubmit}
                     disabled={!email || !password || isLoading}
                  >
                     <Text className="text-primary-foreground" style={fontStyles.bold}>
                        {isLoading ? 'Creating Account...' : 'Continue'}
                     </Text>
                  </Button>
               </View>
               <Text className="text-center text-sm text-muted-foreground" style={fontStyles.regular}>
                  Already have an account?{' '}
                  <Pressable
                     onPress={() => {
                        router.push('/login');
                     }}>
                     <Text className="text-sm underline underline-offset-4 text-primary" style={fontStyles.bold}>Sign in</Text>
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
