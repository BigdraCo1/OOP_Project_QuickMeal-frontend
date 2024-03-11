import { Link } from "react-router-dom";

const AdminPanel = () => {
  return (
    <>
    <section className="grid place-items-center bg-emerald-900 p-16 min-h-screen">
      <div class="relative flex gap-10 min-h-screen flex-col justify-center items-center overflow-hidden py-6 sm:py-12">
        <Link to='/admin/approve/rider'>
        <button class="btn overflow-hidden relative w-64 bg-blue-500 text-white py-4 px-4 rounded-xl font-bold uppercase -- before:block before:absolute before:h-full before:w-full before:bg-red-300 before:left-0 before:top-0 before:-translate-y-full hover:before:translate-y-0 before:transition-transform">
          <span class="relative">RIDER</span>
        </button>
        </Link>
        <Link to='/admin/approve/restaurant'>
        <button class="btn overflow-hidden relative w-64 bg-blue-500 text-white py-4 px-4 rounded-xl font-bold uppercase -- before:block before:absolute before:h-full before:w-1/2 before:rounded-full before:bg-orange-400 before:top-0 before:left-1/4 before:transition-transform before:opacity-0 before:hover:opacity-100 hover:text-orange-200 hover:before:animate-ping transition-all duration-300">
          <span class="relative">RESTAURANT</span>
        </button>
        </Link>
      </div>
    </section>
    </>
  );
};

export default AdminPanel;
