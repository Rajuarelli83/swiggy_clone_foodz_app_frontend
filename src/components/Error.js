import {useRouteError} from 'react-router-dom';
const Error = () => {
    const err = useRouteError(null);
    return (
        <div className="error">
            <h1>Oops!</h1>
            <h2>Something went wrong.</h2>
            <p>Please try again later.</p>
            <p>{err.status} - {err.statusText}</p>
        </div>
    );
};
export default Error;