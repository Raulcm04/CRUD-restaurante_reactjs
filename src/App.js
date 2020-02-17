import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header'
import AgregarProducto from './components/AgregarProducto';
import EditarProducto from './components/EditarProducto';
import Productos from './components/Productos';
import Producto from './components/Producto';

import axios from 'axios'


function App() {

  const [productos, guardarProductos] = useState([]);
  const [recargar, guardarRecargar] = useState(true);

  useEffect(() => {
    if (recargar) {
      const consultarAPI = async () => {
        const resultado = await axios.get('http://localhost:4000/restaurant')
        // console.log(resultado.data);
        guardarProductos(resultado.data);
      }
      consultarAPI()
      //carmbiar a false la recarga de productos
      guardarRecargar(false);
    }

  }, [recargar])


  return (

    <Router>
      {/* Lo que este entre ROuter y Switch estará en todas las págnias */}
      <Header />
      <main className="container mt-5">
        <Switch>

          <Route exact path="/productos"
            render={() => (
              <Productos productos={productos}
              guardarRecargar={guardarRecargar}
              />
            )}
          />
          <Route exact path="/nuevo-producto"
            render={() => (
              <AgregarProducto
                guardarRecargar={guardarRecargar}
              />
            )}
          />
          <Route exact path="/productos/:id" component={Producto} />
          <Route exact path="/productos/editar/:id" render={props => {

            //tomar el id de producto y cambiarlo a int
            const idProducto = parseInt(props.match.params.id);
            const producto = productos.filter(producto => producto.id === idProducto)
            return (
              <EditarProducto
                producto={producto[0]}
                guardarRecargar={guardarRecargar}

              />
            )

          }} />
        </Switch>
      </main>

    </Router>
  );
}

export default App;
