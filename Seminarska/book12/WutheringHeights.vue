<template>
<div class="nav">
            <router-link to="/myShelf"><div class="button">My Shelf</div></router-link>
            <router-link to="/myFavourites"><div class="button">Favourites</div></router-link>
            <router-link to="/"><div class="button">Explore</div></router-link>
            <div @click="logout" class="sign button">Logout</div>
        </div>

        <div class="write">
            <img src="../books/book12.jpg" alt="Wuthering Heights" class="image">
            <div class="text">
                <h1>Wuthering Heights</h1>
                <p class="author">by Emily Brontë
                </p>
                <br>
                <p class="description">
                    "Wuthering Heights" by Emily Brontë, published in 1847, is a dark and intense Gothic novel that explores themes of passion, revenge, 
                    and the destructive nature of love. The story unfolds through the fragmented narration of Mr. Lockwood and Nelly Dean, who recount the
                     tumultuous lives of the inhabitants of Wuthering Heights and Thrushcross Grange. At the heart of the novel is the tumultuous relationship 
                     between Heathcliff, an adopted member of the Earnshaw family, and Catherine Earnshaw. 
                    Their deep, often destructive connection drives much of the novel’s drama and highlights the destructive potential of obsessive love
                     <br>
                     <br>
                     Brontë’s novel is notable for its complex narrative structure and the psychological depth of its characters. 
                     The bleak and isolated setting of the Yorkshire moors reflects the turbulent emotions and moral ambiguity of the characters. 
                     Heathcliff’s relentless quest for vengeance against those who wronged him, particularly in his relationship with Catherine and 
                     her family, creates a cycle of suffering that impacts multiple generations. 
                   
                    </p>
                    <br>
                     <p class="other" v-show="readingCount > 1">{{ readingCount }} people are currently reading</p>
                     <p class="other" v-show="readingCount === 1">{{ readingCount }} person is currently reading</p>
            </div>
          <div class=" shelf" @click="addShelf">
            {{  text }}
           </div>  
        </div>
        <TwelveList v-if="filteredReviews.length" :reviews="filteredReviews"/>
           <ReviewPage @review-submitted="addReview"/>
</template>
<script>
import TwelveList from './TwelveList.vue';
import ReviewPage from '../Review.vue';
import Cookies from 'js-cookie';
export default {
    name:'WutheringHeights',
    components: {
    ReviewPage,
    TwelveList 
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
           const cookieKey = `shelf12_${userId}`;
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
            const bookId="book12";
            const key =`reviews_${bookId}`;
            Cookies.set(key,JSON.stringify(this.reviews));
        },
        loadReviews(){
            const bookId = "book12";
            const key = `reviews_${bookId}`;
            const userId = this.getUserId();
            const stored = Cookies.get(key);
            const shelf = Cookies.get(`shelf12_${userId}`);
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

                if(key.startsWith('book12_')) {
            
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