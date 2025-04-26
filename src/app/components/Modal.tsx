import { ModalProps } from "../Types";

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-500/30 backdrop-blur-3xl">
        <div className="bg-gray-50 rounded-lg shadow-lg p-6 w-full max-w-md relative animate-fadeIn">
          <button
            onClick={onClose}
            className="absolute top-2 right-3 text-gray-600 hover:text-gray-900 text-2xl"
          >
            &times;
          </button>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
