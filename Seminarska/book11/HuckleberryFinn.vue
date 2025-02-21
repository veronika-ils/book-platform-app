<template>
<div class="nav">
            <router-link to="/myShelf"><div class="button">My Shelf</div></router-link>
            <router-link to="/myFavourites"><div class="button">Favourites</div></router-link>
            <router-link to="/"><div class="button">Explore</div></router-link>
            <div @click="logout" class="sign button">Logout</div>
        </div>

        <div class="write">
            <img src="../books/book11.jpg" alt=" The Adventures of Huckleberry Finn" class="image">
            <div class="text">
                <h1> The Adventures of Huckleberry Finn</h1>
                <p class="author">by Mark Twain
                </p>
                <br>
                <p class="description">
                    "The Adventures of Huckleberry Finn" by Mark Twain, published in 1884, is a seminal work in American literature that follows 
                    the picaresque journey of a young boy named Huck Finn. Set in the pre-Civil War South, the novel begins with Huck's escape from 
                    his abusive father and his subsequent adventures on the Mississippi River with Jim, an escaped slave. Through their travels, Huck
                     grapples with complex moral and social issues, including the conflicts between societal norms and personal ethics. The novel 
                     is celebrated for its vivid depiction of American river life, 
                    its critique of entrenched social injustices, and its distinctive use of vernacular speech.
                     <br>
                     <br>
                     Twain’s narrative is both a gripping adventure and a sharp social commentary, exploring themes of freedom, friendship, 
                     and the hypocrisy of institutionalized racism. Huck’s evolving relationship with Jim challenges the racist attitudes of the
                      time and underscores the moral dilemmas faced by individuals in a flawed society. The novel's blend of humor, realism, and 
                      deep philosophical questions has cemented its status as a
                      groundbreaking and enduring piece of American literature, offering a profound critique of the values and contradictions of its era.
                    </p>
                    <br>
                     <p class="other" v-show="readingCount > 1">{{ readingCount }} people are currently reading</p>
                     <p class="other" v-show="readingCount === 1">{{ readingCount }} person is currently reading</p>
            </div>
          <div class=" shelf" @click="addShelf">
            {{ text }}
           </div>  
        </div>
        <ElevenList v-if="filteredReviews.length" :reviews="filteredReviews"/>
        <ReviewPage @review-submitted="addReview"/>
</template>
<script>
import ElevenList from './ElevenList.vue';
import ReviewPage from '../Review.vue';
import Cookies from 'js-cookie';
export default {
    name:'HuckleberryFinn',
    components: {
    ReviewPage,
    ElevenList 
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
           const cookieKey = `shelf11_${userId}`;
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
            const bookId="book11";
            const key =`reviews_${bookId}`;
            Cookies.set(key,JSON.stringify(this.reviews));
        },
        loadReviews(){
            const bookId = "book11";
            const key = `reviews_${bookId}`;
            const userId = this.getUserId();
            const stored = Cookies.get(key);
            const shelf = Cookies.get(`shelf11_${userId}`);
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

                if(key.startsWith('book11_')) {
            
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