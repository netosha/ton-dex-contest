import { PickedTokens } from '@components/TokenPicker/TokenPicker.types';

const permutePickedTokens = (picked: PickedTokens) => {
  return [picked[1], picked[0]] as PickedTokens;
};

export default permutePickedTokens;
