
import { Home } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HomeButton = () => {
  return (
    <div className="fixed top-4 left-4 z-50">
      <Link to="/">
        <Button variant="outline" size="sm" className="gap-2 rounded-full shadow-md bg-white dark:bg-gray-800">
          <Home className="h-4 w-4" />
          <span className="hidden sm:inline">Página Inicial</span>
        </Button>
      </Link>
    </div>
  );
};

export default HomeButton;
