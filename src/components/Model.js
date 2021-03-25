export default function Model( {message, products, setModelVisibility, setProducts, deleteID} ) {
    function realDelete(id) {
        setProducts(products.filter((product) => product.id !== id));
        setModelVisibility(false)
    }

    return (
        <div className="confirm-model" onClick={() => setModelVisibility(false)}>
            <div className="confirm-model-container">
                <h1>{message}?</h1>
                <div className="model-btn-group">
                    <button type="button" onClick={() => realDelete(deleteID)}>OK</button>
                    <button type="button" onClick={() => setModelVisibility(false)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}