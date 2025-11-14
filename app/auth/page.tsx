"use client";
import { useActionState } from "react";
import { getBrowserSupabase } from "@/lib/supabase/client";
const AuthContainer = () => {
  const supabase = getBrowserSupabase();
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

  const session = supabase.auth.getSession();
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <section className="flex flex-col w-96 max-w-128 h-128 max-h-140 items-center justify-center bg-gradient-to-br from-slate-700 to-slate-900 rounded-4xl shadow-2xl">
        <h2 className="h-[10%] bg-gradient-to-r from-blue-600 to-purple-600 text-white w-full rounded-t-3xl flex items-center justify-center font-bold text-xl">
          Iniciar sesión
        </h2>
        <form
          action={submitAction}
          className="flex flex-col w-full gap-4  h-[80%] justify-center items-center"
        >
          <p className="text-white font-medium">Correo electronico</p>
          <input
            type="email"
            placeholder="Escribi tu correo electronico"
            name="email"
            required
            className="w-[80%] bg-white py-4 rounded-2xl px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
          />
          <p className="text-white font-medium">Contraseña</p>
          <input
            type="password"
            placeholder="Contraseña"
            name="password"
            required
            className="w-[80%] bg-white py-4 rounded-2xl px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
          />
          <button
            className="w-[80%] cursor-pointer
           bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-2xl font-bold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 "
          >
            Ingresar
          </button>
        </form>
        <div className="h-[10%]">
          <p>
            ¿No estas registrado?{" "}
            <button className="text-blue-400 cursor-pointer">
              Registrate aca
            </button>
          </p>
        </div>
      </section>
    </main>
  );
};

export default AuthContainer;
