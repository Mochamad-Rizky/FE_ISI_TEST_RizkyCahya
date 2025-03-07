'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'light' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className='toaster group'
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-bw group-[.toaster]:text-text group-[.toaster]:border-2 group-[.toaster]:border-border group-[.toaster]:shadow-shadow group-[.toaster]:rounded-base group-[.toaster]:font-base',
          description: 'group-[.toast]:text-text',
          actionButton:
            'group-[.toast]:bg-main group-[.toast]:text-bw group-[.toast]:border-2 group-[.toast]:border-border group-[.toast]:rounded-base group-[.toast]:shadow-shadow group-[.toast]:font-base',
          cancelButton:
            'group-[.toast]:bg-bw group-[.toast]:text-text group-[.toast]:border-2 group-[.toast]:border-border group-[.toast]:rounded-base group-[.toast]:shadow-shadow group-[.toast]:font-base',
          success: 'group-[.toast]:border-success',
          error: 'group-[.toast]:border-error',
          warning: 'group-[.toast]:border-warning',
          info: 'group-[.toast]:border-info',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
