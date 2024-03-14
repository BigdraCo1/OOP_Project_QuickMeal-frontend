import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../../api/api";

const BASE_URL = "http://127.0.0.1:8000";
const ROUTE_URL = "http://localhost:5173";

function AddMenu() {
  const { restaurant } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [sizes, setSizes] = useState([{ size: "", value: "" }]);

  const handleSizeChange = (index, event) => {
    const newSizes = [...sizes];
    newSizes[index][event.target.name] = event.target.value;
    setSizes(newSizes);
  };

  const handleAddSize = () => {
    setSizes([...sizes, { size: "", value: "" }]);
  };

  function convertFormat(sizes) {
    const newSizeObject = {};

    sizes.forEach((item) => {
      newSizeObject[item.size] = parseInt(item.value);
    });

    return { size: newSizeObject };
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const newMenuData = {
        name: name,
        type: type,
        size: convertFormat(sizes).size,
        price: price,
      };
      await api.post(`${BASE_URL}/${restaurant}`, newMenuData);
    } catch (error) {
      console.log("Error updating menu:", error);
    } finally {
      setIsLoading(false);
    }
};


  return (
    <div className="p-4">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="padding">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-bold mb-2"
              >
                Name:
              </label>
              <input
                id="name"
                className="border border-gray-300 rounded-md p-2 w-full"
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="type"
                className="block text-gray-700 font-bold mb-2"
              >
                Type:
              </label>
              <input
                id="type"
                className="border border-gray-300 rounded-md p-2 w-full"
                type="text"
                name="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-gray-700 font-bold mb-2"
              >
                Price:
              </label>
              <input
                id="price"
                className="border border-gray-300 rounded-md p-2 w-full"
                type="number"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            {sizes.map((size, index) => (
              <div key={index}>
                <label>
                  Size:
                  <input
                    type="text"
                    name="size"
                    value={size.size}
                    onChange={(e) => handleSizeChange(index, e)}
                  />
                </label>
                <label>
                  Value:
                  <input
                    type="text"
                    name="value"
                    value={size.value}
                    onChange={(e) => handleSizeChange(index, e)}
                  />
                </label>
                <br />
              </div>
            ))}
            <button type="button" onClick={handleAddSize}>
              Add Size
            </button>
            <br />
            <Link to={`${ROUTE_URL}/${restaurant}/menu`}>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleSubmit}
              >
                Add
              </button>
              <button className="bg-red-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                Back
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default AddMenu;

// import React, { useState, useEffect } from "react";
// import { Link, useParams } from "react-router-dom";
// import api from '../../../api/api'

// const BASE_URL = "http://127.0.0.1:8000";
// const ROUTE_URL = "http://localhost:5173";

// function AddMenu() {
//   const { restaurant} = useParams();
//   const [menuData, setMenuData] = useState({});
//   const [isLoading, setIsLoading] = useState(false);

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setMenuData((prevState) => ({
//       ...prevState,
//       [`_Food__${name}`]: value,
//     }));
//   };

//   const handleSize = (event) => {
//   const { name, value } = event.target;
//   const parsedValue = name === "size" ? JSON.parse(value) : value;
//   setMenuData((prevState) => ({
//     ...prevState,
//     [`_Food__${name}`]: parsedValue,
//   }));
// };


//   const handleSubmit = async () => {
//     try {
//       setIsLoading(true);
//       const newMenuData = {
//         name: menuData._Food__name,
//         type: menuData._Food__type,
//         size: menuData._Food__size,
//         price: menuData._Food__price,
//       };
//       await api.post(`${BASE_URL}/${restaurant}`, newMenuData);
//     } catch (error) {
//       console.log("Error updating menu:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//   <div className="p-4">
//   {isLoading ? (
//     <div>Loading...</div>
//   ) : (
//     <>
//       <div className="padding">
//         <div className="mb-4">
//           <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name:</label>
//           <input
//             id="name"
//             className="border border-gray-300 rounded-md p-2 w-full"
//             type="text"
//             name="name"
//             value={menuData._Food__name}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="type" className="block text-gray-700 font-bold mb-2">Type:</label>
//           <input
//             id="type"
//             className="border border-gray-300 rounded-md p-2 w-full"
//             type="text"
//             name="type"
//             value={menuData._Food__type}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="mb-4">
//         <label htmlFor="size" className="block text-gray-700 font-bold mb-2">Size:</label>
//         <input
//           id="size"
//           className="border border-gray-300 rounded-md p-2 w-full"
//           type="text"
//           name="size"
//           value={JSON.stringify(menuData._Food__size)}
//           onChange={handleSize}
//         />
//       </div>
//         <div className="mb-4">
//           <label htmlFor="price" className="block text-gray-700 font-bold mb-2">Price:</label>
//           <input
//             id="price"
//             className="border border-gray-300 rounded-md p-2 w-full"
//             type="number"
//             name="price"
//             value={menuData._Food__price}
//             onChange={handleChange}
//           />
//         </div>
//         <Link to={`${ROUTE_URL}/${restaurant}/menu`}>
//           <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>
//             Add
//           </button>
//           <button className="bg-red-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded" >
//             Back
//           </button>
//         </Link>
//       </div>
//     </>
//   )}
// </div>


//   );
// }

// export default AddMenu;