import { lazy } from "react";
import { NavLink } from "react-router-dom";
import { Tooltip,TooltipContent,TooltipTrigger } from "@/components/ui/tooltip";
import { UserRoundMinus, LifeBuoy,UserRoundPlus,Package, SquareUser } from "lucide-react";

const NAV_DATA = [
    {
        id: 1,
        title: 'Xaridorlar',
        path: '/dashboard/customers',
        icon: (c) => <UserRoundPlus className={c}/>
    },
    {
        id: 2,
        title: 'Sotuvchilar',
        path: '/dashboard/sellers',
        icon: (c) => <UserRoundMinus className={c} />
    },
    {
        id: 3,
        title: 'Mahsulotlar',
        path: '/dashboard/products',
        icon:  (c) => <Package className={c}/>
    },
    {
        id: 4,
        title: 'Yordam',
        path: '/dashboard/help',
        icon: (c) => <LifeBuoy className={c}/>
    },
    {
        id: 5,
        title: 'Profil',
        path: '/dashboard/profile',
        icon: (c) => <SquareUser className={c}/>
    }
]

const Logo = lazy(() => import("@/components/logo/logo"))

export const mappings = {
    sider: {
        logo: <Logo variant={'small'}/>,
        navs: (data) => NAV_DATA.map(nav_item => 
        <Tooltip key={nav_item.id}>
            <TooltipTrigger asChild>
              <NavLink
                end={nav_item.path === "/dashboard"}
                to={nav_item.path}
                variant="ghost"
                size="icon"
                className={`rounded-lg p-[12px] flex items-center gap-[20px] ${nav_item.title === "Yordam" && "mt-auto"}`}
                aria-label="Seller"
              >
                {nav_item.icon('size-5 min-w-5 min-h-5')}
                <span >{nav_item.title === "Profile" ? data?.innerData.user.fname : nav_item.title}</span>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
            {nav_item.title === "Profile" ? data?.innerData.user.fname : nav_item.title}
            </TooltipContent>
          </Tooltip>)
    }
}