import { useForm } from 'react-hook-form';
import { useState } from 'react';
import './App.css';

function App() {

  let [total, setTotal] = useState(0);
  const [rows, setRows] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    let duplicateRow = { name: data.name, cost: data.cost };
    setTotal((total) => (total += Number(data.cost)));
    setRows([...rows, duplicateRow]);
    reset()
  };

  return (
    <form
      className="flex flex-col items-center h-[100vh] font-sans bg-gray-100"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-3xl font-bold mb-4 bg-gray-900 w-[100%] text-center text-white p-4">
        Expense Tracker
      </h1>
      <div className="flex flex-col md:flex-row justify-between w-[90%] mt-5 space-y-5 md:space-y-0 md:space-x-10">
        <div className="w-full md:w-[400px] bg-white p-5 shadow-md rounded-lg">
          <div className="mb-5">
            <label htmlFor="name" className="block text-black mb-2">
              Enter Name of Expense
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              id="name"
              className="border-[1px] p-2 border-gray-400 w-[100%] rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
              {...register('name', { required: true })}
            />
            {errors.name && <span className="text-red-500">Name is required</span>}
          </div>
          <div className="mb-5">
            <label htmlFor="cost" className="block text-black mb-2">
              Enter Cost of Expense
            </label>
            <input
              type="number"
               step="0.01"
              placeholder="Enter Cost"
              id="cost"
              className="border-[1px] p-2 border-gray-400 w-[100%] rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
              {...register('cost', { required: true })}
            />
            {errors.cost && <span className="text-red-500">Cost is required</span>}
          </div>
          <button
            type="submit"
            className="w-[100%] bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md font-semibold transition-all"
          >
            Add
          </button>
        </div>


        <div className="overflow-x-auto w-full md:w-[400px]">
          <table className="min-w-full text-center border-collapse border-2 border-gray-700 shadow-md">

            <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
              <tr>
                <th className="p-3 font-semibold text-lg">Name</th>
                <th className="p-3 font-semibold text-lg">Cost</th>
              </tr>
            </thead>
            <tbody className="bg-gray-100 divide-y divide-gray-300">
              {rows.map((element, index) => (
                <tr
                  key={index}
                  className="even:bg-white odd:bg-gray-200 hover:bg-gray-200 transition-colors"

                >
                  <td className="p-3">{element.name}</td>
                  <td className="p-3">{element.cost}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-700 text-white">
              <tr>
                <td className="p-2 font-semibold">Total</td>
                <td className="p-2 font-semibold">{total}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </form>
  );
}

export default App;
