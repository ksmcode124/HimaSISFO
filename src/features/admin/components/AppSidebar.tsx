'use client';

import {
  Calendar,
  Handshake,
  Home,
  LogOut,
  Users2,
} from 'lucide-react';
import Image from 'next/image';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useTransition } from 'react';
import { signOutAction } from '@/features/admin/services/auth';

// Menu items.
const items = [
  {
    title: 'Home',
    url: '/admin',
    icon: Home,
  },
  {
    title: 'Kabinet',
    url: '/admin/kabinet',
    icon: Users2,
  },
  {
    title: 'Event',
    url: '/admin/event',
    icon: Calendar,
  },
  {
    title: 'Komunitas',
    url: '/admin/komunitas',
    icon: Handshake,
  },
];

export function AppSidebar() {
  const [pending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await signOutAction();
    });
  };


  return (
    <Sidebar className="flex h-screen flex-col bg-linear-to-t from-[#8DDDFF] to-[#3385FF] py-10 text-white">
      <SidebarHeader className="">
        <div className="flex items-center justify-center gap-x-3">
          <div className="relative aspect-square h-10">
            <Image priority fill src={'/assets/shared/logos/logo-himasisfo.webp'} alt={''} sizes='8' />
          </div>
          <p className="text-xl font-bold">DASHBOARD</p>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-5 py-10">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="flex h-full flex-col gap-y-10">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon className='size-8 stroke-2'/>
                      <span className=" font-semibold text-sm">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="px-5 py-20">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              disabled={pending}
              className="flex cursor-pointer items-center gap-3 text-lg text-[#FF5549] font-bold"
            >
              <LogOut className='size-24'/>
              <span>Keluar</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
