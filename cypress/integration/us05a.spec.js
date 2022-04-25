import { librarian_username } from '../support/authentication.constant'
import { password } from '../support/authentication.constant'
import { library_Url } from '../support/authentication.constant'
var data = require('../fixtures/bookInfo.json')

//Feature: As a data consumer, I want UI and DB book information are match

describe('verify book information with DB',()=>{
   
    it('Land on the homepage of library app and navigate to "Books" page and open a book called "Chordeiles minor"',()=>{

        cy.visit(library_Url)   
        cy.contains("Email address").type(librarian_username)
        cy.contains("Password").type(password)   
        cy.contains("Sign in").click()
        cy.url().should('eq', 'https://library2.cybertekschool.com/#dashboard')

        cy.get(':nth-child(3) > .nav-link > .title').click()
        cy.contains('Book Management').should('be.visible', {timeout: 10000})
    
        //get BOOK information from UI
       cy.get('[class="odd"] > :nth-child(3)').each(($el, index)=>{
             const text = $el.text()
             console.log('Book names from UI : ', text);  
            
         })
         
    })


    it('execute query to get the book information from books table and verify book DB and UI information must match',()=>{

        //get BOOK information from DB
        cy.task("queryDb", {
    
            dbConfig: Cypress.env("db"),
            sql: `
            select name, author, year from library2.books where name="Chordeiles minor";
            `
        }).then((result)=>{
            console.log("Book information from DB :",result)
            
            const actualBookNameDB = result[0,0].name
            const actualBookAuthorDB = result[0,0].author
            const actualBookYearDB = result[0,0].year
            console.log("actualBookInfo : ",actualBookNameDB,",",actualBookAuthorDB,",",actualBookYearDB);   
          
            for(var i=0; i>3; i++){
                expect(result[i]).to.contain(data)
            }
              
     



        })

    })

    })