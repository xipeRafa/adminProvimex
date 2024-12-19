

import { useEffect } from 'react';




export default function OrdersSanCarlos({ arrOrders, setGetArrOrders, getArrOrders }) {

        const pendientes = arrOrders.filter((el) => el.city === "san carlos").filter((el) => el.takenByCustomer === false ).length
        const entregados = arrOrders.filter((el) => el.city === "san carlos").filter((el) => el.takenByCustomer === true ).length


     useEffect(()=>{
        setGetArrOrders(!getArrOrders)
    },[])

    

    return (
        <>
            <h3>ORDENES DE SAN CARLOS <span className='number'> pendientes: {pendientes}</span> Entregados: {entregados}</h3>
            {arrOrders.filter((el) => el.city === "san carlos")
                .map((el, i) => (
                    <div key={i} className="item">
                        <hr />

                        <div className="texto">

                            <h3>Comprador de Internet: {el.buyer.name}</h3>

                            {el.items.map((el, i) => (
                                <b key={i}>Producto ID: {el.id} - Cantidad: { el.quantity}<br /></b>
                            ))}

                            <p>Correo: {el.buyer.email}</p>
                            <p>Celular: {el.buyer.phone}</p>
                            <p>Ciudad: {el.city}</p>

                            <p>
                                Fecha:{" "}
                                {new Date(el.date).toLocaleDateString("es-ES", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </p>
                            <p><span className={!el.takenByCustomer ? 'bg-danger' : 'bg-blue'}>Status: {el.takenByCustomer ? 'Entregado' : 'Pendiente'}</span></p>
                            <b>Total: {el.total}</b>

                        </div>

                        <hr />
                    </div>
                ))}
        </>
    );
}
