'use client';

import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';
import * as React from 'react';

const alertVariants = cva(
  'relative w-full rounded-md border-2 border-black p-4 mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-medium transition-all flex items-start gap-3',
  {
    variants: {
      variant: {
        default: 'bg-white text-black',
        destructive: 'bg-red-100 border-red-500 text-red-600',
        success: 'bg-green-100 border-green-500 text-green-600',
        warning: 'bg-amber-100 border-amber-500 text-amber-600',
        info: 'bg-blue-100 border-blue-500 text-blue-600',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const AlertIcon = {
  default: AlertCircle,
  destructive: AlertTriangle,
  success: CheckCircle,
  warning: AlertTriangle,
  info: Info,
};

interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  onClose?: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, children, onClose, ...props }, ref) => {
    const IconComponent = AlertIcon[variant || 'default'];

    return (
      <div
        ref={ref}
        role='alert'
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        <IconComponent className='h-5 w-5 flex-shrink-0' />
        <div className='flex-1'>{children}</div>
        {onClose && (
          <button
            onClick={onClose}
            className='ml-auto rounded p-1 transition-colors hover:bg-black/10'
            aria-label='Close alert'
          >
            <X className='h-4 w-4' />
          </button>
        )}
      </div>
    );
  }
);
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn('mb-1 leading-none font-bold tracking-tight', className)}
    {...props}
  />
));
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm [&_p]:leading-relaxed', className)}
    {...props}
  />
));
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertDescription, AlertTitle };
