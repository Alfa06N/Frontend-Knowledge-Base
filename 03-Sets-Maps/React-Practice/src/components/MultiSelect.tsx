import { useState, useCallback } from "react";

const users = [
  { id: "u1", name: "User 1" },
  { id: "u2", name: "User 2" },
  { id: "u3", name: "User 3" },
  { id: "u4", name: "User 4" },
  { id: "u5", name: "User 5" },
  { id: "u6", name: "User 6" },
  { id: "u7", name: "User 7" },
  { id: "u8", name: "User 8" },
  { id: "u9", name: "User 9" },
  { id: "u10", name: "User 10" },
];

export function MultiSelect() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const handleToggle = useCallback((id: string) => {
    setSelectedIds((prevSet) => {
      const newSet = new Set(prevSet);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  return (
    <div>
      <h3>Selected Users: {selectedIds.size}</h3>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            onClick={() => handleToggle(user.id)}
            style={{
              marginBlock: "0.5rem",
              cursor: "pointer",
              fontWeight: selectedIds.has(user.id) ? "bold" : "normal",
            }}
          >
            {user.name} {selectedIds.has(user.id) ? "✔️" : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}
