'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { logout } from '@/data/auth';
import { Menu } from 'lucide-react';

export function LoggedMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Menu />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='flex flex-col gap-2'>
        <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Perfil</DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Button className='w-full' variant='destructive' onClick={logout}>
            Sair
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
