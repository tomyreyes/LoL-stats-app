# LOL Stats-APP

## This is how far I got in 4 hours: 

+ Implemented searches for summoner details and match details
+ Match details of the most recent 4 matches were chosen
+ From the most recent matches I used the data I received from match details and user details to find specific stats of user searched
+ Obtained statistics on: outcome, championId, level, KDA, spells and items
+ Used Semantic-UI to display these statistics

## Considerations for Production: 

+ Obtain champion name, item names and creep scores using data from matchHistory retrieved
+ FIX BUG - once user enters a valid username, they need to refresh the page in order to do another valid search
+ Control the API rate limit - libraries out there for this purpose. Currently limits are : 20 requests every 1 seconds, 100 requests every 2 minutes
+ Use Registered API Key once approved

