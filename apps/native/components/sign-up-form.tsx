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
import * as React from 'react';
import { Pressable, TextInput, View } from 'react-native';

export function SignUpForm() {

   const router = useRouter()

   const passwordInputRef = React.useRef<TextInput>(null);

   function onEmailSubmitEditing() {
      passwordInputRef.current?.focus();
   }

   function onSubmit() {
      // TODO: Submit form and navigate to protected screen if successful
   }

   return (
      <View className="gap-6">
         <Card className="bg-card border-border shadow-sm">
            <CardHeader>
               <CardTitle className="text-center text-xl sm:text-left text-card-foreground">Create your account</CardTitle>
               <CardDescription className="text-center sm:text-left text-muted-foreground">
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
                        returnKeyType="send"
                        onSubmitEditing={onSubmit}
                     />
                  </View>
                  <Button className="w-full bg-primary" onPress={onSubmit}>
                     <Text className="text-primary-foreground">Continue</Text>
                  </Button>
               </View>
               <Text className="text-center text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <Pressable
                     onPress={() => {
                        router.push('/login');
                     }}>
                     <Text className="text-sm underline underline-offset-4 text-primary">Sign in</Text>
                  </Pressable>
               </Text>
               <View className="flex-row items-center">
                  <Separator className="flex-1" />
                  <Text className="text-muted-foreground px-4 text-sm">or</Text>
                  <Separator className="flex-1" />
               </View>
               <SocialConnections />
            </CardContent>
         </Card>
      </View>
   );
}
