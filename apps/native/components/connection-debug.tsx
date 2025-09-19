import React from 'react';
import { View, Text } from 'react-native';
import { useConnectionStatus } from '@/lib/use-connection-status';
import { getApiUrl } from '@/lib/config';
import { fontStyles } from '@/lib/fonts';

export function ConnectionDebug() {
	const { status, error, lastChecked } = useConnectionStatus();
	const apiUrl = getApiUrl();

	return (
		<View className="bg-muted p-4 rounded-lg m-4">
			<Text className="text-foreground text-lg mb-2" style={fontStyles.bold}>
				Connection Debug
			</Text>
			<Text className="text-foreground text-sm mb-1" style={fontStyles.regular}>
				Status: {status}
			</Text>
			<Text className="text-foreground text-sm mb-1" style={fontStyles.regular}>
				API URL: {apiUrl}
			</Text>
			<Text className="text-foreground text-sm mb-1" style={fontStyles.regular}>
				Last Checked: {lastChecked ? lastChecked.toLocaleTimeString() : 'Never'}
			</Text>
			{error && (
				<Text className="text-red-500 text-sm" style={fontStyles.regular}>
					Error: {error}
				</Text>
			)}
		</View>
	);
}
