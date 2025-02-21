<template>
<div class="nav">
            <router-link to="/myShelf"><div class="button">My Shelf</div></router-link>
            <router-link to="/myFavourites"><div class="button">Favourites</div></router-link>
            <router-link to="/"><div class="button">Explore</div></router-link>
            <div @click="logout" class="sign button">Logout</div>
        </div>

        <div class="write">
            <img src="../books/book8.jpg" alt="Anna Karenina" class="image">
            <div class="text">
                <h1>Anna Karenina</h1>
                <p class="author">by  Leo Tolstoy
                </p>
                <br>
                <p class="description">
                    "Anna Karenina," by Leo Tolstoy, is a 19th-century epic that explores Russian society through its complex characters.
                     The novel follows Anna Karenina, a beautiful woman trapped in a stifling marriage with bureaucrat Alexei Karenin. Seeking
                      escape, Anna engages in a passionate and ultimately destructive affair with Count
                     Alexei Vronsky. As their relationship becomes scandalous, Anna faces increasing alienation and internal conflict.
                     <br>
                     <br>
                     Tolstoy also presents Konstantin Levin’s story, offering a contrast to Anna’s tragic fate. Levin, a landowner,
                      grapples with personal fulfillment and societal change, including his struggles with agricultural reform and 
                      his eventual marriage to Kitty. These intertwined narratives provide a profound examination of human relationships, societal 
                     expectations, and the pursuit of happiness, making the novel a critical commentary on late 19th-century Russian society.
                    </p>
                    <br>
                     <p class="other" v-show="readingCount > 1">{{ readingCount }} people are currently reading</p>
                     <p class="other" v-show="readingCount === 1">{{ readingCount }} person is currently reading</p>
            </div> 
          <div class=" shelf" @click="addShelf">
           {{ text }}
           </div>  
        </div>
        <EightList v-if="filteredReviews.length" :reviews="filteredReviews"/>
           <ReviewPage @review-submitted="addReview"/>
</template>
<script>
import EightList from './EightList.vue';
import ReviewPage from '../Review.vue';
import Cookies from 'js-cookie';
export default {
    name:'AnnaKarenina',
    components: {
    ReviewPage,
    EightList 
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
         const cookieKey = `shelf8_${userId}`;
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
            const bookId="book8";
            const key =`reviews_${bookId}`;
            Cookies.set(key,JSON.stringify(this.reviews));
        },
        loadReviews(){
            const bookId = "book8";
            const userId = this.getUserId();
            const key = `reviews_${bookId}`;
            const stored = Cookies.get(key);
            const shelf = Cookies.get(`shelf8_${userId}`);
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

                if(key.startsWith('book8_')) {
            
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