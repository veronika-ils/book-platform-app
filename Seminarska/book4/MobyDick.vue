<template>
 <div class="nav">
            <router-link to="/myShelf"><div class="button">My Shelf</div></router-link>
            <router-link to="/myFavourites"><div class="button">Favourites</div></router-link>
            <router-link to="/"><div class="button">Explore</div></router-link>
            <div @click="logout" class="sign button">Logout</div>
        </div>

        <div class="write">
            <img src="../books/book4.jpg" alt="Moby-Dick" class="image">
            <div class="text">
                <h1>Moby Dick</h1>
                <p class="author">by Herman Melville</p>
                <br>
                <p class="description">
                    "Moby Dick" by Herman Melville is a profound novel that chronicles Captain Ahab’s obsessive quest to kill Moby Dick, 
                    a massive white whale responsible for maiming him. Narrated by Ishmael, a sailor aboard Ahab's whaling ship, the story explores 
                    the dangers of Ahab's vengeful pursuit and the various challenges faced by the crew of the Pequod. Through their journey across 
                    the world's oceans,
                     the novel examines themes of obsession, revenge, and the human struggle against the vast, indifferent forces of nature.
                     <br>
                     <br>
                     Melville's work is notable for its deep philosophical reflections and detailed depictions of whaling, using Moby Dick as
                      a symbol of the unknowable and the sublime. Ahab's relentless pursuit ultimately leads to the destruction of the Pequod and 
                      the death of most of its crew, with Ishmael surviving as the sole witness to the tragic conclusion.
                      The novel serves as a rich exploration of man’s quest for meaning and the consequences of unchecked ambition.
                    </p>
                    <br>
                     <p class="other" v-show="readingCount > 1">{{ readingCount }} people are currently reading</p>
                     <p class="other" v-show="readingCount === 1">{{ readingCount }} person is currently reading</p>
            </div>
          <div class=" shelf" @click="addShelf">
            {{  text }}
           </div>  
        </div>
         <FourList v-if="filteredReviews.length" :reviews="filteredReviews"/>
           <ReviewPage @review-submitted="addReview"/>
</template>
<script>
import FourList from './FourList.vue';
import ReviewPage from '../Review.vue';
import Cookies from 'js-cookie';
export default {
    name:'MobyDick',
    components: {
    ReviewPage,
    FourList 
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
         const cookieKey = `shelf4_${userId}`;
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
            const bookId="book4";
            const key =`reviews_${bookId}`;
            Cookies.set(key,JSON.stringify(this.reviews));
        },
        loadReviews(){
            const bookId = "book4";
            const userId = this.getUserId();
            const key = `reviews_${bookId}`;
            const stored = Cookies.get(key);
            const shelf = Cookies.get(`shelf4_${userId}`);
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

                if(key.startsWith('book4_')) {
            
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