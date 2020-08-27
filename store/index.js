import * as types from './mutation-types'
export const state = () => ({
    account: '',
    bc_dat: '',
    updating_dat:'',
    updating_done:''
  })
  
export const getters = {
    datACCOUNT: state => state.account, //Account
    BCDATA : state => state.bc_dat, //Block chainに保存されているdata
    UPDATING_DAT: state => state.updating_dat,  //Block chainに書き込みを行うdata
    UPDATING_DONE: state => state.updating_done  //Block chainに書き込み中と書き込み完了を知らせる。
}

export const mutations ={
    [types.GET_ACCOUNT](state, data){
        state.account = data
       },
       [types.GET_BCDAT](state, data){
         state.bc_dat = data
       },
       [types.UPDATING_BCDAT](state, data){
         state.updating_dat = data
       },
       [types.UPDATING_DONE](state, flag){
         state.updating_done = flag
       }
}

export const actions ={
    async initApp() {
        myAccount = (await web3.eth.getAccounts())[0];
        return myAccount
      },
    
      async getdata(){
        try{
          const result = await contractInstance.methods.message().call();     
          console.log('Fetched msg value from blockchain:', result); 
          return result
          } catch (err) {
          console.log(err);
          }
        },
    
      async initial({dispatch,commit}){
    
        window.addEventListener('load', getweb3 = async function() {
    
          // web3 がブラウザのアドオンなどから提供されているかチェック(MetaMask)
            if (typeof window.ethereum !== 'undefined' || (typeof window.web3 !== 'undefined')) {
              // MetaMask の provider を使う
              let provider = window['ethereum'] || window.web3.currentProvider;
    
              // MetaMask の provider の利用を可能に
              // MetaMask にはプライバシーモードがあり、これが有効になっている場合には、この enable() を使っ
              // てこのサイトでMetaMaskを使う許可をユーザから得る必要がある
             await provider.enable();
             web3 = new Web3(provider);
             return web3
            } else {
              // ユーザが web3 を持っていないケースのハンドリング。 おそらく、あなたのアプリを利用するために
              // MetaMask をインストールするように伝えるメッセージを表示する処理を書く必要があります。
              // もしくは、Ethereum ノードがローカルで動いている場合には、
              // web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
              // また、 infura.io の RPC エンドポイントを利用する場合には、
              // var web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/your_project_id'));
              // のようにできます。
              console.log('METAMASK NOT DETECTED');
            }
          // これで web3.js を自由に使えるようになりました。
          // アプリを初期化して起動しましょう！
          //await this.initApp(this.abi,this.smartContractAddress);       
        });
        web3 = await getweb3()
        contractInstance = new web3.eth.Contract(abi, smartContractAddress);
        myAccount = await dispatch('initApp')
        bcdat = await dispatch('getdata')
        commit(types.GET_ACCOUNT, myAccount)
        commit(types.GET_BCDAT, bcdat)   
      },
    
    
      async update_BCDATA ({dispatch,commit},value) {
        commit(types.UPDATING_BCDAT,value) 
          //console.log("state.updating_dat")
          //console.log(state.updating_dat)
        const msgString =state.updating_dat;
        commit(types.UPDATING_DONE,'処理中')
        if(!msgString){
          return window.alert("MESSAGE VALUE IS EMPTY");
        }
    
        try {
          let option = {
            from: myAccount,
            gasPrice: "20000000000", // このトランザクションで支払う1ガス当たりの価格。単位は wei。
            gas: "41000",            // ガスリミット。このトランザクションで消費するガスの最大量。
          };
          let result = await contractInstance.methods.update(msgString).send(option);       
          console.log('MESSAGE UPDATED IN BLOCKCHIAN SUCCESSFULLY')
          commit(types.UPDATING_DONE,'Block Chainへの書き込みが完了しました') 
          console.log(result);
          bcdat = await dispatch('getdata')
          commit(types.GET_BCDAT, bcdat)   
        } catch (err) {
          console.log(err);
        }
    
    },
}