import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import React from "react";

const NavBar = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <nav className="flex justify-between items-center p-2">
      <div>
        {user === null ? (
          <Link href={"/auth"}>
            <button className="bg-blue-600 hover:bg-blue-700 rounded-2xl cursor-pointer px-4 py-3">
              Iniciar sesión
            </button>
          </Link>
        ) : (
          <button className="bg-blue-600 hover:bg-blue-700 rounded-2xl cursor-pointer px-4 py-3 ">
            Cerrar sesión
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
