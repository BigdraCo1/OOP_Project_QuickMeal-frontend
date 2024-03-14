import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../../api/api";

const BASE_URL = "http://127.0.0.1:8000";
const ROUTE_URL = "http://localhost:5173";

function EditMenu() {
  const { restaurant, menu } = useParams();
  const [menuData, setMenuData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({});

  async function fetchMenu(restaurant, menu) {
    try {
      setIsLoading(true);
      const response = await api.get(`${BASE_URL}/${restaurant}/${menu}`);
      const responseData = response.data || {};
      setMenuData(responseData);
      setFormData(responseData._Food__size);
    } catch (error) {
      console.log("Error fetching menu:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMenu(restaurant, menu);
  }, [restaurant, menu]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMenuData((prevState) => ({
      ...prevState,
      [`_Food__${name}`]: value,
    }));
  };

  const handleSize = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const newMenuData = {
        name: menuData._Food__name,
        type: menuData._Food__type,
        size: formData,
        price: menuData._Food__price,
      };

      await api.put(`${BASE_URL}/${restaurant}/${menu}`, newMenuData);
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
                value={menuData._Food__name}
                onChange={handleChange}
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
                value={menuData._Food__type}
                onChange={handleChange}
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
                min="0"
                name="price"
                value={menuData._Food__price}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="size"
                className="block text-gray-700 font-bold mb-2"
              >
                Size:
              </label>
              {Object.entries(formData).map(([key, value]) => (
                <div key={key}>
                  <input 
                    type="number" 
                    id={key} 
                    name={key}
                    min="0"
                    value={value}
                    onChange={handleSize} />
                  <label htmlFor={key}>{key}</label>
                </div>
              ))}
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleSubmit}
            >
              Save Changes
            </button>
            <br />
            <Link
              to={`${ROUTE_URL}/${restaurant}/menu`}
              className="text-blue-500 hover:text-blue-700"
            >
              Back
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default EditMenu;

// import React, { useState, useEffect } from "react";
// import { Link, useParams } from "react-router-dom";
// import api from '../../../api/api'

// const BASE_URL = "http://127.0.0.1:8000";
// const ROUTE_URL = "http://localhost:5173";

// function EditMenu() {
//   const { restaurant, menu } = useParams();
//   const [menuData, setMenuData] = useState({});
//   const [isLoading, setIsLoading] = useState(false);

//   async function fetchMenu(restaurant, menu) {
//     try {
//       setIsLoading(true);
//       const response = await api.get(`${BASE_URL}/${restaurant}/${menu}`);
//       const responseData = response.data || {};
//       setMenuData(responseData);
//     } catch (error) {
//       console.log("Error fetching menu:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   useEffect(() => {
//     fetchMenu(restaurant, menu);
//   }, [restaurant, menu]);

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setMenuData((prevState) => ({
//       ...prevState,
//       [`_Food__${name}`]: value,
//     }));
//   };

//   const handleSize = (event) => {
//   const { name, value } = event.target;
//   // Parse the value for the 'size' attribute only
//   const parsedValue = name === "size" ? JSON.parse(value) : value;
//   setMenuData((prevState) => ({
//     ...prevState,
//     [`_Food__${name}`]: parsedValue,
//   }));
// };


//   const handleSubmit = async () => {
//     try {
//       setIsLoading(true);
//       console.log(menuData);
//       const newMenuData = {
//         name: menuData._Food__name,
//         type: menuData._Food__type,
//         size: menuData._Food__size,
//         price: menuData._Food__price,
//       };

//       await api.put(`${BASE_URL}/${restaurant}/${menu}`, newMenuData);
//     } catch (error) {
//       console.log("Error updating menu:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="p-4">
//   {isLoading ? (
//     <div>Loading...</div>
//   ) : (
//     <>
//       <div className="mb-4">
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
//         <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>
//           Save Changes
//         </button>
//         <br />
//         <Link to={`${ROUTE_URL}/${restaurant}/menu`} className="text-blue-500 hover:text-blue-700">
//           Back
//         </Link>
//       </div>
//     </>
//   )}
// </div>

//   );
// }

// export default EditMenu;