import React, { Fragment } from 'react';
import ProductoLista from './ProductoLista';


function Productos({ productos,guardarRecargar }) {
    return (
        <Fragment>
            <h1 className="text-center"> Producto</h1>
            <ul className="list-group mt-5">
                {productos.map(producto => (
                    <ProductoLista
                        key={producto.id}
                        producto={producto}
                        guardarRecargar={guardarRecargar}
                    />
                ))}
            </ul>
        </Fragment>
    )
}
export default Productos;