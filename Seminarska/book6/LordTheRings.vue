<template>
<div class="nav">
            <router-link to="/myShelf"><div class="button">My Shelf</div></router-link>
            <router-link to="/myFavourites"><div class="button">Favourites</div></router-link>
            <router-link to="/"><div class="button">Explore</div></router-link>
            <div @click="logout" class="sign button">Logout</div>
        </div>

        <div class="write">
            <img src="../books/book6.gif" alt="The Lord of the Rings" class="image">
            <div class="text">
                <h1>The Lord of the Rings</h1>
                <p class="author">by John Ronald Reuel Tolkien
                </p>
                <br>
                <p class="description">
                    "The Lord of the Rings," by J.R.R. Tolkien, is a fantasy epic set in Middle-earth, 
                    following the journey of Frodo Baggins, a hobbit chosen to destroy the One Ring. This
                     powerful artifact, created by the Dark Lord Sauron, threatens all that is good. Frodo,
                      along with a diverse group including Aragorn, Legolas, Gimli, and his friends Sam, Merry, and Pippin, 
                    must travel to Mount Doom to cast the ring into the fires from which it was forged and prevent Sauron's return.
                     <br>
                     <br>
                     The novel is celebrated for its elaborate world-building, featuring detailed histories, languages, and cultures.
                      Themes of friendship, courage, and the battle between good and evil are woven throughout the story. As the characters
                       face epic battles and treacherous landscapes, the journey becomes a profound exploration of moral
                      choices and the corrupting nature of power, ultimately offering a timeless tale of heroism and hope amidst darkness.
                    </p>
                    <br>
                     <p class="other" v-show="readingCount > 1">{{ readingCount }} people are currently reading</p>
                     <p class="other" v-show="readingCount === 1">{{ readingCount }} person is currently reading</p>
            </div>
          <div class=" shelf" @click="addShelf">
            {{ text }}
           </div>  
        </div>
        <SixList v-if="filteredReviews.length" :reviews="filteredReviews"/>
           <ReviewPage @review-submitted="addReview"/>
</template>
<script>
import SixList from './SixList.vue';
import ReviewPage from '../Review.vue';
import Cookies from 'js-cookie';
export default {
    name:'LordTheRings',
    components: {
    ReviewPage,
    SixList 
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
         const cookieKey = `shelf6_${userId}`;
            Cookies.set(cookieKey,true,{expires:7});
            this.text = 'Added!';
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
            const bookId="book6";
            const key =`reviews_${bookId}`;
            Cookies.set(key,JSON.stringify(this.reviews));
        },
        loadReviews(){
            const bookId = "book6";
            const userId = this.getUserId();
            const key = `reviews_${bookId}`;
            const stored = Cookies.get(key);
            const shelf = Cookies.get(`shelf6_${userId}`);
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

                if(key.startsWith('book6_')) {
            
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