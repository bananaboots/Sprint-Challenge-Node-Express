import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <Fragment>
            <Link to = "/projects">Projects</Link>
            <Link to = "/actions">Actions</Link>
        </Fragment>
    );
}