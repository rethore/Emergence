Feature: Help a class to gather all the relevant material

  As a class lecturer
  I want to be able to regroup all the related material per lecture
  So that my students can expand it and learn from it

  Scenario: Search class
    Given that I'm on the search page
    When I search for a class using the keywords "python wind energy"
    Then I can see a list of related classes appearing
    And I can find a class called "Python for Wind Energy"

  Scenario: Class page
    Given that I have searched for a class using the keywords "python wind energy"
    When I click on the class called "Python for Wind Energy"
    Then I arrive on a page url "emergence/class/python_for_wind_energy" with title "Python for Wind Energy"

  Scenario: Multiple lectures
    Given that I'm on this address "emergence/class/python_for_wind_energy"
    Then I can see the following lectures:
      | lectures            |
      | Scientific packages |
      | Plotting            |
      | Databases           |
