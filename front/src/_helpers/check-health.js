import React from "react";
// import { Healthy } from 'react-healthy';
import config from 'config';

const myApi = [
    {
        name: 'Api',
        endpoint: `${config.apiUrl}/health`,
    },
];

export class Health extends React.Component {
    render() {
        return (
            <Healthy apis={myApi} interval={60*1000} />
        )
    }
}
