declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Button: typeof import('./components/shadcn/ui')['Button']
    NavigationMenu: typeof import('./components/shadcn/ui')['NavigationMenu']
    NavigationMenuList: typeof import('./components/shadcn/ui')['NavigationMenuList']
    NavigationMenuItem: typeof import('./components/shadcn/ui')['NavigationMenuItem']
    NavigationMenuTrigger: typeof import('./components/shadcn/ui')['NavigationMenuTrigger']
    NavigationMenuContent: typeof import('./components/shadcn/ui')['NavigationMenuContent']
    NavigationMenuLink: typeof import('./components/shadcn/ui')['NavigationMenuLink']
    Menubar: typeof import('./components/shadcn/ui')['Menubar']
    MenubarMenu: typeof import('./components/shadcn/ui')['MenubarMenu']
    MenubarTrigger: typeof import('./components/shadcn/ui')['MenubarTrigger']
    MenubarContent: typeof import('./components/shadcn/ui')['MenubarContent']
    MenubarItem: typeof import('./components/shadcn/ui')['MenubarItem']
    Label: typeof import('./components/shadcn/ui')['Label']
    Input: typeof import('./components/shadcn/ui')['Input']
    Card: typeof import('./components/shadcn/ui')['Card']
    CardHeader: typeof import('./components/shadcn/ui')['CardHeader']
    CardTitle: typeof import('./components/shadcn/ui')['CardTitle']
    CardDescription: typeof import('./components/shadcn/ui')['CardDescription']
    CardContent: typeof import('./components/shadcn/ui')['CardContent']
    CardFooter: typeof import('./components/shadcn/ui')['CardFooter']
  }
} 