import { useState, useRef } from "react";

interface UserDetail {
  id: string;
  email: string;
  phone: string;
  bio: string;
}

const mockNames = ["Alex", "Juan", "Maria", "Pedro", "Lucia"];

export function UserDirectory() {
  const [selectedUser, setSelectedUser] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState(false);

  const cache = useRef(new Map<string, UserDetail>());

  const handleUserClick = async (name: string) => {
    if (cache.current.has(name)) {
      setSelectedUser(cache.current.get(name)!);
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));

    const newUserDetail = {
      id: Math.random().toString(),
      email: `${name.toLowerCase()}@example.com`,
      phone: "555-0199",
      bio: `Esta es la biografía de ${name}`,
    };

    cache.current.set(name, newUserDetail);
    setSelectedUser(newUserDetail);
    setLoading(false);
  };

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <div>
        <h3>Directorio</h3>
        <ul>
          {mockNames.map((name) => (
            <li key={name}>
              <button onClick={() => handleUserClick(name)}>
                Ver a {name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div
        style={{ border: "1px solid #ccc", padding: "20px", width: "300px" }}
      >
        <h3>Detalle del Usuario</h3>
        {loading && <p>Cargando desde la "API"...</p>}
        {!loading && selectedUser && (
          <div>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>Bio:</strong> {selectedUser.bio}
            </p>
          </div>
        )}
        {!loading && !selectedUser && <p>Selecciona un usuario</p>}
      </div>
    </div>
  );
}
