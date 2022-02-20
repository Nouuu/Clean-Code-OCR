Feature: A checksum is calculated using the index of a digit multiplied by the value of the digit
  This checksum must be equal to the expected one so the input is valid

  Scenario: All Zeros valid checksum
    Given The following sequence 000000000
    When I check the sequence's checksum
    Then It should be true

  Scenario: All Zeros with error valid checksum
    Given The following sequence 000?00000
    When I check the sequence's checksum
    Then It should be false

  Scenario: One to nine invalid checksum
    Given The following sequence 123456789
    When I check the sequence's checksum
    Then It should be false
