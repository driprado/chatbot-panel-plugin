import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChatPanel } from './ChatPanel';

// Mock fetch
global.fetch = jest.fn();

describe('ChatPanel Component', () => {
  const defaultProps: any = {
    width: 800,
    height: 600,
    data: { series: [], state: 'Done' as const, timeRange: { from: 0, to: 0, raw: { from: 'now-1h', to: 'now' } } },
    timeRange: { from: 0, to: 0, raw: { from: 'now-1h', to: 'now' } },
    timeZone: 'browser' as const,
    options: {},
    onOptionsChange: jest.fn(),
    onFieldConfigChange: jest.fn(),
    onChangeTimeRange: jest.fn(),
    replaceVariables: jest.fn((str) => str),
    fieldConfig: { defaults: {}, overrides: [] },
    id: 1,
    title: 'Test Panel',
    transparent: false,
    renderCounter: 0,
    eventBus: { subscribe: jest.fn(), publish: jest.fn(), getStream: jest.fn(), removeAllListeners: jest.fn(), newScopedBus: jest.fn() },
  };

  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('should render without crashing', () => {
    render(<ChatPanel {...defaultProps} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
  });

  it('should update input value when typing', () => {
    render(<ChatPanel {...defaultProps} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: 'Hello bot' } });
    
    expect(input.value).toBe('Hello bot');
  });

  it('should not send empty messages', () => {
    render(<ChatPanel {...defaultProps} />);
    const button = screen.getByRole('button', { name: /send/i });
    
    fireEvent.click(button);
    
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should send message and display user message', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ message: 'Bot response' }),
    });

    render(<ChatPanel {...defaultProps} />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /send/i });
    
    fireEvent.change(input, { target: { value: 'Hello bot' } });
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByText(/"Hello bot"/)).toBeInTheDocument();
    });
  });

  it('should display bot response after successful API call', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ message: 'Bot response' }),
    });

    render(<ChatPanel {...defaultProps} />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /send/i });
    
    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByText(/"Bot response"/)).toBeInTheDocument();
    });
  });

  it('should display error message when API call fails', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    render(<ChatPanel {...defaultProps} />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /send/i });
    
    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByText(/"Error: could not contact agent."/)).toBeInTheDocument();
    });
  });

  it('should send message when Enter key is pressed', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ message: 'Bot response' }),
    });

    render(<ChatPanel {...defaultProps} />);
    const input = screen.getByRole('textbox');
    
    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });
    
    await waitFor(() => {
      expect(screen.getByText(/"Test message"/)).toBeInTheDocument();
    });
  });

  it('should clear input after sending message', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ message: 'Bot response' }),
    });

    render(<ChatPanel {...defaultProps} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    const button = screen.getByRole('button', { name: /send/i });
    
    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(input.value).toBe('');
    });
  });

  it('should call correct API endpoint with proper payload', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ message: 'Bot response' }),
    });

    render(<ChatPanel {...defaultProps} />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /send/i });
    
    fireEvent.change(input, { target: { value: 'Test prompt' } });
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:8000/query',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: 'Test prompt' }),
        }
      );
    });
  });
});
