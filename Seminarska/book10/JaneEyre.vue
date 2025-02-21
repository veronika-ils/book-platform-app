<template>
<div class="nav">
            <router-link to="/myShelf"><div class="button">My Shelf</div></router-link>
            <router-link to="/myFavourites"><div class="button">Favourites</div></router-link>
            <router-link to="/"><div class="button">Explore</div></router-link>
            <div @click="logout" class="sign button">Logout</div>
        </div>

        <div class="write">
            <img src="../books/book10.jpg" alt="Jane Eyre" class="image">
            <div class="text">
                <h1>Jane Eyre</h1>
                <p class="author">by Charlotte Brontë
                </p>
                <br>
                <p class="description">
                    "Jane Eyre" by Charlotte Brontë, published in 1847, is a profound and pioneering novel that delves into the life and struggles 
                    of its eponymous heroine. The story follows Jane Eyre, an orphaned girl who endures a harsh childhood marked by abuse and neglect 
                    before becoming a governess at Thornfield Hall. There, she encounters the enigmatic Mr. Rochester, whose brooding presence and eventual
                     revelation of a dark secret challenge Jane's moral and emotional fortitude. Through her journey
                     from humble beginnings to a position of self-respect and autonomy, Jane Eyre emerges as a symbol of resilience and independence.
                     <br>
                     <br>
                     The novel is renowned for its exploration of themes such as social class, gender inequality, and personal integrity. 
                     Brontë crafts a narrative that combines Gothic elements with a critique of Victorian society, highlighting Jane's quest 
                     for love and self-fulfillment against the backdrop of societal constraints. "Jane Eyre" is celebrated for its strong, complex
                      protagonist and its innovative approach to storytelling, 
                     blending romance, social criticism, and psychological depth to create a rich and enduring literary masterpiece.
                    </p>
                    <br>
                     <p class="other" v-show="readingCount > 1">{{ readingCount }} people are currently reading</p>
                     <p class="other" v-show="readingCount === 1">{{ readingCount }} person is currently reading</p>
            </div>
          <div class=" shelf" @click="addShelf">
            {{ text }}
           </div>  
        </div>
        <TenList v-if="filteredReviews.length" :reviews="filteredReviews"/>
        <ReviewPage @review-submitted="addReview"/>
</template>
<script>
import TenList from './TenList.vue';
import ReviewPage from '../Review.vue';
import Cookies from 'js-cookie';
export default {
    name:'JaneEyre',
    components: {
    ReviewPage,
    TenList 
     },
     data(){
        return{
            reviews: [],
            text:'Add to Shelf',
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
           const cookieKey = `shelf10_${userId}`;
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
            const bookId="book10";
            const key =`reviews_${bookId}`;
            Cookies.set(key,JSON.stringify(this.reviews));
        },
        loadReviews(){
            const bookId = "book10";
            const key = `reviews_${bookId}`;
            const stored = Cookies.get(key);
            const userId = this.getUserId();
            const shelf = Cookies.get(`shelf10_${userId}`);
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

                if(key.startsWith('book10_')) {
            
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