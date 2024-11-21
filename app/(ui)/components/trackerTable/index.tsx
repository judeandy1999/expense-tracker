import { useState } from "react";
import ConfirmDeleteModal from "../confirmDeleteModal";

const TrackerTable = ({ 
  type, 
  tableFields, 
  loading,
  actionRequired,
  deleteFieldFunction,
  deleteQuestion
}: { 
  type: string; 
  tableFields: any[]; 
  loading: boolean,
  actionRequired: boolean,  
  deleteFieldFunction?: (id: string) => void,
  deleteQuestion?: string
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [deleteItemId, setDeleteItemId] = useState<string>("");

  const deleteItem = (id: string) => {
    setDeleteItemId(id);
  }

  const getColumnNames = (tableFields: any) => {
    let keys = Object.keys(tableFields) as (keyof any)[];

    if (type !== "all" && keys.includes("type")) {
      keys = keys.filter((key) => key !== "type");
    }

    return keys
      .filter((key: any) => !["_id", "createdAt", "updatedAt", "__v"].includes(key))
  };

  const columns = tableFields.length > 0 ? getColumnNames(tableFields[0]) : [];

  return (
    <div>
      {deleteQuestion && deleteFieldFunction && (
        <ConfirmDeleteModal
          show={showModal}
          itemId={deleteItemId}
          deleteQuestion={deleteQuestion}
          deleteFunction={deleteFieldFunction}
          setShow={setShowModal}
        />
      )}
      <h2 className="p-4 flex justify-center">{type.charAt(0).toUpperCase() + type.slice(1)} Transaction List</h2>
      <div className="max-h-[25vh] max-w-fit relative overflow-x-auto shadow-md sm:rounded-lg border-t-0">
        {loading ? (
          <p className="flex justify-center">Loading...</p>
        ) : (
          <>
            {tableFields.length ? (
              <table className="w-full text-sm text-left rtl:text-right">
                <thead className="overflow-visible text-xs uppercase">
                    <tr className="sticky top-0 bg-zinc-200">
                      {columns.map((col: any, idx) => (
                        <th key={idx} scope="col" className="px-6 py-3">
                          {col}
                        </th>
                      ))}
                      {actionRequired && (
                        <th scope="col" className="px-6 py-3">
                          Action
                        </th>
                      )}
                    </tr>
                </thead>
                <tbody className="overflow-scroll">
                  {tableFields.map((tableItem: any) => (
                    <tr key={tableItem._id} className="odd:bg-white">
                      {columns.map((col, idx) =>  (
                        <td key={idx} className="px-6 py-4">
                          {col === "category" ? tableItem[col]?.name : col === "type" ? tableItem[col] : tableItem[col]}
                        </td>
                      ))}
                      {actionRequired && (
                        <td className="flex px-6 py-4">
                          <a href="#" className="p-1 font-medium">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="fill-sky-600 size-5">
                              <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                              <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
                            </svg>
                          </a>
                          <a 
                            href="#" 
                            className="p-1 font-medium"
                            onClick={(e) => {
                              e.preventDefault(); // Prevent default link behavior
                              setShowModal(true);
                              deleteItem(tableItem._id);
                            }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="stroke-red-600 size-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                          </a>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="p-2 flex justify-center">No data available.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TrackerTable;
