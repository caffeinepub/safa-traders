import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { UserProfile, SizeInfo } from '../backend';

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveDealerProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, location, contactNumber }: { name: string; location: string; contactNumber: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveDealerProfile(name, location, contactNumber);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useSaveCompanyProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, address, registrationNumber }: { name: string; address: string; registrationNumber: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCompanyProfile(name, address, registrationNumber);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useAddQuotationRequest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      companyName,
      contactPerson,
      phoneNumber,
      email,
      siteType,
      siteAddress,
      sizeInfo,
      additionalNotes
    }: {
      companyName: string;
      contactPerson: string;
      phoneNumber: string;
      email: string;
      siteType: string;
      siteAddress: string;
      sizeInfo: SizeInfo[];
      additionalNotes: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addQuotationRequest(
        companyName,
        contactPerson,
        phoneNumber,
        email,
        siteType,
        siteAddress,
        sizeInfo,
        additionalNotes
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quotationRequests'] });
    },
  });
}
