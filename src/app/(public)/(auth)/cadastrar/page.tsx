import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getLoginUrl } from '@/helpers/urls';
import { SignupForm } from './_components/signup-form';

export default function SignupPage() {
  return (
    <Card className='w-[400px] max-w-full'>
      <CardHeader>
        <CardTitle>Cadastrar</CardTitle>
        <CardDescription>
          Cadastre-se no Lagartixa para acompanhar sua carteira!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignupForm />
      </CardContent>
      <CardFooter>
        Já tem uma conta?
        <Button className='p-2 text-md' variant='link' asChild>
          <Link href={getLoginUrl()}>Entrar</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
