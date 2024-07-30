import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";


const Dropdown = ({trigger, data, menuitems, menuactions}) => {
  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        aria-haspopup="true"
        size="icon"
        variant="ghost"
      >
       {trigger}
        <span className="sr-only">Toggle menu</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
     {menuitems.map((item, index) => <DropdownMenuItem key={index} onClick={() =>menuactions[index](data)}>{item}</DropdownMenuItem>)}
    </DropdownMenuContent>
  </DropdownMenu>
  )
}

export default Dropdown