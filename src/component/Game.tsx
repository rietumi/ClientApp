import React, { useCallback, useState, useMemo } from 'react';
import { Button } from 'react-bootstrap';
import { GameTips, postGameTileValue, postGenerateGame } from '../api/game';
import Input from '../inputs/Input';
import Tile from './Tile';
import Tip from './Tips';

const Game: React.FC<{}> = () => {
    const [gridX, setGridX] = useState<number>(0);
    const [gridY, setGridY] = useState<number>(0);
    const [error, setError] = useState<string[]>([]);
    const [gameDone, setGameDone] = useState<''|'lost'|'won'>('');
    const [disabled, setDisabled] = useState<boolean>(false);
    const [gameGenerated, setGameGenerated] = useState<boolean>(false);
    const [prediction, setPrediction] = useState<boolean>(true);
    const [tips, setTips] = useState<GameTips>();
    const [windowsWidth] = useState<number>(window.innerWidth);
    const [windowsHeight] = useState<number>(window.innerHeight);

    const smallestBorder = useMemo(() => ((windowsHeight > windowsWidth ? windowsWidth: windowsHeight) - 10), [windowsHeight, windowsWidth]);
    const biggestAxis = useMemo(() => (gridX > gridY ? gridX : gridY), [gridX, gridY]);
    const squareSize = useMemo(() => (smallestBorder/(biggestAxis+2)), [biggestAxis, smallestBorder]);

    const handleChange = useCallback(
        (func: React.Dispatch<React.SetStateAction<number>>) => (v: string) => {
        const number = parseInt(v);
        func(isNaN(number) ? 0 : number);
    }, []);
    
    const addRequiredError = useCallback((name: string) => {
        setError(a => {
            const error = `Required value ${name}`;
            if (a.indexOf(error) === -1) a.push(error);
            return a;
        });
    }, []);

    const handleClick = useCallback(
        async () => {
            if (disabled) return;
            setDisabled(true);

            setError([]);
            let error = false;
            if (!gridX) {
                addRequiredError('X');
                error = true;
            }
            if (!gridY) {
                addRequiredError('Y');
                error = true;
            }

            if (error) {
                setDisabled(false);
                return;
            }

            const tips = await postGenerateGame({ data: {x: gridX, y: gridY}});

            if (!tips) {
                setError(['Something went wrong']);
                setDisabled(false);
                return;
            }

            setTips(tips);
            setGameGenerated(true);
            setDisabled(false);
        }, [addRequiredError, disabled, gridX, gridY]
    );

    const handleTileClick = useCallback(async (x: number, y:number, setValue: React.Dispatch<React.SetStateAction<boolean|undefined>>) => {
        const value = await postGameTileValue({ data: {x: x, y: y, prediction: prediction } });
        if (!value) return;
        if (value.lifes === 0) setGameDone('lost');
        if (value.unguessed === 0) setGameDone('won');
        setValue(value.result);
    }, [prediction]);

    const handleReplay = useCallback(() => {
        setGridX(0);
        setGridY(0);
        setGameDone('');
        setGameGenerated(false);
        setError([]);
        setTips(undefined);
    }, []);

    if (gameDone) return (
        <div className="center">
            <h1>You {gameDone}</h1>
            <div className="horizontal-center">
                <Button className="no-wrap m-1" variant="success" onClick={handleReplay} size="lg" disabled={disabled} >Play again</Button>
            </div>
        </div>
    )

    var rows = [];

    const gameStyle = {
        width: `${smallestBorder}px`,
        height: `${smallestBorder}px`,
        color: 'var(--melns)'
    };

    const boxStyle = {
        width: `${squareSize*2}px`,
        height: `${squareSize*2}px`
    };

    rows.push(<div className={'float-left'} style={boxStyle}></div>);
    for (let i = 0; i < gridY; i++) {
        rows.push(
            <Tip size={squareSize} vertical tip={tips?.item2[i] ?? ''}/>
        );
    };

    for (let i = 0; i < gridX; i++) {
        rows.push(
            <Tip size={squareSize} tip={tips?.item1[i] ?? ''}/>
        );
        for (let j = 0; j < gridY; j++) {
            rows.push(
                <Tile
                    key={`${i}-${j}`}
                    handleClick={handleTileClick}
                    size={squareSize}
                    x={i}
                    y={j}
                />
            );
        }
    }

    return (
        <>
            {!gameGenerated ? ( 
                <div className="center">
                    {error.map((a, i) => (<p key={i}>{a}</p>))}
                    <div>
                        <Input
                            type="number"
                            length={2}
                            id="point-x"
                            label="X: "
                            onChange={handleChange(setGridX)}
                            pattern={new RegExp('^[0-9]{0,2}')}
                            disabled={disabled}
                            inline
                        />
                        <Input
                            type="number"
                            length={2}
                            id="point-y"
                            label="Y: "
                            onChange={handleChange(setGridY)}
                            pattern={new RegExp('^[0-9]{0,2}')}
                            disabled={disabled}
                            inline
                        />
                        <div className="horizontal-center">
                            <Button className="no-wrap m-1" variant="success" onClick={handleClick} size="lg" disabled={disabled} >Generate grid</Button>
                        </div>
                    </div>
                </div>
            ):(
                <div>
                    <div className="no-wrap m-1 vertical-center" id="swap-button">
                        <Button variant="success" onClick={() => setPrediction(a => !a)} size="lg" disabled={disabled} >Swap</Button>
                        <Tile
                            key="prediction"
                            value={prediction}
                            size={100}
                        />
                    </div>
                    <div className="center" style={gameStyle}>
                        {rows}
                    </div>
                </div>
            )}
        </>
    );
}

export default Game;