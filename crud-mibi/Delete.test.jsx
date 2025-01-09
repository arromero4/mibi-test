import { render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Home from './src/Home.jsx';
import axios from 'axios';

vi.mock('axios');

describe('Home Component - handleDelete', () => {
  it('deletes a task and updates the list', async () => {
    // Simular las tareas iniciales
    const mockTasks = [
      { id: 1, task: 'Tarea 1', description: 'Descripción 1' },
      { id: 2, task: 'Tarea 2', description: 'Descripción 2' },
    ];

    // Simular la respuesta de GET
    axios.get.mockResolvedValue({ data: mockTasks });

    // Simular la respuesta de DELETE
    axios.delete.mockResolvedValue({});

    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

  
    
  });
});
