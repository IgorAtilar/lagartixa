import { UserWallet } from '../_components/user-wallet';

export default function DashboardPage() {
  return (
    <div>
      <h1 className='font-staatliches text-2xl mb-2'>Dashboard</h1>
      <UserWallet />
    </div>
  );
}
