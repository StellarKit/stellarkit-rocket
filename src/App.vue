<template>
<v-app>
  <div v-if='windowType === "main"' class='rocket-window'>
    <xlm-rocket />
  </div>
  <div v-else-if='windowType === "donate"' class='normal-window'>
    <donate-view :ping='showDonatePing' :nodeEnv=true :donationPublicKey='donationPublicKey' />
  </div>
  <div v-else-if='windowType === "payment"' class='normal-window'>
    <donate-view :ping='showDonatePing' :nodeEnv=true />
  </div>
  <div v-else class='normal-window'>
    Something is wrong
  </div>
</v-app>
</template>

<script>
import XLMRocket from './components/XLMRocket.vue'
const BrowserWindow = require('electron').remote.getCurrentWindow()
import {
  PaymentView
} from 'stellar-js-utils'

export default {
  components: {
    'xlm-rocket': XLMRocket,
    'donate-view': PaymentView
  },
  data() {
    return {
      windowType: '',
      showDonatePing: false,
      donationPublicKey: 'GCYQSB3UQDSISB5LKAL2OEVLAYJNIR7LFVYDNKRMLWQKDCBX4PU3Z6JP'
    }
  },
  mounted() {
    this.windowType = BrowserWindow.type
  },
  methods: {}
}
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons);
@import url(https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css);

@import '../node_modules/vuetify/dist/vuetify.min.css'
</style>

<style lang='scss'>
// gets rid of scrollbars on desktop
body,
html {
    overflow: hidden;
    height: 100%;
    width: 100%;

    background: transparent;
}

#app {
    height: 100%;
    background: transparent;
}
</style>

<style scoped lang='scss'>
.rocket-window {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin: 10px;
    box-shadow: 0 0 4px rgba(0,0,0,.3), 0 15px 10px -15px rgba(0,0,0,.4);
    border-radius: 8px;
    overflow: hidden;
    border: solid 1px rgba(255,255,255, .7);
}

.normal-window {
    flex: 1;
    display: flex;
    flex-direction: column;
}
</style>
