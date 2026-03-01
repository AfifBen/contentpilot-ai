import { useMutation } from '@tanstack/react-query';
import { generateContent } from '../utils/api';

/**
 * Custom hook for content generation
 */
export function useContentGeneration() {
  const mutation = useMutation({
    mutationFn: generateContent,
    onError: (error) => {
      console.error('Generation failed:', error);
    },
  });

  const generate = (data) => {
    return mutation.mutateAsync(data);
  };

  return {
    generate,
    isGenerating: mutation.isPending,
    error: mutation.error,
    data: mutation.data,
    reset: mutation.reset,
  };
}
