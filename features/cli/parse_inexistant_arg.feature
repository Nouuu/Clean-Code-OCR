Feature: When an argument does not exist a default is returned

  Scenario: String default value
    Given the schema 'c'
    When parsing arguments
    """
    """
    Then the string argument s should be
    """
    """

  Scenario: Boolean default value
    Given the schema 'c'
    When parsing arguments
    """
    """
    Then the boolean argument b should be false

  Scenario: Number default value
    Given the schema 'c'
    When parsing arguments
    """
    """
    Then the number argument n should be 0
