//Feature: As a librarian, I want to know genre of books are being borrowed the most


describe('verify the the common book genre that is being borrowed',()=>{

    it('execute query to find most popular book genre and verify "Action and Adventure" is the most popular book genre.',()=>{

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
            const actualMostPop = result[1,0]
            let expectedMostPop = "Action and Adventure"
            console.log("actualMostPop : ", actualMostPop)
            console.log(actualMostPop.name);         
            expect(actualMostPop.name).to.equal('Action and Adventure')

        })

    
        

    })

})