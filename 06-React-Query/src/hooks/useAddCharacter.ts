import { useMutation, useQueryClient } from "@tanstack/react-query";

interface FakeData {
  name: string;
  age: number;
  id: number;
}

export default function useAddCharacter() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (name: string): Promise<FakeData> => {
      if (Math.random() > 0.5) throw new Error("Server unavailable");
      return { id: Math.random(), name, age: 25 };
    },

    // This executes before the query starts
    onMutate: async (newName) => {
      // Cancel searches
      await queryClient.cancelQueries({ queryKey: ["results"] });
      // Save previous cache
      const previousCharacters = queryClient.getQueryData<FakeData[]>([
        "results",
      ]);
      // Update cache optimistically
      queryClient.setQueryData(["results"], (old: FakeData[] | undefined) => {
        const optimisticEntry = { id: Date.now(), name: newName, age: 0 };
        return old ? [...old, optimisticEntry] : [optimisticEntry];
      });

      // Return context with old cache
      return { previousCharacters };
    },

    onError: (err, newName, context) => {
      if (context?.previousCharacters) {
        queryClient.setQueryData(["results"], context.previousCharacters);
        console.log("Something went wrong. Restoring previous data...");
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["results"] });
    },

    // To update individual data
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ["results"] });
    // },
    // onSuccess: async (newData: FakeData) => {
    //   queryClient.setQueryData(
    //     ["results", newData.name],
    //     (oldData: FakeData | null) => {
    //       return newData;
    //     },
    //   );
    // },
  });
}
