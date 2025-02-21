<template>
    <div class="nav">
                <router-link to="/myShelf"><div class="button">My Shelf</div></router-link>
                <router-link to="/myFavourites"><div class="button">Favourites</div></router-link>
                <router-link to="/"><div class="button">Explore</div></router-link>
                <div @click="logout" class="sign button">Logout</div>
            </div>
    
            <div class="write">
                <img src="../books/book13.jpg" alt="Hamlet" class="image">
                <div class="text">
                    <h1>Hamlet</h1>
                    <p class="author">by William Shakespeare
                    </p>
                    <br>
                    <p class="description">
                        "Hamlet," one of William Shakespeare's most famous tragedies, is a profound exploration of themes such as revenge, madness,
                         and the complexity of the human psyche. The play, set in Denmark, revolves around Prince Hamlet, who is deeply troubled by
                          the recent death of his father, King Hamlet, and the hasty remarriage of his mother, Queen Gertrude, to his uncle, Claudius.
                           When Hamlet encounters the ghost of his father, he learns that Claudius is the murderer and is urged to avenge his death.
                            This revelation sets off a chain of events filled with intrigue,
                         deception, and existential reflection as Hamlet grapples with his moral duty and the consequences of his actions.
                         <br>
                         <br>
                         Shakespeare's intricate narrative is marked by its exploration of Hamlet's internal struggle and philosophical soliloquies,
                          notably the famous "To be, or not to be" speech, which contemplates life and death. The play delves into themes of madness—both 
                          feigned and real—and the impact of vengeance on personal and political realms. The tragic culmination of the story sees a cascade of deaths,
                           including Hamlet's own, underscoring the play's examination of the consequences of unresolved conflict and the inevitable downfall that 
                           arises from corruption and revenge.
                        </p>
                        <br>
                     <p class="other" v-show="readingCount > 1">{{ readingCount }} people are currently reading</p>
                     <p class="other" v-show="readingCount === 1">{{ readingCount }} person is currently reading</p>
                </div>
              <div class=" shelf" @click="addShelf">
                {{ text }}
               </div>  
            </div>
            <ThirteenList v-if="filteredReviews.length" :reviews="filteredReviews"/>
           <ReviewPage @review-submitted="addReview"/>
    </template>
    <script>
    import ThirteenList from './ThirteenList.vue';
    import ReviewPage from '../Review.vue';
    import Cookies from 'js-cookie';
    export default {
        name:'HamletPage',
        components: {
    ReviewPage,
    ThirteenList 
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
               const cookieKey = `shelf13_${userId}`;
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
            const bookId="book13";
            const key =`reviews_${bookId}`;
            Cookies.set(key,JSON.stringify(this.reviews));
        },
        loadReviews(){
            const bookId = "book13";
            const key = `reviews_${bookId}`;
            const userId = this.getUserId();
            const stored = Cookies.get(key);
            const shelf = Cookies.get(`shelf13_${userId}`);
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

                if(key.startsWith('book13_')) {
            
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