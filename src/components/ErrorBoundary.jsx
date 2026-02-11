import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error, errorInfo });
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '40px', backgroundColor: '#1a1a1a', color: 'white', minHeight: '100vh', fontFamily: 'sans-serif' }}>
                    <h1 style={{ color: '#ef4444' }}>Algo salió mal.</h1>
                    <p>La aplicación ha encontrado un error crítico.</p>
                    <details open style={{ marginTop: '20px', whiteSpace: 'pre-wrap' }}>
                        <summary style={{ cursor: 'pointer', color: '#3b82f6', fontSize: '1.2em', marginBottom: '10px' }}>Detalles del error (Captura esto por favor)</summary>
                        <div style={{ marginTop: '10px', padding: '15px', backgroundColor: '#333', borderRadius: '5px', border: '1px solid #555' }}>
                            <p style={{ color: '#fca5a5', fontFamily: 'monospace', fontSize: '1.1em', marginBottom: '10px' }}>{this.state.error && this.state.error.toString()}</p>
                            <div style={{ color: '#9ca3af', fontSize: '0.9em', fontFamily: 'monospace', overflowX: 'auto' }}>
                                {this.state.errorInfo && this.state.errorInfo.componentStack}
                            </div>
                        </div>
                    </details>
                    <button
                        onClick={() => {
                            localStorage.removeItem('quintoEjeConfig');
                            window.location.reload();
                        }}
                        style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                    >
                        Borrar configuración y recargar
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
export default ErrorBoundary;
