import {
  TypedUseSelectorHook,
  useSelector as useSelectorDefault,
} from 'react-redux';

import { RootState } from '@store/store';

const useSelector: TypedUseSelectorHook<RootState> = useSelectorDefault;

export default useSelector;
