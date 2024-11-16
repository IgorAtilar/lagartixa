'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { X } from 'lucide-react';
import Link from 'next/link';
import { getLoginUrl, getSignupUrl } from '@/helpers/urls';

export function HomeMenu({ children }: React.PropsWithChildren<object>) {
  return (
    <Drawer direction='left'>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className='h-full max-w-[80%]'>
        <div className='h-full'>
          <DrawerHeader className='flex flex-col items-end'>
            <DrawerClose asChild>
              <Button variant='ghost' size='icon'>
                <X />
              </Button>
            </DrawerClose>
            <div className='flex flex-col items-center justify-center w-full'>
              <DrawerTitle>
                <span className='text-primary'>Lagartixa</span> Menu
              </DrawerTitle>
              <DrawerDescription>
                Entre ou se cadastre para favoritar criptomoedas e acompanhar o
                mercado.
              </DrawerDescription>
            </div>
          </DrawerHeader>
          <div>
            <DrawerFooter>
              <Button asChild variant='secondary'>
                <Link href={getLoginUrl()}>Entrar</Link>
              </Button>
              <Button asChild>
                <Link href={getSignupUrl()}>Cadastre-se</Link>
              </Button>
            </DrawerFooter>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
