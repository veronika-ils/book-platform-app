<template>
<div class="done">
    <div class="books">
    <router-link to="/PrideAndPrejudice"><img src="../books/book7.jpg" alt="Pride and Prejudice" class="book"> 
    <div class="content">
       <h1>Pride and Prejudice</h1>
           <p>
           by Jane Austen 
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
    name:'bookSeven',
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
        isFavourite7: false,
        read:false
    };
    },
    created() {
        const userId = this.getUserId();
        const readKey = `book7_${userId}`;
        const isRead = Cookies.get(readKey);
        const cookieKey = `isFavourite7_${userId}`;

        const isFave = Cookies.get(cookieKey);
        

            if(isFave !== undefined ){
                this.isFavourite7 = JSON.parse(isFave);
                this.image = this.isFavourite7 ? require('../outline1.png') : require('../outline.png');
                this.selected = this.isFavourite7 ? 2 : 1;
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
            this.isFavourite7 = true;
        }else
        {
        this.image = require('../outline.png');  
        this.isFavourite7 = false;  
        }
        const userId = this.getUserId();
        const cookieKey = `isFavourite7_${userId}`;
        Cookies.set(cookieKey,JSON.stringify(this.isFavourite7),{expires: 7});
        
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