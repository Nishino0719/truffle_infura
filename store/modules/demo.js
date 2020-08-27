import * as types from '../mutation-types'
import Vue from 'vue'
// import Vuex from 'vuex'
import Web3 from "web3";
let myAccount;  //EOA(External Owned Address)
var contractInstance; //コントラクトインスタンス
var getweb3; //　web3オブジェクトを返す関数
var bcdat; //ブロックチェーンより取得したデータ
// var smartContractAddress = "0x9bCb05dfA4c55A2Ca057B5615BC9044B9A5f17b0";  //Ropstenテストネット上でのコントラクトアドレス(deploy時に表示されるアドレスに書き換えてください)
var smartContractAddress = "0x363EAF1C82EEbA3205e1891f47A01bee6A71A4cf";  //Localテストネット上でのコントラクトアドレス(deploy時に表示されるアドレスに書き換えてください)

// ABI(Application Binary Interface) はブロックチェーンの外からコントラクトを利用するための
// インターフェースの定義です。
const abi = [
    {
        "inputs": [
          {
            "internalType": "string",
            "name": "initMessage",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "message",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "internalType": "string",
            "name": "newMessage",
            "type": "string"
          }
        ],
        "name": "update",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      }
 ];