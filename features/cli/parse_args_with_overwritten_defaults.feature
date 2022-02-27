Feature: The default values of the parser can be overwritten for an argument

  Scenario: String argument with default value
    Given the following string default values
      | s | a default value |
    And the schema 's*' with default values
    When parsing arguments
    """
    """
    Then the string argument s should be
    """
    a default value
    """

  Scenario: Number argument with default value
    Given the following number default values
      | n | 15 |
    And the schema 'n#' with default values
    When parsing arguments
    """
    """
    Then the number argument n should be 15
