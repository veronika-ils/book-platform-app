<template>
    <div class="min">

    <div class="nav">
            <router-link to="/myShelf"><div class="button">My Shelf</div></router-link>
            <router-link to="/myFavourites"><div class=" button" >Favourites</div></router-link>
            <router-link to="/"><div class="button">Explore</div></router-link>
            <div @click="logout" class="sign button">Logout</div>
        </div>
        <div id="profile">
              <div class="head">
             <img  src="./reader.png">   
             <p>{{ username }}</p>
             
             </div>
<img src="./flat.png" class="flat">
            <div class="body">
                <p>Email:</p>
                <br>
                <p class="email"> {{ email }}</p>
            </div>
              <p id="start">Read books:</p>
        </div>

            <div class="end">
            <div v-show="isRead1" class="ProRead">
                <h1>1984</h1>
                <p>by George Orwell</p>
            </div>
               <div v-show="isRead2" class="ProRead"> 
                <h1>To Kill a Mocking Bird</h1>
                <p>by Harper Lee</p>
               </div>
                <div v-show="isRead3" class="ProRead"> 
                    <h1>Don Quixote</h1>
                <p>by Miguel de Cervantes</p>
                </div>
                <div v-show="isRead4" class="ProRead"> 
                    <h1>Moby Dick</h1>
                <p>by Herman Melville</p>
                </div>
                <div v-show="isRead5" class="ProRead"> 
                    <h1>The Great Gatsby</h1>
                    <p>by F. Scott Fitzgerald</p>
                </div>
                <div v-show="isRead6" class="ProRead"> 
                    <h1>The Lord of the Rings</h1>
                    <p>by John Ronald Reuel Tolkien</p>
                </div>
                <div v-show="isRead7" class="ProRead"> 
                    <h1>Pride and Prejudice</h1>
                    <p>by Jane Austen</p>
                </div> 
                <div v-show="isRead8" class="ProRead"> 
                    <h1>Anna Karenina</h1>
                    <p>by  Leo Tolstoy</p>
                </div>      
                <div v-show="isRead9" class="ProRead">  
                    <h1>One Hundred Years of Solitude</h1>
                    <p>by Gabriel García Márquez</p>
                </div>   
                <div v-show="isRead10" class="ProRead">  
                    <h1>Jane Eyre</h1>
                    <p>by Charlotte Brontë</p>
                </div>
                <div v-show="isRead11" class="ProRead">
                    <h1>The Adventures of Huckleberry Finn</h1>
                    <p>by Mark Twain</p>
                </div>
                <div v-show="isRead12" class="ProRead"> 
                    <h1>Wuthering Heights</h1>
                    <p>by Emily Brontë</p>
                </div>
                <div v-show="isRead13" class="ProRead"> 
                    <h1>Hamlet</h1>
                    <p>by William Shakespeare</p>
                </div>
                <div v-show="isRead14" class="ProRead"> 
                    <h1>Beloved</h1>
                    <p>by Toni Morrison</p>
                </div>
                <div v-show="isRead15" class="ProRead"> 
                    <h1>The Hunger Games</h1>
                    <p>by Suzanne Collins</p>
                </div>
                <div v-show="isRead16" class="ProRead"> 
                    <h1>The Kite Runner</h1>
                    <p>by Khaled Hosseini</p>
                </div>
                <div v-show="isRead17" class="ProRead"> 
                    <h1>The Housemaid's Secret</h1>
                    <p>by Freida McFadden</p>
                </div>
                <div v-show="isRead18" class="ProRead"> 
                    <h1>The Tempest</h1>
                    <p>by William Shakespeare</p>
                </div>
                <div v-show="isRead19" class="ProRead"> 
                    <h1>It Ends With Us</h1>
                    <p>by Colleen Hoover</p>
                </div>
                <div v-show="isRead20" class="ProRead"> 
                    <h1>The Girl On The Train</h1>
                    <p>by Paula Hawkins</p>
                </div>
                <div v-show="isRead21" class="ProRead"> 
                    <h1>The Secret History</h1>
                    <p>by Donna Tartt  </p>
                </div>
                <div v-show="isRead22" class="ProRead"> 
                    <h1>Gone Girl</h1>
                    <p>by Gillian Flynn </p>
                </div>
            </div>

            <div class="start1">
               <p >Currently reading:</p>   
            </div>
          

            <div class="end1">
            <div v-show="isReading1" class="ProRead">
                <h1>1984</h1>
                <p>by George Orwell</p>
            </div>
               <div v-show="isReading2" class="ProRead"> 
                <h1>To Kill a Mocking Bird</h1>
                <p>by Harper Lee</p>
               </div>
                <div v-show="isReading3" class="ProRead"> 
                    <h1>Don Quixote</h1>
                <p>by Miguel de Cervantes</p>
                </div>
                <div v-show="isReading4" class="ProRead"> 
                    <h1>Moby Dick</h1>
                <p>by Herman Melville</p>
                </div>
                <div v-show="isReading5" class="ProRead"> 
                    <h1>The Great Gatsby</h1>
                    <p>by F. Scott Fitzgerald</p>
                </div>
                <div v-show="isReading6" class="ProRead"> 
                    <h1>The Lord of the Rings</h1>
                    <p>by John Ronald Reuel Tolkien</p>
                </div>
                <div v-show="isReading7" class="ProRead"> 
                    <h1>Pride and Prejudice</h1>
                    <p>by Jane Austen</p>
                </div> 
                <div v-show="isReading8" class="ProRead"> 
                    <h1>Anna Karenina</h1>
                    <p>by  Leo Tolstoy</p>
                </div>      
                <div v-show="isReading9" class="ProRead">  
                    <h1>One Hundred Years of Solitude</h1>
                    <p>by Gabriel García Márquez</p>
                </div>   
                <div v-show="isReading10" class="ProRead">  
                    <h1>Jane Eyre</h1>
                    <p>by Charlotte Brontë</p>
                </div>
                <div v-show="isReading11" class="ProRead">
                    <h1>The Adventures of Huckleberry Finn</h1>
                    <p>by Mark Twain</p>
                </div>
                <div v-show="isReading12" class="ProRead"> 
                    <h1>Wuthering Heights</h1>
                    <p>by Emily Brontë</p>
                </div>
                <div v-show="isReading13" class="ProRead"> 
                    <h1>Hamlet</h1>
                    <p>by William Shakespeare</p>
                </div>
                <div v-show="isReading14" class="ProRead"> 
                    <h1>Beloved</h1>
                    <p>by Toni Morrison</p>
                </div>
                <div v-show="isReading15" class="ProRead"> 
                    <h1>The Hunger Games</h1>
                    <p>by Suzanne Collins</p>
                </div>
                <div v-show="isReading16" class="ProRead"> 
                    <h1>The Kite Runner</h1>
                    <p>by Khaled Hosseini</p>
                </div>
                <div v-show="isReading17" class="ProRead"> 
                    <h1>The Housemaid's Secret</h1>
                    <p>by Freida McFadden</p>
                </div>
                <div v-show="isReading18" class="ProRead"> 
                    <h1>The Tempest</h1>
                    <p>by William Shakespeare</p>
                </div>
                <div v-show="isReading19" class="ProRead"> 
                    <h1>It Ends With Us</h1>
                    <p>by Colleen Hoover</p>
                </div>
                <div v-show="isReading20" class="ProRead"> 
                    <h1>The Girl On The Train</h1>
                    <p>by Paula Hawkins</p>
                </div>
                <div v-show="isReading21" class="ProRead"> 
                    <h1>The Secret History</h1>
                    <p>by Donna Tartt  </p>
                </div>
                <div v-show="isReading22" class="ProRead"> 
                    <h1>Gone Girl</h1>
                    <p>by Gillian Flynn </p>
                </div>
            </div>
        </div>
</template>
<script>
import Cookies from 'js-cookie'
export default {
    name:'MyProfile',
    data() {
        return{
            username:'',
            email:'',
            isRead1:false,
            isRead2:false,
            isRead3:false,
            isRead4:false,
            isRead5:false,
            isRead6:false,
            isRead7:false,
            isRead8:false,
            isRead9:false,
            isRead10:false,
            isRead11:false,
            isRead12:false,
            isRead13:false,
            isRead14:false, 
            isRead15:false,
            isRead16:false,
            isRead17:false,
            isRead18:false,
            isRead19:false,
            isRead20:false,
            isRead21:false,
            isRead22:false,
            isReading1:false,
            isReading2:false,
            isReading3:false,
            isReading4:false,
            isReading5:false,
            isReading6:false,
            isReading7:false,
            isReading8:false,
            isReading9:false,
            isReading10:false,
            isReading11:false,
            isReading12:false,
            isReading13:false,
            isReading14:false, 
            isReading15:false,
            isReading16:false,
            isReading17:false,
            isReading18:false,
            isReading19:false,
            isReading20:false,
            isReading21:false,
            isReading22:false
        }
    },
    methods:{
        logout(){
           localStorage.clear();
           this.$router.push({name:'LoginPage'})
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
            
        }
    },
    mounted(){
        const Info =JSON.parse(localStorage.getItem('user-info'));
        this.username = Info.name;
        this.email = Info.email;
        const user = this.getUserId();
        for(let i=1;i<=22;i++){
            const Book=`book${i}_${user}`;
            const bookKey = Cookies.get(Book);
            const read = `isRead${i}`;
            if(bookKey === 'Read'){
            this[read] = true;
            }
            if(bookKey === 'Reading' ){
                const shelfKey = read.replace('Read','Reading');
                this[shelfKey] = true;
            }
        }
    }
}
</script>
<style src="./style.css">
.min {
    background-color: rgba(223, 148, 111, 0.2); 
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

#profile, .end, .end1 {
    flex: 1; 
}
</style>