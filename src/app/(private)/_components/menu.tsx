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
import { logout } from '../actions/logout';

export function LoggedMenu({ nickname }: Readonly<{ nickname: string }>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost'>Olá, {nickname}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='flex flex-col gap-2'>
        <DropdownMenuLabel>Opções</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Button className='w-full' variant='destructive' onClick={logout}>
            Sair
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
