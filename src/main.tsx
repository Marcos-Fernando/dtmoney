import React from 'react'
import ReactDOM from 'react-dom/client'
import { createServer, Model } from 'miragejs';
import { App } from './App'
import { transitions } from 'polished';

createServer({
  //mirage possui um banco de dados externos
  models: {
    transaction: Model,
  },

  seeds(server){
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'freelance de website',
          type: 'deposity',
          category: 'Dev',
          amount: 6000,
          createdAt: new Date('2021-02-12 09:00:00'),
        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Casa',
          amount: 1100,
          createdAt: new Date('2021-02-14 11:48:00'),
        },
        {
          id: 3,
          title: 'Energia',
          type: 'withdraw',
          category: 'Casa',
          amount: 350,
          createdAt: new Date('2021-02-14 11:51:00'),
        }
      ],
    })
  },

  routes(){
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction')
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)

      //schema é o banco de dados
      return schema.create('transaction', data)
    })
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
