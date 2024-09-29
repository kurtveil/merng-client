import React, { FormEvent, useEffect, useState } from 'react';
// interface ScannerProps {
//   code: string;
//   onSubmit: any,
//   cancelForm: any,
//   product: any
// }
const Form = ({code,onSubmit,cancelForm,product}) => {
  // const [code, setCode] = useState(code);
  const [formData, setFormData] = useState({
    name: product?.name,
    price: product?.price,
    amount: product?.amount,
    code: product ? product.code : code,
    description: product?.description
  });

 
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData =  new FormData(e.currentTarget);
    if (formData) onSubmit(formData);
}


const handleCancelSubmit = () => {
  cancelForm(true);
}



  return (
    <form onSubmit={handleSubmit} >
      <div className="">
        

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="code" className="block text-sm font-medium leading-6 text-gray-900">
              Codigo
            </label>
            <div className="mt-2">
              <input
                id="code"
                name="code"
                type="text"
                readOnly
                defaultValue={formData.code}
                autoComplete="given-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
              Nombre
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                defaultValue={formData.name}
                type="text"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Precio
            </label>
            <div className="mt-2">
              <input
                id="price"
                name="price"
                defaultValue={formData.price}
                type="text"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">
              Cantidad
            </label>
            <div className="mt-2">
              <input
                id="amount"
                name="amount"
                defaultValue={formData.amount}
                type='number'
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-3">
            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
              Descripción
            </label>
            <div className="mt-2">
              <input
                id="description"
                name="description"
                defaultValue={formData.description}
                type='text'
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              />
            </div>
          </div>
       


   

        </div>
          <div className="sm:flex sm:flex-row-reverse ">
            <button  className="inline-flex w-full justify-center rounded-md bg-gray-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 sm:ml-3 sm:w-auto" 
            type="button" onClick={handleCancelSubmit}>Cancelar</button>
            <button  
            className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto" 
            type="submit">Guardar</button>
          </div>
      </div>
    </form>
  )
}

export default Form