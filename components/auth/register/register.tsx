import { SupabaseClient } from "@supabase/supabase-js";
import Link from "next/link";
import { useActionState } from "react";
import { ImSpinner9 } from "react-icons/im";

const RegisterComponent = ({ supabase }: { supabase: SupabaseClient }) => {
  const [state, submitAction, isPending] = useActionState(
    async (prevState: any, queryData: FormData) => {
      const email = queryData.get("email");
      const password = queryData.get("password");
      const username = queryData.get("username");
      const repit_password = queryData.get("repeatPassword");

      if (password !== repit_password) {
        return { error: "Las contraseñas no coinciden" };
      }

      try {
        // Registrar usuario en Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp(
          {
            email: email as string,
            password: password as string,
            options: {
              data: {
                display_name: username as string,
              },
              emailRedirectTo:
                "https://animedle-nextjs-git-dev-matias-bobis-projects.vercel.app/auth/callback",
            },
          }
        );

        if (authError) {
          return {
            error: "Error al registrar usuario, intentelo de nuevo más tarde",
          };
        }

        // Aqui verifico si se creo un usuario
        if (!authData.user) {
          return { error: "No se pudo crear el usuario" };
        }

        // Verificamos si el usuario necesita el mail o si ya esta registrado.
        if (authData.user.identities && authData.user.identities.length === 0) {
          return { error: "El usuario ya está registrado" };
        }

        if (authData.user.confirmed_at || authData.user.email_confirmed_at) {
          return { success: "Usuario registrado y verificado con éxito" };
        } else {
          return {
            success:
              "Usuario registrado con éxito. Por favor, verifica tu email para activar tu cuenta.",
          };
        }
      } catch (error) {}

      return { error: "Error al registrarse" };
    },
    null
  );
  return (
    <section className="flex flex-col w-[80%] min-w-80 max-w-md lg:max-w-lg xl:max-w-xl items-center bg-[#131212] p-8 rounded-3xl mx-auto min-h-[500px] border border-gray-700">
      {state?.success && !isPending && (
        <div className="w-full bg-green-500 text-white p-4 rounded-2xl text-center my-4">
          {state.success}
        </div>
      )}
      {state?.error && (
        <div className="w-full bg-red-500 text-white p-4 rounded-2xl text-center my-4">
          {state.error}
        </div>
      )}
      {isPending && (
        <div className="w-full flex justify-center items-center text-white p-4 rounded-2xl text-center my-4">
          <ImSpinner9 size={32} className="animate-spin" />
        </div>
      )}

      <div className="w-full mb-8">
        <h2 className="text-white w-full text-center font-bold text-3xl">
          Registrarse
        </h2>
      </div>

      <form
        action={submitAction}
        className="flex flex-col w-full h-full justify-between space-y-6"
      >
        <div className="space-y-6">
          <div className="flex flex-col items-center justify-center space-y-2">
            <label
              htmlFor="username"
              className="sr-only text-white text-center font-medium"
            >
              Nombre a mostrar
            </label>
            <input
              type="text"
              placeholder="Escribi tu nombre a mostrar"
              name="username"
              required
              className="w-[100%] bg-gray-900 py-3 rounded-xl px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 text-white"
            />
          </div>
          <div className="flex flex-col items-center justify-center space-y-2">
            <label
              htmlFor="email"
              className="sr-only text-white text-center font-medium"
            >
              Correo electronico
            </label>

            <input
              type="email"
              placeholder="Escribi tu correo electronico"
              name="email"
              required
              className="w-[100%] bg-gray-900 py-3 rounded-xl px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 text-white"
            />
          </div>

          <div className="flex flex-col items-center justify-center space-y-2">
            <label
              htmlFor="password"
              className="sr-only text-white text-center font-medium"
            >
              Contraseña
            </label>

            <input
              type="password"
              placeholder="Contraseña"
              name="password"
              required
              className="w-[100%] bg-gray-900 py-3 rounded-xl px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 text-white"
            />
          </div>
          <div className="flex flex-col items-center justify-center space-y-2">
            <label
              htmlFor="repeatPassword"
              className="sr-only text-white text-center font-medium"
            >
              Repetir contraseña
            </label>

            <input
              type="password"
              placeholder="Repetir contraseña"
              name="repeatPassword"
              required
              className="w-[100%] bg-gray-900 py-3 rounded-xl px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 text-white"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center items-center pt-4">
          <button className="w-[80%] cursor-pointer bg-gray-900 text-white py-3 rounded-2xl font-bold hover:bg-blue-600 transition-all duration-300">
            Registrarme
          </button>
        </div>
      </form>
      <div className="mt-4 text-[1.2rem]">
        <Link href="/login">
          <p>
            ¿Ya estás registrado? 
            <button className="text-blue-400 cursor-pointer font-bold">
              Inicia sesión
            </button>
          </p>
        </Link>
      </div>
    </section>
  );
};

export default RegisterComponent;
