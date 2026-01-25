import { useState } from "react";
import useAddCharacter from "../hooks/useAddCharacter";

export default function AddCharacterForm() {
  const [name, setName] = useState("");
  const { mutate, isPending } = useAddCharacter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(name);
    setName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setName(e.target.value)
        }
      />
      <button type="submit" disabled={isPending}>
        {isPending ? "Saving..." : "Add character"}
      </button>
    </form>
  );
}
