Feature: A line represents a 9 digit number in 4 line and 27 columns
  Each number is split in three columns
  The first three line represent the digit, the fourth is blank to mark separation
  As a parser of theses lines, I can parse the digits and return the correct number

  Scenario: One Zero
    Given the following line
    """
     _
    | |
    |_|

    """
    When I parse this line
    Then I should get 0

  Scenario: All Zeros
    Given the following line
    """
     _  _  _  _  _  _  _  _  _
    | || || || || || || || || |
    |_||_||_||_||_||_||_||_||_|

    """
    When I parse this line
    Then I should get 0

