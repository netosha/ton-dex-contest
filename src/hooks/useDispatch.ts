import { useDispatch as useDispatchDefault } from 'react-redux';

import { AppDispatch } from '@store/store';

const useDispatch = () => useDispatchDefault<AppDispatch>();

export default useDispatch;
