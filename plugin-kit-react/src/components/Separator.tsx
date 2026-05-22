import { Separator as SeparatorPrimitive } from '@base-ui/react/separator';

import { cn } from '@verbb/plugin-kit-react/utils';

function Separator({
    className,
    orientation = 'horizontal',
    ...props
}: SeparatorPrimitive.Props) {
    return (
        <SeparatorPrimitive
            data-slot="separator"
            orientation={orientation}
            className={cn(
                'shrink-0 bg-slate-200',

                'data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full',
                'data-[orientation=vertical]:w-px data-[orientation=vertical]:h-full',

                className,
            )}
            {...props}
        />
    );
}

export { Separator };
