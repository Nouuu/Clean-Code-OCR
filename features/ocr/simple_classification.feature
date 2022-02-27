Feature: A classifier defines the destination in which the line should be dispatched depending on its state

  Scenario: An error line
    Given The following state to destination association
    |ERROR|error|
    |UNREADABLE|invalid|
    |VALID|valid|
    When State of the line is ERROR
    Then The destination should be error

  Scenario: A valid line
    Given The following state to destination association
      |ERROR|error|
      |UNREADABLE|invalid|
      |VALID|valid|
    When State of the line is VALID
    Then The destination should be valid

  Scenario: An error line
    Given The following state to destination association
      |ERROR|error|
      |UNREADABLE|invalid|
      |VALID|valid|
    When State of the line is UNREADABLE
    Then The destination should be invalid

  Scenario: A state is missing in the association
    Given The following state to destination association
      |ERROR|error|
      |UNREADABLE|invalid|
    When State of the line is VALID
    Then The classifier should throw a ClassifierError with message
    """
    No destination for line state
    """
