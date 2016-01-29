Feature: Search for an article

  As a new visitor
  I want to search using keywords
  So that I can find the article I'm looking for

  Scenario: Search about wind turbine wake
    Given that I'm on the search page
    When I search for the keywords "Wind Turbine Wake Laan"
    Then I see a list of articles
    And one article title contains "model applied to a wind turbine wake in atmospheric turbulence"
    When I click on this article that contains "model applied to a wind turbine wake in atmospheric turbulence"
    Then I see a new page with a title that contains  "model applied to a wind turbine wake in atmospheric turbulence"
