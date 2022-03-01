Feature: An OCR CLI setups the OCR parser before running it

  Scenario: Call help argument
    Given the following command line
    """
    -h
    """
    When I run the ocr cli
    Then it should display helper

  Scenario: Override input parameter
    Given the following command line
    """
    -i './features/test_files/input.txt'
    """
    When I run the ocr cli
    Then it should have read from
    """
    ./features/test_files/input.txt
    """

  Scenario: Override enable classifier
    Given the following command line
      """
      -i './features/test_files/input.txt' -s
      """
    When I run the ocr cli
    Then splitClassifierStateAssociation should have been used

  Scenario: Override error output parameter
    Given the following command line
    """
    -i './features/test_files/input.txt' -e './features/test_files/out/errored.txt'
    """
    When I run the ocr cli
    Then unifiedClassifierStateAssociation ERROR should be ./features/test_files/out/errored.txt

  Scenario: Override unknown output parameter
    Given the following command line
    """
    -i './features/test_files/input.txt' -u './features/test_files/out/unknown.txt'
    """
    When I run the ocr cli
    Then unifiedClassifierStateAssociation UNREADABLE should be ./features/test_files/out/unknown.txt

  Scenario: Override valid output parameter
    Given the following command line
    """
    -i './features/test_files/input.txt' -v './features/test_files/out/valid.txt'
    """
    When I run the ocr cli
    Then unifiedClassifierStateAssociation VALID should be ./features/test_files/out/valid.txt
