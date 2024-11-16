'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { login } from '@/data/auth';
import { useRouter } from 'next/navigation';
import { getDashboardUrl } from '@/helpers/urls';

const formSchema = z.object({
  email: z
    .string({
      required_error: 'O campo email é obrigatório. Preencha este campo.',
    })
    .email({
      message: 'Insira um endereço de email válido, como exemplo@dominio.com.',
    }),
  password: z
    .string({
      required_error: 'O campo senha é obrigatório. Preencha este campo.',
    })
    .min(6, {
      message:
        'A senha deve ter pelo menos 6 caracteres. Escolha algo mais seguro.',
    })
    .max(20, {
      message:
        'A senha pode ter no máximo 20 caracteres. Escolha algo mais compacto.',
    }),
});

export function LoginForm() {
  const { push } = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await login(data);
      push(getDashboardUrl());
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-2'>
        <FormField
          control={control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input
                  type='email'
                  placeholder='Ex.: joao@gmail.com'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <PasswordInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='w-full' type='submit' disabled={isSubmitting}>
          Entrar
        </Button>
      </form>
    </Form>
  );
}
