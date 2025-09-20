import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ToolCallDisplay } from '../ToolCallDisplay';

describe('ToolCallDisplay', () => {
  describe('str_replace_editor tool', () => {
    it('displays file creation message', () => {
      render(
        <ToolCallDisplay
          toolName="str_replace_editor"
          toolArgs={{ command: "create", path: "/components/Button.tsx" }}
          state="call"
        />
      );

      expect(screen.getByText('Creating Button.tsx')).toBeInTheDocument();
      expect(document.querySelector('.animate-spin')).toBeInTheDocument(); // Loader icon
    });

    it('displays file editing message', () => {
      render(
        <ToolCallDisplay
          toolName="str_replace_editor"
          toolArgs={{ command: "str_replace", path: "/src/utils/helpers.ts" }}
          state="result"
          result={{ success: true }}
        />
      );

      expect(screen.getByText('Editing helpers.ts')).toBeInTheDocument();
      expect(document.querySelector('.text-blue-600')).toBeInTheDocument();
    });

    it('displays file reading message', () => {
      render(
        <ToolCallDisplay
          toolName="str_replace_editor"
          toolArgs={{ command: "view", path: "/config/database.js" }}
          state="call"
        />
      );

      expect(screen.getByText('Reading database.js')).toBeInTheDocument();
    });

    it('displays file insertion message', () => {
      render(
        <ToolCallDisplay
          toolName="str_replace_editor"
          toolArgs={{ command: "insert", path: "/styles/main.css" }}
          state="call"
        />
      );

      expect(screen.getByText('Adding to main.css')).toBeInTheDocument();
    });

    it('displays default modification message for unknown commands', () => {
      render(
        <ToolCallDisplay
          toolName="str_replace_editor"
          toolArgs={{ command: "unknown", path: "/test.txt" }}
          state="call"
        />
      );

      expect(screen.getByText('Modifying test.txt')).toBeInTheDocument();
    });

    it('handles missing file path gracefully', () => {
      render(
        <ToolCallDisplay
          toolName="str_replace_editor"
          toolArgs={{ command: "create" }}
          state="call"
        />
      );

      expect(screen.getByText('Creating file')).toBeInTheDocument();
    });
  });

  describe('file_manager tool', () => {
    it('displays file rename message', () => {
      render(
        <ToolCallDisplay
          toolName="file_manager"
          toolArgs={{
            command: "rename",
            path: "/old/file.ts",
            new_path: "/new/renamed-file.ts"
          }}
          state="result"
          result={{ success: true }}
        />
      );

      expect(screen.getByText('Renaming file.ts to renamed-file.ts')).toBeInTheDocument();
      expect(document.querySelector('.text-amber-600')).toBeInTheDocument();
    });

    it('displays file deletion message', () => {
      render(
        <ToolCallDisplay
          toolName="file_manager"
          toolArgs={{ command: "delete", path: "/temp/cache.json" }}
          state="call"
        />
      );

      expect(screen.getByText('Deleting cache.json')).toBeInTheDocument();
      expect(document.querySelector('.text-red-600')).toBeInTheDocument();
    });

    it('displays default file management message', () => {
      render(
        <ToolCallDisplay
          toolName="file_manager"
          toolArgs={{ command: "unknown", path: "/some/file.txt" }}
          state="call"
        />
      );

      expect(screen.getByText('Managing file.txt')).toBeInTheDocument();
    });
  });

  describe('unknown tools', () => {
    it('displays formatted tool name for unknown tools', () => {
      render(
        <ToolCallDisplay
          toolName="custom_tool_name"
          state="call"
        />
      );

      expect(screen.getByText('custom tool name')).toBeInTheDocument();
    });
  });

  describe('visual states', () => {
    it('shows loading spinner when in progress', () => {
      render(
        <ToolCallDisplay
          toolName="str_replace_editor"
          toolArgs={{ command: "create", path: "/test.ts" }}
          state="call"
        />
      );

      expect(document.querySelector('.animate-spin')).toBeInTheDocument();
    });

    it('shows success indicator when completed', () => {
      render(
        <ToolCallDisplay
          toolName="str_replace_editor"
          toolArgs={{ command: "create", path: "/test.ts" }}
          state="result"
          result={{ success: true }}
        />
      );

      expect(document.querySelector('.bg-emerald-500')).toBeInTheDocument();
    });

    it('applies correct styling classes', () => {
      const { container } = render(
        <ToolCallDisplay
          toolName="str_replace_editor"
          toolArgs={{ command: "create", path: "/test.ts" }}
          state="call"
        />
      );

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('inline-flex', 'items-center', 'gap-2', 'mt-2', 'px-3', 'py-1.5', 'bg-neutral-50', 'rounded-lg', 'text-xs', 'font-mono', 'border', 'border-neutral-200');
    });
  });

  describe('edge cases', () => {
    it('handles missing toolArgs', () => {
      render(
        <ToolCallDisplay
          toolName="str_replace_editor"
          state="call"
        />
      );

      expect(screen.getByText('Modifying file')).toBeInTheDocument();
    });

    it('handles empty path', () => {
      render(
        <ToolCallDisplay
          toolName="str_replace_editor"
          toolArgs={{ command: "create", path: "" }}
          state="call"
        />
      );

      expect(screen.getByText('Creating file')).toBeInTheDocument();
    });

    it('extracts filename from complex paths', () => {
      render(
        <ToolCallDisplay
          toolName="str_replace_editor"
          toolArgs={{ command: "create", path: "/very/deep/nested/path/component.tsx" }}
          state="call"
        />
      );

      expect(screen.getByText('Creating component.tsx')).toBeInTheDocument();
    });
  });
});