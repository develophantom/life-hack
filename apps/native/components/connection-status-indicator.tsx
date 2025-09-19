import React from 'react';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';
import { CheckCircleIcon, XCircleIcon, ClockIcon, AlertCircleIcon } from 'lucide-react-native';
import { useConnectionStatus, ConnectionStatus } from '@/lib/use-connection-status';
import { fontStyles } from '@/lib/fonts';

interface ConnectionStatusIndicatorProps {
	showText?: boolean;
	size?: 'sm' | 'md' | 'lg';
}

export function ConnectionStatusIndicator({
	showText = true,
	size = 'md'
}: ConnectionStatusIndicatorProps) {
	const { status, lastChecked, error } = useConnectionStatus();

	const getStatusConfig = (status: ConnectionStatus) => {
		switch (status) {
			case 'connected':
				return {
					icon: CheckCircleIcon,
					color: 'text-green-500',
					bgColor: 'bg-green-500/10',
					text: 'Connected',
					description: 'Server online',
				};
			case 'connecting':
				return {
					icon: ClockIcon,
					color: 'text-yellow-500',
					bgColor: 'bg-yellow-500/10',
					text: 'Connecting',
					description: 'Checking connection...',
				};
			case 'error':
				return {
					icon: XCircleIcon,
					color: 'text-red-500',
					bgColor: 'bg-red-500/10',
					text: 'Disconnected',
					description: error || 'Connection failed',
				};
			case 'disconnected':
				return {
					icon: AlertCircleIcon,
					color: 'text-orange-500',
					bgColor: 'bg-orange-500/10',
					text: 'Disconnected',
					description: 'Server unavailable',
				};
		}
	};

	const config = getStatusConfig(status);
	const iconSize = size === 'sm' ? 16 : size === 'md' ? 20 : 24;
	const textSize = size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base';

	return (
		<View className={`flex-row items-center gap-2 px-3 py-2 rounded-lg ${config.bgColor}`}>
			<Icon
				as={config.icon}
				className={config.color}
				size={iconSize}
			/>
			{showText && (
				<View className="flex-1">
					<Text className={`${config.color} ${textSize}`} style={fontStyles.regular}>
						{config.text}
					</Text>
					{config.description && (
						<Text className="text-muted-foreground text-xs" style={fontStyles.regular}>
							{config.description}
						</Text>
					)}
				</View>
			)}
		</View>
	);
}

// Compact version for headers/toolbars
export function ConnectionStatusDot() {
	const { status } = useConnectionStatus();

	const getDotColor = (status: ConnectionStatus) => {
		switch (status) {
			case 'connected':
				return 'bg-green-500';
			case 'connecting':
				return 'bg-yellow-500';
			case 'error':
			case 'disconnected':
				return 'bg-red-500';
		}
	};

	return (
		<View className={`w-3 h-3 rounded-full ${getDotColor(status)}`} />
	);
}
