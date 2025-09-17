import React, { useRef, useState, ReactNode, forwardRef, useImperativeHandle } from "react";
import { Animated, TouchableOpacity, Dimensions, View, PanResponder } from "react-native";

interface BottomSheetProps {
   children: ReactNode;
   initialHeight?: number; // Percentage of screen height (0-1)
   expandedHeight?: number; // Percentage of screen height when expanded (0-1)
   className?: string;
}

export interface BottomSheetRef {
   toggle: () => void;
   expand: () => void;
   collapse: () => void;
}

export const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(({
   children,
   initialHeight = 0.7, // Start at 70% s
   expandedHeight = 1,
   className = ""
}, ref) => {
   const screenHeight = Dimensions.get('window').height;
   const [sheetHeight, setSheetHeight] = useState(initialHeight);
   const animatedHeight = useRef(new Animated.Value(screenHeight * initialHeight)).current;
   const lastGestureDy = useRef(0);

   const expandSheet = () => {
      const targetHeight = screenHeight * expandedHeight;
      setSheetHeight(expandedHeight);
      Animated.timing(animatedHeight, {
         toValue: targetHeight,
         duration: 300,
         useNativeDriver: false,
      }).start();
   };

   const collapseSheet = () => {
      const targetHeight = screenHeight * initialHeight;
      setSheetHeight(initialHeight);
      Animated.timing(animatedHeight, {
         toValue: targetHeight,
         duration: 300,
         useNativeDriver: false,
      }).start();
   };

   const toggleSheet = () => {
      if (sheetHeight < 0.5) {
         expandSheet();
      } else {
         collapseSheet();
      }
   };

   // PanResponder for drag gestures
   const panResponder = useRef(
      PanResponder.create({
         onMoveShouldSetPanResponder: (evt, gestureState) => {
            return Math.abs(gestureState.dy) > 3; // Lower threshold for easier detection
         },
         onPanResponderGrant: () => {
            lastGestureDy.current = 0;
         },
         onPanResponderMove: (evt, gestureState) => {
            const deltaY = gestureState.dy - lastGestureDy.current;
            const currentHeight = screenHeight * sheetHeight;
            const newHeight = Math.max(100, Math.min(screenHeight * 0.95, currentHeight - deltaY));

            animatedHeight.setValue(newHeight);
            lastGestureDy.current = gestureState.dy;
         },
         onPanResponderRelease: (evt, gestureState) => {
            const velocity = gestureState.vy;
            const currentHeight = screenHeight * sheetHeight;
            const heightPercentage = currentHeight / screenHeight;

            // Determine target height based on velocity and current position
            let targetHeight;
            if (Math.abs(velocity) > 0.3) { // Lower velocity threshold for easier closing
               // Fast swipe - use velocity to determine direction
               targetHeight = velocity > 0 ? screenHeight * 0.25 : screenHeight * 0.9;
            } else {
               // Slow drag - snap to nearest position with more sensitive threshold
               targetHeight = heightPercentage > 0.4 ? screenHeight * 0.9 : screenHeight * 0.25;
            }

            setSheetHeight(targetHeight / screenHeight);
            Animated.timing(animatedHeight, {
               toValue: targetHeight,
               duration: 300,
               useNativeDriver: false,
            }).start();
         },
      })
   ).current;

   useImperativeHandle(ref, () => ({
      toggle: toggleSheet,
      expand: expandSheet,
      collapse: collapseSheet,
   }));

   return (
      <Animated.View
         className={`absolute bottom-0 left-0 right-0 bg-muted-foreground shadow-xl ${className}`}
         style={{
            height: animatedHeight,
         }}
         {...panResponder.panHandlers}
      >
         {/* Handle Bar - Tap to close */}
         <TouchableOpacity
            className="items-center py-3"
            onPress={collapseSheet}
            activeOpacity={0.7}
         >
            <View className="w-12 h-1 bg-gray-300 rounded-full" />
         </TouchableOpacity>

         {children}
      </Animated.View>
   );
});
