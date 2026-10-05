---
title: "How to: Convert dates into zodiac signs in Tableau"
date: "2021-10-31"
excerpt: "A radial chart showing how many of each zodiac sign were born between 1994 and 2014. Learn the techniques for date manipulation and circular visualizations in Tableau."
author: "Rebecca Bergh"
tags: ["Tableau", "Data Visualization", "Tutorial"]
---

## The Challenge

What are the use cases for this issue that I solved? Probably just the one I aimed to do (a radial chart showing how many of each zodiac sign were born between 1994 and 2014). But, maybe there's a broader use case for converted dates into zodiac signs. Let me know if you come up with any!

I've created a video explaining this entire process if that's more useful than having it all written out.

## The Approach

{youtube:https://www.youtube.com/watch?v=BSP-rM2i9kg}


### Step 1: Make your date column

If your data (like the one I used) has no true date column, you'll need to start this process by making one. I used the MAKEDATE function to create this calculated field.

{field:Full date|MAKEDATE([Year],[Month],[Date Of Month])}

### Step 2: Which months and days are single vs double-digit

This might seem like a weird step for this process, but just trust me, it makes the manual part at the end way easier. What we're going to do is create an IF statement to see whether the month and/day of a particular date is two digits or one. That way we can add some characters before those one-digit numbers so that when we create our zodiac sign group later, it sorts properly and it's way more efficient.

{field:Month digit length|STR(LEN(STR(DATEPART('month',[Full date]))))}


{field:Day digit length|STR(LEN(STR(DATEPART('day',[Full date]))))}

So we're finding the day of the Full date, converting it to a string, finding how many characters it is, then converting that number to a string.

### Step 3: IF statement

Depending on if we have a date that has one digit (or two), we will want to add a 0 in front (or not) so that it sorts properly. And don't forget the hyphens. They matter too.

{field:Add 0 (month)|IF [Month digit length] = "1" THEN "-0" ELSE "-" END}

{field:Add 0 (day)|IF [Day digit length] = "1" THEN "-0" ELSE "-" END}

### Step 4: String of month and day

Now we can add all of our strings together and it will give us a nicely sorted list of all the months and days in our data.

{fieldMonth and date|[Add 0 (month)] + STR(MONTH([Full date])) + [Add 0 (day)] + STR(DATEPART('day',[Full date]))}

### Step 5: Making the groups

Finally, we can make our horoscope groups. If you only have 1 year of data, doing all of the previous steps would probably not be necessary since you would be doing the same number of selections on this step. But if you're working with lots of years of data, the previous steps make this step very efficient.

For reference, the zodiac is based on the date range within the calendar year:
- Aries: March 21 - April 19
- Taurus: April 20 - May 20
- Gemini: May 21 - June 20
- Cancer: June 21 - July 22
- Leo: July 23 - August 22
- Virgo: August 23 - September 22
- Libra: September 23 - October 22
- Scorpio: October 23 - November 21
- Sagittarius: November 22 - December 21
- Capricorn: December 22 - January 19
- Aquarius: January 20 - February 18
- Pisces: February 19 - March 20

Create your group from the new `Month and date` calculated field we made in the last step. Name your group `Zodiac sign` and let your imagination go wild! Let me know if you build anything with it. Below is a radial chart I made from the original data source.

## See it in action:

{tableau:https://public.tableau.com/views/Howpopularisyourbirthday_16389812815230/Howpopularisyourbirthday?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link}


## Next Steps

This technique of converting dates into meaningful categories can be applied to many different scenarios in your own data visualization work!
