import {
    NavigationMenu
  } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {PanelRightOpen, PanelLeftOpen} from "lucide-react"
import { Input } from "@/components/ui/input";

const Nav = ({collapsed, handleCollapsed}) => {
  return (
    <NavigationMenu className="p-[20px] flex-none justify-start max-w-full border-b-[1px] bg-white border-gray-200 shadow sticky top-0">
        <Button variant="ghost" onClick = {() => handleCollapsed()}>
          {collapsed ? <PanelLeftOpen/> : <PanelRightOpen/>}
        </Button>
        <Input placeholder="Qidirish" className="w-full max-w-[550px]" />
    </NavigationMenu>
  )
}

export default Nav