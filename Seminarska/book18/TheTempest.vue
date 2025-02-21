<template>
    <div class="nav">
                <router-link to="/myShelf"><div class="button">My Shelf</div></router-link>
                <router-link to="/myFavourites"><div class="button">Favourites</div></router-link>
                <router-link to="/"><div class="button">Explore</div></router-link>
                <div @click="logout" class="sign button">Logout</div>
            </div>
    
            <div class="write">
                <img src="../books/book18.jpg" alt="The Tempest" class="image">
                <div class="text">
                    <h1>The Tempest</h1>
                    <p class="author">by William Shakespeare
                    </p>
                    <br>
                    <p class="description">
                        The Tempest is a captivating play by William Shakespeare that unfolds on a remote island where the exiled Duke Prospero
                         wields magical powers. The tempest of the title is a storm conjured by Prospero to shipwreck his usurping brother, Antonio,
                          and the royal entourage, bringing them to the island. Through this storm, Prospero aims to reclaim his lost dukedom and
                           restore his daughter, Miranda’s, rightful place in society. The play intricately weaves themes of power, betrayal, 
                        and forgiveness as Prospero manipulates events using his magic to orchestrate reconciliation and justice.
                         <br>
                         <br>
                         As the narrative progresses, the characters' interactions and conflicts reveal deeper human truths. Prospero’s
                          journey from vengeance to forgiveness reflects the transformative power of compassion and the quest for redemption.
                           Alongside the main plot, subplots involving the island’s native inhabitant, Caliban, and the comic relief 
                           provided by the shipwrecked characters, such as Trinculo and Stephano, enrich the story. Ultimately,
                            The Tempest explores the nature of authority and the possibility of personal change, culminating 
                         in a resolution that underscores the play's exploration of the complexities of human nature and the power of reconciliation.
                        </p>
                        <br>
                     <p class="other" v-show="readingCount > 1">{{ readingCount }} people are currently reading</p>
                     <p class="other" v-show="readingCount === 1">{{ readingCount }} person is currently reading</p>
                </div>
              <div class=" shelf" @click="addShelf">
                {{ text }}
               </div>  
            </div>
            <EighteenList v-if="filteredReviews.length" :reviews="filteredReviews"/>
           <ReviewPage @review-submitted="addReview"/>
    </template>
    <script>
    import EighteenList from './EighteenList.vue';
    import ReviewPage from '../Review.vue';
    import Cookies from 'js-cookie';
    export default {
        name:'TheTempest',
        components: {
    ReviewPage,
    EighteenList 
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
               const cookieKey = `shelf18_${userId}`;
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
            const bookId="book18";
            const key =`reviews_${bookId}`;
            Cookies.set(key,JSON.stringify(this.reviews));
        },
        loadReviews(){
            const bookId = "book18";
            const key = `reviews_${bookId}`;
            const userId = this.getUserId();
            const stored = Cookies.get(key);
            const shelf = Cookies.get(`shelf18_${userId}`);
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

                if(key.startsWith('book18_')) {
            
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