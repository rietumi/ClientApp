import React, { useState } from 'react';
import styled from 'styled-components';

interface TileProps extends React.HTMLAttributes<HTMLDivElement> {
    size: number;
    value?: boolean;
    x?: number;
    y?: number;
    handleClick?: (x: number, y: number, setValue: React.Dispatch<React.SetStateAction<boolean|undefined>>) => void;
}

const Tile = (props: TileProps) => {
    const [value, setValue] = useState<boolean|undefined>(props.value);

    return (
        <StyledTile {...props} onClick={() => props.handleClick && props.x && props.y && props.handleClick(props.x, props.y, setValue)} value={value} />
    );
}

const StyledTile = styled.div<TileProps>`
    border: solid;
    border-width: 2px;
    border-color: var(--peleks-2);
    float: left;
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    background-color: ${props => props.value ? 'var(--melns)' : 'var(--balts)'};
    background-image: ${props => props.value === false ? 'url(x.png)' : ''};
    background-repeat: no-repeat;
    background-size: cover;
    border-top-color: ${props => props.x && props.x % 5 === 0 ? 'var(--pelaks-1)' : ''};
    border-left-color: ${props => props.y && props.y % 5 === 0 ? 'var(--pelaks-1)' : ''};
`;

export default Tile;