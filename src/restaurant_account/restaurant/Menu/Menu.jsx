import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axious from 'axios'
import api from '../../../api/api'

const BASE_URL = 'http://127.0.0.1:8000'

function Menu() {
    const { restaurant_name } = useParams()
    const [menues, setMenues] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    async function fetchMenu(restaurant_name) {
        try {
            setIsLoading(true);
            const response = await api.get(`${BASE_URL}/${restaurant_name}`)
            setMenues(response.data)
        }
        catch (error) {
            console.log('error', error)
        }
        finally {
            setIsLoading(false);
        }
    }

    async function deleteMenu(name_menu) {
        try {
            setIsLoading(true)
            await api.delete(`${BASE_URL}/${restaurant_name}/${name_menu}`)
            await fetchMenu(restaurant_name)
        } catch (error) {
            console.log('error', error)
        }
        finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchMenu(restaurant_name)
    }
        , [])

    return (
        <div className='bg-gradient-to-b from-green-500 to-blue-500 min-h-screen'>
      <section className="grid place-items-center bg-emerald-900 p-16 min-h-screen">
        {isLoading && (
          <div class="flex items-center justify-center w-full h-[100vh] text-gray-900 dark:text-gray-100 dark:bg-gray-950">
            <div>
              <h1 class="text-xl md:text-7xl font-bold flex items-center">
                L
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 24 24"
                  class="animate-spin"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM13.6695 15.9999H10.3295L8.95053 17.8969L9.5044 19.6031C10.2897 19.8607 11.1286 20 12 20C12.8714 20 13.7103 19.8607 14.4956 19.6031L15.0485 17.8969L13.6695 15.9999ZM5.29354 10.8719L4.00222 11.8095L4 12C4 13.7297 4.54894 15.3312 5.4821 16.6397L7.39254 16.6399L8.71453 14.8199L7.68654 11.6499L5.29354 10.8719ZM18.7055 10.8719L16.3125 11.6499L15.2845 14.8199L16.6065 16.6399L18.5179 16.6397C19.4511 15.3312 20 13.7297 20 12L19.997 11.81L18.7055 10.8719ZM12 9.536L9.656 11.238L10.552 14H13.447L14.343 11.238L12 9.536ZM14.2914 4.33299L12.9995 5.27293V7.78993L15.6935 9.74693L17.9325 9.01993L18.4867 7.3168C17.467 5.90685 15.9988 4.84254 14.2914 4.33299ZM9.70757 4.33329C8.00021 4.84307 6.53216 5.90762 5.51261 7.31778L6.06653 9.01993L8.30554 9.74693L10.9995 7.78993V5.27293L9.70757 4.33329Z"></path>
                </svg>{" "}
                ading . . .
              </h1>
            </div>
          </div>
        )}
        {!isLoading && (
          <>
            <Link to={`/${restaurant_name}/add`} className="text-blue-500 hover:text-blue-700">
            <button class="mb-4 group relative h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow">
                <div class="absolute inset-0 w-3 bg-amber-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                <span class="relative text-black group-hover:text-white">
                  Add menu
                </span>
              </button>
              </Link>
            {menues.map((menu, index) => (
              <div
                key={index}
                className="border border-gray-200 p-10 mb-4 rounded-md bg-white flex flex-col justify-center items-center"
              >
                <h2 className="text-2xl font-bold mb-2">{menu._Food__name}</h2>
                <p className="font-bold mb-1">Type : {menu._Food__type}</p>
                <div>
                  {Object.entries(menu._Food__size).map(([key, value]) => (
                    <div className="table-row" key={key}>
                      <div>
                        {key} +{value}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="font-bold mb-1">Price : {menu._Food__price}</p>
                <Link to={`/${restaurant_name}/edit/${menu._Food__name}`}>
                <button class="bg-green-600 text-white px-4 py-2 rounded mb-2">
                  Edit
                </button>
                </Link>
                <button
                  class="bg-red-600 text-white px-4 py-2 rounded"
                  onClick={async () => {
                    await deleteMenu(menu._Food__name);
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
            <Link to={`/${restaurant_name}`} className="text-blue-500 hover:text-blue-700">
            <button class="mb-4 group relative h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow">
                <div class="absolute inset-0 w-3 bg-amber-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                <span class="relative text-black group-hover:text-white">
                  Back
                </span>
              </button>
              </Link>
          </>
        )}
      </section>
    </div>
    )
}

export default Menu