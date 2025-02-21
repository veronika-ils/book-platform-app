<template>

    
        <div class="nav">
            <router-link to="/myShelf"><div class="button">My Shelf</div></router-link>
            <router-link to="/myFavourites"><div class=" button" >Favourites</div></router-link>
            <router-link to="/"><div class="button">Explore</div></router-link>
            <div @click="logout" class="sign button">Logout</div>
        </div>

        <div class="collection color">
               <div  v-show="hasBooks" class="None"><h1>Your Favorites list is currently empty. Discover and add some books to your Favorites!</h1></div>  
                <div v-show="isFave1" class="Fave"><bookOne /></div>
               <div v-show="isFave2" class="Fave"> <bookTwo /></div>
                <div v-show="isFave3" class="Fave"> <bookThree /></div>
                <div v-show="isFave4" class="Fave"> <bookFour /></div>
                <div v-show="isFave5" class="Fave"> <bookFive /> </div>
                <div v-show="isFave6" class="Fave"> <bookSix /> </div>
                <div v-show="isFave7" class="Fave"> <bookSeven />  </div> 
                <div v-show="isFave8" class="Fave"> <bookEight /></div>      
                <div v-show="isFave9" class="Fave">  <bookNine />  </div>   
                <div v-show="isFave10" class="Fave">  <bookTen /></div>
                <div v-show="isFave11" class="Fave"><bookEleven /></div>
                <div v-show="isFave12" class="Fave"> <bookTwelve /></div>
                <div v-show="isFave13" class="Fave"> <bookThirteen /></div>
                <div v-show="isFave14" class="Fave"> <bookFourteen /></div>
                <div v-show="isFave15" class="Fave"> <bookFifteen /></div>
                <div v-show="isFave16" class="Fave"> <bookSixteen /></div>
                <div v-show="isFave17" class="Fave"> <bookSeventeen /></div>
                <div v-show="isFave18" class="Fave"> <bookEighteen /></div>
                <div v-show="isFave19" class="Fave"> <bookNineteen /></div>
                <div v-show="isFave20" class="Fave"> <bookTwenty /></div>
                <div v-show="isFave21" class="Fave"> <bookTwentyOne /></div>
                <div v-show="isFave22" class="Fave"> <bookTwentyTwo /></div>
            </div>
</template>
<script>
import bookOne from './components/book1.vue'
import bookTwo from './components/book2.vue'
import bookThree from './components/book3.vue'
import bookFour from './components/book4.vue'
import bookFive from './components/book5.vue'
import bookSix from './components/book6.vue'
import bookSeven from './components/book7.vue'
import bookEight from './components/book8.vue'
import bookNine from './components/book9.vue'
import bookTen from './components/book10.vue'
import bookEleven from './components/book11.vue'
import bookTwelve from './components/book12.vue'
import bookThirteen from './components/book13.vue'
import bookFourteen from './components/book14.vue'
import bookFifteen from './components/book15.vue'
import bookSixteen from './components/book16.vue'
import bookSeventeen from './components/book17.vue'
import bookEighteen from './components/book18.vue'
import bookNineteen from './components/book19.vue'
import bookTwenty from './components/book20.vue'
import bookTwentyOne from './components/book21.vue'
import bookTwentyTwo from './components/book22.vue'

import Cookies from 'js-cookie';
export default {
    name:'myFave',
    components:{
        bookOne,
        bookTwo,
        bookThree,
        bookFour,
        bookFive,
        bookSix,
        bookSeven,
        bookEight,
        bookNine,
        bookTen,
        bookEleven,
        bookTwelve,
        bookThirteen,
        bookFourteen,
        bookFifteen,
        bookSixteen,
        bookSeventeen,
        bookEighteen,
        bookNineteen,
        bookTwenty,
        bookTwentyOne,
        bookTwentyTwo
    },
    computed: {
        hasBooks(){
          return !this.isFave1 && !this.isFave2 && !this.isFave3 && !this.isFave4 && !this.isFave5 && !this.isFave6 && !this.isFave7 && !this.isFave8 && !this.isFave9 && !this.isFave10 && !this.isFave11 && !this.isFave12 && !this.isFave13 && !this.isFave14 && !this.isFave15 && !this.isFave16 && !this.isFave17 && !this.isFave18 && !this.isFave19 && !this.isFave20 && !this.isFave21 && !this.isFave22;   
        } 
       
    },
    data (){
        return {
            isFave1:false,
            isFave2:false,
            isFave3:false,
            isFave4:false,
            isFave5:false,
            isFave6:false,
            isFave7:false,
            isFave8:false,
            isFave9:false,
            isFave10:false,
            isFave11:false,
            isFave12:false,
            isFave13:false,
            isFave14:false,
            isFave15:false,
            isFave16:false,
            isFave17:false,
            isFave18:false,
            isFave19:false,
            isFave20:false,
            isFave21:false,
            isFave22:false
        }
    },
    mounted() {
        for(let i=1;i<=22;i++){
          const userId = this.getUserId(); 
          const key = `isFavourite${i}`;
          const cookieKey = Cookies.get(`${key}_${userId}`);
          const favekey = `isFave${i}`;
          this[favekey] = cookieKey === 'true';
        }

    },
    methods:{
        logout(){
           localStorage.clear();
           this.$router.push({name:'LoginPage'})
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
<style src="./style.css">
</style>