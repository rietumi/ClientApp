import React from 'react';
import { Link } from 'react-router-dom';

const Start: React.FC<{}> = () => {
    return (
        <div className="center">
            <Link to="/game" className="btn btn-lg btn-success btn-block" role="button">Start game</Link>
        </div>
    );
}

export default Start;