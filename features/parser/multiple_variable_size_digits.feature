Feature: A line represents a 9 digit number in 4 line and 27 columns
  Each number is split in three columns
  The first three line represent the digit, the fourth is blank to mark separation
  As a parser of theses lines, I can parse the digits and return the correct number

  Scenario: Three Zeros
    Given the following line
    """
     _  _  _
    | || || |
    |_||_||_|

    """
    When I parse this line of 3 digits
    Then I should get 000

  Scenario: One to Four
    Given the following line
    """
        _  _
      | _| _||_|
      ||_  _|  |

    """
    When I parse this line of 4 digits
    Then I should get 1234

  Scenario: No digits
    Given the following line
    """




    """
    When I parse this line of 0 digits
    Then I should not get anything

