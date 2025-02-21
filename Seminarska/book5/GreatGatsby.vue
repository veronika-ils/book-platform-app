<template>
        <div class="nav">
            <router-link to="/myShelf"><div class="button">My Shelf</div></router-link>
            <router-link to="/myFavourites"><div class="button">Favourites</div></router-link>
            <router-link to="/"><div class="button">Explore</div></router-link>
            <div @click="logout" class="sign button">Logout</div>
        </div>

        <div class="write">
            <img src="../books/book5.jpg" alt="The Great Gatsby" class="image">
            <div class="text">
                <h1>The Great Gatsby</h1>
                <p class="author">by F. Scott Fitzgerald
                </p>
                <br>
                <p class="description">
                    "The Great Gatsby," by F. Scott Fitzgerald, is set during the Roaring Twenties
                     and delves into themes of decadence, idealism, and social change. The novel centers
                      on Jay Gatsby, a wealthy and enigmatic man famous for his extravagant parties and mysterious past.
                       Gatsby’s relentless pursuit of the American Dream is symbolized by his grand mansion in West Egg and his longing 
                    to rekindle a past romance with Daisy Buchanan, revealing the emotional depth behind his glamorous exterior.
                     <br>
                     <br>
                     Despite his outward success, Gatsby’s life is marred by tragedy. His idealistic
                      dream is ultimately unattainable, as his efforts to win Daisy and gain social 
                      acceptance are thwarted by the era's moral decay and superficiality. Gatsby’s inability to reconcile his idealized past
                       with the harsh realities of the present leads 
                     to his downfall and death, highlighting the novel’s critique of the American Dream and the emptiness of the 1920s upper class.
                    </p>
                    <br>
                     <p class="other" v-show="readingCount > 1">{{ readingCount }} people are currently reading</p>
                     <p class="other" v-show="readingCount === 1">{{ readingCount }} person is currently reading</p>
            </div>
          <div class=" shelf" @click="addShelf">
            {{ text }}
           </div>  
        </div>
        <FiveList v-if="filteredReviews.length" :reviews="filteredReviews"/>
           <ReviewPage @review-submitted="addReview"/>
</template>
<script>
import FiveList from './FiveList.vue';
import ReviewPage from '../Review.vue';
import Cookies from 'js-cookie';
export default {
    name:'GreatGatsby',
    components: {
    ReviewPage,
    FiveList 
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
         const cookieKey = `shelf5_${userId}`;
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
            const bookId="book5";
            const key =`reviews_${bookId}`;
            Cookies.set(key,JSON.stringify(this.reviews));
        },
        loadReviews(){
            const bookId = "book5";
            const userId = this.getUserId();
            const key = `reviews_${bookId}`;
            const shelf = Cookies.get(`shelf5_${userId}`);
            if(shelf === 'true'){
                this.text='Added!';
            }else{
                this.text='Add to Shelf';
            }
            const stored = Cookies.get(key);
            if(stored){
                this.reviews = JSON.parse(stored);
            }
        },
        countReading() {
            const allCookies = Cookies.get();
        
            let count = 0;

            for(const [key,value] of Object.entries(allCookies)) {

                if(key.startsWith('book5_')) {
            
                        if(value === 'Reading'){
                            count++;
                        }
                     
                }
            }
            this.readingCount = count;
        }
    },created(){
        this.loadReviews();
        this.countReading();
    } 
}
</script>
<style src="../style.css"></style>