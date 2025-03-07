import { cn } from '@/lib/utils';
import * as React from 'react';

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  isRequired?: boolean;
};

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, isRequired, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          'font-heading text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
          isRequired &&
            "before:absolute before:top-0 before:right-0 before:mr-1 before:text-base before:leading-none before:font-normal before:text-red-500 before:content-['*']",
          className
        )}
        {...props}
      />
    );
  }
);
Label.displayName = 'Label';

export { Label };
