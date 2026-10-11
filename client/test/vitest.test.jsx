
import { describe, it, expect } from 'vitest';

describe('Pruebas iniciales del proyecto', () => {
  it('comprueba que una lista de clientes tenga tres elementos', () => {
    const clientes = [
      { nombre: 'Ana Garcia' },
      { nombre: 'Bruno Lopez' },
      { nombre: 'Carla Perez' },
    ];

    expect(clientes).toHaveLength(3);
  });

  it('comprueba que un cliente tenga nombre', () => {
    const cliente = { nombre: 'Ana Garcia' };

    expect(cliente.nombre).toBe('Ana Garcia');
  });
});
