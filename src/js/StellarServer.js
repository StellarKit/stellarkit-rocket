 import Helper from '../js/helper.js'
 import {
   HorizonServer,
   StellarAPI
 } from 'stellar-js-utils'

 export default class StellarServer {
   constructor() {
     this._horizonServer = new HorizonServer('https://horizon-testnet.stellar.org', true)
     // this._horizonServer = new HorizonServer('https://horizon.stellar.org', false)

     this._serverAPI = new StellarAPI(this._horizonServer)
   }

   server() {
     return this._horizonServer.server()
   }

   serverAPI() {
     return this._serverAPI
   }

   serverURL() {
     return this._horizonServer.serverURL()
   }
 }
