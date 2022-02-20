Feature: A
  ocr
  Scenario: A basic OCR test with classifier
    Given The default OCR with classifier
      |ERROR|error.txt|
      |UNREADABLE|invalid.txt|
      |VALID|valid.txt|
    When I run the OCR on the file input.txt
    Then My error.txt file should contain
    """
    356609701 ERR

    """
    And My invalid.txt file should contain
    """
    000???000 ILL
    00000000? ILL

    """
    And My valid.txt file should contain
    """
    123456789
    000000000
    000000000
    457508000

    """

  Scenario: A basic OCR test with unique output file
    Given The default OCR with classifier
      |ERROR|output.txt|
      |UNREADABLE|output.txt|
      |VALID|output.txt|
    When I run the OCR on the file input.txt
    Then My output.txt file should contain
    """
    000???000 ILL
    00000000? ILL
    123456789
    000000000
    000000000
    356609701 ERR
    457508000

    """
