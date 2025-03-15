
import { useEffect, useState } from 'react';

import './inventario.css'


export default function Inventario({ arr, setGetArr, getArr }) {

console.log(arr)
    let arr2 = []


    useEffect(()=>{
        setGetArr(!getArr)
    },[])


    const formateador = new Intl.DateTimeFormat("es-MX", { dateStyle: 'long', timeStyle: 'short' });
  
    const milisegundosComoFecha = (milisegundos=0) => {
          return formateador.format(new Date(milisegundos));
    }; 






    const [valueState, setValueState] = useState('')

    const handleSearch = (e) => {
        const { value } = e.target
        setValueState(value)
    }


    const[togleHMState, setTogleHMState]=useState('hombre')  
    const[togleSucursal, setTogleSucursal]=useState('Hermosillo') 

    const[sliceState, setSliceState]=useState(0)


    const resetFinder=()=>{
        setValueState('')
        setTogleHMState('')
        setTogleSucursal('')
        setSliceState(0)
    }



    // if(valueState.length > 3){
    //     arr2 = arr2.filter(el => el.id === valueState.trim())
    // }else{

    // }   

    
    let ProdByPage = 6;

    const[sliceAlert, setSliceAlert]=useState('')


    return (
        <>

      {/*   <div className='filters'>

                <input type='search' value={valueState} placeholder='Buscar' onChange={handleSearch} />

     

            </div>*/}


            <hr />

     


            {arr.slice(sliceState ,sliceState + ProdByPage).map((el, i) => (
                <div key={i} className="item" > 
                {/* onDoubleClick={()=>{setValueState(el.id), resetFinder}} */}
                    <hr />

                {/*    {valueState.length > 3 &&
                    <div >
                         <img className='imgX' src={el.imgUrl} alt='img' />
                    </div>}*/}

                    <div className="texto">
                        {/*<p>Fecha: {milisegundosComoFecha(el.duration)}</p>*/}
                        <h3>Código: {el.codigo}</h3>
                        {/*<p>{el.id}</p>*/}
                        <p>Dia Int: {el.di}</p>
                        <p>Dia Ext: {el.de}</p>
                        <p>Ancho: {el.ancho}</p>
                        <p>Precio Costo: {el.precioCompra}</p>
                        <p>Precio Venta: {el.precio}</p>
                        <p>Stock: {el.stock}</p>
                        <p>Descripción: {el.description}</p>


                        {el?.historiSales?.map((fecha, i) => {
                                return (
                                        <p key={i} style={{ backgroundColor: "yellow" }}>
                                                {/*Venta {i + 1}.- {milisegundosComoFecha(fecha)}*/}

                                        </p>
                                );
                        })}

                     {/*   {el?.notaDeVenta?.map((nota, i) => {
                                return (
                                        <p key={i}>
                                                Nota de Venta {i + 1}: <span>No. {nota}</span>
                                        </p>
                                );
                        })}*/}
                        
                    </div>

                    <hr />
                </div>
            ))}


 

    <div className={valueState.length > 3 ? 'd-none' : 'slice'}>

            <hr />

            <button className={sliceState === 0 ? 'd-none' : ''} onClick={()=>{ if(sliceState > 0){setSliceState(sliceState - ProdByPage), window.scrollTo(0,0)} }}>⇦ Anterior</button>  

            <button className={sliceState === ProdByPage || sliceState === 0 ? 'd-none' : ''} onClick={()=>{ setSliceState(0), window.scrollTo(0,0) }}>０</button>   

            <button onClick={()=>{ 
                                    if(arr.length > sliceState + ProdByPage){
                                        setSliceState(sliceState + ProdByPage) 
                                        window.scrollTo(0,0) 
                                    }else{
                                        setSliceAlert(' No Hay Mas Productos en esta Lista')
                                        setTimeout(()=>{
                                            setSliceAlert('')
                                        },2500)
                                    }
                                }
                    }>
                        Siguiente ⇨ 
            </button>  
            <span className='sliceAlert'>{sliceAlert}</span>




            <p>De: {sliceState + 1} a: {arr.length > sliceState + ProdByPage ? sliceState + ProdByPage : arr.length}</p>
            <p>Paginas de {ProdByPage} Productos. c/u. Total: {arr.length}</p>
   </div>
   









        </>
    );
}


