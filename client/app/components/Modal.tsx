interface ModalProps{
  modalOpen: boolean
  setModalOpen: (open: boolean) => void;
  children: React.ReactNode
}

// dont know what is this for sure
export const Modal: React.FC<ModalProps> = ({modalOpen,  setModalOpen, children}) => {
  return (
  <div>
   <dialog id="my_modal_3" className={`modal ${modalOpen ? "modal-open" : ""}`}>
      <div className="modal-box">
        <button onClick={() => setModalOpen(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
        {children}
      </div>
    </dialog>
  </div>
  )
}
