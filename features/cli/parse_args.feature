Feature: An arguments parser takes a schema and a string of arguments
  It will define the value for each argument in the schema

  Scenario: String argument
    Given the schema 's*'
    When parsing arguments
    """
    -s 'Hello world'
    """
    Then the string argument s should be
    """
    Hello world
    """

  Scenario: Number argument
    Given the schema 'n#'
    When parsing arguments
    """
    -n 15
    """
    Then the number argument n should be 15

  Scenario: Boolean argument present
    Given the schema 'b'
    When parsing arguments
    """
    -b
    """
    Then the boolean argument b should be true

  Scenario: Boolean argument not present
    Given the schema 'b'
    When parsing arguments
    """
    """
    Then the boolean argument b should be false
