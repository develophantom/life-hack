import { useQuery } from '@tanstack/react-query';
import { orpc } from '@/lib/orpc';

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
