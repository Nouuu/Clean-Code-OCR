Feature:  An arguments parser takes a schema and a string of arguments
  It will throw an error if the value doesn't match the type of the argument


  Scenario: Number argument
    Given the schema 'n#'
    When parsing arguments
    """
    -n '15'
    """
    Then I should have a ParsingError with message
    """
    Cannot parse number ('15') on key n
    """

  Scenario: String argument with int value
    Given the schema 's*'
    When parsing arguments
    """
    -s 15
    """
    Then I should have a ParsingError with message
    """
    Cannot parse string (15) on key s
    """

  Scenario: Number without string value
    Given the schema 'n#'
    When parsing arguments
    """
    -n '15'
    """
    Then I should have a ParsingError with message
    """
    Cannot parse number ('15') on key n
    """

  Scenario: String argument without value
    Given the schema 's*'
    When parsing arguments
    """
    -s
    """
    Then I should have a ParsingError with message
    """
    Cannot parse string () on key s
    """
