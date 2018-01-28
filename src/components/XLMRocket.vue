<template>
<div class='rocket-main'>
  <div class='rocket-sidebar'>
    <v-btn @click.native='buttonClick("menu")' icon dark>
      <v-icon small>menu</v-icon>
    </v-btn>
  </div>

  <div class='rocket-content'>
    <div v-if="dialogMode === 'main'">
      Main
      <div class='rocket-list' v-for="item in balances" :key="item.title" @click="buttonClick(item.cmd)">
        <div>{{ item.title }}</div>
      </div>
    </div>
    <div v-else-if="dialogMode === 'send'">
      Balances
    </div>
    <div v-else-if="dialogMode === 'ticker'">
      <ticker-component />
    </div>
    <div v-else-if="dialogMode === 'menu'" class='content-menu'>
      <v-btn small dark @click.native='buttonClick("ticker")'>
        Ticker
      </v-btn>
      <v-btn small dark @click.native='buttonClick("send")'>
        Send
      </v-btn>
      <v-btn small dark @click.native='buttonClick("donate")'>
        Donate
      </v-btn>
      <v-btn small dark @click.native='buttonClick("coin-market")'>
        Coin Market
      </v-btn>
      <v-btn small dark @click.native='buttonClick("quit")'>
        <v-icon>close</v-icon> Quit
      </v-btn>
    </div>
  </div>

</div>
</template>

<script>
import Helper from '../js/helper.js'
import PriceTicker from './PriceTicker.vue'
const shell = require('electron').shell
import {
  StellarAPIServer,
  StellarAPI
} from 'stellar-js-utils'

export default {
  components: {
    'ticker-component': PriceTicker
  },
  data() {
    return {
      savedDialogMode: '',
      dialogMode: '',
      status: '',
      accounts: [{
          name: 'Wallet',
          key: 'GCYQSB3UQDSISB5LKAL2OEVLAYJNIR7LFVYDNKRMLWQKDCBX4PU3Z6JP'
        },
        {
          name: 'Nano',
          key: 'GBJC6AF4I5FUTYMG4CXC3V2NYMIQANBRB4UQYY3M2RRZCXCNLFR7TN7J'
        }
      ],
      balances: [{
        title: '4221.98332',
        cmd: 'balance'
      }, {
        title: '4221.98382',
        cmd: 'balance'
      }, {
        title: '221.98332',
        cmd: 'balance'
      }],
      menuItems: [{
        title: 'About',
        cmd: 'about'
      }, {
        title: 'Donate',
        cmd: 'donate'
      }, {
        title: 'Send',
        cmd: 'send'
      }, {
        title: 'Message',
        cmd: 'message'
      }]
    }
  },
  mounted() {
    this.updateDialogMode('ticker')
  },
  methods: {
    server() {
      if (!this._stellarAPIServer) {
        this._stellarAPIServer = new StellarAPIServer('https://horizon-testnet.stellar.org', true)
        // this._stellarAPIServer = new StellarAPIServer('https://horizon.stellar.org', false)
      }

      return this._stellarAPIServer
    },
    serverAPI() {
      if (!this._serverAPI) {
        this._serverAPI = new StellarAPI(this.server())
      }

      return this._serverAPI
    },
    updateDialogMode(id) {
      switch (id) {
        case 'menu':
          if (this.dialogMode === id) {
            this.dialogMode = this.savedDialogMode
            this.setWindowSizeForMode(this.dialogMode)
          } else {
            this.savedDialogMode = this.dialogMode
            this.setWindowSizeForMode(id)
          }
          break
        case 'send':
        case 'ticker':
          this.setWindowSizeForMode(id)
          break
        default:
          console.log('buttonClick not handled: ' + id)
      }
      this.dialogMode = id
    },
    setWindowSizeForMode(id) {
      switch (id) {
        case 'menu':
          Helper.setWindowSize(300, 250)
          break
        case 'send':
          Helper.setWindowSize(400, 400, false)
          break
        case 'ticker':
          Helper.setWindowSize(160, 80, false)
          break
        default:
          console.log('buttonClick not handled: ' + id)
      }
    },
    buttonClick(id) {
      switch (id) {
        case 'ticker':
        case 'menu':
        case 'send':
          this.updateDialogMode(id)
          break
        case 'donate':
          shell.openExternal('https://stellarkit.io/#/donate')
          this.updateDialogMode(this.savedDialogMode)
          break
        case 'coin-market':
          shell.openExternal('https://coinmarketcap.com/')
          this.updateDialogMode(this.savedDialogMode)
          break
        case 'quit':
          Helper.quitApp()
          break
        default:
          console.log('buttonClick not handled: ' + id)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/styles.scss';

$alpha: 0.7;

.rocket-main {
    margin: 1px;
    border-radius: 8px;
    overflow: hidden;

    position: relative;
    flex: 1;
    display: flex;
    -webkit-app-region: drag;

    .rocket-sidebar {
        display: flex;

        flex: 0 0 auto;
        flex-direction: column;
        background: rgba(0,0,0, $alpha);

        button {
            margin: 0;
            height: 26px;
            width: 26px;
            -webkit-app-region: no-drag;

            i {
                font-size: 12px;
            }
        }
    }
    .rocket-content {
        position: relative;
        flex: 1 1 auto;
        background: rgba(0,0,0, $alpha);
        color: rgb(80,255, 80);
        display: flex;
        flex-direction: column;
        justify-content: center;

        .rocket-list {
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        .content-menu {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            button {
                -webkit-app-region: no-drag;
                font-size: 11px;

                min-width: 140px;
                i {
                    margin-right: 6px;
                }
            }
        }
    }
}
</style>
