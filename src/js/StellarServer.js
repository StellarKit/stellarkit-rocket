 import Helper from '../js/helper.js'
 import {
   StellarAPIServer,
   StellarAPI
 } from 'stellar-js-utils'

 export default class StellarServer {
   constructor() {
     this._stellarAPIServer = new StellarAPIServer('https://horizon-testnet.stellar.org', true)
     // this._stellarAPIServer = new StellarAPIServer('https://horizon.stellar.org', false)

     this._serverAPI = new StellarAPI(this._stellarAPIServer)
   }

   server() {
     return this._stellarAPIServer.server()
   }

   serverAPI() {
     return this._serverAPI
   }

   serverURL() {
     return this._stellarAPIServer.serverURL()
   }
 }
