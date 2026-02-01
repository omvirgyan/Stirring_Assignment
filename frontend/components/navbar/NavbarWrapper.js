"use client";

import { useEffect, useState } from "react";
import PublicNavbar from "./PublicNavbar";
import AuthNavbar from "./AuthNavbar";

export default function NavbarWrapper() {
  const [isAuth, setIsAuth] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsAuth(!!token);
    };

    checkAuth();

    window.addEventListener("storage", checkAuth);
    window.addEventListener("auth-change", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("auth-change", checkAuth);
    };
  }, []);

  if (!mounted) return null;

  return isAuth ? <AuthNavbar /> : <PublicNavbar />;
}
