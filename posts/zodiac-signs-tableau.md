---
title: "How to: Convert dates into zodiac signs in Tableau"
date: "2021-10-31"
excerpt: "A radial chart showing how many of each zodiac sign were born between 1994 and 2014. Learn the techniques for date manipulation and circular visualizations in Tableau."
author: "Rebecca Bergh"
tags: ["Tableau", "Data Visualization", "Tutorial"]
---

## The Challenge

When you need to create a visualization that goes beyond traditional bar charts and line graphs, Tableau has powerful tools to help. In this project, the challenge was straightforward: how many people of each zodiac sign were born in a specific timeframe?

While the question might seem simple, the visualization approach opens up interesting possibilities. A radial or circular chart provides a visually interesting way to display this cyclical data—after all, zodiac signs are tied to calendar months, which are cyclical by nature.

## The Approach


{youtube:https://www.youtube.com/watch?v=BSP-rM2i9kg}


### Step 1: Calculate Zodiac Signs from Dates

First, I needed to convert birth dates into zodiac sign categories. This required a calculated field in Tableau that could determine which sign corresponds to each date.

The zodiac is based on the date range within the calendar year:
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

### Step 2: Create the Radial Chart

To create a radial (circular) chart in Tableau:

1. **Set up your dimensions**: Use zodiac sign as your dimension
2. **Set up your measure**: Count of records or sum of population
3. **Use a circular layout**: By configuring the view with dual axes and polar coordinates
4. **Add formatting**: Color-code by sign for easy recognition

### Step 3: Filter the Date Range

Apply date filters to show births between 1994 and 2014. This gives us a 20-year snapshot of zodiac distribution.

### See it in action:

{tableau:https://public.tableau.com/views/Howpopularisyourbirthday_16389812815230/Howpopularisyourbirthday?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link}

## Key Insights

The resulting visualization reveals interesting patterns:
- Certain zodiac signs appear more frequently in this dataset
- The distribution helps us understand seasonal variations in birth dates
- Visual patterns emerge that wouldn't be as obvious in a traditional bar chart

## Lessons Learned

1. **Circular visualizations work well for cyclical data** - Zodiac signs map naturally to a circular layout because they represent the calendar year
2. **Date calculations are powerful in Tableau** - With the right formula, you can categorize dates in creative ways
3. **Design matters** - Color-coding by zodiac element (fire, earth, air, water) adds another layer of meaning

## Next Steps

Consider extending this analysis:
- Compare zodiac distributions across different time periods
- Analyze by geographic location
- Combine with other demographic data
- Create an interactive dashboard that lets users explore different date ranges

This technique of converting dates into meaningful categories can be applied to many different scenarios in your own data visualization work!
