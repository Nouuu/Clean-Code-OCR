Feature: An entry is composed of lines
  It can contain up to a hundred lines

  Scenario: One line of zeros
    Given the following text
    """
     _  _  _  _  _  _  _  _  _
    | || || || || || || || || |
    |_||_||_||_||_||_||_||_||_|

    """
    When I parse this text
    Then I should get
      |000000000|

  Scenario: Two lines of zeros
    Given the following text
    """
     _  _  _  _  _  _  _  _  _
    | || || || || || || || || |
    |_||_||_||_||_||_||_||_||_|

     _  _  _  _  _  _  _  _  _
    | || || || || || || || || |
    |_||_||_||_||_||_||_||_||_|

    """
    When I parse this text
    Then I should get
      |000000000|000000000|

  Scenario: Two lines of one to nine
    Given the following text
    """
        _  _     _  _  _  _  _
      | _| _||_||_ |_   ||_||_|
      ||_  _|  | _||_|  ||_| _|

        _  _     _  _  _  _  _
      | _| _||_||_ |_   ||_||_|
      ||_  _|  | _||_|  ||_| _|

    """
    When I parse this text
    Then I should get
      |123456789|123456789|

  Scenario: Empty text
    Given the following text
    """
    """
    When I parse this text
    Then I should have an empty list
