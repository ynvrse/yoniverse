import { Icons } from '@/components/icons';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { sidebarMenu } from '@/config/sidebar-menu';
import useAppConfig from '@/hooks/useStellaryst';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { TableOfContents } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export function Header() {
    const { stellaryst, fetchStellaryst } = useAppConfig();
    const [open, setOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/settings') {
            fetchStellaryst();
        }
    }, [location]);

    return (
        <header className="supports-backdrop-blur:bg-background/60 bg-background/90 sticky top-0 z-50 w-full border-b border-gray-500 backdrop-blur">
            <div className="relative container flex h-14 items-center justify-between px-2 md:px-8">
                {/* Left */}
                <div className="flex items-center space-x-1">
                    {/* <Icons.logo className="h-10 w-10" /> */}
                    <span className="inline-block text-sm text-black md:font-bold dark:text-white">Kotabaru, IDN</span>
                </div>

                {/* Center */}
                <div className="font-newspaper absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl md:text-2xl">
                    The Portfolio
                </div>

                {/* Right */}
                {/* right */}

                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <div className="flex items-center justify-end">
                            <TableOfContents />
                        </div>
                    </SheetTrigger>
                    <SheetContent side="right" className="pr-0 sm:max-w-xs">
                        <div onClick={() => setOpen(false)} className="flex items-center space-x-1">
                            <Icons.logo className="h-10 w-10" />
                            <span className="dark:text-accent text-primary inline-block font-bold">
                                {stellaryst?.appName}
                            </span>
                        </div>
                        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-8 pl-8">
                            <Accordion
                                type="single"
                                collapsible
                                className="w-full"
                                defaultValue={
                                    'item-' +
                                    sidebarMenu.findIndex((item) =>
                                        item.items !== undefined
                                            ? item.items
                                                  .filter((subitem) => subitem.to !== undefined)
                                                  .map((subitem) => subitem.to)
                                                  .includes(location.pathname)
                                            : false,
                                    )
                                }
                            >
                                <div className="flex flex-col space-y-3">
                                    {sidebarMenu.map((menu, index) =>
                                        menu.items !== undefined ? (
                                            <AccordionItem
                                                key={index}
                                                value={`item-${index}`}
                                                className="border-b-0 pr-6"
                                            >
                                                <AccordionTrigger
                                                    className={cn(
                                                        'hover:text-primary [&[data-state=open]]:text-primary py-1 hover:no-underline',
                                                        menu.items
                                                            .filter((subitem) => subitem.to !== undefined)
                                                            .map((subitem) => subitem.to)
                                                            .includes(location.pathname)
                                                            ? 'text-foreground'
                                                            : 'text-foreground/60',
                                                    )}
                                                >
                                                    <div className="flex">{`${menu.title}`}</div>
                                                </AccordionTrigger>
                                                <AccordionContent className="pb-1 pl-4">
                                                    <div className="mt-1">
                                                        {menu.items.map((submenu, subindex) =>
                                                            submenu.to !== undefined ? (
                                                                <NavLink
                                                                    key={subindex}
                                                                    to={submenu.to}
                                                                    onClick={() => setOpen(false)}
                                                                    className={({ isActive }) =>
                                                                        cn(
                                                                            'hover:text-primary block h-auto justify-start py-1 font-normal',
                                                                            isActive
                                                                                ? 'text-foreground'
                                                                                : 'text-foreground/60',
                                                                        )
                                                                    }
                                                                >
                                                                    {`${submenu.title}`}
                                                                </NavLink>
                                                            ) : submenu.label !== '' ? null : (
                                                                <div className="px-3">{/* <Separator /> */}</div>
                                                            ),
                                                        )}
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        ) : (
                                            <NavLink
                                                key={index}
                                                to={menu.to ?? ''}
                                                onClick={() => setOpen(false)}
                                                className={({ isActive }) =>
                                                    cn(
                                                        'hover:text-primary py-1 text-sm font-medium transition-colors',
                                                        isActive ? 'text-foreground' : 'text-foreground/60',
                                                    )
                                                }
                                            >
                                                {menu.title}
                                            </NavLink>
                                        ),
                                    )}
                                </div>
                            </Accordion>
                        </ScrollArea>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}
