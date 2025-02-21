<template>
<div class="done">
    <div class="books">
    <router-link to="/MobyDick"><img src="../books/book4.jpg" alt="Moby-Dick" class="book">
    <div class="content">
       <h1>Moby Dick</h1>
           <p>
            by Herman Melville
           </p>
    </div>  
    </router-link>
   </div>
   <img :src="image" class="heart" @click="addFaves"> 
   <img v-show="Read || read" class="flag" src="../flag2.png">
      <h2 v-show="Read || read">READ</h2> 
      <p v-show="Read || read">.</p>
  </div>
</template>
<script>
import Cookies from 'js-cookie';
export default {
    name:'bookFour',
    props: {
        status: {
            type: String,
            default: ''
        }
    },
    computed: {
        Read() {
            return this.status === 'Read';
        }
    },
    data(){
        return {
        image: require('../outline.png'),
        selected: 1, 
        isFavourite4: false,
        read:false
    };
    },
    created() {
        const userId = this.getUserId();
        const readKey = `book4_${userId}`;
        const isRead = Cookies.get(readKey);
        const cookieKey = `isFavourite4_${userId}`;

        const isFave = Cookies.get(cookieKey);
        

            if(isFave !== undefined ){
                this.isFavourite4 = JSON.parse(isFave);
                this.image = this.isFavourite4 ? require('../outline1.png') : require('../outline.png');
                this.selected = this.isFavourite4 ? 2 : 1;
            }
            if(isRead === 'Read') {
                this.read = 'true';
            }
        
    },
    methods:{
        addFaves(){
        this.selected += 1;
        if(this.selected % 2 === 0 ){
            this.image = require('../outline1.png');
            this.isFavourite4 = true;
        }else
        {
        this.image = require('../outline.png');  
        this.isFavourite4 = false;  
        }
        const userId = this.getUserId();
        const cookieKey = `isFavourite4_${userId}`;
        Cookies.set(cookieKey,JSON.stringify(this.isFavourite4),{expires: 7});
        
        },getUserId(){
            const userInfo = localStorage.getItem('user-info');
            if(userInfo){
                try {
                    const parsedUserInfo = JSON.parse(userInfo);
                    if(parsedUserInfo && parsedUserInfo.id) {
                        return parsedUserInfo.id;
                    }else {
                        console.log('ID is missing'); 
                    } 
                } catch (e) {
                    console.error('Error parsing', e);
                }
         }else {
                console.log('NO user found');
            }
                return null;
            
        }
    }
}
</script>
<style src="../style.css"></style>