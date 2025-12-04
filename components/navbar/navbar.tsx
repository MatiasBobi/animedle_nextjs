"use client";
import { getBrowserSupabase } from "@/lib/supabase/client";
import Link from "next/link";
import { HiOutlineX } from "react-icons/hi";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { FaEnvelope, FaHome, FaGamepad } from "react-icons/fa";
import { FcBarChart } from "react-icons/fc";
import { GiHamburgerMenu } from "react-icons/gi";
import { redirect } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [supabase, setSupabase] = useState<any>(null);

  useEffect(() => {
    const initializeSupabase = async () => {
      const client = await getBrowserSupabase();
      setSupabase(client);

      // Aca vamos a obtener el usuario
      const {
        data: { user },
      } = await client.auth.getUser();
      setUser(user);

      // Vamos a estar escuchando los cambios de session.
      const {
        data: { subscription },
      } = client.auth.onAuthStateChange(async (event, session) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);
      });

      return () => {
        subscription.unsubscribe(); // <--- Vamos a desuscribirnos cuando el componente se desmonte.
      };
    };

    initializeSupabase();
  }, []);

  const handleCloseSession = async () => {
    if (user && supabase) {
      await supabase.auth.signOut();
      setUser(null);
      redirect("/");
    }
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="flex flex-row justify-between items-center md:p-0 py-6 px-4 bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700 md:border-none md:bg-[#171717] relative">
      {/* Boton menu mobile */}

      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <HiOutlineX className="text-white text-2xl cursor-pointer" />
          ) : (
            <GiHamburgerMenu className="text-white text-2xl cursor-pointer" />
          )}
        </button>
      </div>

      {/* Menú mobile */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-0 z-50 bg-gradient-to-b from-gray-900 to-gray-800">
          <div className="flex justify-start p-4">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen && (
                <HiOutlineX className="text-white text-3xl cursor-pointer" />
              )}
            </button>
          </div>
          <div className="h-full overflow-y-auto pb-4">
            <ul className="flex flex-col p-4 gap-2">
              <li
                className="flex items-center gap-4 text-white hover:bg-gray-700 rounded-xl px-4 py-4 transition-all duration-300 cursor-pointer group"
                onClick={handleCloseMenu}
              >
                <FaHome className="text-blue-400 group-hover:text-blue-300 transition-colors" />
                <span className="text-[1.2rem] font-medium">Inicio</span>
              </li>
              <li
                className="flex items-center gap-4 text-white hover:bg-gray-700 rounded-xl px-4 py-4 transition-all duration-300 cursor-pointer group"
                onClick={handleCloseMenu}
              >
                <FaGamepad className="text-green-400 group-hover:text-green-300 transition-colors" />
                <span className="text-[1.2rem] font-medium">Juego diario</span>
              </li>
              <li
                className="flex items-center gap-4 text-white hover:bg-gray-700 rounded-xl px-4 py-4 transition-all duration-300 cursor-pointer group"
                onClick={handleCloseMenu}
              >
                <FcBarChart className="text-purple-400 group-hover:text-purple-300 transition-colors" />
                <span className="text-[1.2rem] font-medium">Estadísticas</span>
              </li>
              <li
                className="flex items-center gap-4 text-white hover:bg-gray-700 rounded-xl px-4 py-4 transition-all duration-300 cursor-pointer group"
                onClick={handleCloseMenu}
              >
                <FaEnvelope className="text-yellow-400 group-hover:text-yellow-300 transition-colors" />
                <span className="text-[1.2rem] font-medium">Contacto</span>
              </li>
            </ul>

            <div className="flex flex-col justify-center items-center w-full mt-8 px-4">
              {user === null ? (
                <Link
                  href={"/login"}
                  className="w-full bg-blue-600 hover:bg-blue-700 rounded-2xl cursor-pointer px-4 py-3 text-center"
                  onClick={handleCloseMenu}
                >
                  <span className="cursor-pointer text-white font-medium">
                    Iniciar sesión
                  </span>
                </Link>
              ) : (
                <button
                  className="w-full bg-red-600 hover:bg-red-700 rounded-2xl cursor-pointer px-4 py-3 text-white font-medium"
                  onClick={() => {
                    handleCloseSession();
                    handleCloseMenu();
                  }}
                >
                  Cerrar sesión
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Menu > 768px desktop */}
      <div className="hidden md:flex md:justify-between md:items-center md:w-full md:h-14 md:px-2">
        <ul className="flex flex-row gap-4">
          <li className="flex items-center gap-4 text-white hover:bg-gray-700 rounded-xl px-4 py-2 transition-all duration-300 cursor-pointer group">
            <FaHome className="text-blue-400 group-hover:text-blue-300 transition-colors" />
            <span className="text-[1.2rem] font-medium">Inicio</span>
          </li>
          <li className="flex items-center gap-4 text-white hover:bg-gray-700 rounded-xl px-4 py-2 transition-all duration-300 cursor-pointer group">
            <FaGamepad className="text-green-400 group-hover:text-green-300 transition-colors" />
            <span className="text-[1.2rem] font-medium">Juego diario</span>
          </li>
          <li className="flex items-center gap-4 text-white hover:bg-gray-700 rounded-xl px-4 py-2 transition-all duration-300 cursor-pointer group">
            <FcBarChart className="text-purple-400 group-hover:text-purple-300 transition-colors" />
            <span className="text-[1.2rem] font-medium">Estadísticas</span>
          </li>
          <li className="flex items-center gap-4 text-white hover:bg-gray-700 rounded-xl px-4 py-2 transition-all duration-300 cursor-pointer group">
            <FaEnvelope className="text-yellow-400 group-hover:text-yellow-300 transition-colors" />
            <span className="text-[1.2rem] font-medium">Contacto</span>
          </li>
        </ul>
        <div>
          <p>{user?.user_metadata.display_name}</p>
        </div>
        <div className="flex justify-center items-center">
          {user === null ? (
            <Link
              href={"/login"}
              className="bg-blue-600 hover:bg-blue-700 rounded-2xl cursor-pointer px-4 py-2"
            >
              <button className="cursor-pointer text-white">
                Iniciar sesión
              </button>
            </Link>
          ) : (
            <button
              className="bg-red-600 hover:bg-red-700 rounded-2xl cursor-pointer px-4 py-2 text-white"
              onClick={handleCloseSession}
            >
              Cerrar sesión
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
