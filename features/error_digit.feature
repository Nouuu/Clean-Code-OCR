Feature: A digit is split in three columns and four lines
  The first three line represent the digit, the fourth is blank to mark separation
  As a parser of theses digits, I can handle error if digit is incorrect

  Scenario: Unknown digit
    Given the following digit
    """

    | |
    |_|

    """
    When I parse this digit
    Then I should get ?

  Scenario: False One
    Given the following digit
    """
      |
      |
      |

    """
    When I parse this digit
    Then I should get ?

  Scenario: Letter A
    Given the following digit
    """
     _
    |_|
    | |

    """
    When I parse this digit
    Then I should get ?
