interface ModalProps{
  modalOpen: boolean // Indicates if the modal is open or closed
  setModalOpen: (open: boolean) => void; // Function to set the modal's open/closed state
  children: React.ReactNode // Children elements to be displayed inside the modal
}

// Modal component to display content in a modal window
export const Modal: React.FC<ModalProps> = ({modalOpen,  setModalOpen, children}) => {
  return (
  <div>
    {/* Modal container with conditional classes based on modalOpen */}
   <dialog id="my_modal_3" className={`modal ${modalOpen ? "modal-open" : ""}`}>
      <div className="modal-box">
        <button onClick={() => setModalOpen(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
        {/* Render children elements inside the modal */}
        {children}
      </div>
    </dialog>
  </div>
  )
}
