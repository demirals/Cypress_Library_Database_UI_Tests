//import { onlibraryPage} from '../../../support/library'
import { librarian_username } from '../support/authentication.constant'
import { password } from '../support/authentication.constant'
import { library_Url } from '../support/authentication.constant'

//Feature: As a librarian, I want to know who borrowed books

describe('verify the amount of borrowed books',()=>{

    it('Land on the homepage of library app',()=>{
        
        cy.visit(library_Url)   
        cy.contains("Email address").type(librarian_username)
        cy.contains("Password").type(password)   
        cy.contains("Sign in").click()
        cy.url().should('eq', 'https://library2.cybertekschool.com/#dashboard')
        
        cy.get('#borrowed_books').should('have.text','4457')       

     })//it//


    it('And take borrowed books number from DB and UI, borrowed books number information must match with DB',()=>{

        cy.task("queryDb", {

            dbConfig: Cypress.env("db"),
            sql: `
            SELECT count(*) AS COUNT FROM library2.book_borrow where is_returned = 0;
            `
        }).then((result)=>{
        
            console.log("result :", result);
            const numberDB = result[1,0]
            console.log("Barrowed Books Number from DB :", numberDB.COUNT);
           

            // Get Barrowed Books Number from UI 
            cy.get('#borrowed_books').invoke('text').then(parseFloat).then((text1)=>{

                console.log("Barrowed Books Number from UI :", text1);
                expect(text1).to.eq(numberDB.COUNT)
    
            }) 
            
         }) 

    })//it//
    
})///end///

