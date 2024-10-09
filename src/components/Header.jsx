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
import { Link2Icon, LogOut } from "lucide-react";
import { logOut } from "@/db/apiAuth";
import useFetch from "@/Hooks/useFetch";
import { BarLoader } from "react-spinners";

const Header = () => {
  const navigate = useNavigate();
  const { user, fetchUser } = urlState();

  const { loading, fn } = useFetch(logOut);

  const handleLogout = async () => {
    try {
      await fn(); // Complete logout
      await fetchUser(); // Fetch updated user state
      navigate("/"); // Navigate after fetching user data
    } catch (error) {
      console.error("Logout failed", error); // Handle error appropriately
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
          <DropdownMenu>
            <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden">
              <Avatar>
                <AvatarImage
                  src={
                    user?.user_metadata?.profile_pic ||
                    user?.user_metadata?.avatar_url
                  }
                />
                <AvatarFallback>{user?.user_metadata?.name}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{user?.user_metadata?.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link2Icon className="mr-2 h-4 w-4" />
                <span>My Links</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-500">
                <LogOut className="mr-2 h-4 w-4" />
                <span onClick={handleLogout}>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            onClick={() => navigate("/auth")}
            className="hover:bg-blue-400 hover:text-white"
          >
            Login
          </Button>
        )}
      </div>
      {loading && (
        <div
          className="w-full mt-4 "
          style={{
            background: "linear-gradient(to right, #f64f59, #c471ed, #12c2e9)",
          }}
        >
          <BarLoader width={"100%"} color="#ffffff" />
        </div>
      )}{" "}
    </nav>
  );
};

export default Header;
