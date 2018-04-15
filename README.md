This a node Aplication
reads csv file having following fields
Design and build the following:

CSV file has 5 columns;
● Email id
● Subscription Type - [Disruptor, Liberator, GameChanger]
● Subscription Duration - [1 month, 2 months, 3 months] - How long the subscription is
valid for.
● Subscription Start Date.
● Subscription End Date.
CSV file has the data of subscribers for four months - Jan, Feb, Mar, April.

and then based on month passed answer two things using charts

Problem 1:
❏ Identify the number of subscribers gained and lost from the fetched CSV file for the
month that is passed as an argument.
Problem 2:
❏ Identify the division of subscription levels [Disruptor, Liberator, GameChanger] from the
fetched CSV file whose subscription is active for the month that is passed as an
argument.

1.  git clone https://github.com/himanshu-9419/NewsLaundry
2.  npm install
3.  node index.js

// front end uses d3 to make pie chart and highcharts to make bar chart