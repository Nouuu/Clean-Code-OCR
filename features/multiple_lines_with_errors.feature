Feature: An entry is composed of lines
  It can contain up to a hundred lines

  Scenario: One line of zeros
    Given the following text
    """
     _  _  _  _  _  _  _  _  _
    | || || || |  ||  | || || |
    |_||_||_|| | _||_ |_||_||_|

     _  _  _  _  _  _  _  _  _
    | || || || || || || || ||
    |_||_||_||_||_||_||_||_||_

    """
    When I parse this text
    Then I should get
      |000???000|00000000?|

  Scenario: Error at the beginning
    Given the following text
    """
      | _  _     _  _  _  _  _
      | _| _||_||_ |_   ||_||_|
      ||_  _|  | _||_|  ||_| _|

    """
    When I parse this text
    Then I should get
      |?23456789|
