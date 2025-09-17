import React from 'react'
import { SignUpForm } from '@/components/sign-up-form';
import { ScrollView, View } from 'react-native';

export default function AuthRegister() {
   return (
      <>
         <View className="flex-[.3]">
         </View>
         <View className="flex-[.6] w-full max-w-sm">
            <SignUpForm />
         </View>
      </>
   );
}
