<template>
 <div class="nav">
            <router-link to="/myShelf"><div class="button">My Shelf</div></router-link>
            <router-link to="/myFavourites"><div class="button">Favourites</div></router-link>
            <router-link to="/"><div class="button">Explore</div></router-link>
            <div @click="logout" class="sign button">Logout</div>
        </div>

        <div class="write">
            <img src="../books/book3.jpg" alt="Don Quixote" class="image">
            <div class="text">
                <h1>Don Quixote</h1>
                <p class="author">by Miguel de Cervantes</p>
                <br>
                <p class="description">
                    "Don Quixote" by Miguel de Cervantes is a landmark work of literature that follows the adventures of a delusional nobleman,
                     Alonso Quixano, who renames himself Don Quixote after immersing himself in tales of chivalry. Believing himself to be a knight-errant 
                     destined to revive the age of chivalry, he sets out on a quest to right wrongs and uphold justice. Dressed in outdated armor and riding
                      a gaunt horse named Rocinante,
                     Don Quixote’s misadventures are marked by his idealistic vision clashing with the stark realities 
                     of the world, leading to humorous and often poignant situations.
                     <br>
                     <br>
                     His loyal squire, Sancho Panza, accompanies him, serving as a foil to Don Quixote’s grandiose notions with his practical, 
                     down-to-earth perspective. Throughout the novel, Cervantes masterfully uses satire to explore themes of reality versus illusion,
                      the nature of sanity, and the transformative power of imagination. The narrative serves as a critique of the romanticized notions
                       of knighthood and heroism,
                      while also celebrating the enduring human spirit and the quest for personal ideals despite societal norms.
                    </p>
                    <br>
                     <p class="other" v-show="readingCount > 1">{{ readingCount }} people are currently reading</p>
                     <p class="other" v-show="readingCount === 1">{{ readingCount }} person is currently reading</p>
            </div>
          <div class=" shelf" @click="addShelf">
            {{ text }}
           </div>  
        </div>
        <ThreeList v-if="filteredReviews.length" :reviews="filteredReviews"/>
           <ReviewPage @review-submitted="addReview"/>
</template>
<script>
import ThreeList from './ThreeList.vue';
import ReviewPage from '../Review.vue';
import Cookies from 'js-cookie';
export default {
    name:'DonQuixote',
    components: {
    ReviewPage,
    ThreeList
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
          const cookieKey = `shelf3_${userId}`;
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
            const bookId="book3";
            const key =`reviews_${bookId}`;
            Cookies.set(key,JSON.stringify(this.reviews));
        },
        loadReviews(){
            const userId = this.getUserId();
            const bookId = "book3";
            const key = `reviews_${bookId}`;
            const stored = Cookies.get(key);
            const shelf = Cookies.get(`shelf3_${userId}`);
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

                if(key.startsWith('book3_')) {
            
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