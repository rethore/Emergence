Feature: Add a new related scientific question to an article

  As a registered user
  I can add related scientific questions to existing articles
  So that I can discover other related articles

  @watch
  Scenario: Force user to sign in to register a question
    Given that I'm on this address "emergence/doi/10.1002/we.1736"
    And that I have not signed in
    When I try to add a question
    Then the website asks me to sign up

  Scenario: Add a new question show it in the panel Related
    Given that I'm on this address "emergence/doi/10.1002/we.1736"
    And that I have signed in
    When I try to add a question
    Then I see a modal popping up
    When I try to add a related question "How well can RANS model wind turbine wake in atmospheric turbulence?"
    Then I can see the question "How well can RANS model wind turbine wake in atmospheric turbulence?" appearing in the pannel Related

  Scenario: Add an already registered question as a relation show the question in the modal
    Given that I'm on this address "emergence/doi/10.1002/we.1736"
    And that I have signed in
    When I try to add a question
    Then I see a modal popping up
    When I write "RANS wake" in the input window
    Then I see that there is that the question "How well can RANS model wind turbine wake in atmospheric turbulence?" is already registered
    When I select on "How well can RANS model wind turbine wake in atmospheric turbulence?" and save
    Then I can see the question "How well can RANS model wind turbine wake in atmospheric turbulence?" appearing in the pannel Related

  Scenario: Clicking on a related question goes to the question page
    Given that I'm on this address "emergence/doi/10.1002/we.1736"
    When I click on the question "How well can RANS model wind turbine wake in atmospheric turbulence?"
    Then I go to this address "emergence/question/How well can RANS model wind turbine wake in atmospheric turbulence"

  Scenario: The question page shows all the related articles
    Given that I'on this address
    Then I can see the following DOIs:
      |10.1002/we.1736   |
      |10.1002/we.1736   |
    When I click on "10.1002/we.1736"
    Then I go to this address "emergence/doi/10.1002/we.1736"
