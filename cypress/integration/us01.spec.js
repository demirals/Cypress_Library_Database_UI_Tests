var data = require ('../fixtures/Column_Names.json')

//Feature: As a data consumer, I want the user information are stored in mySql DB correctly in users table.

describe('verify users has unique IDs',()=>{

    it('Execute query to get all IDs from users and verify all users has unique ID',()=>{

        cy.task("queryDb", {

            dbConfig: Cypress.env("db"),
            sql: `
            SELECT id FROM library2.users;
            `
        }).then((result)=>{
           console.log(result)

           let array = [result];
           console.log(new Set(array).size == array.length)

        })

    })

    it('Execute query to get all columns and verify the below columns are listed in result',()=>{
        cy.task("queryDb", {
    
            dbConfig: Cypress.env("db"),
            sql: `
            select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='users';
            `          
        }).then((result)=>{

            console.log(result)
            console.log(data)

            function checkArrays( result, data ){

                //check if lengths are different
                if(result.length !== data.length) return false;
            
                //slice so we do not effect the orginal
                //sort makes sure they are in order
                var cResult = result.slice().sort(); 
                var cData = result.slice().sort();
            
                for(var i=0;i<cResult.length;i++){
                     if(cResult[i]!==cData[i]) return false;
                }
            
                return true;
            
            }
                     
            console.log(checkArrays(result,data) );  
           
        })
       
    })

})

