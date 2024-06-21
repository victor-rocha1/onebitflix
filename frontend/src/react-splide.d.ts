declare module 'react-splide' {
    import * as React from 'react';

    export interface SplideProps {
        options?: Record<string, any>;
        hasTrack?: boolean;
        tag?: string;
        id?: string;
        className?: string;
        style?: React.CSSProperties;
        children?: React.ReactNode; // Adicione esta linha para incluir 'children'
    }

    export class Splide extends React.Component<SplideProps> { }

    export interface SplideSlideProps {
        className?: string;
        style?: React.CSSProperties;
        children?: React.ReactNode; // Adicione esta linha para incluir 'children'
    }

    export class SplideSlide extends React.Component<SplideSlideProps> { }
}
