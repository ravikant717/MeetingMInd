"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/services/auth.service";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.replace("/dashboard");
    }
  }, [router]);

  const handleLogin = async () => {
    try {
      const data = await registerUser(username, email, password);

      localStorage.setItem("token", data.token);
      router.replace("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-80 space-y-4">
          <input
            className="w-full border p-2"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            className="w-full border p-2"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full border p-2"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full rounded bg-white p-2 text-black"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
