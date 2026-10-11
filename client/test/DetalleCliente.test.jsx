
/* @vitest-environment jsdom */
import '@testing-library/jest-dom/vitest';
import { beforeEach, afterEach, describe, it, expect, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import DetalleCliente from '../src/pages/DetalleCliente.jsx';
import clientesService from '../src/services/clientesService.js';

vi.mock('../src/services/clientesService.js', () => ({
  default: {
    obtenerCliente: vi.fn(),
    eliminarCliente: vi.fn(),
  },
}));

const clientePrueba = {
  id: 1,
  name: {
    firstname: 'Ana',
    lastname: 'Garcia',
  },
  username: 'ana123',
  email: 'ana@example.com',
  phone: '3881234567',
  address: {
    street: 'Belgrano',
    number: 123,
    zipcode: '4600',
    city: 'Jujuy',
  },
};

function mostrarDetalle() {
  return render(
    <MemoryRouter initialEntries={['/clientes/1']}>
      <Routes>
        <Route
          path="/clientes/:id"
          element={<DetalleCliente />}
        />
        <Route
          path="/clientes"
          element={<p>Lista de clientes</p>}
        />
      </Routes>
    </MemoryRouter>
  );
}

describe('DetalleCliente', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    localStorage.setItem('role', 'Operador');
  });

  afterEach(() => {
    cleanup();
  });

  it('muestra un indicador mientras carga el cliente', () => {
    clientesService.obtenerCliente.mockReturnValue(
      new Promise(() => {})
    );

    mostrarDetalle();

    expect(
      screen.getByText('Cargando cliente...')
    ).toBeTruthy();
  });

  it('muestra los datos cuando la consulta tiene éxito', async () => {
    clientesService.obtenerCliente.mockResolvedValue(
      clientePrueba
    );

    mostrarDetalle();

    expect(
      await screen.findByRole('heading', {
        name: 'Ficha del Cliente',
      })
    ).toBeTruthy();

    expect(screen.getByText('Ana Garcia')).toBeTruthy();
    expect(screen.getByText('ana123')).toBeTruthy();
    expect(screen.getByText('ana@example.com')).toBeTruthy();
  });

  it('muestra un mensaje cuando el cliente no existe', async () => {
    clientesService.obtenerCliente.mockRejectedValue({
      response: { status: 404 },
    });

    mostrarDetalle();

    expect(
      await screen.findByRole('alert')
    ).toHaveTextContent(
      'El cliente solicitado no existe.'
    );
  });

  it('muestra un mensaje cuando ocurre otro error', async () => {
    clientesService.obtenerCliente.mockRejectedValue(
      new Error('Error de conexión')
    );

    mostrarDetalle();

    expect(
      await screen.findByRole('alert')
    ).toHaveTextContent(
      'No se pudo cargar el cliente. Intente nuevamente.'
    );
  });
  it('muestra un mensaje cuando el identificador no es válido', async () => {
    clientesService.obtenerCliente.mockRejectedValue({
      response: { status: 400 },
    });

    mostrarDetalle();

    expect(
      await screen.findByRole('alert')
    ).toHaveTextContent(
      'El identificador del cliente no es válido.'
    );
  });

  it('solo muestra el botón de eliminar a Gerencia', async () => {
    clientesService.obtenerCliente.mockResolvedValue(
      clientePrueba
    );

    localStorage.setItem('role', 'Gerencia');

    mostrarDetalle();

    expect(
      await screen.findByRole('button', {
        name: 'Eliminar Cliente',
      })
    ).toBeTruthy();
  });

});
