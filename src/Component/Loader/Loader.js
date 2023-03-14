import "./Loader.css";


export default function Loader() {
    return (
        <div className="load-wrapp">
            <div className="load-9">
                <div className="spinner">
                    <div className="bubble-1"></div>
                    <div className="bubble-2"></div>
                </div>
                <div className="spinner-text">Cargando...</div>
            </div>
        </div>
    )
}