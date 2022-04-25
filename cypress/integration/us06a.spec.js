import { librarian_username } from '../support/authentication.constant'
import { password } from '../support/authentication.constant'
import { library_Url } from '../support/authentication.constant'
import { onlibraryPage} from '../support/library'

//Feature: As a data consumer, I want UI and DB book information are match.

describe('verify book categories with DB',()=>{

     it('Land on the homepage of library app',()=>{
        
          cy.visit(library_Url)   
          cy.contains("Email address").type(librarian_username)
          cy.contains("Password").type(password)   
          cy.contains("Sign in").click()
          cy.url().should('eq', 'https://library2.cybertekschool.com/#dashboard')
          cy.get(':nth-child(3) > .nav-link > .title').click()
          cy.contains('Book Management').should('be.visible', {timeout: 10000})
                    
  
       })//it//




     it('Get book categories from DB and UI, and then verify book categories must match',()=>{
        
           //take all book categories from UI
        cy.get('#book_categories').each(($el, index)=>{
            
          cy.log('Categories from UI', $el.text())
          
           const text = $el.text()           

          })  //UI method end




         cy.task("queryDb", {
    
              dbConfig: Cypress.env("db"),
              sql: `
              select name from library2.book_categories
              `
         }).then((result)=>{
           
          console.log("result from DB", result);

          
          function checkArrays( result, text ){

                //check if lengths are different
                if(result.length !== text.length) return false;
            
                //slice so we do not effect the orginal
                //sort makes sure they are in order
                var cResult = result.slice().sort(); 
                var cText = result.slice().sort();
            
                for(var i=0;i<cResult.length;i++){
                     if(cResult[i]!==cText[i]) return false;
                }
            
                return true;

            } //function
              
            console.log("checkArrays(result,text)", checkArrays(result,text) );  
   
})



     }) //it
     })  //descibe
