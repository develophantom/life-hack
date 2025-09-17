import React from 'react';
import { View, TouchableOpacity, Modal as RNModal } from 'react-native';
import { Text } from './text';
import { Button } from './button';
import { fontStyles } from '@/lib/fonts';

interface ModalProps {
   visible: boolean;
   onClose: () => void;
   title: string;
   description: string;
   actionText?: string;
   onAction?: () => void;
   children?: React.ReactNode;
}

export function Modal({
   visible,
   onClose,
   title,
   description,
   children,
}: ModalProps) {
   return (
      <RNModal
         visible={visible}
         transparent
         animationType="fade"
         onRequestClose={onClose}
      >
         <TouchableOpacity
            className="flex-1 bg-background/65 items-center justify-center px-5 py-14"
            activeOpacity={1}
            onPress={onClose}
         >
            <TouchableOpacity
               className="bg-card rounded-2xl p-5 w-full max-w-sm shadow-xl max-h-[80vh]"
               activeOpacity={1}
               onPress={(e) => e.stopPropagation()}
            >
               {/* Title */}
               <Text style={fontStyles.bold} className="text-card-foreground text-xl mb-3">
                  {title}
               </Text>

               {/* Description */}
               {description && (
                  <Text style={fontStyles.regular} className="text-muted-foreground text-base mb-6">
                     {description}
                  </Text>
               )}

               {/* Content */}
               {children && (
                  <View className="mb-6">
                     {children}
                  </View>
               )}

            </TouchableOpacity>
         </TouchableOpacity>
      </RNModal>
   );
}
