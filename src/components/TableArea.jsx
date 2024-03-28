import React from "react";
import Edit from "./icon/Edit";
import Cross from "./icon/Cross";

function TableArea({ setAddSection, dataList, onDeleteItem, handleEdit }) {
  return (
    <>
      <div className="mt-10">
        <button
          className="bg-blue-500 p-2 text-white m-auto rounded-md mb-5 w-[100px] cursor-pointer shadow-md"
          onClick={() => setAddSection(true)}
        >
          Add
        </button>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Edit / Delete</th>
            </tr>
          </thead>
          <tbody>
            {dataList[0] ? (
              dataList.map((item) => (
                <tr>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td className="">
                    <button
                      className="bg-green-500 text-white m-auto rounded-full mr-3 p-2 text-[20px]"
                      onClick={() => handleEdit(item)}
                    >
                      <Edit />
                    </button>
                    <button
                      className="bg-red-500 text-white rounded-full p-2 text-[20px]"
                      onClick={() => onDeleteItem(item._id)}
                    >
                      <Cross />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <p className="text-center text-[20px]">no data</p>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TableArea;
