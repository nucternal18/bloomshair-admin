import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { Image } from "react-bootstrap";

import UploadForm from "../../components/UploadForm";
import useFirestore from "../hooks/useFirestore";

import { AuthContext } from '../../context/AuthContext';

const GalleryListScreen = (props) => {
    const { docs } = useFirestore("images");
    const router = useRouter()
const { loading, userInfo, error } = useContext(AuthContext);
  

  useEffect(() => {
    if (!userInfo.isAdmin) {
      router.push("/login");
    }
  }, []);

  const deleteHandler = (id) => {
    console.log(id);
  };
  return (
    <main className="flex-grow w-full p-2 mx-auto bg-gray-200">
      <section className='flex flex-col lg:flex-row'>
        <div className="px-2 pt-6 pb-8 mx-2 mb-4 bg-white rounded shadow-xl w-72">
          <div className="my-6 ">
            <h1 className="mb-4 text-5xl font-light text-center">Pictures</h1>
            <p className="mb-2 text-center">Load your latest Pictures</p>
            <UploadForm />
          </div>
        </div>
        <div className="w-full px-2 pt-6 pb-8 mx-2 mb-4 bg-white rounded shadow-xl md:mx-auto">
          <div className=" overscroll-auto">
            <table className="flex flex-col flex-no-wrap my-5 overflow-hidden table-auto sm:bg-transparent sm:shadow">
              <thead className="text-white ">
                <tr className="flex flex-col mb-2 bg-green-400 rounded-l-lg flex-no wrap sm:table-row sm:rounded-none sm:mb-0">
                  <th className="w-1/3 p-1 text-center">ID</th>
                  <th className="w-1/3 p-1 text-center">Image</th>
                  <th className="w-1/3 p-1 text-center">NAME</th>
                </tr>
              </thead>
              <tbody className="fex-col md:flex-1 sm:flex-none ">
                {docs &&
                  docs.map((item) => (
                    <tr
                      key={item.id}
                      className="flex flex-col mb-2 flex-no wrap sm:table-row sm:rounded-none sm:mb-0"
                    >
                      <td className="w-2/5 p-3 border border-grey-light hover:bg-gray-100">
                        {item.id}
                      </td>
                      <td className="w-1/5 p-3 border border-grey-light hover:bg-gray-100">
                        <Image
                          src={item.url}
                          alt=""
                          width="50"
                          thumbnail
                          fluid
                          rounded
                        />
                      </td>

                      <td className="w-1/5 p-3 border border-grey-light hover:bg-gray-100">
                        <button
                          variant="danger"
                          className="text-red-600 text-md"
                          onClick={() => deleteHandler(item.id)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
};

export default GalleryListScreen;