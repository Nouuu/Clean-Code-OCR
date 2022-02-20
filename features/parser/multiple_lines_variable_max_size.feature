Feature: An entry is composed of lines
  It can contain up to a hundred lines
  It's maximum number of lines could also be overwritten


  Scenario: Two lines of zeros with a maximum of one
    Given the following text
    """
     _  _  _  _  _  _  _  _  _
    | || || || || || || || || |
    |_||_||_||_||_||_||_||_||_|

     _  _  _  _  _  _  _  _  _
    | || || || || || || || || |
    |_||_||_||_||_||_||_||_||_|

    """
    When I parse this text of 1 line
    Then I should get
      |000000000|

  Scenario: Two lines of zeros with a maximum of two
    Given the following text
    """
     _  _  _  _  _  _  _  _  _
    | || || || || || || || || |
    |_||_||_||_||_||_||_||_||_|

     _  _  _  _  _  _  _  _  _
    | || || || || || || || || |
    |_||_||_||_||_||_||_||_||_|

    """
    When I parse this text of 2 line
    Then I should get
      |000000000|000000000|

  Scenario: Three lines of zeros with a maximum of two
    Given the following text
    """
     _  _  _  _  _  _  _  _  _
    | || || || || || || || || |
    |_||_||_||_||_||_||_||_||_|

     _  _  _  _  _  _  _  _  _
    | || || || || || || || || |
    |_||_||_||_||_||_||_||_||_|

     _  _  _  _  _  _  _  _  _
    | || || || || || || || || |
    |_||_||_||_||_||_||_||_||_|

    """
    When I parse this text of 2 line
    Then I should get
      |000000000|000000000|
