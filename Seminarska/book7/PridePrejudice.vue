<template>
<div class="nav">
            <router-link to="/myShelf"><div class="button">My Shelf</div></router-link>
            <router-link to="/myFavourites"><div class="button">Favourites</div></router-link>
            <router-link to="/"><div class="button">Explore</div></router-link>
            <div @click="logout" class="sign button">Logout</div>
        </div>

        <div class="write">
            <img src="../books/book7.jpg" alt="Pride and Prejudice" class="image">
            <div class="text">
                <h1>Pride and Prejudice</h1>
                <p class="author">by Jane Austen
                </p>
                <br>
                <p class="description">
                    "Pride and Prejudice," written by Jane Austen, is a classic novel set in early 19th-century England, focusing on the life 
                    and romantic entanglements of Elizabeth Bennet, one of five sisters in the Bennet family. The novel begins with the famous assertion 
                    that a single man in possession of a good fortune must be in want of a wife, setting the stage for the social and romantic dynamics that 
                    follow. Elizabeth, known for her wit and independence, navigates the complex social hierarchy and the pressures of marriage with both 
                    intelligence and a strong sense of personal integrity. Central to the plot is her evolving relationship with the wealthy and seemingly aloof 
                    Mr. Darcy, whose initial pride and her own prejudices lead to misunderstandings and tension between them.
                     <br>
                     <br>
                     As the story unfolds, Austen explores themes of class, marriage, and individual agency with sharp social commentary and humor. 
                     Elizabeth’s journey involves overcoming her own misconceptions and learning to see beyond first impressions, while Mr. Darcy’s growth includes
                      confronting his own faults and prejudices. Through their eventual mutual understanding and respect, the novel highlights the possibility of
                       personal growth and the transformative power of love. 
                    </p>
                    <br>
                     <p class="other" v-show="readingCount > 1">{{ readingCount }} people are currently reading</p>
                     <p class="other" v-show="readingCount === 1">{{ readingCount }} person is currently reading</p>
            </div>
          <div class=" shelf" @click="addShelf">
            {{ text }}
           </div>  
        </div>
        <SevenList v-if="filteredReviews.length" :reviews="filteredReviews"/>
           <ReviewPage @review-submitted="addReview"/>
</template>
<script>
import SevenList from './SevenList.vue';
import ReviewPage from '../Review.vue';
import Cookies from 'js-cookie';
export default {
    name:'PridePrejudice',
    components: {
    ReviewPage,
    SevenList 
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
         const cookieKey = `shelf7_${userId}`;
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
            const bookId="book7";
            const key =`reviews_${bookId}`;
            Cookies.set(key,JSON.stringify(this.reviews));
        },
        loadReviews(){
            const bookId = "book7";
            const userId = this.getUserId();
            const key = `reviews_${bookId}`;
            const stored = Cookies.get(key);
            const shelf = Cookies.get(`shelf7_${userId}`);
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

                if(key.startsWith('book7_')) {
            
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