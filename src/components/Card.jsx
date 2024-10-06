import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CiSettings } from "react-icons/ci";

const Card = () => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <CiSettings className="text-[30px]" />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="bg-white p-2 rounded-md shadow-md">
          <DropdownMenuLabel className="text-xl">
            Transaction Setting
          </DropdownMenuLabel>
          <DropdownMenuLabel>Transaction Tolerance</DropdownMenuLabel>

          <DropdownMenuItem
            className="flex  gap-2 justify-between "
            // Prevent the menu from closing when selecting this item
            onSelect={(e) => e.preventDefault()}
          >
            <input
              type="number"
              className="  p-1 rounded-md outline-none"
              placeholder="0.5"
            />{" "}
            <span>%</span>
          </DropdownMenuItem>
          <DropdownMenuLabel>Transaction Deadline</DropdownMenuLabel>

          <DropdownMenuItem
            className="flex  justify-between gap-2 "
            onSelect={(e) => e.preventDefault()}
          >
            <input type="text" className=" p-1 rounded-md" placeholder="10" />
            <span>min</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Card;

// Uniswap V3 Frontend
