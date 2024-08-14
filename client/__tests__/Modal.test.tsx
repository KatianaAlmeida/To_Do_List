// __tests__/Modal.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "../app/components/Modal";

describe('Modal Component', () => {
  const setModalOpen = jest.fn();

  test('should render children inside the modal', () => {
    render(
      <Modal modalOpen={true} setModalOpen={setModalOpen}>
        <p>Test Modal Content</p>
      </Modal>
    );

    // Check if the children are rendered inside the modal
    expect(screen.getByText('Test Modal Content')).toBeInTheDocument();
  });
});
