Feature: A line represents a 9 digit number in 4 line and 27 columns
  Each number is split in three columns
  The first three line represent the digit, the fourth is blank to mark separation
  As a parser of theses lines, I can parse the digits and return the correct number

  Scenario: Zero
    Given the following line
    """
     _
    | |
    |_|

    """
    When I parse this line
    Then I should get 0

  Scenario: One
    Given the following line
    """

      |
      |

    """
    When I parse this line
    Then I should get 1

  Scenario: Two
    Given the following line
    """
     _
     _|
    |_

    """
    When I parse this line
    Then I should get 2

  Scenario: Three
    Given the following line
    """
     _
     _|
     _|

    """
    When I parse this line
    Then I should get 3

  Scenario: Four
    Given the following line
    """

    |_|
      |

    """
    When I parse this line
    Then I should get 4

  Scenario: Five
    Given the following line
    """
     _
    |_
     _|

    """
    When I parse this line
    Then I should get 5

  Scenario: Six
    Given the following line
    """
     _
    |_
    |_|

    """
    When I parse this line
    Then I should get 6

  Scenario: Seven
    Given the following line
    """
     _
      |
      |

    """
    When I parse this line
    Then I should get 7

  Scenario: Height
    Given the following line
    """
     _
    |_|
    |_|

    """
    When I parse this line
    Then I should get 8

  Scenario: Nine
    Given the following line
    """
     _
    |_|
     _|

    """
    When I parse this line
    Then I should get 9

  Scenario: All Zeros
    Given the following line
    """
     _  _  _  _  _  _  _  _  _
    | || || || || || || || || |
    |_||_||_||_||_||_||_||_||_|

    """
    When I parse this line
    Then I should get 000000000

