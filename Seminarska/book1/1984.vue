<template>

         <div class="nav">
            <router-link to="/myShelf"><div class="button">My Shelf</div></router-link>
            <router-link to="/myFavourites"><div class="button">Favourites</div></router-link>
            <router-link to="/"><div class="button">Explore</div></router-link>
            <div @click="logout" class="sign button">Logout</div>
        </div>

        <div class="write">
            <img src="../books/book1.jpg" alt="1984" class="image">
            <div class="text">
                <h1>1984</h1>
                <p class="author">by George Orwell</p>
                <br>
                <p class="description">"1984" is a dystopian novel that portrays a nightmarish world of government surveillance, propaganda, 
                    and totalitarian control. Set in a future society where individuality and independent thought are suppressed, the story follows
                     Winston Smith, a low-ranking member of the ruling Party,
                     who secretly rebels against the oppressive regime led by the omnipresent figure known as Big Brother.
                     <br>
                     <br>
                     In this bleak future, the Party monitors every aspect of citizens' lives through telescreens and manipulates historical records to maintain its
                      grip on power. Winston, disillusioned and longing for truth, begins a dangerous journey of rebellion by starting a forbidden love affair with 
                      Julia, another Party member. 
                     Together, they explore the forbidden realms of free thought and challenge the Party's doctrines.</p>
                    <br>
                     <p class="other" v-show="readingCount > 1">{{ readingCount }} people are currently reading</p>
                     <p class="other" v-show="readingCount === 1">{{ readingCount }} person is currently reading</p>
            </div>
          <div class=" shelf" @click="addShelf">
            {{ text }}
           </div>  
        </div>
        <OneList v-if="filteredReviews.length" :reviews="filteredReviews"/>
        <ReviewPage @review-submitted="addReview"/>

</template>

<script>

import Cookies from 'js-cookie';
import ReviewPage from '../Review.vue';
import OneList from './OneList.vue';

export default {
    name:'NineteenEightyFour',
    components: {
    ReviewPage,
    OneList
     },
    data(){
        return{
            reviews: [],
            text:'Add to Shelf',
            readingCount:0
        }
    },
    computed: {
        filteredReviews() {
            const latestReviews = {};
            this.reviews.forEach(review => {
                latestReviews[review.name] = review;
            })
            return Object.values(latestReviews);
        }
    },
    methods:{
        logout(){
           localStorage.clear();
           this.$router.push({name:'LoginPage'})
        },
        addShelf(){
            const userId = this.getUserId();
            const cookieKey = `shelf1_${userId}`;
            Cookies.set(cookieKey,true,{expires:7});
            this.text = 'Added!'
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
            
        },
        addReview(review){
            this.reviews.push(review); 
            this.saveReviews();
        },
        saveReviews(){
            const bookId="book1";
            const key =`reviews_${bookId}`;
            Cookies.set(key,JSON.stringify(this.reviews),{expires:7});
        },
        loadReviews(){
            const bookId = "book1";
            const userId = this.getUserId();
            const key = `reviews_${bookId}`;
            const stored = Cookies.get(key);
            const shelf = Cookies.get(`shelf1_${userId}`);
            if(shelf === 'true'){
                this.text='Added!';
            }else{
                this.text='Add to Shelf';
            }
            if(stored){
                this.reviews = JSON.parse(stored);
            }
        },
        countReading() {
            const allCookies = Cookies.get();
        
            let count = 0;

            for(const [key,value] of Object.entries(allCookies)) {

                if(key.startsWith('book1_')) {
            
                        if(value === 'Reading'){
                            count++;
                        }
                     
                }
            }
            this.readingCount = count;
        }
    },
    created(){
        this.loadReviews();
        this.countReading();
    }
}
</script>

<style src="../style.css"></style>