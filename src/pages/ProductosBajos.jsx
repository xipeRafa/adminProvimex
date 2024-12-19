
import { useEffect } from 'react';



export default function ProductoBajos({ arr, setGetArr, getArr }) {

   
    const formateador = new Intl.DateTimeFormat("es-MX", { dateStyle: 'long', timeStyle: 'short' });
  
    const milisegundosComoFecha = (milisegundos) => {
          return formateador.format(new Date(milisegundos));
    }; 


     useEffect(()=>{
        setGetArr(!getArr)
    },[])

    return (
        <>
            <h3>PRODUCTOS SIN STOCK HERMOSILLO <span className='number'> { arr.filter((el) => el.stockHermosillo < 1).length}</span></h3>
            {arr.filter((el) => el.stockHermosillo < 1).map((el, i) => (
                <div key={i} className="item">
                    <hr />

                    {/*<div className='img'>
                            <img src={el.imgUrl} alt='img' />
                    </div>*/}

                    <div className="texto">
                        <h3>Nombre: { el.name}</h3>
                        <b>ID: {el.id}</b>
                        <p>Categoria: {el.category}</p>
                        <p>Color: {el.color}</p>
                        <p>Tela: {el.tela}</p>

                        <p>Fecha: {milisegundosComoFecha(el.duration)}</p>
                        <p>Correo: {el.email}</p>
                    </div>

                    <div className="texto">
                        <p>Marca: {el.marca}</p>
                        <p>Para: {el.para}</p>
                        <p>Stock Hermosillo: {el.stockHermosillo}</p>

                        <p>Talla: {el.talla}</p>
                        <b>Precio: $ { el.price}</b>
                    </div>

                    {/*<div className="texto">
                        <p>Descripcion: {el.description}</p>
                    </div>*/}
                    <hr />
                </div>
            ))}
        </>
    );
}
