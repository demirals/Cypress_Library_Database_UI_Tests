@us01
Feature: As a data consumer, I want the user information are stored in mySql DB correctly in users table.
  
  @db
  Scenario: verify users has unique IDs and verify users table columns
  Given Execute query to get all IDs from users and verify all users has unique ID
  Then Execute query to get all columns and verify the below columns are listed in result

  #     | id            |
  #     | full_name     |
  #     | email         |
  #     | password      |
  #     | user_group_id |
  #     | image         |
  #     | extra_data    |
  #     | status        |
  #     | is_admin      |
  #     | start_date    |
  #     | end_date      |
  #     | address       |