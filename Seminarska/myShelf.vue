<template>
    <div class="color">
     <div class="nav">
            <router-link to="/myShelf"><div class="button">My Shelf</div></router-link>
            <router-link to="/myFavourites"><div class=" button" >Favourites</div></router-link>
            <router-link to="/"><div class="button">Explore</div></router-link>
            <div @click="logout" class="sign button">Logout</div>
        </div>
        <div  v-show="hasBooks" class="None one"><h1>Your Shelf is currently empty. Discover and add some books!</h1></div>   
        <div class="collection collect ">
            
               <div v-show="isShelf1" class="onShelf"><bookOne :status="readingStatuses.book1" />
                <label class="status">Status:</label>
                 <select class="readingStatus" v-model="readingStatuses.book1" @change="updateReadingStatus('book1')"> 
                    <option>To read</option>
                    <option>Reading</option> 
                    <option>Read</option>
                 </select>
              <img  src="./x1.png" alt="delete" class="delete" @click="removeShelf('shelf1')">
            </div>
               <div v-show="isShelf2" class="onShelf"> <bookTwo :status="readingStatuses.book2" /> 
                <label class="status">Status:</label>
                <select class="readingStatus" v-model="readingStatuses.book2" @change="updateReadingStatus('book2')"> 
                    <option>To read</option>
                    <option>Reading</option> 
                    <option>Read</option>
                 </select>
                <img  src="./x1.png" alt="delete" class="delete" @click="removeShelf('shelf2')"></div>
                <div v-show="isShelf3" class="onShelf"> <bookThree :status="readingStatuses.book3" />
                    <label class="status">Status:</label>
                    <select class="readingStatus" v-model="readingStatuses.book3" @change="updateReadingStatus('book3')"> 
                    <option>To read</option>
                    <option>Reading</option> 
                    <option>Read</option>
                 </select>
                <img  src="./x1.png" alt="delete" class="delete" @click="removeShelf('shelf3')"></div>
                <div v-show="isShelf4" class="onShelf"> <bookFour :status="readingStatuses.book4" />
                    <label class="status">Status:</label>
                    <select class="readingStatus" v-model="readingStatuses.book4" @change="updateReadingStatus('book4')"> 
                    <option>To read</option>
                    <option>Reading</option> 
                    <option>Read</option>
                 </select>
                <img  src="./x1.png" alt="delete" class="delete" @click="removeShelf('shelf4')"></div>
                <div v-show="isShelf5" class="onShelf"> <bookFive :status="readingStatuses.book5" /> 
                    <label class="status">Status:</label>
                    <select class="readingStatus" v-model="readingStatuses.book5" @change="updateReadingStatus('book5')"> 
                    <option>To read</option>
                    <option>Reading</option> 
                    <option>Read</option>
                 </select>
                <img  src="./x1.png" alt="delete" class="delete" @click="removeShelf('shelf5')"> </div>
                <div v-show="isShelf6" class="onShelf"> <bookSix :status="readingStatuses.book6" /> 
                    <label class="status">Status:</label>
                    <select class="readingStatus" v-model="readingStatuses.book6" @change="updateReadingStatus('book6')"> 
                    <option>To read</option>
                    <option>Reading</option> 
                    <option>Read</option>
                 </select>
                <img  src="./x1.png" alt="delete" class="delete" @click="removeShelf('shelf6')"></div>
                <div v-show="isShelf7" class="onShelf"> <bookSeven :status="readingStatuses.book7" />
                    <label class="status">Status:</label>
                    <select class="readingStatus" v-model="readingStatuses.book7" @change="updateReadingStatus('book7')"> 
                    <option>To read</option>
                    <option>Reading</option> 
                    <option>Read</option>
                 </select>
                <img  src="./x1.png" alt="delete" class="delete" @click="removeShelf('shelf7')"> </div> 
                <div v-show="isShelf8" class="onShelf"> <bookEight :status="readingStatuses.book8" />
                    <label class="status">Status:</label>
                    <select class="readingStatus" v-model="readingStatuses.book8" @change="updateReadingStatus('book8')"> 
                    <option>To read</option>
                    <option>Reading</option> 
                    <option>Read</option>
                 </select>
                <img  src="./x1.png" alt="delete" class="delete" @click="removeShelf('shelf8')"></div>      
                <div v-show="isShelf9" class="onShelf"> <bookNine :status="readingStatuses.book9" /> 
                    <label class="status">Status:</label>
                    <select class="readingStatus" v-model="readingStatuses.book9" @change="updateReadingStatus('book9')"> 
                    <option>To read</option>
                    <option>Reading</option> 
                    <option>Read</option>
                 </select>
                <img  src="./x1.png" alt="delete" class="delete" @click="removeShelf('shelf9')"> </div>   
                <div v-show="isShelf10" class="onShelf">  <bookTen :status="readingStatuses.book10" />
                    <label class="status">Status:</label>
                    <select class="readingStatus" v-model="readingStatuses.book10" @change="updateReadingStatus('book10')"> 
                    <option>To read</option>
                    <option>Reading</option> 
                    <option>Read</option>
                 </select>
                <img  src="./x1.png" alt="delete" class="delete" @click="removeShelf('shelf10')"></div>
                <div v-show="isShelf11" class="onShelf"> <bookEleven :status="readingStatuses.book11" />
                    <label class="status">Status:</label>
                    <select class="readingStatus" v-model="readingStatuses.book11" @change="updateReadingStatus('book11')"> 
                    <option>To read</option>
                    <option>Reading</option> 
                    <option>Read</option>
                 </select> 
                <img  src="./x1.png" alt="delete" class="delete" @click="removeShelf('shelf11')"></div>
                <div v-show="isShelf12" class="onShelf"> <bookTwelve :status="readingStatuses.book12" />
                    <label class="status">Status:</label>
                    <select class="readingStatus" v-model="readingStatuses.book12" @change="updateReadingStatus('book12')"> 
                    <option>To read</option>
                    <option>Reading</option> 
                    <option>Read</option>
                 </select>
                <img  src="./x1.png" alt="delete" class="delete" @click="removeShelf('shelf12')"></div>
                <div v-show="isShelf13" class="onShelf"> <bookThirteen :status="readingStatuses.book13" />
                    <label class="status">Status:</label>
                    <select class="readingStatus" v-model="readingStatuses.book13" @change="updateReadingStatus('book13')"> 
                    <option>To read</option>
                    <option>Reading</option> 
                    <option>Read</option>
                 </select>
                <img  src="./x1.png" alt="delete" class="delete" @click="removeShelf('shelf13')"></div>
                <div v-show="isShelf14" class="onShelf"> <bookFourteen :status="readingStatuses.book14" />
                    <label class="status">Status:</label>
                    <select class="readingStatus" v-model="readingStatuses.book14" @change="updateReadingStatus('book14')"> 
                    <option>To read</option>
                    <option>Reading</option> 
                    <option>Read</option>
                 </select>
                <img  src="./x1.png" alt="delete" class="delete" @click="removeShelf('shelf14')"></div>
                <div v-show="isShelf15" class="onShelf"> <bookFifteen :status="readingStatuses.book15" />
                    <label class="status">Status:</label>
                    <select class="readingStatus" v-model="readingStatuses.book15" @change="updateReadingStatus('book15')"> 
                    <option>To read</option>
                    <option>Reading</option> 
                    <option>Read</option>
                 </select>
                <img  src="./x1.png" alt="delete" class="delete" @click="removeShelf('shelf15')"></div>
                <div v-show="isShelf16" class="onShelf"> <bookSixteen :status="readingStatuses.book16" />
                    <label class="status">Status:</label>
                    <select class="readingStatus" v-model="readingStatuses.book16" @change="updateReadingStatus('book16')"> 
                    <option>To read</option>
                    <option>Reading</option> 
                    <option>Read</option>
                 </select>
                <img  src="./x1.png" alt="delete" class="delete" @click="removeShelf('shelf16')"></div>
                <div v-show="isShelf17" class="onShelf"> <bookSeventeen :status="readingStatuses.book17" />
                    <label class="status">Status:</label>
                    <select class="readingStatus" v-model="readingStatuses.book17" @change="updateReadingStatus('book17')"> 
                    <option>To read</option>
                    <option>Reading</option> 
                    <option>Read</option>
                 </select>
                <img  src="./x1.png" alt="delete" class="delete" @click="removeShelf('shelf17')"></div>
                <div v-show="isShelf18" class="onShelf"> <bookEighteen :status="readingStatuses.book18" />
                    <label class="status">Status:</label>
                    <select class="readingStatus" v-model="readingStatuses.book18" @change="updateReadingStatus('book18')"> 
                    <option>To read</option>
                    <option>Reading</option> 
                    <option>Read</option>
                 </select>
                <img  src="./x1.png" alt="delete" class="delete" @click="removeShelf('shelf18')"></div>
                <div v-show="isShelf19" class="onShelf"> <bookNineteen :status="readingStatuses.book19" />
                    <label class="status">Status:</label>
                    <select class="readingStatus" v-model="readingStatuses.book19" @change="updateReadingStatus('book19')"> 
                    <option>To read</option>
                    <option>Reading</option> 
                    <option>Read</option>
                 </select>
                <img  src="./x1.png" alt="delete" class="delete" @click="removeShelf('shelf19')"></div>
                <div v-show="isShelf20" class="onShelf"> <bookTwenty :status="readingStatuses.book20" />
                    <label class="status">Status:</label>
                    <select class="readingStatus" v-model="readingStatuses.book20" @change="updateReadingStatus('book20')"> 
                    <option>To read</option>
                    <option>Reading</option> 
                    <option>Read</option>
                 </select>
                <img  src="./x1.png" alt="delete" class="delete" @click="removeShelf('shelf20')"></div>
                <div v-show="isShelf21" class="onShelf"> <bookTwentyOne :status="readingStatuses.book21" />
                    <label class="status">Status:</label>
                    <select class="readingStatus" v-model="readingStatuses.book21" @change="updateReadingStatus('book21')"> 
                    <option>To read</option>
                    <option>Reading</option> 
                    <option>Read</option>
                 </select>
                <img  src="./x1.png" alt="delete" class="delete" @click="removeShelf('shelf21')"></div>
                <div v-show="isShelf22" class="onShelf"> <bookTwentyTwo :status="readingStatuses.book22" />
                    <label class="status">Status:</label>
                    <select class="readingStatus" v-model="readingStatuses.book22" @change="updateReadingStatus('book22')"> 
                    <option>To read</option>
                    <option>Reading</option> 
                    <option>Read</option>
                 </select>
                <img  src="./x1.png" alt="delete" class="delete" @click="removeShelf('shelf22')"></div>
            </div>
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
    name:'myShelf',
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
        bookTwentyOne ,
        bookTwentyTwo
    },
    data (){
        return {
            readingStatuses: {
                book1: 'To read',
                book2: 'To read',
                book3: 'To read',
                book4: 'To read',
                book5: 'To read',
                book6: 'To read',
                book7: 'To read',
                book8: 'To read',
                book9: 'To read',
                book10: 'To read',
                book11: 'To read',
                book12: 'To read',
                book13: 'To read',
                book14: 'To read',
                book15: 'To read',
                book16: 'To read',
                book17:'To read',
                book18:'To read',
                book19:'To read',
                book20:'To read',
                book21:'To read',
                book22:'To read'
            },
            isShelf1:false,
            isShelf2:false,
            isShelf3:false,
            isShelf4:false,
            isShelf5:false,
            isShelf6:false,
            isShelf7:false,
            isShelf8:false,
            isShelf9:false,
            isShelf10:false,
            isShelf11:false,
            isShelf12:false,
            isShelf13:false,
            isShelf14:false,
            isShelf15:false,
            isShelf16:false,
            isShelf17:false,
            isShelf18:false,
            isShelf19:false,
            isShelf20:false,
            isShelf21:false,
            isShelf22:false
        }
    },
    computed: {
        hasBooks() {
            return !this.isShelf1 && !this.isShelf2 && !this.isShelf3 && !this.isShelf4 && !this.isShelf5 && !this.isShelf6 && !this.isShelf7 && !this.isShelf8 && !this.isShelf9 && !this.isShelf10 && !this.isShelf11 && !this.isShelf12 && !this.isShelf13 && !this.isShelf14 && !this.isShelf15 && !this.isShelf16 && !this.isShelf17 && !this.isShelf18 && !this.isShelf19 && !this.isShelf20 && !this.isShelf21 && !this.isShelf22;
        }
    },
    mounted() {
        const userId = this.getUserId();
        for(let i = 1;i <= 22;i++){
            const ShelfKey = `isShelf${i}`;
            const cookieKey = `shelf${i}_${userId}`;
            const shelf = Cookies.get(cookieKey);
            this[ShelfKey] = shelf === 'true';
        }
        for(let i = 1;i <= 22;i++){
            const shelfKey = `book${i}`;
            const cookieKey = `${shelfKey}_${userId}`;
            const shelf = Cookies.get(cookieKey);
            this.readingStatuses[shelfKey] = shelf || 'To read';
        }
    },
    methods:{
        logout(){
           localStorage.clear();
           this.$router.push({name:'LoginPage'})
        },
        removeShelf(shelf){
            const userId = this.getUserId();
            const cookieKey = `${shelf}_${userId}`;
            Cookies.set(cookieKey,false,{expires:7});
            const bookKey = shelf.replace('shelf','book');
            const Shelf = shelf.replace('shelf','isShelf');
            const current = Cookies.get(`${bookKey}_${userId}`);
            if(current !== 'Read')
            Cookies.set(`${bookKey}_${userId}`,'To read');
            this[Shelf]=false;
        },
        updateReadingStatus(shelf){
            const userId = this.getUserId();
            const cookieKey = `${shelf}_${userId}`;
            Cookies.set(cookieKey,this.readingStatuses[shelf],{expires:7});

           /* if(this.readingStatuses[shelf] === 'Read'){
                this.$emit('bookRead',shelf);
            }*/

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
<style src="./style.css"></style>