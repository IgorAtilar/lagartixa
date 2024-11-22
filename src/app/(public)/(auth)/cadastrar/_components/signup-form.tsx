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
import { signup } from '@/data/auth';
import { useRouter } from 'next/navigation';
import { getDashboardUrl } from '@/helpers/urls';

const formSchema = z.object({
  nickname: z
    .string({
      message: 'Por favor, forneça um nickname válido.',
      required_error: 'O campo nickname é obrigatório. Preencha este campo.',
    })
    .min(4, {
      message:
        'O nickname deve ter pelo menos 4 caracteres. Tente algo mais longo.',
    })
    .max(20, {
      message:
        'O nickname pode ter no máximo 20 caracteres. Tente algo mais curto.',
    }),
  email: z
    .string({
      required_error: 'O campo e-mail é obrigatório. Preencha este campo.',
    })
    .email({
      message: 'Insira um endereço de e-mail válido, como exemplo@dominio.com.',
    }),
  password: z
    .string({
      required_error: 'O campo senha é obrigatório. Preencha este campo.',
    })
    .min(6, {
      message:
        'A senha precisa ter pelo menos 6 caracteres. Escolha algo mais seguro.',
    })
    .max(20, {
      message:
        'A senha pode ter no máximo 20 caracteres. Escolha algo mais compacto.',
    }),
});

export function SignupForm() {
  const { push } = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: '',
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
      await signup(data);
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
          name='nickname'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nickname</FormLabel>
              <FormControl>
                <Input placeholder='Ex.: João123' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input
                  type='email'
                  autoComplete='off'
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
          Cadastrar
        </Button>
      </form>
    </Form>
  );
}
