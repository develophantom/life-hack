import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from './icon';
import { Text } from './text';

interface FabProps {
	onPress?: () => void;
	icon?: React.ComponentType<any>;
	label?: string;
	variant?: 'primary' | 'secondary' | 'accent';
	size?: 'sm' | 'md' | 'lg';
	position?: 'bottom-right' | 'bottom-left' | 'bottom-center';
}

export function Fab({
	onPress,
	icon: IconComponent,
	label,
	variant = 'primary',
	size = 'md',
	position = 'bottom-right',
}: FabProps) {
	const insets = useSafeAreaInsets();
	const getVariantStyles = () => {
		switch (variant) {
			case 'primary':
				return 'bg-primary';
			case 'secondary':
				return 'bg-secondary';
			case 'accent':
				return 'bg-accent';
			default:
				return 'bg-primary';
		}
	};

	const getSizeStyles = () => {
		switch (size) {
			case 'sm':
				return 'w-12 h-12';
			case 'md':
				return 'w-14 h-14';
			case 'lg':
				return 'w-16 h-16';
			default:
				return 'w-14 h-14';
		}
	};

	const getPositionStyles = () => {
		const bottomOffset = insets.bottom + 20; // Safe area + extra padding
		switch (position) {
			case 'bottom-right':
				return `absolute right-6`;
			case 'bottom-left':
				return `absolute left-6`;
			case 'bottom-center':
				return `absolute left-1/2 -translate-x-1/2`;
			default:
				return `absolute right-6`;
		}
	};

	const getIconSize = () => {
		switch (size) {
			case 'sm':
				return 16;
			case 'md':
				return 20;
			case 'lg':
				return 24;
			default:
				return 20;
		}
	};

	return (
		<TouchableOpacity
			onPress={onPress}
			className={`${getPositionStyles()} ${getVariantStyles()} ${getSizeStyles()} rounded-full items-center justify-center shadow-lg`}
			style={{
				bottom: insets.bottom + 20, // Safe area + extra padding
				shadowColor: '#000',
				shadowOffset: { width: 0, height: 4 },
				shadowOpacity: 0.3,
				shadowRadius: 8,
				elevation: 8,
			}}
		>
			{IconComponent && (
				<Icon
					as={IconComponent}
					className="text-primary-foreground"
					size={getIconSize()}
				/>
			)}
			{label && (
				<Text className="text-primary-foreground text-xs font-medium mt-1">
					{label}
				</Text>
			)}
		</TouchableOpacity>
	);
}
