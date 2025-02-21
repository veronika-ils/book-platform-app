<template>
<div class="nav">
            <router-link to="/myShelf"><div class="button">My Shelf</div></router-link>
            <router-link to="/myFavourites"><div class="button">Favourites</div></router-link>
            <router-link to="/"><div class="button">Explore</div></router-link>
            <div @click="logout" class="sign button">Logout</div>
        </div>

        <div class="write">
            <img src="../books/book9.jpg" alt="One Hundred Years of Solitude" class="image">
            <div class="text">
                <h1>One Hundred Years of Solitude</h1>
                <p class="author">by Gabriel García Márquez
                </p>
                <br>
                <p class="description">
                    "One Hundred Years of Solitude" by Gabriel García Márquez is a seminal work of magical realism that chronicles the 
                    multi-generational saga of the Buendía family in the fictional town of Macondo. The novel, first published in 1967, weaves
                     together the extraordinary and the mundane, blurring the boundaries between reality and fantasy. The story begins with José 
                     Arcadio Buendía, the town's founder, and his wife, Úrsula, whose descendants face a series of fantastical events and tragic 
                     fates. The family's history is marked by cycles of prosperity and decay, love and loss, and magical occurrences that reflect 
                     the novel's exploration of Latin American culture and history.
                     <br>
                     <br>
                     At its core, "One Hundred Years of Solitude" is a profound meditation on the nature of time and the inescapable cycles of history.
                      The narrative's nonlinear structure emphasizes the repetition of events across generations, suggesting a sense of inevitability in 
                      the family’s fate. Through its rich symbolism and lush prose, García Márquez examines themes of solitude, power, and the impact of historical
                       forces on individual lives.
                    </p>
                    <br>
                     <p class="other" v-show="readingCount > 1">{{ readingCount }} people are currently reading</p>
                     <p class="other" v-show="readingCount === 1">{{ readingCount }} person is currently reading</p>
            </div>
          <div class=" shelf" @click="addShelf">
            {{ text }}
           </div>  
        </div>
        <NineList v-if="filteredReviews.length" :reviews="filteredReviews"/>
        <ReviewPage @review-submitted="addReview"/>
</template>
<script>
import NineList from './NineList.vue';
import ReviewPage from '../Review.vue';
import Cookies from 'js-cookie';
export default {
    name:'OneHundredYears',
    components: {
    ReviewPage,
    NineList 
     },
     data(){
        return{
            reviews: [],
            text: 'Add to Shelf',
            readingCount: 0
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
           const cookieKey = `shelf9_${userId}`;
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
            const bookId="book9";
            const key =`reviews_${bookId}`;
            Cookies.set(key,JSON.stringify(this.reviews));
        },
        loadReviews(){
            const bookId = "book9";
            const key = `reviews_${bookId}`;
            const userId = this.getUserId();
            const stored = Cookies.get(key);
            const shelf = Cookies.get(`shelf9_${userId}`);
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

                if(key.startsWith('book9_')) {
            
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