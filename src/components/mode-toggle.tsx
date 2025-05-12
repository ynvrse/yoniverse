import { MoonIcon, SunIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';

import { useTheme } from '@/hooks/useTheme';

export function ModeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <Button
            variant="ghost"
            className="relative w-9 px-0"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            aria-label="Toggle theme"
        >
            <SunIcon
                className={`h-[1.2rem] w-[1.2rem] transition-all ${
                    theme === 'light' ? 'scale-100 rotate-0 text-white' : 'scale-0 -rotate-90 text-white'
                } `}
            />
            <MoonIcon
                className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${
                    theme === 'dark' ? 'scale-100 rotate-0 text-white' : 'scale-0 rotate-90 text-white'
                } `}
            />
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
