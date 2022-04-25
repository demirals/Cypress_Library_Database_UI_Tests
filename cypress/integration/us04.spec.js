//Feature: As a librarian, I want to know all the students who borrowed books

describe('verify who is most popular user who reads the most',()=>{

    it('execute query to find most popular user and verify "Test Student 344" is the user who reads the most ',()=>{

        cy.task("queryDb", {
    
            dbConfig: Cypress.env("db"),
            sql: `
            select full_name,count(*) from library2.users u inner join library2.book_borrow bb on u.id = bb.user_id
group by full_name
order by 2 desc ;
            `
        }).then((result)=>{
            console.log("Barrowing Popularity List :",result)        
            const actualMostPop = result[1,0]
            console.log("actualMostPop : ", actualMostPop)
            console.log("actualMostPop.full_name : ", actualMostPop.full_name);         
        
              
           // console.log("actualMostPop.count : ", actualMostPop.count);         
        
        
        
            expect(actualMostPop.full_name).to.equal('Test Student 344')

            

        })
    })
})







  
    