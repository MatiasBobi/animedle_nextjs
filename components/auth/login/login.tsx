import { AuthError, SupabaseClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuthUser";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
const LoginComponent = ({ supabase }: { supabase: SupabaseClient }) => {
  // User

  useEffect(() => {
    const getUserSession = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data.user) {
        redirect("/");
      }
    };
    getUserSession();
  }, [supabase]);
  const [state, submitAction, isPending] = useActionState(
    async (prevState: any, queryData: FormData) => {
      const email = queryData.get("email");
      const password = queryData.get("password");

      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email as string,
          password: password as string,
        });

        if (error) {
          return { error: "Error al iniciar sesión, verifica tus datos" };
        }
        if (data.session) {
          toast.success("Inicio de sesión exitoso", {
            onClose: () => redirect("/"),
          });

          return { success: "Inicio de sesión exitoso" };
        }
      } catch (error) {
        return {
          error: "Hubo un error al intentar conectarse con el servidor.",
        };
      }

      return null;
    },
    null
  );

  return (
    <section className="flex flex-col w-[90%] min-w-80 max-w-md lg:max-w-lg xl:max-w-xl items-center bg-[#131212] p-8 rounded-3xl mx-auto min-h-[400px] border border-gray-700">
      <ToastContainer />
      <div className="w-full mb-8">
        <h2 className="text-white w-full text-center font-bold text-3xl">
          Iniciar sesión
        </h2>
      </div>

      {state?.success && (
        <div className="w-full bg-green-500 text-white p-4 rounded-2xl text-center my-4">
          {state.success}
        </div>
      )}
      {state?.error && (
        <div className="w-full bg-red-500 text-white p-4 rounded-2xl text-center my-4">
          {state.error}
        </div>
      )}
      <form
        action={submitAction}
        className="flex flex-col w-full h-full justify-between space-y-6"
      >
        <div className="space-y-6">
          <div className="flex flex-col items-center justify-center space-y-2">
            <p className="text-white text-center font-medium">
              Correo electronico
            </p>
            <input
              type="email"
              placeholder="Escribi tu correo electronico"
              name="email"
              required
              className="w-[100%] bg-gray-900 py-3 rounded-2xl px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 text-white"
            />
          </div>

          <div className="flex flex-col items-center justify-center space-y-2">
            <p className="text-white text-center font-medium">Contraseña</p>
            <input
              type="password"
              placeholder="Contraseña"
              name="password"
              required
              className="w-[100%] bg-gray-900 py-3 rounded-2xl px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 text-white"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center items-center pt-4">
          <button className="w-[80%] cursor-pointer bg-gray-900 text-white py-3 rounded-2xl font-bold hover:bg-blue-600 transition-all duration-300">
            Ingresar
          </button>
        </div>
      </form>
      <div className="mt-4 text-[1.2rem]">
        <p>
          ¿No estás registrado? 
          <Link href="/register">
            <button className="text-blue-400 cursor-pointer font-bold">
              Regístrate acá
            </button>
          </Link>
        </p>
      </div>
    </section>
  );
};

export default LoginComponent;
