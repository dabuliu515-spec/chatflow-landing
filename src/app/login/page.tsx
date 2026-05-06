"use client"
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        setMessage("Error: " + error.message);
      } else {
        setMessage("Sign up successful! Check your email to confirm.");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setMessage("Error: " + error.message);
      } else {
        setMessage("Login successful!");
        window.location.href = "/dashboard";
      }
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          {isSignUp ? "Sign Up for ChatFlow" : "Login to ChatFlow"}
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>
        
        {message && (
          <div className="mt-4 p-3 rounded-lg text-center text-sm bg-blue-50 text-blue-700">
            {message}
          </div>
        )}
        
        <div className="mt-6 text-center text-sm text-gray-600">
          {isSignUp ? (
            <p>
              Already have an account?{" "}
              <button onClick={() => setIsSignUp(false)} className="text-blue-600 hover:underline">
                Login
              </button>
            </p>
          ) : (
            <p>
              Don't have an account?{" "}
              <button onClick={() => setIsSignUp(true)} className="text-blue-600 hover:underline">
                Sign Up
              </button>
            </p>
          )}
        </div>
        
        <div className="mt-4 text-center">
          <Link href="/" className="text-sm text-gray-500 hover:text-blue-600">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}