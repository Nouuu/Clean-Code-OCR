Feature: The parser has a default value defined for each supported type

  Scenario: String default value
    Given the schema 's*'
    When parsing arguments
    """
    """
    Then the string argument s should be
    """
    """

  Scenario: Boolean default value
    Given the schema 'b'
    When parsing arguments
    """
    """
    Then the boolean argument b should be false

  Scenario: Number default value
    Given the schema 'n#'
    When parsing arguments
    """
    """
    Then the number argument n should be 0
