import fs from "fs"
import path from "path";

const user = JSON.parse(
     fs.readFileSync(path.join(process.cwd(),"model", "users.json"))
);
const book = JSON.parse(
    fs.readFileSync(path.join(process.cwd(),"model", "books.json"))
);
const order = JSON.parse(
    fs.readFileSync(path.join(process.cwd(),"model", "orders.json"))
)

 const resolvers = {
    Query: {
      users: ()=> {
         const  userData = user.filter( (u) =>{
            u.books = []
            for (const b of book) { 
                for (const o of order) {
                    if(u.id == o.user_id){
                       if(b.id == o.book_id){
                        u.books.push(b)
                       }
                    }
                } 
                
            }
            return u
         })
         return userData
      },
      books:()=> {
         const bookData = book.filter((b)=>{
              b.users =[]
              for (const u of user) {
                 for (const o of order) {
                     if(b.id == o.user_id){
                        if(u.id == o.book_id){
                        b.users.push(u)
                        }
                     }
                 }
              }
              return b
         })
         return bookData
      },
      orders: ()=> order
    },
  };

  export {resolvers}