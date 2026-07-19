import { CpPreview } from '../../surfaces/react/shared/CpPreview.tsx';
import { resolveReactPreview } from './react.tsx';

type WorkshopReactViewProps = {
    componentId: string;
};

export function WorkshopReactView({ componentId }: WorkshopReactViewProps) {
    const activePreview = resolveReactPreview(componentId);

    if (!activePreview) {
        return null;
    }

    const Component = activePreview.Component;

    return (
        <CpPreview>
            <Component />
        </CpPreview>
    );
}
