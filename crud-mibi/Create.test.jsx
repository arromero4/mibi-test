import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Create from './src/Create.jsx';
import axios from 'axios';
import '@testing-library/jest-dom/vitest';
// Mock de axios
vi.mock('axios');

// Mock de useNavigate
const navigateMock = vi.fn();

vi.mock(import('react-router-dom'), async () => {
  const mod = await vi.importActual('react-router-dom')
  return {
    ...mod,
    useNavigate: () => navigateMock,
  } 
});

describe('Create Component', () => {
  it('renders the form with all elements', () => {
    render(
      <BrowserRouter>
        <Create />
      </BrowserRouter>
    );

    // Verificar que los elementos del formulario se renderizan
    expect(screen.getByText('Añadir Tarea')).toBeInTheDocument();
    expect(screen.getByLabelText('Tarea')).toBeInTheDocument();
    expect(screen.getByLabelText('Descripción')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Añadir' })).toBeInTheDocument();
  });

  it('submits the form and calls axios.post', async () => {
    // Simular la respuesta de axios.post
    axios.post.mockResolvedValue({ data: { success: true } });

    render(
      <BrowserRouter>
        <Create />
      </BrowserRouter>
    );

    // Llenar los campos del formulario
    fireEvent.change(screen.getByLabelText('Tarea'), {
      target: { value: 'Nueva Tarea' },
    });

    fireEvent.change(screen.getByLabelText('Descripción'), {
      target: { value: 'Descripción de la nueva tarea' },
    });

    // Simular envío del formulario
    fireEvent.click(screen.getByRole('button', { name: 'Añadir' }));

    // Verificar que axios.post haya sido llamado con los datos correctos
    expect(axios.post).toHaveBeenCalledWith('http://localhost:8081/create', {
      task: 'Nueva Tarea',
      description: 'Descripción de la nueva tarea',
    });

  
  });
});

