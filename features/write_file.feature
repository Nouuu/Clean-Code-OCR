Feature: A file writer write given string input in file

  Scenario: Basic string
    Given I want to write some input in the file basic.txt
    When I write
    """
    coucou
    """
    Then my file content should be
    """
    coucou
    """

  Scenario: Multiline string
    Given I want to write some input in the file multiline.txt
    When I write
    """
    coucou
    c'est moiiiiiiiiii
    oui oui
    """
    Then my file content should be
    """
    coucou
    c'est moiiiiiiiiii
    oui oui
    """

  Scenario: Basic writeLine
    Given I want to write some input in the file basic-writeLine.txt
    When I write line
    """
    coucou
    """
    Then my file content should be
    """
    coucou

    """
  Scenario: Multi writeLine
    Given I want to write some input in the file multi-writeLine.txt
    When I write line
    """
    coucou
    c'est moiiiiiiiiii
    oui oui
    """
    Then my file content should be
    """
    coucou
    c'est moiiiiiiiiii
    oui oui

    """

  Scenario: Successive writeLine
    Given I want to write some input in the file successive-writeLine.txt
    When I write line
    """
    coucou
    """
    And I write line
    """
    coucou2
    """
    And I write line
    """
    the last coucou promis
    """
    Then my file content should be
    """
    coucou
    coucou2
    the last coucou promis

    """
