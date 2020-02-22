import { RootState } from 'app/store';
import { useSelector, TypedUseSelectorHook } from 'react-redux';

/**
 * react-redux `useSelector` binding with store types
 */
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useTypedSelector;
