// __tests__/ButtonAddTask.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ButtonAddTask from "../app/components/ButtonAddTask";
import { addTask } from "../api";

// Mock the Modal component
jest.mock("../app/components/Modal", () => ({
  Modal: ({ modalOpen, setModalOpen, children }: any) => (
    modalOpen ? <div role="dialog">{children}</div> : null
  )
}));

// Mock the useRouter hook
jest.mock("next/navigation", () => ({
  useRouter: jest.fn().mockReturnValue({
    refresh: jest.fn()
  })
}));


test('should open modal when "Add New Task" button is clicked', () => {
  render(<ButtonAddTask />);

  // Click the button to open the modal
  fireEvent.click(screen.getByText('Add New Task'));

  // Check if the modal is open by querying the dialog
  expect(screen.getByRole('dialog')).toBeInTheDocument();
});

