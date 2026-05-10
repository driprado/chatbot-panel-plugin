import { PanelPlugin } from '@grafana/data';
import { plugin } from './module';
import { ChatPanel } from './ChatPanel';

describe('ChatPanel Plugin', () => {
  it('should export a PanelPlugin instance', () => {
    expect(plugin).toBeInstanceOf(PanelPlugin);
  });

  it('should use ChatPanel as the panel component', () => {
    expect(plugin.panel).toBe(ChatPanel);
  });
});
