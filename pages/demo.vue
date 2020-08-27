<template>
    <div>
        <h3>{{myAccount}}</h3>

        <h2>{{update_bcdata[0]}}</h2>

        <h4>{{update_bcdata[1]}}</h4>
        <input type="text" v-model="msg">
        <button v-on:click="okButtonClick">Update</button>
        <nuxt-link to="/">TOP</nuxt-link>
    </div>
</template>

<script>
import * as types from '~/store/mutation-types'
import {mapGetters,mapActions} from 'vuex'

export default {
    name:'demo',

    data(){
        return{
            msg:'',
        }
    },
    methods:{
        ...mapActions([
            'update_BCDATA',
            'initial'
        ]),

        okButtonClick: function(){
            console.log('ok button click')
            this.update_BCDATA(this.msg)
        },
    },
    computed:{
        ...mapGetters({
            myaccount:'datACCOUNT',
            get_bcdata:'BCDATA',
            updating_done:'UPDATING_DONE'
        }),
        update_bcdata:{
            get(){
                return [this.get_bcdata,this.updating_done]
            },
            set(value){
                this.$store.commit(types.UPDATING_BCDAT,value)
            },
        }
    },
    created(){
        this.initial()
    }
}
</script>