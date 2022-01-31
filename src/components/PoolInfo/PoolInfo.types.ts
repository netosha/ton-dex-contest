import { DetailedPool } from '@src/types';

export interface PoolInfoProps {
  pool: DetailedPool | null | undefined;
}

export type InfoCardProps = {
  title: string;
  value: string | number | null;
};
