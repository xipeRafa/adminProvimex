import { useEffect, useState } from "react";




export default function Inicio({arr, setGetArr, getArr, UpdateByIdInventario, postVentas}) {

 

    const formateador = new Intl.DateTimeFormat("es-MX", {
        dateStyle: "long",
        timeStyle: "short",
    });

    const milisegundosComoFecha = (milisegundos) => {
        return formateador.format(new Date(milisegundos));
    };



     useEffect(() => {
        setGetArr(!getArr);
        setTimeout(() => {
            localStorage.removeItem("look");
        }, 34000);
    }, []);





    let look = localStorage.look?.slice(42, 62);



    const [valueState, setValueState] = useState(look || "");

    const handleSearch = (e) => {
        const { value } = e.target;
        setValueState(value);
    };


    if (valueState.length > 3) {
        arr = arr.filter((el) => el.id == valueState);
    } else {
        arr = [];
    }

    const[noteState, setNoteState]=useState('')
    const[efectivoState, setEfectivoState]=useState('')




    let currentDate = new Date();

    let dueDate = currentDate.setHours(
        currentDate.getHours() /* + itemDuration.current.value */,
    );



    const[stockCompradoState, setStockCompradoState]=useState(0)


    const handleStockComprado=(e)=>{

        if(e.target.value < 0){
            return
        }
        setStockCompradoState(e.target.value)
    }





    const handleSales = (id, el) => {


        // let arrTalla = el.talla

        // let indice = arrTalla.indexOf(tallaState); // obtenemos el indice
        // arrTalla.splice(indice, 1);



        el.takenByCustomer = true;
        //el.stockComprado = stockCompradoState
        // el.talla = arrTalla

        if (el.historiSales === undefined) {

                el.historiSales = [];
                el.historiSales.push(dueDate);

                el.stockComprado = []
                el.stockComprado.push(stockCompradoState)

        } else {

                el.historiSales.push(dueDate);
                el.stockComprado.push(stockCompradoState)

        }



        el.stock = el.stock - stockCompradoState

        UpdateByIdInventario(el.id, el);


        let ventas = {
            pid : id,
            codigo : el.codigo,
            lastSale : dueDate,
            di : el.di,
            de : el.de,
            ancho : el.ancho,
            precio : el.precio,
            stockComprado : stockCompradoState,
            descripcion : el.description,
            // vendedor : localStorage.userEmailLS
        }



        postVentas(ventas)

        setTimeout(() => {
            setGetArr(!getArr);
            setStockCompradoState('')
            // setEfectivoState('')
        }, 2000);

    };



   









    return (
        <>
            <input
                // style={{display:'none'}}
                type="search"
                className="searchInput"
                value={valueState}
                placeholder="buscar"
                onChange={handleSearch}
            />

            <h3> QR SCANNER</h3>

            {arr.map((el, i) => (
                <div
                    key={i}
                    className="item"
                    onClick={() => setValueState(el.id)}
                >
                    <hr />

                 {/*   {valueState.length > 3 && (
                        <div>
                            <img style={{width:'180px'}} src={el.imgUrl} alt="img" />
                        </div>
                    )}*/}

                    <div className="texto">
                        {/*<p>{el.id}</p>*/}
                        <p>Codigo: { el.codigo}</p>
                        <p>Dia Int: { el.di}</p>
                        <p>Dia Ext: { el.de}</p>
                        <p>Ancho: { el.ancho}</p>
                        <p>Stock: { el.stock}</p>
                        <p>Precio: $ { el.precio}</p>
                        <span>Descripción: { el.description}</span>
                      

                        {/*<p>Inventario: {milisegundosComoFecha(el.duration)}</p>*/}
                    </div>

                    <div className="texto">
                    {/*    <p>
                            Stock: {el?.stockSanCarlos}
                            {el?.stockHermosillo}
                        </p>
*/}

                    </div>

                    {el?.historiSales?.map((fecha, i) => {
                        return (
                            <p key={i} style={{ backgroundColor: "yellow" }}>
                                Venta {i + 1}.- {milisegundosComoFecha(fecha)}
                            </p>
                        );
                    })}


                    {el?.stockComprado?.map((sc, i) => {
                        return (
                            <p key={i}>
                                Stock Comprado en Venta #{i + 1}: <b> {sc} Piezas</b>
                            </p>
                        );
                    })}

                    <br />

                    <input type="number" placeholder='Cantidad Comprado' value={stockCompradoState} onChange={(e)=>handleStockComprado(e)}/><br />

                    {/*<input className='mb-3 mt-1' type="number" min='0' placeholder='# Nota de Venta' value={noteState} onChange={(e)=>setNoteState(e.target.value)}/><br />*/}
                    {/*<input className='mb-3' type="number" min='0' placeholder='$ Efectivo' value={efectivoState} onChange={(e)=>setEfectivoState(e.target.value)}/>*/}

                    <br />


                    <button
                        disabled={el?.stock < 1 ? true : false}
                        onClick={() => {

                            // if(tallaState.length <= 0){
                            //     alert('Falta la Talla del Producto')
                            //     return
                            // }

                            if(stockCompradoState <= 0){
                                alert('Falta Cantidad de Piezas Compradas')
                                return
                            }

                            if (window.confirm(`Marcar ${el.codigo} como Pagado?`)) {
                                handleSales(el.id, el);
                            }

                        }}
                    >
                        {el?.stock < 1 ? "Producto Agotado" : 'Marcar como Pagado'} 

                    </button>
                    <hr />
                </div>
            ))}
        </>
    );
}
