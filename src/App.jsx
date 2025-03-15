
import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate} from 'react-router-dom';

import { getDocs, collection, updateDoc, doc,  addDoc, } from 'firebase/firestore'




import db from './firebase/firebaseConfig'


import Inicio from './pages/Inicio';
import Entregados from './pages/Entregados';
import Inventario from './pages/inventario/Inventario'

//import OrdersHillo from './pages/OrdersHillo'
//import OrdersSanCarlos from './pages/OrdersSanCarlos'
//import ProductosBajos from './pages/ProductosBajos';
//import ProductosBajosSanCarlos from './pages/productosBajosSanCarlos';


import Navbar from './components/Navbar';



export default function App() {

  const location = useLocation();





      const [arr, setArr] = useState([])
      const [getArr, setGetArr] = useState(false)


    useEffect(() => {

        const data = collection(db, 'inventario')

        getDocs(data).then((resp) => {
            setArr(resp.docs.map((doc) => ({ ...doc.data(), id: doc.id }) ))
        }).catch(err=>{
             console.error(err)
        })


        //localStorage.arrProvimex = JSON.stringify()
        //aqui va array ya listo

    }, [getArr])  




    //   const [arrOrders, setArrOrders] = useState([])
    //   const [getArrOrders, setGetArrOrders] = useState(false)

    // useEffect(() => {

    //     const data = collection(db, 'orders')

    //     getDocs(data).then((resp) => {
    //         setArrOrders(resp.docs.map((doc) => ({ ...doc.data(), id: doc.id }) ))
    //     }).catch(err=>{
    //          console.error(err)
    //     })

    // }, [getArrOrders])






    const [arrVentas, setArrVentas] = useState([])
    const [getArrVentas, setGetArrVentas] = useState(false)

    useEffect(() => {

        const data = collection(db, 'ventas')

        getDocs(data).then((resp) => {
            setArrVentas(resp.docs.map((doc) => ({ ...doc.data() }) ))
        }).catch(err=>{
             console.error(err)
        })

    }, [getArrVentas])






    

     



    const UpdateByIdInventario = async (id, obj) => {

        const aaDoc = doc(db, 'inventario', id);

        try {
            await updateDoc(aaDoc, obj);
        } catch (error) {
            console.error(error);
        }

    }

    const postVentas = async (postBody) => {

        const postCollection = collection(db, 'ventas');

        try {
            await addDoc(postCollection, postBody);
        } catch (error) {
            console.error(error);
        }

    }


// let newArrProvimex = []

// if(localStorage.arrProvimex!==undefined){
// JSON.parse(localStorage.arrProvimex).map(el=>{

//     let obj1 = {}
//     let obj2 = {}

//     obj1.codigo = el.codigo1
//     obj1.stock = el.stock1
//     obj1.precio = el.precio1

//     obj1.di = el.di
//     obj1.de = el.de
//     obj1.ancho = el.ancho
//     obj1.description = el.description




//     obj2.codigo = el.codigo2
//     obj2.stock = el.stock2
//     obj2.precio = el.precio2

//     obj2.di = el.di
//     obj2.de = el.de
//     obj2.ancho = el.ancho
//     obj2.description = el.description

//    newArrProvimex.push(obj1)
//    newArrProvimex.push(obj2)

// })
// }

// console.log(newArrProvimex)


// const rta = newArrProvimex.sort(function(a, b){
//     if(a.name < b.name) { return -1; }
//     if(a.name > b.name) { return 1; }
//     return 0;
// })


// localStorage.arrProvimex2 = JSON.stringify(rta)


  return (
    <div className='containerApp'>
        <br />
        <div className="titleLogo">
          <h2 className="w50">Admin System Provimex</h2>
      </div>
      <Navbar />


   

      <Routes>
        <Route path="/adminProvimex" exact element={
                <Inicio arr={arr} setGetArr={setGetArr} getArr={getArr} UpdateByIdInventario={UpdateByIdInventario} postVentas={postVentas} /> 
        } />

        <Route path="/adminProvimex/inventario" element={<Inventario arr={arr} setGetArr={setGetArr} getArr={getArr}/>} />
         <Route path="/adminProvimex/inventario/:id" element={<Inventario arr={arr} setGetArr={setGetArr} getArr={getArr}/>} />


     {/*   <Route path="/adminPolanco/ordersHillo" element={<OrdersHillo arrOrders={arrOrders} setGetArrOrders={setGetArrOrders} getArrOrders={getArrOrders}/>} />
        <Route path="/adminPolanco/ordersSanCarlos" element={<OrdersSanCarlos arrOrders={arrOrders} setGetArrOrders={setGetArrOrders} getArrOrders={getArrOrders}/>} />

        <Route path="/adminPolanco/productosBajos" element={<ProductosBajos arr={arr} setGetArr={setGetArr} getArr={getArr}/>} />
        <Route path="/adminPolanco/productosBajosSanCarlos" element={<ProductosBajosSanCarlos arr={arr} setGetArr={setGetArr} getArr={getArr}/>} />*/}


        <Route path="/adminProvimex/entregas" element={<Entregados arrVentas={arrVentas} setGetArrVentas={setGetArrVentas} getArrVentas={getArrVentas}/>} />

        <Route path="*"  element={<Navigate to='/adminProvimex' />}/> 
      </Routes>
    </div>
  );
}




