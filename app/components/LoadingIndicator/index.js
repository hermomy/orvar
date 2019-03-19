import React from 'react';

const LoadingIndicator = () => (
    <div className="progress" style={{ height: 4 }}>
        <div
            className="progress-bar progress-bar-striped progress-bar-animated bg-primary"
            style={{ width: '100%' }}
        >
        </div>
    </div>
);

export default LoadingIndicator;
