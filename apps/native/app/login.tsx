import React from 'react';
import { SignInForm } from '@/components/sign-in-form';
import { View } from 'react-native';

export default function AuthLogin() {
   return (
      <>
         <View className="flex-[.4]">
         </View>
         <View className="flex-[.35] w-full max-w-sm">
            <SignInForm />
         </View>
      </>
   );
}
