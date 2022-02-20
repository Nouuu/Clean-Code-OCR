Feature: A line represents a 9 digit number in 4 line and 27 columns
  Each number is split in three columns
  The first three line represent the digit, the fourth is blank to mark separation
  As a parser of theses lines, I can parse the digits and return the correct number,
  even if some of them are incorrect

  Scenario: All Zeros except last
    Given the following line
    """
     _  _  _  _  _  _  _  _  _
    | || || || || || || || ||
    |_||_||_||_||_||_||_||_||_

    """
    When I parse this line
    Then I should get 00000000?


  Scenario: Error in the middle
    Given the following line
    """
     _  _  _  _  _  _  _  _  _
    | || || || |  ||  | || || |
    |_||_||_|| | _||_ |_||_||_|

    """
    When I parse this line
    Then I should get 000???000

  Scenario: Error at the beginning
    Given the following line
    """
      | _  _     _  _  _  _  _
      | _| _||_||_ |_   ||_||_|
      ||_  _|  | _||_|  ||_| _|

    """
    When I parse this line
    Then I should get ?23456789

