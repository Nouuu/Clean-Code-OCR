Feature: A file writer write given string input in file

  Scenario: Basic string
    Given I want to write some input in the file basic.txt
    When I write
    """
    coucou
    """
    Then my file appended content should be
    """
    coucou
    """
