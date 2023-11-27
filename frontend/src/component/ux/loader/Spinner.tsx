export const Spinner = () => {
    return (
        <div className="spinner position-absolute start-50 top-50">
            <div
                className="spinner-border"
                role="status"
            >
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};