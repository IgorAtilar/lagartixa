import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LoginForm } from './_components/login-form';
import { Button } from '@/components/ui/button';
import { getSignupUrl } from '@/helpers/urls';

export default function LoginPage() {
  return (
    <Card className='w-[400px] max-w-full'>
      <CardHeader>
        <CardTitle>Entrar</CardTitle>
        <CardDescription>
          Entre no Lagartixa para acompanhar sua carteira!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter>
        Ainda não tem uma conta?
        <Button className='p-2 text-md' variant='link' asChild>
          <Link href={getSignupUrl()}>Cadastre-se</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
