import { Link } from "react-router-dom";

const AdminPanel = () => {
  return (
    <div className="flex justify-center items-center">
      <section className="grid place-items-center min-h-screen w-full
      bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500">
        <div class="bg-slate-300 rounded-md relative flex gap-10 flex-col justify-center items-center 
        px-[1rem] overflow-hidden py-[1rem]">
          <div className="bg-gradient-to-b from-indigo-500 to-pink-500 text-white rounded-md py-[0.5rem] w-full text-center">
            <h1 className="text-[1.6rem] font-bold">APPROVAL</h1>
          </div>
          <div>
            <h2 className="font-bold text-[1.2rem]">RIDER SYSTEM</h2>
          </div>
          <Link to='/admin/approve/rider'>
            <button class="btn overflow-hidden relative w-64 bg-blue-500 text-white py-4 px-4 
            rounded-xl font-bold uppercase -- before:block before:absolute before:h-full before:w-full 
            before:bg-red-300 before:left-0 before:top-0 before:-translate-y-full hover:before:translate-y-0 
            before:transition-transform">
              <span class="relative">RIDER</span>
            </button>
          </Link>
          <div>
            <h2 className="font-bold text-[1.2rem]">RESTAURANT SYSTEM</h2>
          </div>
          <Link to='/admin/approve/restaurant'>
            <button class="btn overflow-hidden relative w-64 bg-blue-500 text-white py-4 px-4 rounded-xl 
            font-bold uppercase -- before:block before:absolute before:h-full before:w-1/2 before:rounded-full 
            before:bg-orange-400 before:top-0 before:left-1/4 before:transition-transform 
            before:opacity-0 before:hover:opacity-100 hover:text-orange-200 hover:before:animate-ping 
            transition-all duration-300">
              <span class="relative">RESTAURANT</span>
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AdminPanel;
