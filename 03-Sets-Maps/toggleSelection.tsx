function toggleSelection(id: string, currentSet: Set<string>): Set<string> {
  // In React, to update the state, we need a new reference
  const newSet = new Set(currentSet);
  newSet.has(id) ? newSet.delete(id) : newSet.add(id);
  return newSet;
}

// Test
let misSeleccionados = new Set<string>(["u1", "u2"]);

misSeleccionados = toggleSelection("u1", misSeleccionados);
console.log(misSeleccionados); // Should have ['u2']

misSeleccionados = toggleSelection("u3", misSeleccionados);
console.log(misSeleccionados); // Should have ['u2', 'u3']
