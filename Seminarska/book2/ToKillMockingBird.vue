<template>
 <div class="nav">
            <router-link to="/myShelf"><div class="button">My Shelf</div></router-link>
            <router-link to="/myFavourites"><div class="button">Favourites</div></router-link>
            <router-link to="/"><div class="button">Explore</div></router-link>
            <div @click="logout" class="sign button">Logout</div>
        </div>

        <div class="write">
            <img src="../books/book2.jpg" alt="To Kill a Mockingbird" class="image">
            <div class="text">
                <h1>To Kill a Mockingbird</h1>
                <p class="author">by Harper Lee</p>
                <br>
                <p class="description">"To Kill a Mockingbird" by Harper Lee is a profound novel set in the racially charged atmosphere of 1930s Alabama.
                     It follows Scout Finch, a young girl, as she navigates her childhood alongside her brother Jem and their father Atticus Finch,
                      a principled lawyer. The narrative unfolds through Scout’s eyes, highlighting the pervasive injustices of racial prejudice when
                       Atticus defends Tom Robinson, an African American man falsely accused of raping a white woman. Through Scout's experiences and the trial,
                        the novel explores themes of morality, empathy, 
                    and the complexities of human nature, ultimately challenging readers to confront and question their own beliefs about justice and equality.
                     <br>
                     <br>
                    </p>
                    <br>
                     <p class="other" v-show="readingCount > 1">{{ readingCount }} people are currently reading</p>
                     <p class="other" v-show="readingCount === 1">{{ readingCount }} person is currently reading</p>
            </div>
          <div class=" shelf" @click="addShelf">
            {{  text }}
           </div>  
           </div>
           <TwoList v-if="filteredReviews.length" :reviews="filteredReviews"/>
           <ReviewPage @review-submitted="addReview"/>
</template>
<script>
import TwoList from './TwoList.vue';
import ReviewPage from '../Review.vue';
import Cookies from 'js-cookie';
export default {
    name:'ToKillMockingBird',
    components: {
    ReviewPage,
    TwoList
     },
    data(){
        return{
            reviews: [],
            text: 'Add to Shelf',
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
          const cookieKey = `shelf2_${userId}`;
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
            const bookId="book2";
            const key =`reviews_${bookId}`;
            Cookies.set(key,JSON.stringify(this.reviews));
        },
        loadReviews(){
            const bookId = "book2";
            const userId = this.getUserId();
            const key = `reviews_${bookId}`;
            const stored = Cookies.get(key);
            const shelf = Cookies.get(`shelf2_${userId}`);
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

                if(key.startsWith('book2_')) {
            
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