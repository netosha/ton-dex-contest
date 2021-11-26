import { DetailedPool } from '@src/types';
import { WalletState } from '@store/wallet';

export interface ManageButtonProps {
  pool: DetailedPool | null | undefined;
  status: WalletState['status'];
  address: WalletState['address'];
}
