import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { urlState } from "@/UserContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { logOut } from "@/db/apiAuth";
import useFetch from "@/Hooks/useFetch";
import LoadingBar from "./LoadingBar";

const Header = () => {
  const navigate = useNavigate();
  const { user, fetchUser } = urlState(); // Get user data and fetch function from context

  const { loading, fn } = useFetch(logOut); // Fetch function for logging out

  const handleLogout = async () => {
    try {
      await fn(); // Complete logout
      await fetchUser(); // Fetch updated user state
      navigate("/"); // Navigate to the home page after logout
    } catch (error) {
      console.error("Logout failed", error); // Handle logout error
    }
  };

  return (
    <nav className="py-6 flex justify-between items-center flex-wrap">
      <Link to="/">
        <h1
          className="font-extrabold text-3xl bg-clip-text text-transparent"
          style={{
            background: "linear-gradient(to right, #f64f59, #c471ed, #12c2e9)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          LinkLytics.
        </h1>
      </Link>
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <Link to="/dashboard" className="flex mr-5">
              <Button className="bg-blue-500 hover:bg-blue-400 text-white p-1 sm:p-3">
                My Links
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden">
                <Avatar>
                  <AvatarImage
                    src={
                      user?.user_metadata?.profile_pic ||
                      user?.user_metadata?.picture ||
                      user?.user_metadata?.avatar_url
                    }
                  />
                  <AvatarFallback>
                    {user?.user_metadata?.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mt-2 text-center">
                <DropdownMenuLabel>
                  {user?.user_metadata?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-500 items-center flex justify-center  cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <Button
            onClick={() => navigate("/auth")}
            className="bg-blue-500 hover:bg-blue-400 text-white"
          >
            Login
          </Button>
        )}
      </div>
      {loading && ( // Show loading spinner while logging out
        <LoadingBar />
      )}
    </nav>
  );
};

export default Header;
