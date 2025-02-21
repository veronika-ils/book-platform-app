<template>
<div class="done">
    <div class="books">
     
     <router-link to="/DonQuixote"><img src="../books/book3.jpg" alt="Don Quixote" class="book">
     <div class="content">
       <h1> Don Quixote</h1>
        <p>
            by Miguel de Cervantes</p>
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
    name:'bookThree',
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
        isFavourite3: false,
        read:false
    };
    },
    created() {
        const userId = this.getUserId();
        const readKey = `book3_${userId}`;
        const isRead = Cookies.get(readKey);
        const cookieKey = `isFavourite3_${userId}`;

        const isFave = Cookies.get(cookieKey);
        

            if(isFave !== undefined ){
                this.isFavourite3 = JSON.parse(isFave);
                this.image = this.isFavourite3 ? require('../outline1.png') : require('../outline.png');
                this.selected = this.isFavourite3 ? 2 : 1;
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
            this.isFavourite3 = true;
        }else
        {
        this.image = require('../outline.png');  
        this.isFavourite3 = false;  
        }
        const userId = this.getUserId();
        const cookieKey = `isFavourite3_${userId}`;
        Cookies.set(cookieKey,JSON.stringify(this.isFavourite3),{expires: 7});
        
        },
        getUserId(){
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
<style src="../style.css">
</style>