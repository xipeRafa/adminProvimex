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



    const[tallaState, setTallaState]=useState('')

    const handleTallaState=(e)=>{
        let talla = e.target.value.toLowerCase()

        if(e.target.value.length>4){
            return
        }
        setTallaState(talla)
    }





    const handleSales = (id, el) => {


        // let arrTalla = el.talla

        // let indice = arrTalla.indexOf(tallaState); // obtenemos el indice
        // arrTalla.splice(indice, 1);



        el.takenByCustomer = true;
        //el.tallaComprada = tallaState
        // el.talla = arrTalla

        if (el.historiSales === undefined) {

                el.historiSales = [];
                el.historiSales.push(dueDate);

                el.notaDeVenta = []
                el.notaDeVenta.push(noteState)

        } else {

                el.historiSales.push(dueDate);
                el.notaDeVenta.push(efectivoState)

        }




        // if (el?.stockHermosillo === undefined) {

        //         el.stockSanCarlos = el?.stockSanCarlos - 1;
        //         UpdateByIdInventario(el.id, el);

        // } else {

        //         el.stockHermosillo = el?.stockHermosillo - 1;
        //         UpdateByIdInventario(el.id, el);
        // }

        UpdateByIdInventario(el.id, el);


        let ventas = {
            pid : id,
            codigo : el.codigo,
            lastSale : dueDate,
            di : el.di,
            de : el.de,
            ancho : el.ancho,
            descripcion : el.description,
            // vendedor : localStorage.userEmailLS
        }



        postVentas(ventas)

        setTimeout(() => {
            setGetArr(!getArr);
            // setTallaState('')
            // setNoteState('')
            // setEfectivoState('')
        }, 500);

    };



   









    return (
        <>
            <input
                style={{display:'none'}}
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


                {/*    {el?.notaDeVenta?.map((nota, i) => {
                        return (
                            <p key={i}>
                                Nota de Venta {i + 1}: <b>No. {nota}</b>
                            </p>
                        );
                    })}*/}

                    <br />

                    {/*<input type="text" placeholder='Talla Escogida' value={tallaState} onChange={(e)=>handleTallaState(e)}/><br />*/}

                    {/*<input className='mb-3 mt-1' type="number" min='0' placeholder='# Nota de Venta' value={noteState} onChange={(e)=>setNoteState(e.target.value)}/><br />*/}
                    {/*<input className='mb-3' type="number" min='0' placeholder='$ Efectivo' value={efectivoState} onChange={(e)=>setEfectivoState(e.target.value)}/>*/}

                    <br />


                    <button
                        disabled={el?.stockSanCarlos < 1 || el?.stockHermosillo < 1 ? true : false}
                        style={{ backgroundColor: "yellow" }}
                        onClick={() => {

                            // if(tallaState.length <= 0){
                            //     alert('Falta la Talla del Producto')
                            //     return
                            // }

                            // if(noteState.length <= 0){
                            //     alert('Falta el Numero Nota de Venta')
                            //     return
                            // }

                            if (window.confirm(`Marcar ${el.codigo} como Pagado?`)) {
                                handleSales(el.id, el);
                            }

                        }}
                    >
                        {/*{el?.stockSanCarlos < 1 || el?.stockHermosillo < 1 ? "Producto Agotado" : 'Marcar como Pagado'} */}
                            Marcar Como Pagado
                    </button>
                    <hr />
                </div>
            ))}
        </>
    );
}
