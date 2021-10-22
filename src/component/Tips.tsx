import React from 'react';
import styled from 'styled-components';

interface TipProps {
    vertical?: boolean;
    size: number;
    tip: string;
}

const Tip = (props: TipProps) => {
    return (
        <StyledTip {...props}>
            {props.vertical ? props.tip.split(',').map(a => (<StyledParagraph>{a}</StyledParagraph>)) : (<p>{props.tip.replaceAll(',', ' ')}</p>) }
        </StyledTip>
    )
}

const StyledParagraph = styled.p`
    margin: 0;
    padding: 0;
`;

const StyledTip = styled.div<TipProps>`
    border: solid;
    border-width: 2px;
    border-color: var(--peleks-1);
    float: left;
    width: ${props => props.vertical ? props.size : (props.size * 2)}px;
    height: ${props => props.vertical ? (props.size * 2) : props.size}px;
    background-color: var(--balts);
    text-align: center;
    z-index: 5;
`;

export default Tip;