"use client";

import { useSelector } from "react-redux";
import Login from "./login/page";
import Dashboard from "./dashboard/page";

export default function Home() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="p-5">
      {user ? <Dashboard /> : <Login />}
    </div>
  );
}