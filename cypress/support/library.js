import { librarian_username } from './authentication.constant'
import { password } from './authentication.constant'
import { library_Url } from './authentication.constant'


export class library{

    loginToLibrary(){

    cy.visit(library_Url)   
    cy.contains("Email address").type(librarian_username)
    cy.contains("Password").type(password)   
    cy.contains("Sign in").click()
    cy.url().should('eq', 'https://library2.cybertekschool.com/#dashboard')
 }
 
    takeBarrowedBooksNumberDB(){
        
            cy.task("queryDb", {
    
                dbConfig: Cypress.env("db"),
                sql: `
                SELECT count(*) FROM library2.book_borrow where is_returned = 0;
                `
            }).then((result)=>{
                console.log("Barrowed Books Number DB :",result)
            })
    }

    takeBarrowedBooksNumberUI(){

        //convert text to a number before checking if it is ..
        //const numberUI = cy.get('#borrowed_books').invoke('text').then(parseFloat)       
        

        
        const element = document.getElementById('borrowed_books');
        //const numberUI = cy.get('#const element = document.getElementById("intro");').innerHTML
        
        
        //cy.get('#borrowed_books').should('have.text','4457')       
        //cy.get('#borrowed_books').invoke('text').then(parseFloat)       
        
                
     //   let num3 = document.getElementById('#borrowed_books');
    
        console.log("Barrowed Books Number UI :", element);
        
        /////////////////
    }

    executeQueryForMostPopularGenre(){

        cy.task("queryDb", {
    
            dbConfig: Cypress.env("db"),
            sql: `
            SELECT bc.name,count(*) FROM library2.book_borrow 
bb inner join library2.books b on bb.book_id = b.id
inner join library2.book_categories bc on b.book_category_id = bc.id
group by bc.name
order by 2 desc ;
            `
        }).then((result)=>{
            console.log("Barrowed Books Number DB :",result)
        
            // console.log(result[1,0]);

            const actualMostPop = result[1,0];
         //   console.log("actualMostPop : ", actualMostPop);
          
        })
    }

    //us06a
    executeQueryForAllCategories(){

        cy.task("queryDb", {
    
            dbConfig: Cypress.env("db"),
            sql: `
            select name from library2.book_categories;
            `
        }).then((result)=>{
                      
           let array = [result] 
           console.log("Book categories from DB :",array)
          
        })
    }

    getAllCategoriesFromUI(){

            cy.visit(library_Url)   
            cy.contains("Email address").type(librarian_username)
            cy.contains("Password").type(password)   
            cy.contains("Sign in").click()
            cy.url().should('eq', 'https://library2.cybertekschool.com/#dashboard')
            cy.get(':nth-child(3) > .nav-link > .title').click()
            cy.contains('Book Management').should('be.visible', {timeout: 10000})
    
            //take all book categories in web page
            cy.get('#book_categories').each(($el, index)=>{
                
                cy.log('Categories from UI', $el.text())
                
                 const text = $el.text()
                
  
    }
            )}
   

}
export const onlibraryPage = new library

