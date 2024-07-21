import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger
  } from "@/components/ui/navigation-menu";
import { Button } from "../ui/button"
import {PanelRightOpen, PanelLeftOpen} from "lucide-react"

const Nav = ({collapsed, setCollapsed}) => {
  return (
    <NavigationMenu className="p-[20px] flex-none justify-start max-w-full border-b-[1px] bg-white border-gray-200 shadow sticky top-0">
        <Button variant="ghost" onClick = {() => setCollapsed(!collapsed)}>
          {collapsed ? <PanelLeftOpen/> : <PanelRightOpen/>}
        </Button>
        <NavigationMenuList className="flex-1">
            <NavigationMenuItem>
            <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
            <NavigationMenuContent>
                <NavigationMenuLink>Link</NavigationMenuLink>
            </NavigationMenuContent>
            </NavigationMenuItem>
        </NavigationMenuList>
    </NavigationMenu>
  )
}

export default Nav