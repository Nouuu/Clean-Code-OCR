Feature: A file reader read given source and return its string content

  Scenario: Basic file
    Given the file basic.txt
    When I read this file
    Then The file content should be
    """
    coucou

    """

  Scenario: Long file content
    Given the file lorem
    When I read this file
    Then The file content should be
    """
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel risus vitae nisl sollicitudin feugiat vitae at nibh. Praesent fermentum massa in augue volutpat pulvinar. Sed viverra euismod arcu, sit amet porttitor arcu finibus et. Aliquam et neque vel libero accumsan fringilla eget eu est. Maecenas sed purus sit amet magna ullamcorper mattis et placerat ligula. Ut ac facilisis tellus. Nam vulputate eget risus a accumsan. Phasellus molestie interdum dui, at condimentum velit. Donec iaculis leo eu magna dapibus ullamcorper. Duis malesuada quam quis eros varius luctus. Etiam dignissim mauris ut finibus vestibulum.

    Praesent tincidunt magna ut suscipit tempus. Maecenas ultricies, diam nec lobortis laoreet, tortor mauris sodales eros, at fringilla augue erat ut nulla. Pellentesque fermentum quam id dignissim aliquam. Etiam facilisis lorem non nulla semper tempor. Aliquam mauris massa, porttitor eget consequat at, gravida egestas nisl. Integer et ligula quam. Duis rutrum, ex in dictum ultricies, ligula est tristique eros, eget efficitur ex odio ac magna.

    Phasellus commodo tortor a libero maximus, quis tempus nisi faucibus. Nulla a enim nulla. Proin non sapien consectetur, rhoncus ipsum eu, venenatis ex. Vivamus lacinia arcu non porta volutpat. Sed convallis sodales luctus. Curabitur eleifend leo nec massa imperdiet viverra. Nulla iaculis pellentesque neque in mollis. Nunc at odio et ante lobortis faucibus id ut lectus. In hac habitasse platea dictumst. Nam feugiat suscipit dolor, ac gravida nisi posuere sollicitudin.

    Vestibulum pretium ut nulla quis molestie. Quisque tincidunt dui non orci ultricies rutrum. Cras elementum sodales nunc vitae interdum. Pellentesque id maximus nunc. Fusce metus dolor, aliquam id neque eget, imperdiet vulputate nisi. Vestibulum hendrerit luctus aliquam. Quisque pretium odio maximus sollicitudin tempus. Sed elementum dolor lorem, at consectetur felis egestas ac. Vivamus ac urna at ligula efficitur sodales. Cras rutrum urna mi, eget lobortis lacus faucibus ac.

    Nunc scelerisque orci in imperdiet luctus. Donec sit amet facilisis libero, nec tincidunt ligula. Vivamus ut maximus sapien. Nullam laoreet consectetur eros in auctor. Nullam tincidunt euismod facilisis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus nisi neque, aliquet dapibus nibh non, tempor mollis nulla. Vestibulum sit amet aliquet nisl. Sed placerat metus eu nunc elementum, vel pulvinar sapien dictum.

    """

  Scenario: Unknown file
    Given the file idontexist.txt
    When I read this file
    Then I should have a FileError throwed with message
  """
  Error while reading file 'features/test_files/idontexist.txt'
  ENOENT: no such file or directory, open 'features/test_files/idontexist.txt'
  """
