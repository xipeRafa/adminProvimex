
import { useEffect, useState } from 'react';


import DatePicker, {registerLocale} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
registerLocale("es", es);


export default function Entregados({ arrVentas, setGetArrVentas, getArrVentas}) {


    useEffect(()=>{
        setGetArrVentas(!getArrVentas)
    },[])




    const formateador = new Intl.DateTimeFormat("es-MX", {
            dateStyle: "long",
            timeStyle: "short",
    });

    const milisegundosComoFecha = (milisegundos) => {
            return formateador.format(new Date(milisegundos));
    };






    ////==-=-=-=-=-=-=- datePicker


        const [hoy, setHoy] = useState() // miliseconds 

        const [fecha, setFecha] = useState() //Fri Feb 03 2023 00:00:00 GMT-0700 (hora estándar del Pacífico de México)

        const handlerDuration = e => setHoy(e.target.value)

        const onChangeDatePicker = fecha => {
                setFecha(fecha);
                /* console.log('parse:', Date.parse(fecha)) parse te convierte con horas */
                let today = fecha.getTime()   // .getTime() convierte la fecha en microsegundos
                setHoy(today)
        }  
 

        let date = new Date(Number(hoy)).toLocaleDateString("es-CL", {
                weekday: "long", // narrow, short
                year: "numeric", // 2-digit
                month: "long", // numeric, 2-digit, narrow, long
                day: "numeric", // 2-digit
        })

        const hora = new Date(Number(hoy)).toLocaleTimeString("es-CL") 


        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

        let fechaDate = fecha?.toLocaleDateString('es-ES', options)

        //_+_+_++_+_+_+_++_+_+_+_+_+_+_+_+_////_+_+_++_+_+_+_++_+_+_+_+_+_+_+_+_////_+_+_++_+_+_+_++_+_+_+_+_+_+_+_+_////_+_+_++_+_+_+_++_+_+_+_+_+_+_+_+_//
        //_+_+_++_+_+_+_++_+_+_+_+_+_+_+_+_////_+_+_++_+_+_+_++_+_+_+_+_+_+_+_+_////_+_+_++_+_+_+_++_+_+_+_+_+_+_+_+_////_+_+_++_+_+_+_++_+_+_+_+_+_+_+_+_//
        //_+_+_++_+_+_+_++_+_+_+_+_+_+_+_+_////_+_+_++_+_+_+_++_+_+_+_+_+_+_+_+_////_+_+_++_+_+_+_++_+_+_+_+_+_+_+_+_////_+_+_++_+_+_+_++_+_+_+_+_+_+_+_+_//


// let a = []
// arrOrders.map((el, i)=>{
//     a.push(el.items)
// })

        let arrVentasFiltered = arrVentas.filter(el => (el.lastSale >= hoy) && (el.lastSale <= hoy+86400000))

        // let totalVentas = []

        // arrVentasFiltered.map(el=>{
        //         totalVentas.push(el.price)
        // })

        // let total = totalVentas.reduce(( accumulator, currentValue ) => accumulator + currentValue, 0)





        // const[sucursalState, setSucursalState]=useState('')


        // // let sucursales = arrVentasFiltered.filter(el => el.sucursal === sucursalState )
        // let sucursales = arrVentasFiltered.filter(el => el.sucursal === 'Hermosillo' )


        // let totalVentasBySucursal = []

        // arrVentasFiltered.filter(el => el.sucursal === sucursalState ).map(el=>{
        //         totalVentasBySucursal.push(el.price)
        // })


        // let totalVentasBySucursalRender = totalVentasBySucursal.reduce(( accumulator, currentValue ) => accumulator + currentValue, 0)


    return (
        <>

           


            


            <div className="datePicker">
                <DatePicker 
                    selected={fecha}
                    onChange={onChangeDatePicker} 
                    locale="es" 
                    className="pickers" 
                    dateFormat="dd 'de' MMMM 'de' yyyy"
                />
            </div>


             <p className='bg-gray h4-gray'>
                {
                    arrVentasFiltered.length <= 0 
                        ? 'Selecciona un Dia en el Calendario' 
                        : `Cantidad de Productos Vendidos: ${ arrVentasFiltered.length}`
                }
            </p>

         {/*   <p className={arrVentasFiltered.length <= 0 ? 'd-none' : 'total'}>
                    Total en Ventas: $ <span className='total'>{total}</span>
            </p>*/}

        {/*    <div className={arrVentasFiltered.length <= 0 ? 'd-none' : 'bg-gray'}>

                <p>Seleccione una Sucursal</p>

                <button onClick={()=>setSucursalState('Hermosillo')}>HERMOSILLO</button>

                <button onClick={()=>setSucursalState('San Carlos')}>SAN CARLOS</button>

                    <p className={totalVentasBySucursalRender <= 0 ? 'd-none' : 'totalButtons'}>
                        Total de Ventas en {sucursalState }: ${' '}
                        <span className='totalVentas'>{totalVentasBySucursalRender}</span>
                    </p>
                
            </div>*/}
        

   
            {arrVentasFiltered.map((el, i) => {
                return <div key={i} className="it">
                    <hr />

                    <div className="tex">
                        <p>Fecha de Venta: {milisegundosComoFecha(el.lastSale)}</p>
                        <h3>Código: {el.codigo}</h3> 
                        {/*<p>Vendedor: {el.vendedor}</p>*/}
                        <p>Dia Ext: {el.de}</p>
                        <p>Dia Int: {el.di}</p>
                       
                        {/*<p>ID: {el.pid}</p>*/}
                        <p>Ancho:  { el.ancho}</p>
                        <p>Descripción : { el.descripcion}</p>
                        <p>Stock Comprado : <b>{el.stockComprado} Piezas</b></p>
                        <p>Precio: <b>$ { el.precio}</b></p>

                        
                        <p>Total: <b>$ { Number(el.stockComprado) * Number(el.precio)}</b></p>

                    </div>


                    <hr />
                </div>
            })}


        </>
    );
}
