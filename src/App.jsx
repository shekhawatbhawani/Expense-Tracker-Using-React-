import { useForm } from "react-hook-form";
import { useState } from "react";
import "./App.css";

function App() {
  let [total, setTotal] = useState(0);
  let [rows, setRows] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    let duplicateRow = { name: data.name, cost: data.cost, des: data.des };
    setTotal((total) => (total += Number(data.cost)));
    setRows([...rows, duplicateRow]);
    reset();
  };

  return (
    <form
      className="flex flex-col items-center min-h-screen bg-gray-100 p-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-3xl font-bold mb-6 bg-blue-600 w-full text-center text-white py-4 rounded-md shadow-lg">
        Expense Tracker
      </h1>
      <div className="flex flex-col md:flex-row justify-between w-full max-w-4xl space-y-5 md:space-y-0 md:space-x-8">

        {/* Input Form Section */}
        <div className="w-full md:w-[40%] bg-white p-6 rounded-lg shadow-md space-y-5">
          <div>
            <label htmlFor="name" className="block text-black mb-2 text-lg font-medium">
              Expense Name
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              id="name"
              className="border-[1px] p-3 border-gray-400 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">Name is required</span>
            )}
          </div>
          
          <div>
            <label htmlFor="cost" className="block text-black mb-2 text-lg font-medium">
              Expense Cost
            </label>
            <input
              type="number"
              step="0.01"
              placeholder="Enter Cost"
              id="cost"
              className="border-[1px] p-3 border-gray-400 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("cost", { required: true })}
            />
            {errors.cost && (
              <span className="text-red-500 text-sm">Cost is required</span>
            )}
          </div>
          
          <div>
            <label htmlFor="description" className="block text-black mb-2 text-lg font-medium">
              Description
            </label>
            <input
              type="text"
              placeholder="Enter Description"
              id="description"
              className="border-[1px] p-3 border-gray-400 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("des", { required: true })}
            />
            {errors.des && (
              <span className="text-red-500 text-sm">Description is required</span>
            )}
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold transition-all"
          >
            Add Expense
          </button>
        </div>

        {/* Search and Table Section */}
        <div className="w-full md:w-[55%] space-y-5">
          
          {/* Search Section */}
          <div className="flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded-lg shadow-md">
            <input
              type="text"
              placeholder="Search by name"
              className="border-[1px] p-3 border-gray-400 w-[100%] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onInput={(e)=>{
                console.log(e.target.value);
              
               rows =  rows.filter((element)=>{

                 if ( element.name.includes(e.target.value)) {
                  console.log(element);
                  return element
                  
                 }
                })

                setRows(rows)
                
              }}
            />
            
          </div>

          {/* Table Section */}
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table className="min-w-full text-center border-collapse border-2 border-gray-700 shadow-md">
              <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
                <tr>
                  <th className="p-4 text-lg font-semibold">Name</th>
                  <th className="p-4 text-lg font-semibold">Cost</th>
                  <th className="p-4 text-lg font-semibold">Description</th>
                  <th
                    className="p-4 text-lg font-semibold text-red-500 cursor-pointer"
                    onClick={() => {
                      setRows([]);
                      setTotal(0);
                    }}
                  >
                    Remove All
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-100 divide-y divide-gray-300">
                {rows.map((element, index) => (
                  <tr
                    key={index}
                    className="even:bg-white odd:bg-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4">{element.name}</td>
                    <td className="p-4">{element.cost}</td>
                    <td className="p-4">{element.des}</td>
                    <td
                      className="p-4 bg-red-600 text-white font-bold cursor-pointer hover:bg-red-700"
                      onClick={() => {
                        let removeCost = element.cost;
                        setRows(rows.filter((e, i) => i !== index));
                        setTotal(total - Number(removeCost));
                      }}
                    >
                      Remove
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-700 text-white">
                <tr>
                  <td className="p-4 font-semibold" colSpan="3">Total</td>
                  <td className="p-4 font-semibold">{total}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </form>
  );
}

export default App;
