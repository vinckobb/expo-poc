import { OverlayProvider } from "@gluestack-ui/overlay";

export function GluestackUIProvider({...props}) {
    return (
        <OverlayProvider>
            {props.children}
        </OverlayProvider>
    );
}