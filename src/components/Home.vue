<template>
<div class="nav">
            <router-link to="/myShelf"><div class="button">My Shelf</div></router-link>
            <router-link to="/myFavourites"><div class=" button" >Favourites</div></router-link>
            <router-link to="/"><div class="button">Explore</div></router-link>
            <div @click="logout" class="sign button">Logout</div>
        </div>

        <div class="intro">
            <div class="welcome">
                <div class="profile">
                  <router-link to="/MyProfile"> <img src="../../Seminarska/profile.jpg" class="imageP"></router-link> 
                    <p>Welcome,{{ text }}!</p>
                </div>
                Welcome to the world of limitless stories and boundless imagination. Here at our book platform, 
                we invite you to embark on journeys that span galaxies, traverse time, and explore the depths of the human heart.
                 Whether you seek thrilling adventures, profound wisdom, our curated collection of books offers something 
                 for every reader. Join us in discovering new authors, rediscovering old favorites,
                  and forging connections through the magic of words. 
            

            <div class="searchbar">
                <input type="text" placeholder="Search for books..." v-model="searchWord" />
                <img src="../../Seminarska/search.png">
            </div>
       

        <div class="genre-filter">
                    <label for="genre">Select Genre:</label>
                    <select id="genre" v-model="selectedGenre">
                        <option value="">All Genres</option>
                        <option v-for="genre in genres" :key="genre" :value="genre">{{ genre }}</option>
                    </select>
          </div>
        </div>   

        <div v-if="filteredBooks.length === 0" class="None two" >
                    No books found.
                </div>
            <div class="collectio">
               <component 
               v-for="(book,index) in filteredBooks"
               :key="index"
               :is="book.component"
               />
            </div> 
            
        </div>
</template>

<script >
import bookOne from '../../Seminarska/components/book1.vue'
import bookTwo from '../../Seminarska/components/book2.vue'
import bookThree from '../../Seminarska/components/book3.vue'
import bookFour from '../../Seminarska/components/book4.vue'
import bookFive from '../../Seminarska/components/book5.vue'
import bookSix from '../../Seminarska/components/book6.vue'
import bookSeven from '../../Seminarska/components/book7.vue'
import bookEight from '../../Seminarska/components/book8.vue'
import bookNine from '../../Seminarska/components/book9.vue'
import bookTen from '../../Seminarska/components/book10.vue'
import bookEleven from '../../Seminarska/components/book11.vue'
import bookTwelve from '../../Seminarska/components/book12.vue'
import bookThirteen from '../../Seminarska/components/book13.vue'
import bookFourteen from '../../Seminarska/components/book14.vue'
import bookFifteen from '../../Seminarska/components/book15.vue'
import bookSixteen from '../../Seminarska/components/book16.vue'
import bookSeventeen from '../../Seminarska/components/book17.vue'
import bookEighteen from '../../Seminarska/components/book18.vue'
import bookNineteen from '../../Seminarska/components/book19.vue'
import bookTwenty from '../../Seminarska/components/book20.vue'
import bookTwentyOne from '../../Seminarska/components/book21.vue'
import bookTwentyTwo from '../../Seminarska/components/book22.vue'
export default {
    name:'HomePage',
    components:{
        bookOne,
        bookTwo,
        bookThree,
        bookFour,
        bookFive,
        bookSix,
        bookSeven,
        bookEight,
        bookNine,
        bookTen,
        bookEleven,
        bookTwelve,
        bookThirteen,
        bookFourteen,
        bookFifteen,
        bookSixteen,
        bookSeventeen,
        bookEighteen,
        bookNineteen,
        bookTwenty,
        bookTwentyOne,
        bookTwentyTwo
    },
    data() {
        return {
            searchWord:'',
            books: [
                 {title: '1984', genre: 'Science Fiction', component: 'bookOne'},
                {title: 'To Kill A Mocking Bird', genre: 'Drama', component: 'bookTwo'},
                {title: 'Don Quixote', genre: 'Fantasy', component: 'bookThree'},
                {title: 'Moby Dick', genre: 'Adventure', component: 'bookFour'},
                {title: 'The Great Gatsby', genre: 'Historical Fiction', component: 'bookFive'},
                {title: 'Lord of the Rings', genre: 'Fantasy', component: 'bookSix'},
                {title: 'Pride and Prejudice', genre: 'Romance', component: 'bookSeven'},
                {title: 'Anna Karenina', genre: 'Romance', component: 'bookEight'},
                {title: 'One Hundred Years of Solitude', genre: 'Fantasy', component: 'bookNine'},
                {title: 'Jane Eyre', genre: 'Romance', component: 'bookTen'},
                {title: 'The Adventures of Huckleberry Finn', genre: 'Adventure', component: 'bookEleven'},
                {title: 'Wuthering Heights', genre: 'Romance', component: 'bookTwelve'},
                {title: 'Hamlet', genre: 'Drama', component: 'bookThirteen'},
                {title: 'Beloved', genre: 'Historical Fiction', component: 'bookFourteen'},
                {title: 'The Hunger Games', genre: 'Science Fiction',component: 'bookFifteen'},
                {title: 'The Kite Runner', genre:'Historical Fiction',component:'bookSixteen'},
                {title: 'The Housmaid\'s Secret', genre:'Thriller',component:'bookSeventeen'},
                {title: 'The Tempest',genre: 'Drama', component:'bookEighteen'},
                {title: 'It Ends With Us', genre: 'Romance', component:'bookNineteen'},
                {title: 'The Girl On The Train' ,genre:'Thriller' ,component:'bookTwenty'},
                {title:'The Secret History',genre:'Mystery', component:'bookTwentyOne'},
                {title: 'Gone Girl' ,genre:'Thriller', component:'bookTwentyTwo'}
            ],
            text:'',
            selectedGenre: '',
            genres: ['Science Fiction','Historical Fiction','Drama','Romance','Adventure','Fantasy','Mystery','Thriller']
        }
    },
    computed: {
        filteredBooks() {
            return this.books.filter(book =>
                book.title.toLowerCase().includes(this.searchWord.toLowerCase()) &&
                ((this.selectedGenre === '') || (this.selectedGenre === book.genre))
            );
        }
    },
    methods:{
        logout(){
           localStorage.clear();
           this.$router.push({name:'LoginPage'})
        }
    },
    mounted(){
        let user=localStorage.getItem('user-info');
        if(!user){
            this.$router.push({name:'WelcomePage'});
            return;
        }
        try{
            const Info = JSON.parse(user);
            if(Info && Info.name){
            this.text =Info.name;           
            }
        }catch (error) {
            this.$router.push({name:'WelcomePage'});
        }
        
    }
    
}
</script>


<style src="../../Seminarska/style.css">
</style>