Feature: A file reader read given source and can parse its content

  Scenario: Basic file with one zero
    Given the file zero.txt
    When I read this file
    And I parse its content
    Then The parsed content should be
      | 000000000 |

  Scenario: Complexe file with multiple line and errors
    Given the file multiple_lines.txt
    When I read this file
    And I parse its content
    Then The parsed content should be
      | 123456789 | 12345?789 | 00?000000 |
