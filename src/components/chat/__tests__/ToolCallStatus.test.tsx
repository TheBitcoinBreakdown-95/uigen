import { describe, test, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { ToolCallStatus } from "../ToolCallStatus";

vi.mock("lucide-react", () => ({
  Loader2: ({ className }: { className?: string }) => (
    <div data-testid="loader-icon" className={className}>
      Loader
    </div>
  ),
  Check: ({ className }: { className?: string }) => (
    <div data-testid="check-icon" className={className}>
      Check
    </div>
  ),
}));

afterEach(() => {
  cleanup();
});

describe("ToolCallStatus", () => {
  describe("loading states", () => {
    test("shows 'Creating' message with spinner for create command in progress", () => {
      render(
        <ToolCallStatus
          toolInvocation={{
            toolName: "str_replace_editor",
            args: { command: "create", path: "/components/Button.tsx" },
            state: "call",
          }}
        />
      );

      expect(screen.getByText("Creating Button.tsx")).toBeDefined();
      expect(screen.getByTestId("loader-icon")).toBeDefined();
    });

    test("shows 'Editing' message for str_replace command in progress", () => {
      render(
        <ToolCallStatus
          toolInvocation={{
            toolName: "str_replace_editor",
            args: { command: "str_replace", path: "/App.jsx" },
            state: "call",
          }}
        />
      );

      expect(screen.getByText("Editing App.jsx")).toBeDefined();
    });

    test("shows 'Editing' message for insert command in progress", () => {
      render(
        <ToolCallStatus
          toolInvocation={{
            toolName: "str_replace_editor",
            args: { command: "insert", path: "/utils/helpers.ts" },
            state: "call",
          }}
        />
      );

      expect(screen.getByText("Editing helpers.ts")).toBeDefined();
    });

    test("shows 'Reading' message for view command in progress", () => {
      render(
        <ToolCallStatus
          toolInvocation={{
            toolName: "str_replace_editor",
            args: { command: "view", path: "/config/settings.json" },
            state: "call",
          }}
        />
      );

      expect(screen.getByText("Reading settings.json")).toBeDefined();
    });

    test("shows 'Undoing changes to' message for undo_edit in progress", () => {
      render(
        <ToolCallStatus
          toolInvocation={{
            toolName: "str_replace_editor",
            args: { command: "undo_edit", path: "/App.jsx" },
            state: "partial-call",
          }}
        />
      );

      expect(screen.getByText("Undoing changes to App.jsx")).toBeDefined();
    });

    test("shows 'Renaming' message for rename command in progress", () => {
      render(
        <ToolCallStatus
          toolInvocation={{
            toolName: "file_manager",
            args: { command: "rename", path: "/old.tsx", new_path: "/new.tsx" },
            state: "call",
          }}
        />
      );

      expect(screen.getByText("Renaming old.tsx to new.tsx")).toBeDefined();
    });

    test("shows 'Deleting' message for delete command in progress", () => {
      render(
        <ToolCallStatus
          toolInvocation={{
            toolName: "file_manager",
            args: { command: "delete", path: "/temp/file.txt" },
            state: "call",
          }}
        />
      );

      expect(screen.getByText("Deleting file.txt")).toBeDefined();
    });
  });

  describe("completed states", () => {
    test("shows 'Created' message with checkmark for completed create", () => {
      render(
        <ToolCallStatus
          toolInvocation={{
            toolName: "str_replace_editor",
            args: { command: "create", path: "/components/Card.tsx" },
            state: "result",
            result: "File created successfully",
          }}
        />
      );

      expect(screen.getByText("Created Card.tsx")).toBeDefined();
      expect(screen.getByTestId("check-icon")).toBeDefined();
    });

    test("shows 'Edited' message for completed str_replace", () => {
      render(
        <ToolCallStatus
          toolInvocation={{
            toolName: "str_replace_editor",
            args: { command: "str_replace", path: "/App.jsx" },
            state: "result",
            result: "String replaced",
          }}
        />
      );

      expect(screen.getByText("Edited App.jsx")).toBeDefined();
    });

    test("shows 'Read' message for completed view", () => {
      render(
        <ToolCallStatus
          toolInvocation={{
            toolName: "str_replace_editor",
            args: { command: "view", path: "/README.md" },
            state: "result",
            result: "file contents...",
          }}
        />
      );

      expect(screen.getByText("Read README.md")).toBeDefined();
    });

    test("shows 'Undid changes to' for completed undo_edit", () => {
      render(
        <ToolCallStatus
          toolInvocation={{
            toolName: "str_replace_editor",
            args: { command: "undo_edit", path: "/index.tsx" },
            state: "result",
            result: "Changes undone",
          }}
        />
      );

      expect(screen.getByText("Undid changes to index.tsx")).toBeDefined();
    });

    test("shows 'Renamed' message for completed rename", () => {
      render(
        <ToolCallStatus
          toolInvocation={{
            toolName: "file_manager",
            args: { command: "rename", path: "/old.tsx", new_path: "/new.tsx" },
            state: "result",
            result: true,
          }}
        />
      );

      expect(screen.getByText("Renamed old.tsx to new.tsx")).toBeDefined();
    });

    test("shows 'Deleted' message for completed delete", () => {
      render(
        <ToolCallStatus
          toolInvocation={{
            toolName: "file_manager",
            args: { command: "delete", path: "/unused.ts" },
            state: "result",
            result: true,
          }}
        />
      );

      expect(screen.getByText("Deleted unused.ts")).toBeDefined();
    });
  });

  describe("edge cases", () => {
    test("extracts filename from deeply nested path", () => {
      render(
        <ToolCallStatus
          toolInvocation={{
            toolName: "str_replace_editor",
            args: {
              command: "create",
              path: "/src/components/ui/buttons/PrimaryButton.tsx",
            },
            state: "result",
            result: "created",
          }}
        />
      );

      expect(screen.getByText("Created PrimaryButton.tsx")).toBeDefined();
    });

    test("handles missing path gracefully", () => {
      render(
        <ToolCallStatus
          toolInvocation={{
            toolName: "str_replace_editor",
            args: { command: "create", path: "" },
            state: "call",
          }}
        />
      );

      expect(screen.getByText("Creating file")).toBeDefined();
    });

    test("falls back to tool name for unknown command", () => {
      render(
        <ToolCallStatus
          toolInvocation={{
            toolName: "str_replace_editor",
            args: { command: "unknown_command" as string, path: "/file.txt" },
            state: "call",
          }}
        />
      );

      expect(screen.getByText("str_replace_editor")).toBeDefined();
    });

    test("handles rename with missing new_path", () => {
      render(
        <ToolCallStatus
          toolInvocation={{
            toolName: "file_manager",
            args: { command: "rename", path: "/old.tsx" },
            state: "call",
          }}
        />
      );

      expect(screen.getByText("Renaming old.tsx to file")).toBeDefined();
    });

    test("shows spinner for partial-call state", () => {
      render(
        <ToolCallStatus
          toolInvocation={{
            toolName: "str_replace_editor",
            args: { command: "create", path: "/loading.tsx" },
            state: "partial-call",
          }}
        />
      );

      expect(screen.getByTestId("loader-icon")).toBeDefined();
    });

    test("shows spinner when result state but no result value", () => {
      render(
        <ToolCallStatus
          toolInvocation={{
            toolName: "str_replace_editor",
            args: { command: "create", path: "/file.tsx" },
            state: "result",
            result: undefined,
          }}
        />
      );

      expect(screen.getByTestId("loader-icon")).toBeDefined();
    });
  });
});
