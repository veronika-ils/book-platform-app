<template>
    <div class="nav">
                <router-link to="/myShelf"><div class="button">My Shelf</div></router-link>
                <router-link to="/myFavourites"><div class="button">Favourites</div></router-link>
                <router-link to="/"><div class="button">Explore</div></router-link>
                <div @click="logout" class="sign button">Logout</div>
            </div>
    
            <div class="write">
                <img src="../books/book21.jpg" alt="The Secret History" class="image">
                <div class="text">
                    <h1>The Secret History</h1>
                    <p class="author">by Donna Tartt
                    </p>
                    <br>
                    <p class="description">
                        
                     The Secret History by Donna Tartt is a gripping novel that delves into the lives of a group of elite students at an unnamed,
                     prestigious college. The narrative, told from the perspective of Richard Papen, a student who is drawn into the enigmatic 
                     world of his classmates, centers around their unconventional and morally ambiguous professor, Julian Morrow. The students, 
                     highly intelligent and increasingly isolated from the rest of the campus, become obsessed with classical ideals and their own 
                     intellectual pursuits.
                        Their fascination with ancient Greek culture and philosophy spirals into a dangerous and destructive path.
                         <br>
                         <br>
                         As the story unfolds, it becomes clear that the group’s academic fervor leads them to commit murder, and the novel explores 
                         the psychological and ethical ramifications of their actions. Tartt masterfully weaves a tale of intellectual arrogance and 
                         the allure of forbidden knowledge, illustrating how the characters' academic pursuits ultimately lead to their downfall. The
                          novel examines themes of guilt, beauty,
                          and the dark side of human nature, revealing how the pursuit of greatness can have catastrophic consequences.
                        </p>
                        <br>
                     <p class="other" v-show="readingCount > 1">{{ readingCount }} people are currently reading</p>
                     <p class="other" v-show="readingCount === 1">{{ readingCount }} person is currently reading</p>
                </div>
              <div class=" shelf" @click="addShelf">
                {{ text }}
               </div>  
            </div>
            <TwentyOneList v-if="filteredReviews.length" :reviews="filteredReviews"/>
           <ReviewPage @review-submitted="addReview"/>
    </template>
    <script>
    import TwentyOneList from './TwentyOneList.vue';
    import ReviewPage from '../Review.vue';
    import Cookies from 'js-cookie';
    export default {
        name:'SecretHistory',
        components: {
    ReviewPage,
    TwentyOneList 
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
               const cookieKey = `shelf21_${userId}`;
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
            const bookId="book21";
            const key =`reviews_${bookId}`;
            Cookies.set(key,JSON.stringify(this.reviews));
        },
        loadReviews(){
            const bookId = "book21";
            const key = `reviews_${bookId}`;
            const userId = this.getUserId();
            const stored = Cookies.get(key);
            const shelf = Cookies.get(`shelf21_${userId}`);
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

                if(key.startsWith('book21_')) {
            
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