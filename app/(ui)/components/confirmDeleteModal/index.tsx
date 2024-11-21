const ConfirmDeleteModal = ({
  show,
  itemId,
  deleteQuestion,
  deleteFunction,
  setShow
}: {
  show: boolean;
  itemId: string;
  deleteQuestion: string,
  deleteFunction: (id: string) => void;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      {show ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setShow(false)}
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
            <p className="mt-4 text-md font-semibold text-gray-800 mb-4">
              {deleteQuestion}
            </p>
            <div className="mt-8 flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                onClick={( )=> setShow(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                onClick={() => {
                  deleteFunction(itemId)
                  setShow(false)
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ConfirmDeleteModal;
