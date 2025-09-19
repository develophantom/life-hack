import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { orpc } from '@/lib/orpc';
import { getApiUrl } from '@/lib/config';

export type ConnectionStatus = 'connected' | 'disconnected' | 'connecting' | 'error';

export interface ConnectionStatusState {
   status: ConnectionStatus;
   lastChecked: Date | null;
   error?: string;
}

export function useConnectionStatus() {
   const { data, error, isLoading, isError, dataUpdatedAt } = useQuery({
      ...orpc.healthCheck.queryOptions(),
      refetchInterval: 30000, // Refetch every 30 seconds
      retry: 1,
      retryDelay: 5000,
   });

   // Log connection info for debugging
   React.useEffect(() => {
      if (error) {
         console.log('--------------------------------');
         console.log('Connection error:', error);
         console.log('API URL use-connection-status:', getApiUrl());
         console.log('--------------------------------');
      }
   }, [error]);

   const getStatus = (): ConnectionStatus => {
      if (isLoading) return 'connecting';
      if (isError) return 'error';
      if (data) return 'connected';
      return 'disconnected';
   };

   return {
      status: getStatus(),
      lastChecked: dataUpdatedAt ? new Date(dataUpdatedAt) : null,
      error: error?.message,
   };
}
