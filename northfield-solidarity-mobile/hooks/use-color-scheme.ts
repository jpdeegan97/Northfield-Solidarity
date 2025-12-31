import { useAppModel } from '@/context/AppContext';

export function useColorScheme(): 'light' | 'dark' {
    const { mode } = useAppModel();
    return mode === 'Sanctum' ? 'dark' : 'light';
}
