import { SupabaseClient } from "@supabase/supabase-js";
import { useActionState } from "react";

const RegisterComponent = ({ supabase }: { supabase: SupabaseClient }) => {
  const [state, submitAction, isPending] = useActionState(
    async (prevState: any, queryData: FormData) => {
      const email = queryData.get("email");
      const password = queryData.get("password");
      console.log(email);
      console.log(password);
      async function signUpNewUser() {
        const { data, error } = await supabase.auth.signUp({
          email: email as string,
          password: password as string,
          options: {
            emailRedirectTo: "http://localhost:3000/",
          },
        });
      }
      try {
        signUpNewUser();
        console.log("Usuario creado");
      } catch (error) {
        console.log(error);
      }
      /*const response = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        return { error: "Error al iniciar sesión" };
      }

      const data = await response.json();
      return data;*/
      return null;
    },
    null
  );
  return (
    <section className="flex flex-col w-[80%] min-w-80 max-w-md lg:max-w-lg xl:max-w-xl items-center bg-[#131212] p-8 rounded-3xl mx-auto min-h-[500px] border border-gray-700">
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
            <p className="text-white text-center font-medium">
              Correo electronico
            </p>
            <input
              type="email"
              placeholder="Escribi tu correo electronico"
              name="email"
              required
              className="w-[100%] bg-gray-900 py-3 rounded-xl px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 text-white"
            />
          </div>

          <div className="flex flex-col items-center justify-center space-y-2">
            <p className="text-white text-center font-medium">Contraseña</p>
            <input
              type="password"
              placeholder="Contraseña"
              name="password"
              required
              className="w-[100%] bg-gray-900 py-3 rounded-xl px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 text-white"
            />
          </div>
          <div className="flex flex-col items-center justify-center space-y-2">
            <p className="text-white text-center font-medium">
              Repetir contraseña
            </p>
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
        <p>
          ¿Ya estás registrado? 
          <button className="text-blue-400 cursor-pointer font-bold">
            Inicia sesión
          </button>
        </p>
      </div>
    </section>
  );
};

export default RegisterComponent;
